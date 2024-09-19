import { useEffect, useState } from "react";
import ChatContent from "./ChatContent";
import ChatInfo from "./ChatInfo";
import ChatList from "./ChatList";
import SideBar from "./SideBar";

function MessagingPanel() {
  const getBlockedFriends = () => {};
  const getUnreadPrivateMessages = () => {};
  const getUnreadGroupMessages = () => {};
  const getAllFriends = () => {};
  const getAllGroups = () => {};
  const getAllPrivateMessages = () => {};
  const getAllGroupMessages = () => {};

  useEffect(() => {
    getBlockedFriends();
    getUnreadPrivateMessages();
    getUnreadGroupMessages();
    getAllFriends();
    getAllGroups();
    getAllPrivateMessages();
    getAllGroupMessages();
  }, []);

  const [infoOn, setInfoOn] = useState<boolean>(false);

  const toggleInfo = () => {
    setInfoOn(!infoOn);
  };
  return (
    <div className="min-w-full max-w-full bg-[#363638] h-[100vh]">
      <div className="w-full h-full flex justify-center items-center">
        <SideBar />
        <ChatList />
        <ChatContent InfoOn={infoOn} toggleInfo={toggleInfo} />
        <ChatInfo InfoOn={infoOn} toggleInfo={toggleInfo} />
      </div>
    </div>
  );
}

export default MessagingPanel;
