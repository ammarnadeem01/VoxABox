import { NextFunction, Response, Request } from "express";
import asyncHandler from "../Utils/asyncErrorHandlers";
import CustomError from "../Utils/CustomError";
import { GroupMember } from "../Models/group_member";
import { Group } from "../Models/group";
import { User } from "../Models/user";

// helper function (to add a user in group)
export const groupMemberAdd = async (
  memberId: string,
  groupId: number,
  role: string,
  next: NextFunction
) => {
  // if user exists
  const user = await User.findByPk(memberId);
  if (!user) {
    return next(new CustomError("User doesnt exist", 404));
  }
  const group = await Group.findByPk(groupId);
  if (!group) {
    return next(new CustomError("Group doesnt exist", 404));
  }
  const alreadyMember = await GroupMember.findOne({
    where: {
      memberId,
      groupId,
    },
  });
  if (alreadyMember) {
    return next(new CustomError("User is already a member of this group", 400));
  }
  const newMember = await GroupMember.create({
    memberId,
    groupId,
    role,
  });
  return newMember;
};

// all grps of which user is a member
export const allGroups = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // get emailid
    const { email } = req.params;
    // if email is empty
    if (!email) {
      return next(new CustomError("Email Id is required", 400));
    }
    // fetch grps
    const allGroups = await GroupMember.findAll({
      where: {
        memberId: email,
      },
      include: [
        {
          model: Group,
          as: "group",
          attributes: ["id", "name", "description", "avatar"],
        },
      ],
    });
    // send response
    res.status(200).json({
      status: "Success",
      length: allGroups.length,
      data: {
        allGroups,
      },
    });
  }
);

// common groups between two users
export const groupsInCommon = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // take two ids from query

    const { userId1, userId2 } = req.query;
    console.log(userId1, userId2);
    // check if ids are present in query
    if (!userId1 || !userId2) {
      return next(new CustomError("Two IDs are requried.", 400));
    }
    const userId1N = userId1 as string;
    const userId2N = userId2 as string;
    const user1 = await User.findByPk(userId1N);
    const user2 = await User.findByPk(userId2N);
    if (!user1 || !user2) {
      return next(
        new CustomError("Either one or both users don't exist.", 404)
      );
    }
    // find groups of first user

    const user1Groups = await GroupMember.findAll({
      where: { memberId: userId1N },
      attributes: ["groupId"],
      // include: [
      //   {
      //     model: Group,
      //     as: "group",
      //     attributes: ["id", "name", "description", "avatar"],
      //   },
      // ],
    });

    // in each group check if second user is a member of any group
    const commonGroups: Group[] = [];
    for (const groupM of user1Groups) {
      const isUser2Member = await GroupMember.findOne({
        where: { groupId: groupM.groupId, memberId: userId2N },
      });

      if (isUser2Member) {
        const group = await Group.findByPk(groupM.groupId);
        if (group) {
          commonGroups.push(group);
        }
      }
    }
    // return common groups
    res.status(200).json({
      status: "Success",
      length: commonGroups.length,
      data: {
        commonGroups,
      },
    });
  }
);

// add a new member in group (  by admin  )
export const addGroupMember = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { memberId, groupId } = req.body;

    if (!memberId || !groupId) {
      return next(new CustomError("IDs are required.", 400));
    }
    // add new member
    const newMember = await groupMemberAdd(memberId, groupId, "Regular", next);
    if (!newMember) {
      return next(new CustomError("Either group or user is not valid.", 404));
    }
    res.status(200).json({ status: "Success", data: { newMember } });
  }
);

// all members of a group
export const allMembersOfGroup = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    if (!id) {
      return next(new CustomError("ID is required..", 400));
    }
    const group_members = await GroupMember.findAll({
      where: {
        groupId: parseInt(id),
      },
    });

    if (group_members.length == 0) {
      return next(new CustomError("No group Members..", 404));
    }
    res.status(200).json({
      status: "Success",
      data: {
        group_members,
      },
    });
  }
);

// remove member(in case of  kicked out by admin )
export const removeMember = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { memberId, groupId, adminId } = req.body;
    if (!memberId || !groupId || !adminId) {
      return next(
        new CustomError("MemberId and GroupId  and AdminId are required", 400)
      );
    }

    const userIdStr = memberId as string;
    const groupIdN = Number(groupId);
    const adminIdN = Number(adminId);
    const user = await User.findByPk(userIdStr);
    const group = await Group.findOne({
      where: { groupId: groupIdN, adminId: adminIdN },
    });
    if (!user) {
      return next(
        new CustomError(`User with email ${userIdStr} doesn't exist`, 404)
      );
    }
    if (!group) {
      return next(
        new CustomError(
          `group with groupId ${groupIdN} doesn't exist or You are not allowes to perform this action`,
          404
        )
      );
    }

    // if member is a part of group
    const isMember = await GroupMember.findOne({
      where: {
        memberId,
        groupId,
      },
    });
    if (!isMember) {
      return next(new CustomError("User is not a part of this group", 404));
    }
    await isMember.destroy();
    res.status(200).json({
      status: "Success",
      data: {
        isMember,
      },
    });
  }
);

// leave Group
export const leaveGroup = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { memberId, groupId } = req.body;
    if (!memberId || !groupId) {
      return next(new CustomError("MemberId and GroupId  are required", 400));
    }

    const userIdStr = memberId as string;
    const groupIdN = Number(groupId);
    const user = await User.findByPk(userIdStr);
    const group = await Group.findOne({
      where: { groupId: groupIdN },
    });
    if (!user) {
      return next(
        new CustomError(`User with email ${userIdStr} doesn't exist`, 404)
      );
    }
    if (!group) {
      return next(
        new CustomError(`group with groupId ${groupIdN} doesn't exist .`, 404)
      );
    }

    // if member is a part of group
    const isMember = await GroupMember.findOne({
      where: {
        memberId,
        groupId,
      },
    });
    if (!isMember) {
      return next(new CustomError("User is not a part of this group", 404));
    }
    await isMember.destroy();
    res.status(200).json({
      status: "Success",
      data: {
        isMember,
      },
    });
  }
);
