import { NextFunction, Response, Request } from "express";
import { Friend } from "../Models/friend";
import asyncHandler from "../Utils/asyncErrorHandlers";
import CustomError from "../Utils/CustomError";
import { GroupChat } from "../Models/group_chat";
import { col, fn, literal, Op, where } from "sequelize";
import { GroupMember } from "../Models/group_member";
import { MessageStatus } from "../Models/MessageStatus";
import { User } from "../Models/user";
import { Group } from "../Models/group";
import { Sequelize } from "sequelize-typescript";

// helper funcs
const allMessages = async (
  memberId: string,
  groupId: number,
  next: NextFunction
) => {
  // final date:user was a member of grp? leftAt or CurrentDate?
  const isMember = await GroupMember.findOne({
    where: {
      memberId,
      groupId,
    },
    attributes: [
      [fn("COALESCE", col("leftAt"), fn("NOW")), "leftAt"],
      [fn("COALESCE", col("clearedAt"), col("joinedAt")), "clearedAt"],
    ],
  });

  if (!isMember) {
    return next(
      new CustomError("User is/was not a member of this group...", 400)
    );
  }

  const UnfilteredMessages = await GroupChat.findAll({
    where: {
      toGroupId: groupId,
      sentAt: {
        [Op.between]: [isMember.clearedAt, isMember.leftAt],
      },
    },
    attributes: ["id", "content", "fromUserId", "toGroupId"],
    include: { model: User },
  });

  // console.log("UnfilteredMessages", UnfilteredMessages);

  // Initialize an array to store all messages with their statuses
  let AllMessages = [];

  for (const message of UnfilteredMessages) {
    const messageStatus = await MessageStatus.findOne({
      where: {
        userId: memberId,
        messageId: message.dataValues.id,
        isDeleted: false,
      },
    });

    // Add the message and its status to the AllMessages array
    if (messageStatus) {
      AllMessages.push({
        message,
        messageStatus,
      });
    }
  }

  return AllMessages;
};

// helper func

const unreadseen = async (
  memberId: string,
  groupId: number,
  next: NextFunction
) => {
  // final date:user was a member of grp? leftAt or CurrentDate?
  const isMember = await GroupMember.findOne({
    where: {
      memberId,
      groupId,
    },
    attributes: [
      [fn("COALESCE", col("leftAt"), fn("NOW")), "leftAt"],
      [fn("COALESCE", col("clearedAt"), col("joinedAt")), "clearedAt"],
    ],
  });

  if (!isMember) {
    return next(
      new CustomError("User is/was not a member of this group...", 400)
    );
  }

  const UnfilteredMessages = await GroupChat.findAll({
    where: {
      toGroupId: groupId,
      sentAt: {
        [Op.between]: [isMember.clearedAt, isMember.leftAt],
      },
    },
    attributes: ["id", "content", "fromUserId", "toGroupId"],
  });
  // console.log("UnfilteredMessages", UnfilteredMessages); // Initialize an array to store all messages with their statuses
  let UnreadMessages = [];

  for (const message of UnfilteredMessages) {
    const messageStatus = await MessageStatus.findOne({
      where: {
        userId: memberId,
        messageId: message.dataValues.id,
        seenStatus: "Not Seen",
      },
    });
    if (messageStatus) {
      UnreadMessages.push({
        message,
        messageStatus,
      });
    }
  }
  return UnreadMessages;
};

const findAllUnreadMessages = async (
  memberId: string,
  groupId: number,
  next: NextFunction
) => {
  // final date:user was a member of grp? leftAt or CurrentDate?
  const Member = await GroupMember.findAll({
    where: {
      memberId,
    },
    attributes: [
      [fn("COALESCE", col("leftAt"), fn("NOW")), "leftAt"],
      [fn("COALESCE", col("clearedAt"), col("joinedAt")), "clearedAt"],
      "groupId",
    ],
    group: [
      "groupId",
      "GroupMember.leftAt",
      "GroupMember.clearedAt",
      "GroupMember.joinedAt",
    ],
  });

  if (!Member) {
    return next(
      new CustomError("User is/was not a member of this group...", 400)
    );
  }

  let UnfilteredMessages: any[] = [];
  for (const isMember in Member) {
    UnfilteredMessages[isMember] = await GroupChat.findAll({
      where: {
        toGroupId: Member[isMember].dataValues.groupId,
        sentAt: {
          [Op.between]: [
            Member[isMember].dataValues.clearedAt,
            Member[isMember].dataValues.leftAt,
          ],
        },
      },
      include: { model: Group },
    });
  }

  let UnreadMessages = [];

  for (const message of UnfilteredMessages!) {
    let messageStatus;
    for (const m of message!) {
      messageStatus = await MessageStatus.findOne({
        where: {
          userId: memberId,
          messageId: m.dataValues.id,
          seenStatus: "Not Seen",
        },
        // include: { model: GroupChat, attributes: ["toGroupId"] },
        // group: ["GroupChat.toGroupId"],
        // attributes: [
        //   "toGroupId",
        //   [Sequelize.fn("COUNT", Sequelize.col("id")), "unreadCount"],
        // ],
      });
    }

    if (messageStatus) {
      UnreadMessages.push({
        message,
      });
    }
  }
  return UnreadMessages;
};

export const createGroupMessage = async (data: any, next: NextFunction) => {
  // 1. get data
  const { fromUserId, toGroupId, content } = data;
  // 2. check if required data is present
  if (!fromUserId || !toGroupId || !content) {
    return next(
      new CustomError("Requried Fields: FromUserId, ToGroupId, Content", 400)
    );
  }
  // 3. if from and to are valid  & if user not left the group
  const isMember = await GroupMember.findOne({
    where: {
      memberId: fromUserId,
      groupId: toGroupId,
      membershipStatus: {
        [Op.ne]: "Left",
      },
    },
  });

  if (!isMember) {
    return next(
      new CustomError(
        "Either user has left the group OR group doesn't exist.",
        404
      )
    );
  }
  // 5. createMessage
  const groupMessage = await GroupChat.create({
    fromUserId,
    toGroupId,
    content,
  });

  const groupMembers = await GroupMember.findAll({
    where: { groupId: toGroupId },
  });

  for (const member of groupMembers) {
    const ans = await MessageStatus.create({
      userId: member.dataValues.memberId,
      messageId: groupMessage.id,
      isDeleted: false,
      seenStatus: "Not Seen",
    });
    if (member.dataValues.memberId == fromUserId) {
      await ans.update({ seenStatus: "Seen" });
    }
  }

  //6. send response

  return groupMessage;
};

export const fetchAllGroupMessages = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { memberId, groupId } = req.query;
    if (!memberId || !groupId) {
      return next(new CustomError("memberId and groupId are required..", 400));
    }
    const memberIdString = memberId as string;
    const groupIdNumber = Number(groupId);

    const AllMessages = await allMessages(memberIdString, groupIdNumber, next);
    // console.log("AllMessages", AllMessages);
    // if (AllMessages?.length == 0) {
    //   return next(new CustomError("No Message in this group", 404));
    // }
    res.status(200).json({
      status: "Success",
      length: AllMessages?.length,
      data: {
        AllMessages,
      },
    });
  }
);

export const fetchUnreadMessages = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // get userId
    const { memberId, groupId } = req.query;
    // if userid not null
    if (!memberId || !groupId) {
      return next(new CustomError("MemberId and GroupID are required...", 400));
    }
    const MemberId = memberId as string;
    const GroupId = Number(groupId);
    const UnreadMessages = await findAllUnreadMessages(MemberId, GroupId, next);

    // return response
    res.status(200).json({
      seenStatus: "Success",
      length: UnreadMessages?.length,
      data: {
        UnreadMessages,
      },
    });
  }
);

export const clearGroupChat = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // get data from query
    const { memberId, groupId } = req.body;
    // if data is present
    if (!memberId || !groupId) {
      return next(new CustomError("MemberId and GroupID are absent", 400));
    }

    // user and group exists?
    const user = await User.findByPk(memberId);
    if (!user) {
      return next(new CustomError("User doesn't exist.", 404));
    }

    const group = await Group.findByPk(groupId);
    if (!group) {
      return next(new CustomError("Group doesn't exist.", 404));
    }

    const [updatedRows] = await GroupMember.update(
      { clearedAt: new Date() },
      {
        where: { memberId, groupId },
      }
    );
    if (updatedRows == 0) {
      return next(new CustomError("user is not a part of this group", 403));
    }
    res.status(200).json({
      status: "Success",
      data: `Chat has been cleared.${updatedRows} messages deleted.`,
    });
  }
);

// export const deleteGroupMessage = asyncHandler(
//   async (req: Request, res: Response, next: NextFunction) => {
//     // check id
//     const { messageId, groupId, memberId, senderId } = req.body;
//     if (!messageId || !groupId || !memberId) {
//       return next(
//         new CustomError("Req fields : messageId, groupId,memberId", 400)
//       );
//     }

//     const messageIdN = Number(messageId);

//     // if msg with given id present
//     const deletedMessage = await GroupChat.findByPk(messageIdN, {
//       include: {
//         model: MessageStatus,
//         attributes: ["id", "isDeleted", "userId"], // to update status for this user
//       },
//     });
//     if (!deletedMessage) {
//       return next(new CustomError("No message with given ID found", 404));
//     }

//     if (memberId === senderId) {
//       // if sender is deleting its own message, delete it for all members
//       await deletedMessage.destroy();
//     } else {
//       //  if some other user is deleting message, then delete just for that user
//       // try {
//       const ans = await MessageStatus.update(
//         {
//           isDeleted: true,
//         },
//         {
//           where: { messageId: messageId, userId: memberId },
//         }
//       );
//       // console.log(
//       //   "============================================================================="
//       // );
//       // console.log("ans", ans);
//       // console.log(
//       //   "============================================================================="
//       // );
//     }

//     // generate response
//     res.status(200).json({
//       status: "Success",
//       data: {
//         deletedMessage,
//       },
//     });
//   }
// );

export const deleteGroupMessage = async (data: any, next: NextFunction) => {
  // check id
  const { messageId, groupId, memberId, senderId } = data;
  if (!messageId || !groupId || !memberId) {
    return next(
      new CustomError("Req fields : messageId, groupId,memberId,messageId", 400)
    );
  }

  const messageIdN = Number(messageId);

  // if msg with given id present
  const deletedMessage = await GroupChat.findByPk(messageIdN, {
    include: {
      model: MessageStatus,
      attributes: ["id", "isDeleted", "userId"], // to update status for this user
    },
  });
  console.log("==========|||||||||||||||||||||================");
  console.log("==========|||||||||||||||||||||================");

  if (!deletedMessage) {
    return next(new CustomError("No message with given ID found", 404));
  }
  let ans;
  console.log("------------------------------------");
  console.log("------------------------------------");
  console.log("------------------------------------");
  console.log("------------------------------------");
  console.log("------------------------------------");
  if (memberId === senderId) {
    // if sender is deleting its own message, delete it for all members
    const deletedCount = await deletedMessage.destroy();
    console.log("deletedCount", deletedCount);
    // if (!deletedCount) {
    //   return next(new CustomError("Failed to delete the message", 500));
    // }
  } else {
    // if some other user is deleting message, then delete just for that user
    ans = await MessageStatus.update(
      {
        isDeleted: true,
      },
      {
        where: { messageId: messageId, userId: memberId },
      }
    );
    console.log("ans", ans);
  }

  console.log("deletedMessage", deletedMessage);
  // generate response
  return { success: true, message: "Message deleted successfully" };
};

export const setUnreadMessageToSeen = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // get userId
    const { memberId, groupId } = req.body;
    // if userid not null
    if (!memberId || !groupId) {
      return next(new CustomError("MemberId and GroupID are required...", 400));
    }
    const UnreadMessages = await unreadseen(memberId, groupId, next);

    if (!UnreadMessages || UnreadMessages.length === 0) {
      res.status(200).json({
        status: "Success",
        message: "No unread messages found.",
      });
    } else {
      // loop through the unread messages and update the messageStatus to 'Seen'
      // console.log(
      //   "sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss1"
      // );
      for (const message of UnreadMessages) {
        // console.log(message);
        const ans = await MessageStatus.update(
          { seenStatus: "Seen" },
          {
            where: {
              messageId: Number(message.message.dataValues.id),
              userId: memberId,
            },
          }
        );
        // console.log(
        //   "++++++++++++++++++++++++++++++++++++++++==+++++++++++++++++++++++++++++++++++"
        // );
        // console.log(ans);
      }

      // respond with success message
      res.status(200).json({
        status: "Success",
        message: "All unread messages have been marked as seen.",
      });
    }
  }
);
