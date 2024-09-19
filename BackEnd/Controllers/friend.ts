import { NextFunction, Response, Request } from "express";
import { Friend } from "../Models/friend";
import asyncHandler from "../Utils/asyncErrorHandlers";
import CustomError from "../Utils/CustomError";
import { Op } from "sequelize";
import { User } from "../Models/user";
// export const deleteGroup = asyncHandler(
//   async (req: Request, res: Response, next: NextFunction) => {}
// );

// create friend
export const createFriends = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId, friendId } = req.body;
    // if required data is present
    if (!userId || !friendId) {
      return next(new CustomError("UserId and FriendId are required.", 400));
    }
    // if they are already friends
    const alreadyFriends = await Friend.findOne({
      where: {
        [Op.or]: [
          { userId, friendId },
          { userId: friendId, friendId: userId },
        ],
      },
    });
    if (alreadyFriends) {
      return next(
        new CustomError("UserId and FriendId are already friends.", 409)
      );
    }
    //creatre friends
    const friend = await Friend.create({
      userId,
      friendId,
    });

    if (!friend) {
      return next(new CustomError("Friendship bond not created", 404));
    }
    // Create the friendship from friendId to userId
    await Friend.create({
      userId: friendId,
      friendId: userId,
    });

    //send response
    res.status(200).json({
      status: "Success",
      data: {
        friend,
      },
    });
  }
);

//unfriend
export const unfriend = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // 1. get data
    const { userId, friendId } = req.body;
    // 2. check if required data is present
    if (!userId || !friendId) {
      return next(new CustomError("Requried Fields: UserId,FriendId", 400));
    }
    // 3. if from and to are valid
    const mutualFriends = await Friend.findOne({
      where: {
        [Op.or]: [
          {
            userId,
            friendId,
          },
          {
            userId: friendId,
            friendId: userId,
          },
        ],
      },
    });

    // 4. if users are friends?
    if (!mutualFriends) {
      return next(new CustomError("Both users are not friends.", 404));
    }

    // unfriend status

    await mutualFriends.destroy();
    res.status(200).json({
      status: "Success",
      data: null,
    });
  }
);

//block friend
export const blockFriend = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // get userid And friendid
    const { userId, friendId } = req.body;
    // if both fields are present
    if (!userId || !friendId) {
      return next(new CustomError("Required : UserID , FriendID.", 404));
    }
    // if both are friends
    const mutualFriends = await Friend.findOne({
      where: {
        userId,
        friendId,
      },
    });
    // check if they are friends
    if (!mutualFriends) {
      return next(new CustomError("Both users are not friends", 404));
    }

    // update friendship status
    mutualFriends.update({ status: "Blocked" });
    //send response
    res.status(200).json({
      status: "Success",
      data: {
        mutualFriends,
      },
    });
  }
);

// fetch all friends
export const fetchAllFriends = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // get user email
    const { email } = req.params;
    // err if no email
    if (!email) {
      return next(new CustomError("EmailId is required.", 400));
    }

    //fetch All friends
    const AllFriends = await Friend.findAll({
      where: {
        userId: email,
      },
      include: [{ model: User, as: "friend" }],
    });
    if (!AllFriends) {
      return next(new CustomError("No friends found.", 404));
    }

    // generate response
    res.status(200).json({
      status: "Success",
      length: AllFriends.length,
      data: {
        AllFriends,
      },
    });
  }
);

//fetchBlockedFriends
export const fetchBlockedFriends = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // get user email
    const { email } = req.params;
    // err if no email
    if (!email) {
      return next(new CustomError("EmailId is required.", 400));
    }

    //fetch All friends
    const BlockedFriends = await Friend.findAll({
      where: {
        userId: email,
        status: "Blocked",
      },
      include: [{ model: User, as: "friend" }],
    });
    if (!BlockedFriends) {
      return next(new CustomError("No  blocekd friends found.", 404));
    }

    // generate response
    res.status(200).json({
      status: "Success",
      length: BlockedFriends.length,
      data: {
        BlockedFriends,
      },
    });
  }
);

//delete friend
export const deleteFriend = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId, friendId } = req.query;
    if (!userId || !friendId) {
      return next(new CustomError("GroupID is required", 400));
    }
    const mutualFriends = await Friend.findOne({
      where: {
        userId,
        friendId,
      },
    });
    if (!mutualFriends) {
      return next(new CustomError("No friend with given ID found", 400));
    }
    await mutualFriends.destroy();
    res.status(200).json({
      status: "Success",
      data: {
        mutualFriends,
      },
    });
  }
);
