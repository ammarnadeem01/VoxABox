import { useEffect, useState } from "react";
import CustomDropdown from "../DropDown";
import useStore from "../../../store";
import { GroupMessageInterface } from "../../../Types";

const GroupMessage: React.FC<GroupMessageInterface> = ({
  data,
  socket,
  setMessages,
  groupId,
}) => {
  const { userId } = useStore();
  useEffect(() => {
    console.log("first");
    if (!socket) {
      console.log("no scoket ");
      return;
    }
    console.log("socket is not null");
    socket.on("deleteGroupMessage", (messageId: any) => {
      setMessages((prevMessages: any) =>
        prevMessages.filter((msg: any) => msg.message.id !== messageId)
      );
    });
    return () => {
      socket.off("deleteGroupMessage");
    };
  });
  function deleteGM(): void {
    socket.emit("deleteGroupMessage", {
      messageId,
      memberId: userId,
      sender,
      groupId,
    });
    console.log("msg deleted", { sender, userId, groupId, messageId });
  }

  const [content, setContent] = useState<string>("");
  const [sender, setSender] = useState<string>("");
  const [senderName, setSenderName] = useState<string>("");
  const [messageId, setMessageId] = useState<number>();
  // const [groupId, setGroupId] = useState<number>();
  const [time, setTime] = useState<string>("");
  useEffect(() => {
    console.log("data", data.message);
    setContent(data?.message.content);
    setSender(data.message.fromUserId);
    setSenderName(data?.message.user.fname + " " + data?.message.user.lname);
    setTime(data.messageStatus.createdAt);
    setMessageId(data.message.id);
    // setGroupId(5);
  }, [data]);
  return (
    <div
      className={`w-full flex  ${
        sender === userId ? "flex-row-reverse" : "flex-row"
      } `}
    >
      <div
        className={`bg-[#0d0d0d]   px-3 py-1 max-w-[60%]  rounded-t-xl  flex flex-col flex-wrap justify-center items-start gap-1 ${
          sender === userId ? "rounded-bl-xl" : " rounded-br-xl"
        } `}
      >
        {sender === userId ? (
          ""
        ) : (
          <div
            className={`max-w-full flex gap-2 text-xs justify-between items-center `}
          >
            <p className="text-gray-200">~ {senderName}</p>
            <p className="text-gray-500">{sender}</p>
          </div>
        )}
        {userId != sender && <hr className="w-full bg-gray-950" />}
        <p className={`max-w-full text-white py-1`}>{content}</p>
        <p className="text-[10px] text-right w-full text-gray-700">
          {new Date(time).toLocaleTimeString()},&nbsp;&nbsp;
          {new Date(time).toLocaleDateString()}
        </p>
      </div>
      <div>
        <CustomDropdown table={[{ option: "Delete", action: deleteGM }]} />
      </div>
    </div>
  );
};

export default GroupMessage;
