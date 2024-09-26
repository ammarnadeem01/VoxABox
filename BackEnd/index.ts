import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
import app from "./app";
import { Sequelize } from "sequelize-typescript";
import { User } from "./Models/user";
import { Friend } from "./Models/friend";
import { Group } from "./Models/group";
import { GroupMember } from "./Models/group_member";
import { PrivateChat } from "./Models/private_chat";
import { GroupChat } from "./Models/group_chat";
import { MessageStatus } from "./Models/MessageStatus";
import { PrivateMessageStatus } from "./Models/PrivateMessageStatus";
import { createServer } from "http";
import { Server } from "socket.io";
import { NextFunction } from "express";
// import contrlllers for private chat and group chat
import { createPrivateMessage } from "./Controllers/private_chat";

const port = process.env.PORT || 3000;

const httpsServer = createServer(app);

const io = new Server(httpsServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
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
    PrivateMessageStatus,
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

const users: any = {};

io.on("connection", (socket) => {
  console.log("A user connected: " + socket.id);

  // Handle user registration
  socket.on("register", (userId) => {
    users[userId] = socket.id;
  });

  socket.on("joinRoom", (roomId) => {
    console.log(`${socket.id} joining room: ${roomId}`);
    socket.join(roomId);
    socket.to(roomId).emit("userJoined", { userId: socket.id });
  });
  // chat chat event
  socket.on("createPrivateMessage", async (data) => {
    const next = (error: any) => {
      console.error(error.message);
      // Emit the error back to the client if necessary
      socket.emit("privateMessageError", { error: error.message });
    };
    await createPrivateMessage(data, next);
    console.log(data);
    io.to(data.roomId).emit(data.message.content);
  });
  socket.on("createGroupMessage", (data) => {
    console.log(data);
    io.to(data.roomId).emit(data.message.content);
  });

  // Deleting a message
  socket.on("deleteMessage", async ({ roomId, messageId }) => {
    try {
      io.to(roomId).emit("messageDeleted", { messageId });
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  });

  socket.on("upgradeMessageStatusToSeen", ({ messageId, userId }) => {
    try {
      io.emit("messageStatusUpdated", { messageId, userId, status: "seen" });
    } catch (error) {
      console.error("Error updating message status:", error);
    }
  });

  // Fetch unread messages for a user
  socket.on("unreadMessages", ({ userId, unreadMessages }) => {
    socket.emit("unreadMessages", unreadMessages);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected: " + socket.id);
    // Handle user disconnection
    for (const userId in users) {
      if (users[userId] === socket.id) {
        delete users[userId];
        break;
      }
    }
  });
});

httpsServer.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
