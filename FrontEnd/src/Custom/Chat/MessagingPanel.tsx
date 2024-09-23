import { useEffect, useState } from "react";
import ChatContent from "./ChatContent/ChatContent";
import ChatInfo from "./ChatList/ChatInfo";
import ChatList from "./ChatList/ChatList";
import SideBar from "./Sidebar/SideBar";
import api from "../../axiosConfig";
import useStore from "../../store";

function MessagingPanel() {
  const { userId, setSelectedPrivateChatId } = useStore();

  const [selectedContact, setSelectedContact] = useState(null);
  const [selectedContactId, setSelectedContactId] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState<any>(null);
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
  const [members, setMembers] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState();
  const [infoOn, setInfoOn] = useState<boolean>(false);
  // |=======================================================================================================|
  // |=======================================================================================================|
  // |                                     SET UNREAD MESSAGES TO SEEN APIS                                  |
  // |=======================================================================================================|
  // |=======================================================================================================|
  const setUnreadPrivateMessagesToSeen = (contact: any) => {
    api
      .patch(`api/v1/privatechat/${contact}`)
      .then((res) => {
        console.log("contact Messages set to seen", res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const setUnreadGroupMessagesToSeen = (group: any) => {
    api
      .patch(`api/v1/groupchat/unreadMessageToSeen`, {
        memberId: userId,
        groupId: group,
      })
      .then((res) => {
        console.log("Group Messages set to seen", res);
      })
      .catch((err) => {
        console.log("err occured");
        console.log(err);
      });
  };
  // |=======================================================================================================|
  // |=======================================================================================================|
  // |                             HANDLE SELECTED CONTACT AND SELECTED GROUP                                |
  // |=======================================================================================================|
  // |=======================================================================================================|
  const handleContactClick = (contact: any) => {
    setUnreadPrivateMessagesToSeen(contact.email);
    setSelectedContactId(contact.email);
    setSelectedPrivateChatId(contact);
    setSelectedContact(contact);
    setSelectedGroupId(null);
    setSelectedGroup(null);
  };

  const handleGroupClick = (group: any) => {
    setUnreadGroupMessagesToSeen(group.id);
    setSelectedGroupId(group.id);
    setSelectedGroup(group);
    setSelectedContact(null);
    setSelectedContactId(null);
  };

  const selectOption = (option: any) => {
    setSelectedOption(option);
  };

  // |=======================================================================================================|
  // |=======================================================================================================|
  // |                                          STATES TO STORE DATA                                         |
  // |=======================================================================================================|
  // |=======================================================================================================|
  const [allFriends, setAllFriends] = useState({});
  const [allGroups, setAllGroups] = useState({});
  const [blockedFriends, setBlockedFriends] = useState({});
  const [privateChat, setPrivateChat] = useState({});
  const [groupChat, setGroupChat] = useState({});
  const [unreadPrivateMessages, setUnreadPrivateMessages] = useState({});
  const [unreadGroupMessages, setUnreadGroupMessages] = useState({});
  const [commonGroups, setCommonGroups] = useState({});

  // |=======================================================================================================|
  // |=======================================================================================================|
  // |                                         STATES TO STORE COUNT                                         |
  // |=======================================================================================================|
  // |=======================================================================================================|
  const [friendsCount, setFriendsCount] = useState(0);
  const [groupsCount, setGroupsCount] = useState(0);
  const [blockedFriendsCount, setBlockedFriendsCount] = useState(0);
  const [privateChatCount, setPrivateChatCount] = useState(0);
  const [groupChatCount, setGroupChatCount] = useState(0);
  const [commonGroupsCount, setCommonGroupsCount] = useState(0);
  const [unreadPrivateMessagesCount, setUnreadPrivateMessagesCount] =
    useState(0);
  const [unreadGroupMessagesCount, setUnreadGroupMessagesCount] = useState(0);
  // |=======================================================================================================|
  // |=======================================================================================================|
  // |                                     GET DATA FROM DB                                                  |
  // |=======================================================================================================|
  // |=======================================================================================================|
  const getBlockedFriends = () => {
    api
      .get(`api/v1/friend/fetchBlockedFriends/${userId}`)
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
      .get(`api/v1/friend/fetchBlockedFriends/${userId}`)
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
      .get(`api/v1/privateChat/${userId}`)
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
        params: { memberId: userId, groupId: 5 },
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
      .get(`api/v1/friend/fetchAllFriends/${userId}`)
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
      .get(`api/v1/groupmember/allGroups/${userId}`)
      .then((res) => {
        const ans = res.data.data.allGroups;
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
          fromUserId: selectedContactId,
          toUserId: userId,
        },
      })
      .then((res) => {
        const data = res.data.data.AllMessages;
        console.log("private data==================", res);
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
          memberId: userId,
          groupId: selectedGroupId,
        },
      })
      .then((res) => {
        const data = res.data.data.AllMessages;
        console.log("grop data============", res);
        setGroupChatCount(res.data.length);
        setGroupChat(data);
      })
      .catch((err) => {
        // console.log(err.response.data.message);
      });
  };

  const getAllMembersOfAGroup = () => {
    api
      .get(`api/v1/groupmember/allMembers/${selectedGroupId}`)
      .then((res) => {
        const data = res.data.data.group_members;
        data.map((member: any) => {
          const user = member.member;
          setMembers([...members, user]);
        });
      })
      .catch((err) => {
        console.log(err);
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
    getAllMembersOfAGroup();
  }, [
    selectedContact,
    selectedGroup,
    selectedGroupId,
    selectedContactId,
    selectedOption,
    // members,
  ]);

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
          option={selectOption}
        />
        <ChatList
          data={{
            allFriends,
            allGroups,
            blockedFriends,
            unreadGroupMessages,
            unreadPrivateMessages,
            privateChat,
            groupChat,
            friendsCount,
            groupsCount,
          }}
          onContactClick={handleContactClick}
          onGroupClick={handleGroupClick}
          selectedOption={selectedOption}
        />
        <ChatContent
          InfoOn={infoOn}
          toggleInfo={toggleInfo}
          data={{ privateChat, groupChat }}
          contact={selectedContact}
          group={selectedGroup}
          allMembers={members}
        />
        <ChatInfo
          InfoOn={infoOn}
          toggleInfo={toggleInfo}
          data={{ commonGroupsCount, commonGroups }}
          selectedCnt={selectedContact}
          selectedGrp={selectedGroup}
          allMembers={members}
        />
      </div>
    </div>
  );
}

export default MessagingPanel;
