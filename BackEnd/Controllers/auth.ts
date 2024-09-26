import { User } from "../Models/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import CustomError from "../Utils/CustomError";
import { uploadToCloudinary } from "../Middlewares/multer.middleware";
import { NextFunction, Request, Response } from "express";
import asyncHandler from "../Utils/asyncErrorHandlers";

const signToken = (email: string) => {
  console.log(process.env.JWT_EXPIRES_IN, typeof process.env.JWT_EXPIRES_IN);
  return jwt.sign(email, process.env.JWT_ACCESS_SECRET as string, {
    expiresIn: "15s",
  });
};

const signRefreshToken = (email: string) => {
  return jwt.sign(email, process.env.JWT_REFRESH_SECRET as string, {
    expiresIn: "15s",
  });
};

// SIGNUP/REGISTER
export const createUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // get data
    const { email, fname, lname, password, status } = req.body;
    //check if req data is available
    if (!fname || !lname || !email || !password) {
      return next(new CustomError("Missing Required Fields...", 400));
    }

    if (!req.file) {
      return next(new CustomError("Avatar image is required.", 400));
    }
    let avatarUrl;
    try {
      const result: any = await uploadToCloudinary(req?.file.buffer);
      console.log("result", result);
      avatarUrl = result.secure_url;
    } catch (error) {
      return next(new CustomError("Failed to upload to Cloudinary", 500));
    }

    const user = await User.create({
      fname,
      lname,
      avatar: avatarUrl,
      password,
      status,
      email,
    });

    if (!user) {
      return next(new CustomError("User Creation Failed", 500));
    }
    const accessToken = signToken(user.email);
    const refreshToken = signRefreshToken(user.email);
    res.status(201).json({
      status: "Success",
      data: {
        user,
        accessToken,
        refreshToken,
      },
    });
  }
);

// LOGIN
export const getUserById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // get email
    const { email, password } = req.body;
    // if email is avaiable
    if (!email || !password) {
      return next(new CustomError("Email and password are required", 400));
    }

    const user = await User.findOne({ where: { email } });

    // if (!user || !(await bcrypt.compare(password, user.dataValues.password))) {
    //   return next(new CustomError("Incorrect Credentials", 401));
    // }
    if (!user || user?.dataValues.password != password) {
      return next(new CustomError("Incorrect Credentials", 401));
    }
    // const accessToken = signToken(user.email);
    // const refreshToken = signRefreshToken(user.email);

    res.status(200).json({
      status: "Success",
      data: {
        user,
        // accessToken,
        // refreshToken,
      },
    });
  }
);

// Token Verification - Protect Route Middleware

export const verifyToken = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      return next(new CustomError("No token provided", 401));
    }

    const token = Array.isArray(authHeader) ? authHeader[0] : authHeader;

    const bearerToken = token.split(" ")[1];

    if (!bearerToken) {
      return next(new CustomError("Invalid token", 401));
    }
  }
);
