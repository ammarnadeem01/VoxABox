import { useEffect, useState } from "react";
import CustomDropdown from "./DropDown";
import api from "../../axiosConfig";
interface PrivateMessageProps {
  data: {
    content: string;
    createdAt: string;
    fromUserId: string;
    id: number;
    seenStatus: "Not Seen" | "Seen";
    toUserId: string;
    updatedAt: string | null;
  };
}
const PrivateMessage: React.FC<PrivateMessageProps> = ({ data }) => {
  const [content, setContent] = useState<string>("");
  const [sender, setSender] = useState<string>("");
  const deletePM = () => {
    // api.patch(`api/v1/groupchat`, {
    //   messageId,
    //   groupId,
    //   memberId: userId,
    //   senderId: sender,
    // });
  };
  useEffect(() => {
    console.log("siuuu", data);
    setContent(data?.content);
    setSender(data?.fromUserId);
  }, [data, content]);

  return (
    <div
      className={`w-full flex ${
        sender === "test5@example.com" ? "flex-row-reverse" : "flex-row"
      } `}
    >
      <p
        className={`bg-[#0d0d0d] px-3 py-1 max-w-[60%] ${
          sender === "test5@example.com" ? "rounded-bl-xl" : " rounded-br-xl"
        } rounded-t-xl  flex items-center`}
      >
        {content}
      </p>
      <div>
        <CustomDropdown table={[{ option: "Delete", action: deletePM }]} />
      </div>
    </div>
  );
};

export default PrivateMessage;
