import { useEffect, useState } from "react";
import U from "../../../assets/manprvtcaht.png";
import SendIcon from "@mui/icons-material/Send";
import CustomDropdown from "../DropDown";
import PrivateMessage from "./PrivateMessage";
import api from "../../../axiosConfig";
import useStore from "../../../store";
import { PrivateChatContentProps } from "../../../Types";

interface MessageType {
  fromUserId: string;
  toUserId: string;
  content: string;
}
const PrivateChatContent: React.FC<PrivateChatContentProps> = ({
  InfoOn,
  toggleInfo,
  socket,
  contact,
  setStatus,
}) => {
  const {
    selectedPrivateChatId,
    setUnreadPrivateMessagesStore,
    unreadPrivateMessages,
    setSelectedFriend,
  } = useStore();
  const getAllPrivateMessages = (): void => {
    console.log("sss", userId, contact);
    api
      .get(`api/v1/privateChat`, {
        params: {
          fromUserId: contact?.email,
          toUserId: userId,
        },
      })
      .then((res) => {
        const data = res.data.data.AllMessages;
        setMessages(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAllPrivateMessages();
  }, [contact]);
  useEffect(() => {
    if (!socket) {
      console.log("no scoket ");
      return;
    }
    console.log("socket is not null");
    try {
      socket.on("privateMessage", (newMessage: any) => {
        console.log("===============");
        console.log(newMessage);
        console.log("===============");
        console.log("selectedChatId", selectedPrivateChatId);
        if (selectedPrivateChatId === newMessage.fromUserId) {
          socket.emit("upgradePrivateMessageStatusToSeen", {
            userId,
            friendId,
          });
        }
        setMessages((prevMessages: any) => [...prevMessages, newMessage]);
      });
    } catch (error) {
      console.log(error);
    }

    return () => {
      socket.off("privateMessage");
    };
  });
  const { userId, roomId, socketId } = useStore();
  const [messages, setMessages] = useState<any[]>();
  const [message, setMessage] = useState<string>("");
  const [friendName, setFriendName] = useState<string>("");
  const [friendId, setFriendId] = useState<string>();
  const [rendering, setRendering] = useState(0);
  const [messageData, setMessageData] = useState<MessageType>({
    fromUserId: userId!,
    toUserId: contact?.email || "",
    content: "",
  });
  useEffect(() => {}, [messages, socket, rendering]);
  const [friendShipStatus, setFriendShipStatus] = useState<
    "Blocked" | "Pending" | "Accepted"
  >("Blocked");
  function friendShipStatusCheck(): void {
    api
      .get(`api/v1/friend/friendshipStatus`, { params: { userId, friendId } })
      .then((res) => {
        console.log("status", res);
        console.log(res.data.data.friendShipStatus.status);
        setFriendShipStatus(res.data.data.friendShipStatus.status);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function fetchMessages() {
    api
      .get(`api/v1/privateChat`, {
        params: {
          fromUserId: contact?.email,
          toUserId: userId,
        },
      })
      .then((res) => {
        const data = res.data.data.AllMessages;
        console.log("msgs", data);
        // setPrivateChatCount(res.data.length);
        setMessages(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    // friendShipStatusCheck();
  }, [friendShipStatus]);
  const messageText = (event: any) => {
    const { name, value } = event.target;
    console.log(messageData, name, value);
    setMessageData({ ...messageData, [name]: value });
  };
  useEffect(() => {
    // console.log("data in pcc", data, contact);
    // setMessages(data?.privateChat);
    fetchMessages();
    setFriendId(contact?.email);
    setFriendName(contact?.fname + " " + contact?.lname);
  }, [contact, rendering, friendShipStatus]);
  // useEffect(() => {
  //   console.log("data in pcc", data, contact);
  //   setMessages(data?.privateChat);
  //   setFriendId(contact?.email);
  //   setFriendName(contact?.fname + " " + contact?.lname);
  // }, [data, contact]);
  // useEffect(() => {}, [rendering]);
  const clearChat = () => {
    api
      .patch(`api/v1/privatechat`, {
        userId: friendId,
        friendId: userId,
      })
      .then((dataa) => {
        console.log("res", dataa);
        setRendering(1);
      });
  };
  const blockFriend = () => {
    api
      .patch(`api/v1/friend/blockFriends`, {
        userId: userId,
        friendId: friendId,
      })
      .then((res) => {
        // console.log("res status", res.data.data.mutualFriends.status);
        const st = res.data.data.mutualFriends.status;
        setFriendShipStatus(st);
        setStatus(st);
        setSelectedFriend(null);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const unblockFriend = () => {
    api
      .patch(`api/v1/friend/unblockFriends`, {
        userId: userId,
        friendId: friendId,
      })
      .then((res) => {
        const st = res.data.data.mutualFriends.status;
        setFriendShipStatus(st);
        setStatus(st);
        setSelectedFriend(null);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // sendMessage
  function sendMessage(roomId: string | number) {
    console.log("msg sending");
    console.log("", messageData);
    try {
      socket.emit("privateMessage", {
        roomId,
        newMessage: messageData,
      });
    } catch (error) {
      console.log("eror co", error);
    }
    messageData.content = "";
  }

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
                  src={contact?.avatar ? contact.avatar : U}
                  alt=""
                  className="w-12 h-12 rounded-full"
                />
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
                  friendShipStatus === "Blocked"
                    ? { option: "Unblock Friend", action: unblockFriend }
                    : { option: "Block Friend", action: blockFriend },
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
                  <PrivateMessage
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
          />
          <div
            className="p-2 flex-shrink-0 cursor-pointer"
            onClick={() => {
              sendMessage(roomId);
            }}
          >
            <SendIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivateChatContent;
