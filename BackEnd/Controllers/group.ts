import { Request, Response, NextFunction } from "express";
import { Group } from "../Models/group";
import asyncHandler from "../Utils/asyncErrorHandlers";
import CustomError from "../Utils/CustomError";
import { groupMemberAdd } from "./group_member";

// make group
export const createGroup = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, description, avatar, adminId } = req.body;
    if (!name || !description || !adminId) {
      return next(
        new CustomError("Required Fields:name,description,admin", 400)
      );
    }
    //create group
    const group = await Group.create({ name, description, avatar, adminId });

    // add admin as a group member
    const newMember = groupMemberAdd(adminId, group.id, next);

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
    let { memberId, groupId } = req.query;
    // checks if id is ppresent
    if (!memberId || !groupId) {
      return next(new CustomError("MemberId and Group Id are required", 400));
    }
    // Find Group By ID
    let groupIdNum = Number(groupId);
    const group = await Group.findByPk(groupIdNum);
    if (!group) {
      return next(new CustomError("No group with the given ID found..", 404));
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
