import { Router } from "express";
import { allGroups, createGroup, deleteGroup } from "../Controllers/group";
const router = Router();
router.route("/").get(allGroups).post(createGroup).delete(deleteGroup);
export default router;
