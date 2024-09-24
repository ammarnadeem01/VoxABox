import { Request, Response, NextFunction } from "express";
import { Group } from "../Models/group";
import asyncHandler from "../Utils/asyncErrorHandlers";
import CustomError from "../Utils/CustomError";
import { groupMemberAdd } from "./group_member";
import { where } from "sequelize";
import { User } from "../Models/user";
import { uploadToCloudinary } from "../Middlewares/multer.middleware";

// make group
export const createGroup = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("+++++++++++++++++++++++++++++++++++++++++++++");
    console.log("+++++++++++++++++++++++++++++++++++++++++++++");
    const { name, description, adminId } = req.body;
    console.log(req.body);
    console.log("+++++++++++++++++++++++++++++++++++++++++++++");
    console.log("+++++++++++++++++++++++++++++++++++++++++++++");
    if (!name || !description || !adminId) {
      return next(
        new CustomError("Required Fields:name,description,admin", 400)
      );
    }
    // if user exist
    const user = await User.findByPk(adminId);
    if (!user) {
      return next(new CustomError("User doesn't exist", 404));
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
    //create group
    const group = await Group.create({
      name,
      description,
      avatar: avatarUrl,
      adminId,
    });

    // add admin as a group member
    const newMember = groupMemberAdd(adminId, group.id, "Admin", next);

    res.status(201).json({
      status: "Success",
      admin: adminId,
      data: {
        group,
      },
    });
  }
);

// view all groups
export const allGroups = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const groups = await Group.findAll();
    res.status(201).json({
      status: "Success",
      length: groups.length,
      data: {
        groups,
      },
    });
  }
);

// delete a group
export const deleteGroup = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let { memberId, groupId } = req.body;

    // checks if id is ppresent
    if (!memberId || !groupId) {
      return next(new CustomError("MemberId and Group Id are required", 400));
    }
    // Find Group By ID
    let groupIdNum = Number(groupId);
    if (isNaN(groupIdNum)) {
      return next(new CustomError("Invalid Group Id", 400));
    }
    const group = await Group.findOne({
      where: {
        adminId: memberId,
      },
    });

    if (!group) {
      return next(
        new CustomError("You are not allowed to delete this group", 401)
      );
    }
    // delete the group
    const deletedGroup = await group.destroy();
    console.log("deleteGroup", deleteGroup);
    res.status(200).json({
      status: "Success",
      data: {
        deletedGroup,
      },
    });
  }
);
