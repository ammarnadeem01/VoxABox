import { NextFunction, Response, Request } from "express";
import { Friend } from "../Models/friend";
import asyncHandler from "../Utils/asyncErrorHandlers";
import CustomError from "../Utils/CustomError";
import { GroupChat } from "../Models/group_chat";
import sequelize from "sequelize";
import { User } from "../Models/user";
import { Op } from "sequelize";
import { Group } from "../Models/group";
import { GroupMember } from "../Models/group_member";
import { MessageStatus } from "../Models/MessageStatus";

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
    include: ["leftAt", "clearedAt"],
  });

  if (!isMember) {
    return next(
      new CustomError("User is/was not a member of this group...", 400)
    );
  }

  const finalDate = isMember.leftAt || new Date();

  const AllMessages = await GroupChat.findAll({
    where: {
      toGroupId: groupId,
      sentAt: {
        [Op.and]: [
          {
            [Op.gt]: isMember.clearedAt,
          },
          {
            [Op.lt]: finalDate,
          },
        ],
      },
    },
  });
  return AllMessages;
};

// helper func

const findAllUnreadMessages = async (
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
    attributes: ["leftAt", "membershipStatus", "clearedAt"],
  });

  if (!isMember) {
    return next(new CustomError("User has not joined this group...", 404));
  }

  // Check if the user has left the group
  // also clearChat status will be added here ie all retrieved chat after clearchat
  const leftDate = isMember.leftAt;
  if (
    isMember.membershipStatus === "Left" ||
    (leftDate && leftDate < new Date())
  ) {
    return next(new CustomError("User has left the group", 403));
  }

  const UnreadMessages = await GroupChat.findAll({
    where: {
      toGroupId: groupId,
    },
    include: [
      {
        model: MessageStatus,
        as: "messageStatus",
        where: {
          userId: memberId,
          status: "Not Seen",
          ...(isMember.clearedAt && {
            sentAt: { [Op.gt]: isMember.clearedAt },
          }),
        },
      },
    ],
  });
  return UnreadMessages;
};

export const createGroupMessage = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // 1. get data
    const { fromUserId, toGroupId, content } = req.body;
    // 2. check if required data is present
    if (!fromUserId || !toGroupId || !content) {
      return next(
        new CustomError("Requried Fields: FromUserId, ToGroupId, Content", 400)
      );
    }
    // 3. if from and to are valid  & if user not left the group
    const isMember = await GroupMember.findOne({
      where: {
        fromUserId,
        toGroupId,
        status: {
          [Op.ne]: "Left",
        },
      },
    });

    // 4. if contact is
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

    //6. send response
    res.status(200).json({
      status: "Success",
      data: {
        groupMessage,
      },
    });
  }
);

export const fetchAllGroupMessages = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { memberId, groupId } = req.query;
    if (!memberId || !groupId) {
      return next(new CustomError("memberId and groupId are required..", 400));
    }
    const memberIdString = memberId as string;
    const groupIdNumber = Number(memberId);

    const AllMessages = await allMessages(memberIdString, groupIdNumber, next);
    if (AllMessages?.length == 0) {
      return next(new CustomError("No Message in this group", 404));
    }
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
      status: "Success",
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
    const [updatedRows] = await GroupMember.update(
      { clearedAt: new Date() },
      {
        where: { memberId, groupId },
      }
    );

    res.status(200).json({
      status: "Success",
      data: `Chat has been cleared.`,
    });
  }
);

export const deleteGroupMessage = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // check id
    const { messageId, groupId, memberId, senderId } = req.query;
    if (!messageId || !groupId || !memberId) {
      return next(
        new CustomError("Req fields : messageId, groupId,memberId", 400)
      );
    }

    const messageIdN = Number(messageId);

    // if msg with given id present
    const deletedMessage = await GroupChat.findByPk(messageIdN, {
      include: {
        model: MessageStatus,
        as: "messageStatus",
        attributes: ["id"], // to update status for this user
      },
    });
    if (!deletedMessage) {
      return next(new CustomError("No message with given ID found", 404));
    }

    // detroy msg
    // if sender is deleting its own message, delete it for all members
    if (memberId === senderId) {
      await deletedMessage.destroy();
    }

    // if some other user is deleting message, then delete just for that user
    else {
      await MessageStatus.update(
        {
          isDeleted: 1,
        },
        {
          where: { id: deletedMessage.id },
        }
      );
    }

    // generate response
    res.status(200).json({
      status: "Success",
      data: {
        deletedMessage,
      },
    });
  }
);

export const setUnreadMessageToSeen = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // get userId
    const { memberId, groupId } = req.body;
    // if userid not null
    if (!memberId || !groupId) {
      return next(new CustomError("MemberId and GroupID are required...", 400));
    }
    const UnreadMessages = await findAllUnreadMessages(memberId, groupId, next);
    // if there are no unread messages, respond accordingly
    if (!UnreadMessages || UnreadMessages.length === 0) {
      res.status(200).json({
        status: "Success",
        message: "No unread messages found.",
      });
    } else {
      // loop through the unread messages and update the messageStatus to 'Seen'
      await Promise.all(
        UnreadMessages.map(async (message) => {
          await MessageStatus.update(
            { status: "Seen" },
            { where: { messageId: message.id, userId: memberId } }
          );
        })
      );

      // respond with success message
      res.status(200).json({
        status: "Success",
        message: "All unread messages have been marked as seen.",
      });
    }
  }
);
