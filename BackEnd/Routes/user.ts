import { Router } from "express";
import {
  checkStatus,
  createUser,
  deleteAccount,
  getUserById,
  getUserByName,
  getUsers,
  setStatus,
  updateAccount,
  updatePassword,
} from "../Controllers/user";

const router = Router();

router.route("/").post(createUser).get(getUsers);
router.route("/login").post(getUserById);
router.route("/:email").patch(updateAccount).delete(deleteAccount);
router.route("/byName/:fname").get(getUserByName);
router.route("/updatePassword/:email").patch(updatePassword);
router.route("/status/setStatus").patch(setStatus);
router.route("/status/checkStatus").get(checkStatus);

export default router;
