import { useEffect, useState } from "react";
import User from "../../assets/manprvtcaht.png";
import SendIcon from "@mui/icons-material/Send";
import CustomDropdown from "./DropDown";
import PrivateMessage from "./PrivateMessage";
import api from "../../axiosConfig";
import useStore from "../../store";

interface PrivateChatContentProps {
  InfoOn: boolean;
  toggleInfo: () => void;
  data: any;
  contact: any;
}
const PrivateChatContent: React.FC<PrivateChatContentProps> = ({
  InfoOn,
  toggleInfo,
  data,
  contact,
}) => {
  const { userId } = useStore();
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const [friendName, setFriendName] = useState("");
  const [friendId, setFriendId] = useState();
  const messageText = (event: any) => {
    setMessage(event?.target?.value);
  };
  useEffect(() => {
    setMessages(data?.privateChat);
    setFriendId(contact.email);
    console.log("fri", contact.email);
    setFriendName(contact.fname + " " + contact.lname);
  }, [data, contact]);

  const clearChat = () => {
    api
      .patch(`api/v1/privatechat`, {
        userId: friendId,
        friendId: userId,
      })
      .then((dataa) => {
        console.log("res", dataa);
      });
  };
  const blockFriend = () => {
    api
      .patch(`api/v1/friend/blockFriends`, {
        userId: userId,
        friendId: friendId,
      })
      .then((dataa) => {
        console.log("res", dataa);
      });
  };

  const unblockFriend = () => {
    api
      .patch(`api/v1/friend/unblockFriends`, {
        userId: userId,
        friendId: friendId,
      })
      .then((dataa) => {
        console.log("res", dataa);
      });
  };
  return (
    <div
      className={`${
        InfoOn ? "w-2/5" : "w-3/5"
      } h-[95%] bg-[#363638] text-white flex flex-col justify-start items-center`}
    >
      <div className="w-[95%] h-[95%] bg-[#262626] rounded-t-lg flex flex-col justify-start items-start">
        {/* Name */}
        <div className="w-full p-3 bg-black text-white rounded-t-xl">
          <div className="flex justify-betweeen  items-center cursor-pointer">
            <div
              className="w-full  flex gap-3 justify-start items-center"
              onClick={toggleInfo}
            >
              <div>
                <img src={User} alt="" className="w-12 h-12 rounded-full" />
              </div>
              <div className="flex flex-col gap-0.5">
                <p className="font-semibold">{friendName}</p>
                <p className="text-gray-500 text-xs">Click for Contact Info</p>
              </div>
            </div>
            <div>
              <CustomDropdown
                table={[
                  { option: "Clear Chat", action: clearChat },
                  { option: "Block Friend", action: blockFriend },
                  { option: "Unblock Friend", action: unblockFriend },
                ]}
              />
            </div>
          </div>
        </div>
        {/* Messages */}
        <div className="w-full h-full flex flex-col justify-start py-2  text-gray-300 text-sm items-start  px-2 gap-1 overflow-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-[#363638]">
          {messages && messages.length > 0 ? (
            messages?.map((msg: any) => {
              return (
                <>
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
  );
};

export default PrivateChatContent;
