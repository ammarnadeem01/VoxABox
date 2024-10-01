import { useEffect, useRef, useState } from "react";
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
import { io, Socket } from "socket.io-client";
// import DefaultEventsMap from "socket.io-client";

function MessagingPanel() {
  const socketRef = useRef<Socket | null>(null); // Initialize socket reference with null
  const [forRendering, setForRendering] = useState(0);
  const [status, setStatus] = useState("Blocked");

  useEffect(() => {
    // Establish connection only once when the component mounts
    // Initialize socket connection
    socketRef.current = io("http://localhost:3000");

    // Register the user or handle other socket events
    socketRef.current.emit("register", userId);
    console.log("User registered");
    // Cleanup: Disconnect when the component unmounts
    return () => {
      socketRef.current?.disconnect();
    };
  }, []);
  const {
    setRoomId,
    userId,
    roomId,
    setFriends,
    setSelectedPrivateChatId,
    setUnreadPrivateMessagesStore,
    selectedPrivateChatId,
    setSelectedFriend,
    setSelectedGrp,
  } = useStore();

  const [selectedContact, setSelectedContact] = useState<User | null>(null);
  const [selectedContactId, setSelectedContactId] = useState<string | null>(
    null
  );
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
  // const [members, setMembers] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>();
  const [infoOn, setInfoOn] = useState<boolean>(false);
  // |=======================================================================================================|
  // |=======================================================================================================|
  // |                                     SET UNREAD MESSAGES TO SEEN APIS                                  |
  // |=======================================================================================================|
  // |=======================================================================================================|

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
    const friendId = contact.email;

    // Leave the current room (if selectedPrivateChatId exists)

    if (selectedPrivateChatId) {
      socketRef.current?.emit("leavePrivateRoom", {
        userId,
        friendId: selectedPrivateChatId, // Leaving the previous room
      });
    }

    socketRef.current?.emit("upgradePrivateMessageStatusToSeen", {
      userId,
      friendId: contact.email,
    });
    // Join the new room (the one for the clicked contact)
    socketRef.current?.emit("joinPrivateRoom", {
      userId,
      friendId, // Joining the new room based on the clicked contact's email
    });
    setUnreadPrivateMessagesCount(0);
    setSelectedContactId(contact.email);
    setRoomId(contact.email);
    setSelectedPrivateChatId(contact.email);
    setSelectedFriend(contact);
    setSelectedContact(contact);
    setSelectedGroupId(null);
    setSelectedGroup(null);
  };

  const handleGroupClick = (group: Group): void => {
    if (selectedGroupId) {
      socketRef.current?.emit("leavePrivateRoom", {
        userId,
        friendId: selectedGroupId,
      });
    }
    socketRef.current?.emit("joinRoom", { roomId: group.id, userId });
    setUnreadGroupMessagesToSeen(group.id);
    setSelectedGroupId(group.id);
    setSelectedGroup(group);
    setSelectedGrp(group);
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
        console.log("dara", data);
        setUnreadPrivateMessagesCount(res.data.length);
        setUnreadPrivateMessages(data);
        setUnreadPrivateMessagesStore(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getUnreadGroupMessages = (): void => {
    api
      .get(`api/v1/groupChat/fetchUnreadMessages`, {
        params: { memberId: userId, groupId: selectedGroupId },
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
        setGroupsCount(res.data.length);
        setAllGroups(ans);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log("again doinf it");
    getUnreadPrivateMessages();
    getUnreadGroupMessages();
    getBlockedFriends();
    getAllFriends();
    getAllGroups();
  }, [forRendering]);
  useEffect(() => {
    getBlockedFriends();
    getAllFriends();
  }, [status]);
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
          handleContactClick={handleContactClick}
          handleGroupClick={handleGroupClick}
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
          setForRendering={setForRendering}
        />
        <ChatContent
          InfoOn={infoOn}
          toggleInfo={toggleInfo}
          // data={{ privateChat, groupChat }}
          socket={socketRef.current}
          contact={selectedContact}
          group={selectedGroup}
          setStatus={setStatus}
          setForRendering={setForRendering}
          setSelectedContact={setSelectedContact}
          setSelectedGroup={setSelectedGroup}
        />

        <ChatInfo
          InfoOn={infoOn}
          toggleInfo={toggleInfo}
          selectedCnt={selectedContact}
          selectedGrp={selectedGroup}
          onContactClick={handleContactClick}
          onGroupClick={handleGroupClick}
          setForRendering={setForRendering}
          setSelectedContact={setSelectedContact}
          setSelectedGroup={setSelectedGroup}
        />
      </div>
    </div>
  );
}

export default MessagingPanel;
