import { Router } from "express";
import {
  clearPrivateChat,
  createPrivateMessage,
  deletePrivateMessage,
  loadFriendMessages,
  loadUnreadPrivateMessages,
  setUnreadMessageToSeen,
} from "../Controllers/private_chat";
const router = Router();
router
  .route("/")
  .post(createPrivateMessage)
  .get(loadFriendMessages)
  .patch(clearPrivateChat);
router.route("/:id").delete(deletePrivateMessage);
router.route("/:friendID").patch(setUnreadMessageToSeen);
router.route("/:email").get(loadUnreadPrivateMessages);
export default router;
