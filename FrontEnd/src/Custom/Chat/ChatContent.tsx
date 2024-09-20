import { useEffect, useState } from "react";
import User from "../../assets/manprvtcaht.png";
import PrivateMessage from "./PrivateMessage";
import SendIcon from "@mui/icons-material/Send";
import { io, Socket } from "socket.io-client";
import ChatBackGroundImage from "../../assets/UnknownCHatPic.png";
const socket: Socket = io(import.meta.env.VITE_API_BASE_URL_DEV);

interface ChatContentProps {
  InfoOn: boolean;
  toggleInfo: () => void;
  data: any;
  contact: any;
}
const ChatContent: React.FC<ChatContentProps> = ({
  InfoOn,
  toggleInfo,
  data,
  contact,
}) => {
  // const isLoading = true;
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const messageText = (event: any) => {
    setMessage(event?.target?.value);
  };
  // const sendMessage = () => {
  //   if (message.trim()) {
  //     socket.emit("message", message);
  //     setMessage("");
  //   }
  // };
  // useEffect(() => {
  //   socket.on("message", (msg: string) => {
  //     setMessages((prevMessages: string[]) => [...prevMessages, msg]);
  //   });

  //   return () => {
  //     socket.off("message");
  //   };
  // }, []);
  useEffect(() => {
    console.log("yes1", data);
    setMessages(data?.privateChat);
  });

  return (
    <>
      {/* {isLoading && (
        <div className={`${InfoOn ? "w-2/5" : "w-3/5"}`}>
          <img
            src={ChatBackGroundImage}
            alt="No Chat Preview"
            className="min-h-screen max-h-screen w-full"
          />
        </div>
      )} */}
      {/* {!isLoading && ( */}
      <div
        className={`${
          InfoOn ? "w-2/5" : "w-3/5"
        } h-[95%] bg-[#363638] text-white flex flex-col justify-start items-center`}
      >
        <div className="w-[95%] h-[95%] bg-[#262626] rounded-t-lg flex flex-col justify-start items-start">
          {/* Name */}
          <div className="w-full p-3 bg-black text-white rounded-t-xl">
            <div
              className="flex justify-start items-center gap-3 cursor-pointer"
              onClick={toggleInfo}
            >
              <div>
                <img src={User} alt="" className="w-12 h-12 rounded-full" />
              </div>
              <div className="flex flex-col gap-0.5">
                <p className="font-semibold">{}</p>
                <p className="text-gray-500 text-xs">Click for Contact Info</p>
              </div>
            </div>
          </div>
          {/* Messages */}
          <div className="w-full h-full flex flex-col justify-start py-2  text-gray-300 text-sm items-start  px-2 gap-1 overflow-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-[#363638]">
            {messages && messages.length > 0 ? (
              messages?.map((msg: any) => {
                return (
                  <>
                    {console.log("msg", msg)}
                    <PrivateMessage data={msg} />
                  </>
                );
              })
            ) : (
              <p className="text-center">No Messages Found</p>
            )}
          </div>
        </div>
        <div className="w-full flex justify-center items-center py-2">
          <div className="w-[95%] bg-[#101717] flex justify-between items-center rounded-md">
            <input
              onChange={(event: any) => {
                messageText(event);
              }}
              type="text"
              className="flex-grow border-none outline-none text-white bg-[#101717] py-2 pl-2"
              placeholder="Type Something..."
              name="message"
              value={message}
            />
            <div
              className="p-2 flex-shrink-0 cursor-pointer"
              // onClick={() => {
              //   () => sendMessage();
              // }}
            >
              <SendIcon />
            </div>
          </div>
        </div>
      </div>
      {/* )} */}
    </>
  );
};

export default ChatContent;
