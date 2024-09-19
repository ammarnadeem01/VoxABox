import { Router } from "express";
import {
  clearGroupChat,
  createGroupMessage,
  setUnreadMessageToSeen,
  deleteGroupMessage,
  fetchAllGroupMessages,
  fetchUnreadMessages,
} from "../Controllers/group_chat";
const router = Router();
router.route("/fetchUnreadMessages").get(fetchUnreadMessages);
router.route("/fetchAllGroupMessages").get(fetchAllGroupMessages);
router.route("/").delete(deleteGroupMessage);
router.route("/clearGroupChat").patch(clearGroupChat);
router.route("").post(createGroupMessage);
router.route("/unreadMessageToSeen").patch(setUnreadMessageToSeen);
export default router;
