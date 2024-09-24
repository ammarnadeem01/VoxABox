import { Router } from "express";
import {
  blockFriend,
  createFriends,
  fetchAllFriends,
  fetchBlockedFriends,
  unfriend,
  // deleteFriend,
  unblockFriend,
  fetchFriendShipStatus,
} from "../Controllers/friend";
const router = Router();
router.route("/").post(createFriends);
// .delete(deleteFriend);
router.route("/fetchAllFriends/:email").get(fetchAllFriends);
router.route("/fetchBlockedFriends/:email").get(fetchBlockedFriends);
router.route("/blockFriends").patch(blockFriend);
router.route("/unblockFriends").patch(unblockFriend);
router.route("/unfriend").delete(unfriend);
router.route("/friendshipStatus").get(fetchFriendShipStatus);

export default router;
