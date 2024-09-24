import { useEffect, useState } from "react";
import CustomDropdown from "../DropDown";
import useStore from "../../../store";
import api from "../../../axiosConfig";
interface PrivateMessageProps {
  data: any;
}
const PrivateMessage: React.FC<PrivateMessageProps> = ({ data }) => {
  const [content, setContent] = useState<string>("");
  const [sender, setSender] = useState<string>("");
  const { userId } = useStore();
  const [messageId, setMessageId] = useState<number>();
  const [time, setTime] = useState<string>("");
  const deletePM = () => {
    api
      .patch(`api/v1/privatechat/deleteMessage`, { messageId, sender, userId })
      .then((res) => {
        console.log("ers", res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
        <p className="text-[10px] text-right w-full text-gray-700">
          {new Date(time).toLocaleTimeString()},&nbsp;&nbsp;
          {new Date(time).toLocaleDateString()}
        </p>
      </div>
      <div>
        <CustomDropdown table={[{ option: "Delete", action: deletePM }]} />
      </div>
    </div>
  );
};

export default PrivateMessage;
