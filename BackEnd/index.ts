import dotenv from "dotenv";
import app from "./app";
import { Sequelize } from "sequelize-typescript";
import { User } from "./Models/user";
import { Friend } from "./Models/friend";
import { Group } from "./Models/group";
import { GroupMember } from "./Models/group_member";
import { PrivateChat } from "./Models/private_chat";
import { GroupChat } from "./Models/group_chat";
import { MessageStatus } from "./Models/MessageStatus";
import { createServer } from "http";
import { Server } from "socket.io";

dotenv.config({ path: "./config.env" });
const port = process.env.PORT || 3000;

const httpsServer = createServer(app);

const io = new Server(httpsServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const database: string = process.env.POSTGRES_DB!;
const username: string = process.env.POSTGRES_USER!;
const password: string = process.env.POSTGRES_PASSWORD!;
const sequelize = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  port: 5432,
  database,
  username,
  password,
  models: [
    User,
    Friend,
    Group,
    GroupChat,
    PrivateChat,
    GroupMember,
    MessageStatus,
  ],
});

sequelize
  .sync({ alter: true })
  .then(() => console.log("Database synchronized"))
  .catch((err) => console.error("Error synchronizing database:", err));

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// const users: any = {}; // Store connected users

// io.on("connection", (socket) => {
//   console.log("A user connected: " + socket.id);

//   // Handle user registration
//   socket.on("register", (userId) => {
//     users[userId] = socket.id;
//   });

// Private chat controller methods
// Private chat event
//   socket.on(
//     "createPrivateMessage",
//     async ({ fromUserId, toUserId, content }) => {
//       const result = await handleCreatePrivateMessage(
//         fromUserId,
//         toUserId,
//         content
//       );

//       if (result.success) {
//         const receiverSocketId = users[toUserId];
//         if (receiverSocketId) {
//           io.to(receiverSocketId).emit("private_message", {
//             senderId: fromUserId,
//             message: content,
//           });
//         }
//       } else {
//         // Handle error if needed
//         socket.emit("error", { message: result.error });
//       }
//     }
//   );

//   socket.on("deleteMessage", ({ messageId }) => {
//     // Call your delete message method in the PrivateChatController
//     // Example: PrivateChatController.deleteMessage(messageId);
//   });

//   socket.on("upgradeMessageStatusToSeen", ({ messageId, userId }) => {
//     // Call your method to update the message status
//     // Example: PrivateChatController.upgradeMessageStatusToSeen(messageId, userId);
//   });

//   socket.on("unreadMessages", ({ userId }) => {
//     // Call your method to fetch unread messages
//     // Example: PrivateChatController.unreadMessages(userId);
//   });

//   socket.on("disconnect", () => {
//     console.log("A user disconnected: " + socket.id);
//     // Handle user disconnection
//     for (const userId in users) {
//       if (users[userId] === socket.id) {
//         delete users[userId];
//         break;
//       }
//     }
//   });
// });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
