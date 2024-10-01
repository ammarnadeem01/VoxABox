import { useEffect, useState } from "react";
import CustomDropdown from "../DropDown";
import useStore from "../../../store";
import api from "../../../axiosConfig";
import DoneAllIcon from "@mui/icons-material/DoneAll";
interface PrivateMessageProps {
  data: any;
  socket: any;
  setMessages: any;
}
const PrivateMessage: React.FC<PrivateMessageProps> = ({
  data,
  socket,
  setMessages,
}) => {
  const [content, setContent] = useState<string>("");
  const [sender, setSender] = useState<string>("");
  const { userId, selectedPrivateChatId } = useStore();
  const [messageId, setMessageId] = useState<number>();
  const [time, setTime] = useState<string>("");
  useEffect(() => {
    if (!socket) {
      console.log("no scoket ");
      return;
    }
    console.log("socket is not null");
    try {
      socket.on("deletePrivateMessage", ({ messageId }: any) => {
        setMessages((prevMessages: any) =>
          prevMessages.filter((msg: any) => msg.message.id !== messageId)
        );
      });
    } catch (error) {
      console.log(error);
    }
    try {
      // socket.on("messageStatusUpdated", (data: any) => {
      // });
    } catch (error) {}

    return () => {
      socket.off("deletePrivateMessage");
    };
  });
  const deletePM = () => {
    socket.emit("deletePrivateMessage", {
      messageId,
      sender,
      userId,
      friendId: selectedPrivateChatId,
    });
  };
  // useEffect(() => {
  //   console.log("data in pm", data);
  //   setContent(data?.message.content);
  //   setSender(data?.message.fromUserId);
  //   // setTime(data?.message.createdAt);
  //   // setMessageId(data?.message.id);
  // }, [data]);
  useEffect(() => {
    console.log("data in pm", data);
    setContent(data?.message.content);
    setSender(data?.message.fromUserId);
    setTime(data?.message.createdAt);
    setMessageId(data?.message.id);
  }, [data]);

  return (
    <div
      className={`w-full flex  ${
        sender === userId ? "flex-row-reverse" : "flex-row"
      } `}
    >
      <div
        className={`bg-[#0d0d0d] px-3 py-1 max-w-full flex flex-wrap items-center  ${
          sender === userId ? "rounded-bl-xl" : "rounded-br-xl"
        } rounded-t-xl  flex items-center `}
      >
        <p className={` w-full py-1 max-w-[60%]`}>{content}</p>
        <p className="text-[10px] text-right w-full  gap-1 flex justify-end text-gray-700">
          {new Date(time).toLocaleTimeString()},&nbsp;&nbsp;
          {new Date(time).toLocaleDateString()}
          <div className="text-sm flex items-end">
            {sender == userId && (
              <DoneAllIcon
                fontSize="inherit"
                color={data.message.SeenStatus === "Seen" ? "primary" : "info"}
              />
            )}
          </div>
        </p>
      </div>
      <div>
        <CustomDropdown table={[{ option: "Delete", action: deletePM }]} />
      </div>
    </div>
  );
};

export default PrivateMessage;
