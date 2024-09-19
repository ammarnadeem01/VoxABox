import { NextFunction, Response, Request } from "express";
import asyncHandler from "../Utils/asyncErrorHandlers";
import CustomError from "../Utils/CustomError";
import { GroupMember } from "../Models/group_member";
import { Group } from "../Models/group";
// export const deleteGroup = asyncHandler(
//   async (req: Request, res: Response, next: NextFunction) => {}
// );

// helper function (to add a user in group)
export const groupMemberAdd = async (
  memberId: string,
  groupId: number,
  next: NextFunction
) => {
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
    // check if ids are present in query
    if (!userId1 || !userId2) {
      return next(new CustomError("Two IDs are requried.", 400));
    }
    // find groups of first user
    const user1Groups = await GroupMember.findAll({
      where: { memberId: userId1 },
      include: [
        {
          model: Group,
          as: "group",
          attributes: ["id", "name", "description", "avatar"],
        },
      ],
    });
    // in each group check if second user is a member of any group
    const commonGroups = [];
    for (const group of user1Groups) {
      const isUser2Member = await GroupMember.findOne({
        where: { groupId: group.groupId, memberId: userId2 },
      });

      if (isUser2Member) {
        commonGroups.push(group.group);
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
    const newMember = await groupMemberAdd(memberId, groupId, next);
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

//remove member(in case of :  leave group, kicked out by admin )
export const removeMember = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { memberId, groupId } = req.body;
    if (!memberId) {
      return next(new CustomError("MemberId is required", 400));
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

// not required -so left as it is. In future if required, will be corrected and used
//update user role
// export const updateMembershipStatus = asyncHandler(
//   async (req: Request, res: Response, next: NextFunction) => {
//     // get emailid
//     const { email } = req.params;
//     // if email is empty
//     if (!email) {
//       return next(new CustomError("Email Id is required", 400));
//     }
//     // get status body
//     const { role } = req.body;
//     const [update] = await GroupMember.update(
//       { role },
//       {
//         where: {
//           email,
//         },
//       }
//     );
//     if (!update) {
//       return next(new CustomError("No user with given Id Found", 404));
//     }
//     res.status(200).json({
//       status: "Success",
//       data: {},
//     });
//   }
// );
