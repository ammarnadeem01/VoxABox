import { useEffect, useState } from "react";
import ChatContent from "./ChatContent/ChatContent";
import ChatInfo from "./ChatList/ChatInfo";
import ChatList from "./ChatList/ChatList";
import SideBar from "./Sidebar/SideBar";
import api from "../../axiosConfig";
import useStore from "../../store";
import {
  Group,
  User,
  UnreadPrivateMessage,
  UnreadGroupMessage,
  BlockedFriends,
  AllPrivateMessages,
  AllGroupMessages,
} from "../../Types";
import io from "socket.io-client";
const socket = io("http://localhost:3000");

function MessagingPanel() {
  const { setRoomId, userId, roomId, setFriends, setSelectedPrivateChatId } =
    useStore();

  const [selectedContact, setSelectedContact] = useState<User | null>(null);
  const [selectedContactId, setSelectedContactId] = useState<string | null>(
    null
  );
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
  const [members, setMembers] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>();
  const [infoOn, setInfoOn] = useState<boolean>(false);
  // |=======================================================================================================|
  // |=======================================================================================================|
  // |                                     SET UNREAD MESSAGES TO SEEN APIS                                  |
  // |=======================================================================================================|
  // |=======================================================================================================|
  const setUnreadPrivateMessagesToSeen = (contact: string) => {
    api
      .patch(`api/v1/privatechat/${contact}`)
      .then((res) => {
        console.log("contact Messages set to seen", res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const setUnreadGroupMessagesToSeen = (groupId: number) => {
    api
      .patch(`api/v1/groupchat/unreadMessageToSeen`, {
        memberId: userId,
        groupId: groupId,
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
  const handleContactClick = (contact: User): void => {
    setUnreadPrivateMessagesToSeen(contact.email);
    setSelectedContactId(contact.email);
    setRoomId(contact.email);
    setSelectedPrivateChatId(contact.email);
    socket.emit("joinRoom", contact.email);
    setSelectedContact(contact);
    setSelectedGroupId(null);
    setSelectedGroup(null);
  };

  const handleGroupClick = (group: Group): void => {
    console.log("grp grp grp", group);
    setUnreadGroupMessagesToSeen(group.id);
    setRoomId(group.id);
    setSelectedGroupId(group.id);
    setSelectedGroup(group);
    setSelectedContact(null);
    setSelectedContactId(null);
  };

  const selectOption = (option: string): void => {
    setSelectedOption(option);
  };

  // |=======================================================================================================|
  // |=======================================================================================================|
  // |                                          STATES TO STORE DATA                                         |
  // |=======================================================================================================|
  // |=======================================================================================================|
  const [allFriends, setAllFriends] = useState<User[]>();
  const [allGroups, setAllGroups] = useState<Group[]>();
  const [blockedFriends, setBlockedFriends] = useState<BlockedFriends[]>();
  const [privateChat, setPrivateChat] = useState<AllPrivateMessages[]>();
  const [groupChat, setGroupChat] = useState<AllGroupMessages[]>();
  const [unreadPrivateMessages, setUnreadPrivateMessages] =
    useState<UnreadPrivateMessage[]>();
  const [unreadGroupMessages, setUnreadGroupMessages] =
    useState<UnreadGroupMessage[]>();

  // |=======================================================================================================|
  // |=======================================================================================================|
  // |                                         STATES TO STORE COUNT                                         |
  // |=======================================================================================================|
  // |=======================================================================================================|
  const [friendsCount, setFriendsCount] = useState<number>(0);
  const [groupsCount, setGroupsCount] = useState<number>(0);
  const [blockedFriendsCount, setBlockedFriendsCount] = useState<number>(0);
  const [privateChatCount, setPrivateChatCount] = useState<number>(0);
  const [groupChatCount, setGroupChatCount] = useState<number>(0);
  // const [commonGroupsCount, setCommonGroupsCount] = useState<number>(0);
  const [unreadPrivateMessagesCount, setUnreadPrivateMessagesCount] =
    useState<number>(0);
  const [unreadGroupMessagesCount, setUnreadGroupMessagesCount] =
    useState<number>(0);
  // |=======================================================================================================|
  // |=======================================================================================================|
  // |                                     GET DATA FROM DB                                                  |
  // |=======================================================================================================|
  // |=======================================================================================================|
  const getBlockedFriends = (): void => {
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

  const getUnreadPrivateMessages = (): void => {
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
  const getUnreadGroupMessages = (): void => {
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
  const getAllFriends = (): void => {
    api
      .get(`api/v1/friend/fetchAllFriends/${userId}`)
      .then((res) => {
        const friends = res.data.data.AllFriends;
        const newA = friends.map((f: any) => f.friend);
        setFriends(newA);
        setFriendsCount(res.data.length);
        setAllFriends(friends);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getAllGroups = (): void => {
    api
      .get(`api/v1/groupmember/allGroups/${userId}`)
      .then((res) => {
        const ans = res.data.data.allGroups;
        console.log("ans", ans);
        setGroupsCount(res.data.length);
        setAllGroups(ans);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getAllPrivateMessages = (): void => {
    api
      .get(`api/v1/privateChat`, {
        params: {
          fromUserId: selectedContactId,
          toUserId: userId,
        },
      })
      .then((res) => {
        const data = res.data.data.AllMessages;

        setPrivateChatCount(res.data.length);
        setPrivateChat(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getAllGroupMessages = (): void => {
    api
      .get(`api/v1/groupChat/fetchAllGroupMessages`, {
        params: {
          memberId: userId,
          groupId: selectedGroupId,
        },
      })
      .then((res) => {
        const data = res.data.data.AllMessages;
        console.log("allgrpmsg", data);
        setGroupChatCount(res.data.length);
        setGroupChat(data);
      })
      .catch((err) => {
        console.log(err);
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
  }, [
    selectedContact,
    selectedGroup,
    selectedGroupId,
    selectedContactId,
    selectedOption,
  ]);

  const toggleInfo = (): void => {
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
        />
        <ChatInfo
          InfoOn={infoOn}
          toggleInfo={toggleInfo}
          selectedCnt={selectedContact}
          selectedGrp={selectedGroup}
        />
      </div>
    </div>
  );
}

export default MessagingPanel;
