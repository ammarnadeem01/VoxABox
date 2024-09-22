// // socketService.js
// import { request, response } from "express";
// import {
//   clearPrivateChat,
//   createPrivateMessage,
//   deletePrivateMessage,
//   loadFriendMessages,
//   loadUnreadPrivateMessages,
//   setUnreadMessageToSeen,
// } from "../Controllers/private_chat";

// const handleCreatePrivateMessage = async (
//   fromUserId: string,
//   toUserId: string,
//   content: string
// ) => {
//   try {
//     // Call the controller directly with the required parameters
//     const messageData = {
//       fromUserId,
//       toUserId,
//       content,
//       seenStatus: "Not Seen", // Default status
//     };

//     // Call your controller method here
//     createPrivateMessage(request, response, content);

//     return { success: true, content }; // Return data to emit
//   } catch (error: any) {
//     console.error("Error sending message:", error);
//     return { success: false, error: error.message };
//   }
// };

// export default handleCreatePrivateMessage;
