import { Router } from "express";
import { allGroups, createGroup, deleteGroup } from "../Controllers/group";
import { upload } from "../Middlewares/multer.middleware";
const router = Router();
router
  .route("/")
  .get(allGroups)
  .post(upload.single("avatar"), createGroup)
  .delete(deleteGroup);
export default router;
