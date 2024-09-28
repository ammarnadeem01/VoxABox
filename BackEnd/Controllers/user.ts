import { NextFunction, Request, Response } from "express";
import { User } from "../Models/user";
import asyncHandler from "../Utils/asyncErrorHandlers";
import CustomError from "../Utils/CustomError";
import { Op } from "sequelize";
// Get all users
export const getUsers = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await User.findAll();
    res.status(200).json({
      status: "Success",
      length: users.length,
      data: {
        users,
      },
    });
  }
);

// search by name
export const getUserByName = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { fname } = req.params;
    // const fname = Fname as string;
    const user = await User.findAll({
      where: {
        [Op.or]: [
          { fname: { [Op.iLike]: `%${fname}%` } },
          { lname: { [Op.iLike]: `%${fname}%` } },
        ],
      },
    });
    if (!user) {
      return next(new CustomError("No user found", 404));
    }
    res.status(200).json({
      status: "Success",
      data: {
        user,
      },
    });
  }
);

// Update a user by ID
export const updateAccount = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // get id from params
    const { email } = req.params;
    // if data is avaiable
    if (!email) {
      return next(new CustomError("Email ID is required", 400));
    }
    // get body
    const { fname, lname, avatar, status } = req.body;
    if (!fname || !lname || !avatar) {
      return next(new CustomError("Missing Required Fields", 400));
    }
    const [updated] = await User.update(
      { fname, lname, avatar, status },
      {
        where: { email },
      }
    );
    if (!updated) {
      return next(new CustomError("User with given ID not found", 404));
    }

    const updatedUser = await User.findByPk(email);
    res.status(200).json({
      status: "Success",
      data: {
        updatedUser,
      },
    });
  }
);

// Delete a user by ID
export const deleteAccount = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // get data
    const { email } = req.params;
    // check if data is available
    if (!email) {
      return next(new CustomError("Email Id is required", 400));
    }
    const deletedUser = await User.destroy({ where: { email } });
    if (!deletedUser) {
      return next(new CustomError("User with given ID not found", 404));
    }
    res.status(200).json({
      status: "Success",
      data: {
        deletedUser,
      },
    });
  }
);

// update password

export const updatePassword = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // get id from params
    const { email } = req.params;
    // if data is avaiable
    if (!email) {
      return next(new CustomError("Email ID is required", 400));
    }
    // get body
    const { currentPassword, newPassword, confirmPassword } = req.body;
    // whether body has req fields
    if (!currentPassword || !newPassword || !confirmPassword) {
      return next(new CustomError("Missing Required Fields", 400));
    }
    // password and confirmPasswd
    if (newPassword !== confirmPassword) {
      return next(
        new CustomError("password and confirm passwrod don't match", 400)
      );
    }
    // current password is correct or not?
    const [updated] = await User.update(
      { newPassword, confirmPassword },
      {
        where: { email },
      }
    );
    if (!updated) {
      return next(new CustomError("User with given ID not found", 404));
    }

    const updatedUser = await User.findByPk(email);
    res.status(200).json({
      status: "Success",
      data: {
        updatedUser,
      },
    });
  }
);

export const setStatus = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // console.log(
    //   "===================================================================================="
    // );
    // console.log(1);
    const { userId, status } = req.body;
    // console.log(
    //   "----------------------------------------------------------------------------------------"
    // );
    // console.log(userId, status);
    if (!userId || !status) {
      return next(new CustomError("Missing Required Fields", 400));
    }
    const [updated] = await User.update(
      { status },
      {
        where: { email: userId },
      }
    );
    if (!updated) {
      return next(new CustomError("User with given ID not found", 404));
    }

    const updatedUser = await User.findByPk(userId);
    res.status(200).json({
      status: "Success",
      data: {
        updatedUser,
      },
    });
  }
);

export const checkStatus = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.query;
    // console.log(
    //   "======================================================================================================"
    // );
    // console.log(userId);
    // console.log(
    //   "======================================================================================================"
    // );

    const userIdStr = userId as string;
    if (!userId) {
      return next(new CustomError("Missing Required Fields", 400));
    }
    const status = await User.findByPk(userIdStr, {
      attributes: ["status"],
    });
    if (!status) {
      return next(new CustomError("User with given ID not found", 404));
    }

    res.status(200).json({
      status: "Success",
      data: {
        status,
      },
    });
  }
);

export const findUser = async (id: string) => {
  const user = await User.findByPk(id);
  return user;
};
