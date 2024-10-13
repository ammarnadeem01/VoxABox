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
  setUnreadMessageToSeen,
} from "./Controllers/private_chat";
import { createGroupMessage } from "./Controllers/group_chat";
import { findUser } from "./Controllers/user";
import { deleteGroupMessage } from "./Controllers/group_chat";
import { createFriends } from "./Controllers/friend";

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
// const rooms: any = {}; // {roomId1:[userId1,userId2],roomId2:[userId3]}
const rooms: { [roomId: string | number]: Set<string> } = {};

io.on("connection", (socket) => {
  console.log("A user connected: " + socket.id);
  /* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
  |=====================================================================================================|
  |                                            REGISTER                                                 |
  |=====================================================================================================|
  ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||*/
  socket.on("register", (userId) => {
    users[userId] = socket.id;
  });

  /* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
  |=====================================================================================================|
  |                                           PRIVATE CHAT                                              |
  |=====================================================================================================|
  ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||*/
  // socket.on("privateMessage", async (data) => {
  //   const next = (error: any) => {
  //     console.error(error.message);
  //     socket.emit("privateMessageError", { error: error.newMessage });
  //   };

  //   console.log(data);
  //   console.log(users);
  //   const createdMessage = await createPrivateMessage(data.newMessage, next);

  //   const msgObj = {
  //     message: {
  //       id: createdMessage?.dataValues.id,
  //       createdAt: new Date(),
  //       fromUserId: data.newMessage.fromUserId,
  //       toUserId: data.newMessage.toUserId,
  //       content: data.newMessage.content,
  //     },
  //   };
  //   if (users[data.newMessage.toUserId]) {
  //     console.log("sering machine");
  //     io.to(users[data.newMessage.toUserId]).emit("privateMessage", msgObj);
  //   }
  //   if (users[data.newMessage.fromUserId]) {
  //     console.log("sering machine");
  //     io.to(users[data.newMessage.fromUserId]).emit("privateMessage", msgObj);
  //   }
  // });

  socket.on("privateMessage", async (data) => {
    const next = (error: any) => {
      console.error(error.message);
      socket.emit("privateMessageError", { error: error.newMessage });
    };

    try {
      console.log(data);

      // Create the message in the database
      const createdMessage = await createPrivateMessage(data.newMessage, next);

      const msgObj = {
        message: {
          id: createdMessage?.dataValues.id,
          createdAt: createdMessage?.dataValues.createdAt,
          fromUserId: data.newMessage.fromUserId,
          toUserId: data.newMessage.toUserId,
          content: data.newMessage.content,
        },
        fromUserId: data.newMessage.fromUserId,
        unreadCount: 1,
      };

      // Create a consistent roomId using the emails
      const roomId = [data.newMessage.fromUserId, data.newMessage.toUserId]
        .sort()
        .join("-");

      // Emit the message to the room, so both participants receive it
      if (createdMessage) {
        io.to(roomId).emit("privateMessage", msgObj);
      }
      console.log(`Message sent to room: ${roomId}`);
    } catch (error) {
      next(error);
    }
  });

  ///////////////////////////////
  // Deleting a message
  //////////////////////////////
  socket.on("deletePrivateMessage", async (data) => {
    const { userId, sender, messageId, friendId } = data;
    const roomId = [friendId, userId].sort().join("-");
    const next = (error: any) => {
      console.error(error.message);
      socket.emit("privateMessageError", { error: error.newMessage });
    };
    await deletePrivateMessage(data, next);
    io.to(roomId).emit("deletePrivateMessage", { messageId });
  });

  /////////////////////////////////
  // UNREAD PRIVATE MESSAGE TO READ
  ////////////////////////////////

  socket.on("upgradePrivateMessageStatusToSeen", async (data) => {
    try {
      const next = (error: any) => {
        console.error(error.message);
        socket.emit("upgradePrivateMessageStatusToSeen", {
          error: error.newMessage,
        });
      };

      const { userId, friendId } = data;
      await setUnreadMessageToSeen(data, next);
      io.emit("messageStatusUpdated", { friendId, userId, status: "Seen" });
    } catch (error) {
      console.error("Error updating message status:", error);
    }
  });
  /* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
  |=====================================================================================================|
  |                                        JOIN AND LEAVE ROOM                                          |
  |=====================================================================================================|
  ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||*/
  socket.on("joinRoom", ({ roomId, userId }) => {
    socket.join(roomId); // Join the room
    console.log("====================================================");
    console.log(`${userId} joined room: ${roomId}`);
    console.log("''''''''''''''''''''''''''''''''''''''''''''''");
    console.log(users);

    // Optionally, track which users are in which room
    if (!rooms[roomId]) {
      // rooms[roomId] = [];
      rooms[roomId] = new Set();
    }
    // rooms[roomId].push(userId);
    rooms[roomId].add(userId);
    console.log(rooms);
  });

  ///////////////////////////////
  // When a user leaves the room
  ///////////////////////////////
  socket.on("leaveRoom", (roomId, userId) => {
    socket.leave(roomId);
    console.log(`${userId} left room: ${roomId}`);

    // Check if the room exists and if the user is in the room
    if (rooms[roomId]) {
      rooms[roomId].delete(userId); // Remove the user from the Set
      console.log(`User ${userId} removed from room ${roomId}`);
    }

    // Optionally, you can delete the room if it becomes empty
    if (rooms[roomId].size === 0) {
      delete rooms[roomId];
      console.log(`Room ${roomId} is now empty and deleted.`);
    }
  });

  /* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
  |=====================================================================================================|
  |                                     JOIN AND LEAVE PRIVATE ROOM                                     |
  |=====================================================================================================|
  ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||*/

  ///////////////////////////////
  //     user joinns private room
  ///////////////////////////////
  socket.on("joinPrivateRoom", (data) => {
    const roomId = [data.userId, data.friendId].sort().join("-");
    socket.join(roomId);
    if (!rooms[roomId]) {
      rooms[roomId] = new Set();
    }
    rooms[roomId].add(data.userId);
    rooms[roomId].add(data.friendId);
    console.log(rooms);
  });

  //////////////////////////////////
  //     user leaevs private room
  //////////////////////////////////
  socket.on("leavePrivateRoom", (data) => {
    const roomId = [data.userId, data.friendId].sort().join("-");
    socket.leave(roomId);

    // Check if the room exists
    if (rooms[roomId]) {
      // Remove the user from the room's participants list
      rooms[roomId].delete(data.userId);

      // If the room is now empty, delete it
      if (rooms[roomId].size === 0) {
        delete rooms[roomId];
        console.log(`Room ${roomId} is now empty and deleted.`);
      } else {
        console.log(`User ${data.userId} left room: ${roomId}`);
      }
    } else {
      console.log(`Room ${roomId} does not exist or is already empty.`);
    }
  });

  /* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
  |=====================================================================================================|
  |                                             GROUP CHAT                                              |
  |=====================================================================================================|
  ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||*/
  socket.on("groupMessage", async (data) => {
    const next = (error: any) => {
      console.log(data);
      console.log(users);
      console.error(error.message);
      socket.emit("groupMessageError", { error: error.newMessage });
    };
    const createdMessage = await createGroupMessage(data, next);

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

  ///////////////////////////////////////
  // DELETE GROUP MESSAGE
  ///////////////////////////////////////

  socket.on("deleteGroupMessage", async (data) => {
    const { groupId, messageId } = data;

    const next = (error: any) => {
      console.error(error.message);
      socket.emit("deleteMessageError", { error: error.newMessage });
    };
    const ans = await deleteGroupMessage(data, next);
    // console.log("ans", ans);
    io.to(groupId).emit("deleteGroupMessage", messageId);
  });

  /////////////////////////////////
  // UNREAD GROUP MESSAGE TO READ
  ////////////////////////////////
  socket.on("upgradeGroupMessageStatusToSeen", ({ messageId, userId }) => {
    try {
      io.emit("messageStatusUpdated", { messageId, userId, status: "seen" });
    } catch (error) {
      console.error("Error updating message status:", error);
    }
  });

  /*|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
  |=====================================================================================================|
  |                                         ADD AND DELETE FRIEND                                       |
  |=====================================================================================================|
  |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||*/
  socket.on("addFriend", async (data) => {
    const next = (error: any) => {
      console.log(data);
      console.log(users);
      console.error(error.message);
      socket.emit("addFriendError", { error: error.newMessage });
    };
    const roomId = [data.userId, data.friendId].sort().join("-");
    const ans = await createFriends(data, next);
    console.log(ans, ans, ans, ans, ans);
    const friend = await User.findByPk(data.friendId);
    socket.to(roomId).emit("friendAdded", friend);
  });
  // socket.on("deleteFriend", () => {});

  /* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
  |=====================================================================================================|
  |                                             DISCONNECT                                              |
  |=====================================================================================================|
  ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||*/
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
