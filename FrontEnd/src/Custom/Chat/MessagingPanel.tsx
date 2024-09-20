import { useEffect, useState } from "react";
import ChatContent from "./ChatContent";
import ChatInfo from "./ChatInfo";
import ChatList from "./ChatList";
import SideBar from "./SideBar";
import api from "../../axiosConfig";

function MessagingPanel() {
  // states to store data
  const [allFriends, setAllFriends] = useState({});
  const [allGroups, setAllGroups] = useState({});
  const [blockedFriends, setBlockedFriends] = useState({});
  const [privateChat, setPrivateChat] = useState({});
  const [groupChat, setGroupChat] = useState({});
  const [unreadPrivateMessages, setUnreadPrivateMessages] = useState({});
  const [unreadGroupMessages, setUnreadGroupMessages] = useState({});
  const [commonGroups, setCommonGroups] = useState({});

  // states to store count
  const [friendsCount, setFriendsCount] = useState(0);
  const [groupsCount, setGroupsCount] = useState(0);
  const [blockedFriendsCount, setBlockedFriendsCount] = useState(0);
  const [privateChatCount, setPrivateChatCount] = useState(0);
  const [groupChatCount, setGroupChatCount] = useState(0);
  const [commonGroupsCount, setCommonGroupsCount] = useState(0);
  const [unreadPrivateMessagesCount, setUnreadPrivateMessagesCount] =
    useState(0);
  const [unreadGroupMessagesCount, setUnreadGroupMessagesCount] = useState(0);
  const getBlockedFriends = () => {
    api
      .get(`api/v1/friend/fetchBlockedFriends/test5@example.com`)
      .then((res) => {
        const data = res.data.data.BlockedFriends;

        setBlockedFriendsCount(res.data.length);
        setBlockedFriends(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCommonGroups = () => {
    api
      .get(`api/v1/friend/fetchBlockedFriends/test5@example.com`)
      .then((res) => {
        const data = res.data.data.BlockedFriends;
        setCommonGroupsCount(res.data.length);
        setCommonGroups(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getUnreadPrivateMessages = () => {
    api
      .get(`api/v1/privateChat/test5@example.com`)
      .then((res) => {
        const data = res.data.data.UnreadMessages;
        setUnreadPrivateMessagesCount(res.data.length);
        setUnreadPrivateMessages(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getUnreadGroupMessages = () => {
    api
      .get(`api/v1/groupChat/fetchUnreadMessages`, {
        params: { memberId: "test5@example.com", groupId: 5 },
      })
      .then((res) => {
        const data = res.data.data.UnreadMessages;
        setUnreadGroupMessagesCount(res.data.length);
        setUnreadGroupMessages(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getAllFriends = () => {
    api
      .get(`api/v1/friend/fetchAllFriends/test5@example.com`)
      .then((res) => {
        const friends = res.data.data.AllFriends;

        setFriendsCount(res.data.length);
        setAllFriends(friends);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getAllGroups = () => {
    api
      .get(`api/v1/groupmember/allGroups/test5@example.com`)
      .then((res) => {
        const ans = res.data.data.allGroups;
        // console.log("grop", ans);
        setGroupsCount(res.data.length);
        setAllGroups(ans);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getAllPrivateMessages = () => {
    api
      .get(`api/v1/privateChat`, {
        params: {
          fromUserId: "test7@example.com",
          toUserId: "test5@example.com",
        },
      })
      .then((res) => {
        const data = res.data.data.AllMessages;
        // console.log("prvtmsg", data);
        setPrivateChatCount(res.data.length);
        setPrivateChat(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getAllGroupMessages = () => {
    api
      .get(`api/v1/groupChat/fetchAllGroupMessages`, {
        params: {
          memberId: "test7@example.com",
          groupId: 6,
        },
      })
      .then((res) => {
        const data = res.data.data.AllMessages;
        setGroupChatCount(res.data.length);
        setGroupChat(data);
      })
      .catch((err) => {
        // console.log(err.response.data.message);
      });
  };

  useEffect(() => {
    getBlockedFriends();
    getUnreadPrivateMessages();
    getUnreadGroupMessages();
    getAllFriends();
    getAllGroups();
    getAllPrivateMessages();
    getAllGroupMessages();
    getCommonGroups();
  }, []);

  const [infoOn, setInfoOn] = useState<boolean>(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const handleContactClick = (contact: any) => {
    setSelectedContact(contact);
  };

  const toggleInfo = () => {
    setInfoOn(!infoOn);
  };
  return (
    <div className="min-w-full max-w-full bg-[#363638] h-[100vh]">
      <div className="w-full h-full flex justify-center items-center">
        <SideBar
          data={{
            friendsCount,
            groupsCount,
            privateChatCount,
            groupChatCount,
            blockedFriendsCount,
            unreadGroupMessagesCount,
            unreadPrivateMessagesCount,
          }}
        />
        <ChatList
          data={{
            allFriends,
            allGroups,
            blockedFriends,
            unreadGroupMessages,
            unreadPrivateMessages,
            friendsCount,
            groupsCount,
          }}
          onContactClick={handleContactClick}
        />
        <ChatContent
          InfoOn={infoOn}
          toggleInfo={toggleInfo}
          data={{ privateChat, groupChat }}
          contact={selectedContact}
        />
        <ChatInfo
          InfoOn={infoOn}
          toggleInfo={toggleInfo}
          data={{ commonGroupsCount, commonGroups }}
        />
      </div>
    </div>
  );
}

export default MessagingPanel;
