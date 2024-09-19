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
router.route("/unreadMessageToSeen").patch(setUnreadMessageToSeen);
router.route("/").post(createGroupMessage).patch(deleteGroupMessage);
router.route("/clearGroupChat").patch(clearGroupChat);
export default router;
