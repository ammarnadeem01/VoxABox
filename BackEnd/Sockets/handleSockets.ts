import { GroupChat } from "../Models/group_chat";
import { PrivateChat } from "../Models/private_chat";
// import Room from "../models/Room";

export const handleSockets = (io: any, socket: any) => {
  // Join a room
  socket.on("joinRoom", async (roomId: string) => {
    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);

    // Send previous messages to the user
    const messages = await PrivateChat.findOne({ where: { roomId } });
    socket.emit("previousMessages", roomId, messages);
  });

  // Handle new private messages
  socket.on(
    "privateMessage",
    async ({ roomId, message }: { roomId: string; message: string }) => {
      const newMessage = new PrivateChat({ roomId, message });
      await newMessage.save();

      // Broadcast message to the room
      io.to(roomId).emit("message", roomId, message);
    }
  );
  // Handle new group messages
  socket.on(
    "groupMessage",
    async ({ roomId, message }: { roomId: string; message: string }) => {
      const newMessage = new GroupChat({ roomId, message });
      await newMessage.save();

      // Broadcast message to the room
      io.to(roomId).emit("message", roomId, message);
    }
  );
};
