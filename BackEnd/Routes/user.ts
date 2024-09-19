import { Router } from "express";
import {
  createUser,
  deleteAccount,
  getUserById,
  getUserByName,
  getUsers,
  updateAccount,
  updatePassword,
} from "../Controllers/user";

const router = Router();

router.route("/").post(createUser).get(getUsers);
router
  .route("/:email")
  .get(getUserById)
  .patch(updateAccount)
  .delete(deleteAccount);
router.route("/byName/:fname").get(getUserByName);
router.route("updatePassword/:email").patch(updatePassword);

export default router;
