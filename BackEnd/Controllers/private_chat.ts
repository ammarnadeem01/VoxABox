import { NextFunction, Response, Request } from "express";
import asyncHandler from "../Utils/asyncErrorHandlers";
import CustomError from "../Utils/CustomError";
import { PrivateChat } from "../Models/private_chat";
import { Friend } from "../Models/friend";
import { Op, where } from "sequelize";
import { User } from "../Models/user";
import sequelize from "sequelize";
// export const deleteGroup = asyncHandler(
//   async (req: Request, res: Response, next: NextFunction) => {}
// );

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
    include: [{ model: User, as: "clearedBy" }],
  });

  if (!mutualFriends) {
    return next(new CustomError("UserId and FriendId are not friends", 400));
  }

  const AllMessages = await PrivateChat.findAll({
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
        { createdAt: { [Op.gt]: mutualFriends.clearedAt } },
      ],
    },
  });
  return AllMessages;
};
// send message
export const createPrivateMessage = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // 1. get data
    const { fromUserId, toUserId, content, seenStatus } = req.body;
    // 2. check if required data is present
    if (!fromUserId || !toUserId || !content) {
      return next(
        new CustomError("Requried Fields: FromUserId, ToUserId, Content", 400)
      );
    }
    // 3. if from and to are valid  & if friend is not blocked

    const mutualFriends = await Friend.findOne({
      where: {
        userId: fromUserId,
        friendId: toUserId,
        status: {
          [Op.ne]: "Blocked",
        },
      },
    });

    // 4. if contact is blocked / users are not present
    if (!mutualFriends) {
      return next(
        new CustomError(
          "Either contact is blocked OR some user is not present on VoxABox.",
          404
        )
      );
    }
    // 5. createMessage
    const privateMessaage = await PrivateChat.create({
      fromUserId,
      toUserId,
      content,
      seenStatus,
    });

    //6. send response
    res.status(200).json({
      status: "Success",
      data: {
        privateMessaage,
      },
    });
  }
);

// delete message
export const deletePrivateMessage = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // check id
    const { id } = req.params;
    // if msg with given id preseent
    const privateMessaage = await PrivateChat.findByPk(id);
    if (!privateMessaage) {
      return next(new CustomError("No message with given ID found", 404));
    }
    // detroy msg
    await privateMessaage.destroy();
    res.status(200).json({
      status: "Success",
      data: {
        deletedMessage: privateMessaage,
      },
    });
  }
);

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
    // if data is present
    if (!userId || !friendId) {
      return next(new CustomError("UserId and FriendId are absent", 400));
    }
    const [updatedRows] = await PrivateChat.update(
      { clearedAt: new Date() },
      {
        where: {
          [Op.or]: [
            { fromUserId: friendId, toUserId: userId },
            { toUserId: friendId, fromUserId: userId },
          ],
        },
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
    const { email } = req.body;
    // if userid not null
    if (!email) {
      return next(new CustomError("EmailID is required...", 400));
    }

    const UnreadMessages = await PrivateChat.findAll({
      where: {
        toUserId: email,
        status: "Not Seen",
      },
      include: [
        {
          model: User,
          as: "fromUserId",
          attributes: ["fname", "lname", "avatar", "email", "status"],
        },
      ],
      group: ["PrivateChat.fromUserId"],
      attributes: [
        "fromUserId",
        [sequelize.fn("COUNT", sequelize.col("PrivateChat.id")), "unreadCount"],
      ],
    });

    // return response
    res.status(200).json({
      status: "Success",
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
      { status: "Seen" },
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
