import { useEffect, useState } from "react";
import User from "../../../assets/manprvtcaht.png";
import SendIcon from "@mui/icons-material/Send";
import GroupMessage from "./GroupMessage";
import CustomDropdown from "../DropDown";
import api from "../../../axiosConfig";
import useStore from "../../../store";
import { GroupChatContentProps } from "../../../Types";

const GroupChatContent: React.FC<GroupChatContentProps> = ({
  InfoOn,
  toggleInfo,
  socket,
  group,
  setForRendering,
}) => {
  const { setSelectedGrp } = useStore();
  useEffect(() => {
    if (!socket) {
      console.log("no scoket ");
      return;
    }
    console.log("socket is not null");
    try {
      socket.on("groupMessage", (newMessage: any) => {
        console.log("===============");
        console.log(newMessage);
        console.log("===============");

        setMessages((prevMessages: any) => [...prevMessages, newMessage]); // Add new message to state
      });
    } catch (error) {
      console.log(error);
    }

    return () => {
      socket.off("groupMessage"); // Clean up event listener on unmount
    };
  });
  const getAllGroupMessages = (): void => {
    api
      .get(`api/v1/groupchat/fetchAllGroupMessages`, {
        params: {
          memberId: userId,
          groupId: group?.id,
        },
      })
      .then((res) => {
        const data = res.data.data.AllMessages;
        console.log("datadatadata", data);
        setMessages(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [rendering, setRendering] = useState(0);

  const { userId } = useStore();
  const [messages, setMessages] = useState<any[]>();
  const [groupName, setGroupName] = useState<string | null>();
  const [groupId, setGroupId] = useState<number | null>();
  const [messageData, setMessageData] = useState({
    fromUserId: userId!,
    toGroupId: group?.id,
    content: "",
  });

  const messageText = (event: any): void => {
    const { name, value } = event.target;
    if (name == "content") {
      setMessageData({ ...messageData, [name]: value });
    }
  };
  const [errorMessage, setErrorMessage] = useState("");
  const sendMessage = () => {
    console.log(messageData);
    socket.emit("groupMessage", messageData);
    messageData.content = "";
  };

  useEffect(() => {
    setGroupName(group?.name);
    setGroupId(group?.id);
    getAllGroupMessages();
    console.log("rendering again for messages");
  }, [group, rendering]);
  const clearChat = (): void => {
    api
      .patch(`api/v1/groupchat/clearGroupChat`, { memberId: userId, groupId })
      .then((res) => {
        console.log(res);
        setRendering(rendering + 1);
      })
      .catch((err) => {
        console.log(err);
        setRendering(rendering + 1);
      });
  };
  const leaveGroup = (): void => {
    api
      .delete(`api/v1/groupmember/leaveGroup`, {
        data: { memberId: userId, groupId },
      })
      .then((res) => {
        console.log(res);
        setForRendering((pre: number) => pre + 1);
        setSelectedGrp(null);
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message);
        console.log(err);
      });
  };
  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
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
                <img
                  src={group?.avatar || User}
                  alt=""
                  className="w-12 h-12 rounded-full"
                />
              </div>
              <div className="flex flex-col gap-0.5">
                <p className="font-semibold">{groupName}</p>
                <p></p>
                <p className="text-gray-500 text-xs">Click for Contact Info</p>
              </div>
            </div>
            <div>
              <CustomDropdown
                table={[
                  { option: "Clear Chat", action: clearChat },
                  { option: "Leave Group", action: leaveGroup },
                ]}
              />
            </div>
          </div>
        </div>
        {/* Messages */}
        <div className="w-full h-full flex flex-col justify-start py-2  text-gray-300 text-sm items-start  px-2 gap-1 overflow-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-[#363638]">
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          {messages && messages.length > 0 ? (
            messages?.map((msg: any) => {
              return (
                <>
                  <GroupMessage
                    groupId={groupId}
                    data={msg}
                    socket={socket}
                    setMessages={setMessages}
                  />
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
            name="content"
            value={messageData.content}
            onKeyDown={(e) => handleKeyDown(e)}
          />
          <div
            className="p-2 flex-shrink-0 cursor-pointer"
            onClick={() => {
              sendMessage();
            }}
          >
            <SendIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupChatContent;
