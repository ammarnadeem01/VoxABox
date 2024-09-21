import { useEffect, useState } from "react";
import CustomDropdown from "./DropDown";
import api from "../../axiosConfig";
import useStore from "../../store";
interface GroupMessageInterface {
  data: {
    message: {
      content: string;
      fromUserId: string;
      id: number;
      toGroupId: number;
    };
    messageStatus: {
      createdAt: string;
      id: number;
      isDeleted: boolean;
      messageId: number;
      seenStatus: "Not Seen" | "Seen";
      updatedAt: string | null;
      userId: string;
    };
  };
}
const GroupMessage: React.FC<GroupMessageInterface> = ({ data }) => {
  const { userId } = useStore();
  function deleteGM() {
    api.patch(`api/v1/groupchat`, {
      messageId,
      groupId,
      memberId: userId,
      senderId: sender,
    });
  }
  const [content, setContent] = useState<string>("");
  const [sender, setSender] = useState<string>("");
  const [messageId, setMessageId] = useState<number>();
  const [groupId, setGroupId] = useState<number>();
  const [time, setTime] = useState<string>("");
  useEffect(() => {
    console.log("data for ", data);
    console.log("siuuu", data.message.content);
    setContent(data?.message.content);
    setSender(data?.message.fromUserId);
    setTime(data.messageStatus.createdAt);
    setMessageId(data.message.id);
    setGroupId(5);
    console.log(sender);
  }, [data, content]);
  return (
    <div
      className={`w-full flex  ${
        sender === "test5@example.com" ? "flex-row-reverse" : "flex-row"
      } `}
    >
      <p
        className={`bg-[#0d0d0d] px-3 py-1 max-w-[60%]  rounded-t-xl  flex flex-wrap items-center gap-1 ${
          sender === "test5@example.com" ? "rounded-bl-xl" : " rounded-br-xl"
        } `}
      >
        {sender === "test5@example.com" ? (
          ""
        ) : (
          <p className="w-full text-xs text-gray-400">~ {sender}</p>
        )}
        <p className="w-full"> {content}</p>
        <p className="text-xs text-right w-full text-gray-700">
          {new Date(time).toLocaleTimeString()},&nbsp;&nbsp;
          {new Date(time).toLocaleDateString()}
        </p>
      </p>
      <div>
        <CustomDropdown table={[{ option: "Delete", action: deleteGM }]} />
      </div>
    </div>
  );
};

export default GroupMessage;
