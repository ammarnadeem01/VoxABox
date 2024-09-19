import { Router } from "express";
import {
  addGroupMember,
  allGroups,
  allMembersOfGroup,
  groupsInCommon,
  removeMember,
} from "../Controllers/group_member";
const router = Router();
router.route("/").post(addGroupMember).patch(removeMember);
router.route("/:id").get(allMembersOfGroup);
router.route("/:email").get(allGroups);
router.route("/commonGroups").get(groupsInCommon);

export default router;
