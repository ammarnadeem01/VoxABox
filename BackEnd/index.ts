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
// import controllers for private chat and group chat
import {
  createPrivateMessage,
  deletePrivateMessage,
} from "./Controllers/private_chat";
import { createGroupMessage } from "./Controllers/group_chat";
import { findUser } from "./Controllers/user";

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

const users: any = {}; // {userId:socketId,userId2:socketId2}
const rooms: any = {}; // {roomId1:[userId1,userId2],roomId2:[userId3]}

io.on("connection", (socket) => {
  console.log("A user connected: " + socket.id);

  // Handle user registration
  socket.on("register", (userId) => {
    users[userId] = socket.id;
  });

  ///////////////////////////////
  // Private chat event
  ///////////////////////////////
  socket.on("privateMessage", async (data) => {
    const next = (error: any) => {
      console.error(error.message);
      socket.emit("privateMessageError", { error: error.newMessage });
    };

    console.log(data);
    console.log(users);
    const createdMessage = await createPrivateMessage(data.newMessage, next);

    const msgObj = {
      message: {
        id: createdMessage?.dataValues.id,
        createdAt: new Date(),
        fromUserId: data.newMessage.fromUserId,
        toUserId: data.newMessage.toUserId,
        content: data.newMessage.content,
      },
    };
    if (users[data.newMessage.toUserId]) {
      console.log("sering machine");
      io.to(users[data.newMessage.toUserId]).emit("privateMessage", msgObj);
    }
    if (users[data.newMessage.fromUserId]) {
      console.log("sering machine");
      io.to(users[data.newMessage.fromUserId]).emit("privateMessage", msgObj);
    }
  });
  ///////////////////////////////
  // Deleting a message
  //////////////////////////////
  socket.on("deletePrivateMessage", async (data) => {
    const { userId, sender, messageId } = data;
    const next = (error: any) => {
      console.error(error.message);
      socket.emit("privateMessageError", { error: error.newMessage });
    };
    await deletePrivateMessage(data, next);
    io.to(users[sender]).emit("deletePrivateMessage", { messageId });
    io.to(users[userId]).emit("deletePrivateMessage", { messageId });
  });

  /////////////////////////////////
  // Join Room
  ////////////////////////////////
  socket.on("joinRoom", ({ roomId, userId }) => {
    socket.join(roomId); // Join the room
    console.log(`${userId} joined room: ${roomId}`);

    console.log(users);

    // Optionally, track which users are in which room
    if (!rooms[roomId]) {
      rooms[roomId] = [];
    }
    rooms[roomId].push(userId);
    console.log(rooms);
  });
  ////////////////////////////
  // Group Message
  ////////////////////////////
  socket.on("groupMessage", async (data) => {
    const next = (error: any) => {
      console.log(data);
      console.log(users);
      console.error(error.message);
      socket.emit("groupMessageError", { error: error.newMessage });
    };
    const createdMessage = await createGroupMessage(data, next);
    console.log(
      "========================================================================="
    );
    console.log(
      "========================================================================="
    );
    console.log(
      "========================================================================="
    );
    console.log(data);
    console.log(
      "========================================================================="
    );
    console.log(
      "========================================================================="
    );
    console.log(
      "========================================================================="
    );
    console.log(
      "========================================================================="
    );
    console.log(createdMessage);
    const senderOfMessage = await findUser(data.fromUserId);

    const msgObj = {
      message: {
        ...createdMessage?.dataValues,
        user: senderOfMessage,
      },
      messageStatus: {
        createdAt: new Date(),
      },
    };

    io.to(data.toGroupId).emit("groupMessage", msgObj);
  });

  // Leaving a room
  socket.on("leaveRoom", (roomId, userId) => {
    socket.leave(roomId);
    console.log(`${userId} left room: ${roomId}`);

    // Optionally, remove user from tracking
    rooms[roomId] = rooms[roomId].filter((id: any) => id !== userId);
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
