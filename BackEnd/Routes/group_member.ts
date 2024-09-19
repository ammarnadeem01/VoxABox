import { Router } from "express";
import {
  addGroupMember,
  allGroups,
  allMembersOfGroup,
  groupsInCommon,
  leaveGroup,
  removeMember,
} from "../Controllers/group_member";
const router = Router();
router.route("/").post(addGroupMember).patch(removeMember);
router.route("/commonGroups").get(groupsInCommon);
router.route("/allMembers/:id").get(allMembersOfGroup);
router.route("/allGroups/:email").get(allGroups);
router.route("/leaveGroup").get(leaveGroup);

export default router;
