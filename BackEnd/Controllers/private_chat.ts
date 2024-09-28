import { NextFunction, Response, Request } from "express";
import asyncHandler from "../Utils/asyncErrorHandlers";
import CustomError from "../Utils/CustomError";
import { PrivateChat } from "../Models/private_chat";
import { Friend } from "../Models/friend";
import { Op, where } from "sequelize";
import { User } from "../Models/user";
import sequelize from "sequelize";
import { PrivateMessageStatus } from "../Models/PrivateMessageStatus";

// helper func (for load all messages, delete all messages)
const allMessages = async (
  fromUserId: string,
  toUserId: string,
  next: NextFunction
) => {
  // users are friends?
  const mutualFriends = await Friend.findOne({
    where: {
      userId: fromUserId,
      friendId: toUserId,
    },
    attributes: ["clearedAt", "createdAt"],
  });

  if (!mutualFriends) {
    return next(new CustomError("UserId and FriendId are not friends", 400));
  }
  // console.log();

  const initialdate = mutualFriends.clearedAt || mutualFriends.createdAt;

  const UnfilteredMessages = await PrivateChat.findAll({
    where: {
      [Op.and]: [
        {
          [Op.or]: [
            {
              fromUserId,
              toUserId,
            },
            {
              fromUserId: toUserId,
              toUserId: fromUserId,
            },
          ],
        },
        { createdAt: { [Op.gt]: initialdate } },
      ],
    },
    order: ["createdAt"],
  });
  let AllMessages = [];
  for (const message of UnfilteredMessages) {
    const messageStatus = await PrivateMessageStatus.findOne({
      where: {
        userId: toUserId,
        messageId: message.dataValues.id,
        isDeleted: false,
      },
    });

    // Add the message and its status to the AllMessages array
    if (messageStatus) {
      AllMessages.push({
        message,
        // messageStatus,
      });
    }
  }

  return AllMessages;
};
//  // send message
// export const createPrivateMessage = asyncHandler(
//   async (req: Request, res: Response, next: NextFunction) => {
//     // 1. get data
//     const { fromUserId, toUserId, content, seenStatus } = req.body;
//     // console.log("==========");
//     // console.log("==========");
//     // console.log("==========");
//     // console.log(req.body);
//     // 2. check if required data is present
//     if (!fromUserId || !toUserId || !content) {
//       return next(
//         new CustomError("Requried Fields: FromUserId, ToUserId, Content", 400)
//       );
//     }
//     // 3. if from and to are valid  & if friend is not blocked

//     const friendOne = await Friend.findOne({
//       where: {
//         userId: fromUserId,
//         friendId: toUserId,
//         status: { [Op.ne]: "Blocked" },
//       },
//     });

//     const friendTwo = await Friend.findOne({
//       where: {
//         userId: toUserId,
//         friendId: fromUserId,
//         status: { [Op.ne]: "Blocked" },
//       },
//     });

//     if (!friendOne || !friendTwo) {
//       return next(
//         new CustomError("Either contact is blocked or not friends.", 404)
//       );
//     }

//     // 5. createMessage
//     const privateMessaage = await PrivateChat.create({
//       fromUserId,
//       toUserId,
//       content,
//       seenStatus,
//     });

//     // create message status for both users
//     const messageStatus1 = await PrivateMessageStatus.create({
//       userId: toUserId,
//       messageId: privateMessaage.id,
//       isDeleted: false,
//     });
//     const messageStatus2 = await PrivateMessageStatus.create({
//       userId: fromUserId,
//       messageId: privateMessaage.id,
//       isDeleted: false,
//     });

//     //6. send response
//     res.status(200).json({
//       status: "Success",
//       data: {
//         privateMessaage,
//       },
//     });
//   }
// );

// ===============================================================================
// ===============================================================================
// ===============================================================================
// ===============================================================================
// send message
export const createPrivateMessage = async (data: any, next: NextFunction) => {
  // 1. get data
  const { fromUserId, toUserId, content, seenStatus } = data;

  if (!fromUserId || !toUserId || !content) {
    return next(
      new CustomError("Requried Fields: FromUserId, ToUserId, Content", 400)
    );
  }
  // 3. if from and to are valid  & if friend is not blocked

  const friendOne = await Friend.findOne({
    where: {
      userId: fromUserId,
      friendId: toUserId,
      status: { [Op.ne]: "Blocked" },
    },
  });

  const friendTwo = await Friend.findOne({
    where: {
      userId: toUserId,
      friendId: fromUserId,
      status: { [Op.ne]: "Blocked" },
    },
  });

  if (!friendOne || !friendTwo) {
    return next(
      new CustomError("Either contact is blocked or not friends.", 404)
    );
  }

  // 5. createMessage
  const privateMessaage = await PrivateChat.create({
    fromUserId,
    toUserId,
    content,
    seenStatus,
  });

  // create message status for both users
  await PrivateMessageStatus.create({
    userId: toUserId,
    messageId: privateMessaage.id,
    isDeleted: false,
  });
  await PrivateMessageStatus.create({
    userId: fromUserId,
    messageId: privateMessaage.id,
    isDeleted: false,
  });
  return privateMessaage;
};

// ============== =================================================================
// ===============================================================================
// ===============================================================================
// ===============================================================================
// delete message
export const deletePrivateMessage = async (data: any, next: NextFunction) => {
  let { messageId, sender, userId } = data;
  // [userId, sender] = [sender, userId];

  // if msg with given id preseent and whoo is sender of message
  const privateMessage = await PrivateChat.findByPk(messageId, {
    attributes: ["fromUserId", "content", "id"],
  });
  if (!privateMessage) {
    return next(new CustomError("No message with given ID found", 404));
  }

  // Check if the current user is the sender of the message
  console.log("===================================");
  console.log("===================================");

  console.log("===================================");

  console.log("===================================");

  console.log("===================================");

  console.log("===================================");

  console.log(sender, userId);
  const isSender = userId === sender;
  console.log(isSender);
  if (isSender) {
    //if own msg, detroy msg

    const msg = await PrivateMessageStatus.findOne({
      where: {
        userId: sender,
        messageId,
      },
    });
    if (msg) {
      await msg.destroy();
    }
    await privateMessage.destroy();
  } else {
    // delete for friend onlyx
    let ans;
    ans = await PrivateMessageStatus.update(
      { isDeleted: true },
      { where: { userId, messageId } }
    );
  }
};

//get all messages
export const loadFriendMessages = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // get data from query
    const { fromUserId, toUserId } = req.query;
    // if data is present
    if (!fromUserId || !toUserId) {
      return next(new CustomError("UserId and FriendId are absent", 400));
    }
    const fromUserIdStr = fromUserId as string;
    const toUserIdStr = toUserId as string;

    const AllMessages = await allMessages(fromUserIdStr, toUserIdStr, next);

    res.status(200).json({
      status: "Success",
      length: AllMessages?.length,
      data: {
        AllMessages,
      },
    });
  }
);

//clear all chat for specific user
export const clearPrivateChat = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // get data from query
    const { userId, friendId } = req.body;
    // console.log(
    //   "=================================================================================================userid",
    //   userId,
    //   "friendId",
    //   friendId
    // );
    // if data is present
    if (!userId || !friendId) {
      return next(new CustomError("UserId and FriendId are absent", 400));
    }
    const [updatedRows] = await Friend.update(
      { clearedAt: new Date() },
      {
        where: { userId, friendId },
      }
    );

    // If no rows were updated, return an error
    if (updatedRows === 0) {
      return next(new CustomError("No messages found between the users", 404));
    }
    res.status(200).json({
      status: "Success",
      data: `${updatedRows} rows affected`,
    });
  }
);

export const loadUnreadPrivateMessages = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // get userId
    const { email } = req.params;
    // if userid not null
    if (!email) {
      return next(new CustomError("EmailID is required...", 400));
    }

    const UnreadMessages = await PrivateChat.findAll({
      where: {
        toUserId: email,
        seenStatus: "Not Seen",
      },
      include: [
        {
          model: User,
          as: "fromUser",
        },
      ],
      attributes: [
        "fromUserId",
        [sequelize.fn("COUNT", sequelize.col("PrivateChat.id")), "unreadCount"],
      ],
      group: ["PrivateChat.fromUserId", "fromUser.email"],
    });

    // return response
    res.status(200).json({
      status: "Success",
      length: UnreadMessages.length,
      data: {
        UnreadMessages,
      },
    });
  }
);

export const setUnreadMessageToSeen = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // friendID
    const { friendID } = req.params;
    // if id  present
    if (!friendID) {
      return next(new CustomError("FriendID is required...", 400));
    }

    // set status to seen
    const [updatedRows] = await PrivateChat.update(
      { seenStatus: "Seen" },
      {
        where: {
          fromUserId: friendID,
        },
      }
    );
    if (updatedRows == 0) {
      return next(new CustomError("No Unread Message", 404));
    }
    res.status(200).json({
      status: "Success",
      data: `${updatedRows} rows updated.`,
    });
  }
);
