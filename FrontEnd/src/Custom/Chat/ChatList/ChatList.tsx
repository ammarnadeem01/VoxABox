import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";

import Contact from "../ChatContent/Contact";
import Grp from "./Group";
import CustomDropdown from "../DropDown";
import AddFriend from "./AddFriend";
import AddGroup from "./AddGroup";
import AddGroupMembers from "./AddGroupMembers";
import { useNavigate } from "react-router-dom";
// import type { ChatListProps } from "../../../Types";
import {
  BlockedFriends,
  Group,
  UnreadGroupMessage,
  UnreadPrivateMessage,
  User,
} from "../../../Types";
import useStore from "../../../store";
export interface ChatListProps {
  data: {
    allFriends: User[] | undefined;
    allGroups: Group[] | undefined;
    blockedFriends: BlockedFriends[] | undefined;
    unreadGroupMessages: UnreadGroupMessage[] | undefined;
    unreadPrivateMessages: UnreadPrivateMessage[] | undefined;
    friendsCount: number;
    groupsCount: number;
  };
  // socket: any;
  setAllFriends: any;
  onContactClick: (contact: User) => void;
  onGroupClick: (group: Group) => void;
  selectedOption: string | undefined;
  setForRendering: any;
  socket: any;
}
// const socket = io("http://localhost:3000");
const ChatList: React.FC<ChatListProps> = ({
  data,
  onContactClick,
  onGroupClick,
  selectedOption,
  socket,
  setForRendering,
  setAllFriends,
}) => {
  const { logout } = useStore();
  const [friends, setFriends] = useState<any>();
  const [search, setSearch] = useState<string>("");
  const [groups, setGroups] = useState<any>([]);
  // const [option, setOption] = useState<string | undefined>("All");
  const [menuOption, setMenuOption] = useState<string | null>(null);
  const [groupId, setGroupId] = useState<number>();

  const setMenu = (option: string | null): void => {
    setMenuOption(option);
  };

  const nav = useNavigate();
  const { unreadPrivateMessages } = useStore();
  // useEffect(() => {
  //   setOption(selectedOption);
  // }, [selectedOption, data, menuOption, option]);

  // useEffect(() => {
  //   if (selectedOption === "Blocked") {
  //     setFriends(data?.blockedFriends);
  //     setGroups(null);
  //   } else if (selectedOption === "Groups") {
  //     setFriends(null);
  //     setGroups(data?.unreadGroupMessages);
  //   } else if (selectedOption === "Direct Messages") {
  //     setFriends(data?.unreadPrivateMessages);
  //     setGroups(null);
  //   } else if (selectedOption === "All") {
  //     setFriends(data.allFriends);
  //     setGroups(data.allGroups);
  //     console.log("data.allgroups", data.allGroups);
  //   }
  // }, [data, selectedOption, menuOption]);

  useEffect(() => {
    console.log("clicked on unfriend");
    if (selectedOption === "Blocked") {
      setFriends(data?.blockedFriends);
      setGroups(null);
    } else if (selectedOption === "Groups") {
      setFriends(null);
      setGroups(data?.unreadGroupMessages);
    } else if (selectedOption === "Direct Messages") {
      // setFriends(data?.unreadPrivateMessages);
      console.log("unread 1 ", data.unreadPrivateMessages);
      console.log("unread 2 ", unreadPrivateMessages);
      const dat = unreadPrivateMessages.data;
      setFriends(dat);
      // console.log("unread", unreadPrivateMessages);
      setGroups(null);
    } else if (selectedOption === "All") {
      setFriends(data.allFriends);
      setGroups(data.allGroups);
      console.log("data.allgroups", data.allGroups);
    }
  }, [selectedOption, menuOption, data]);

  // const { setFriends } = useStore()
  useEffect(() => {
    console.log("Friends added");
    socket?.on("friendAdded", (friend: any) => {
      setFriends((prev: any) => [...prev, friend]);
      setAllFriends((prev: any) => [...prev, friend]);
    });
  }, [selectedOption, menuOption, data, socket]);

  function addFriend() {
    setMenu("addFriend");
  }
  function createGroup() {
    setMenu("addGroup");
  }
  function Logout() {
    logout();
    nav("/");
  }
  return (
    <div className="w-1/5 h-[95%] text-white flex flex-wrap justify-betweeen items-start overflow-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-[#363638]">
      <div className="w-full flex flex-wrap justify-start items-start  ">
        <div className="flex justify-end items-center w-full">
          <CustomDropdown
            table={[
              { option: "Add Friend", action: addFriend },
              { option: "Create Group", action: createGroup },
              { option: "Logout", action: Logout },
            ]}
          />
        </div>
        <div className="w-full flex justify-center items-start text-black ">
          {menuOption != "addFriend" && (
            <div className="flex items-center w-10/12 text-white  bg-[#101717]  rounded-lg">
              <div className="p-2 ">
                <SearchIcon />
              </div>
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                disabled={true}
                placeholder="Search..."
                className="py-2 px-4 border-none outline-none  rounded-lg w-full bg-[#101717]"
              />
            </div>
          )}
        </div>
        <div className="w-full flex flex-wrap justify-center items-center py-3 pl-2 gap-3">
          {console.log("shit", friends)}
          {!menuOption &&
            friends &&
            friends.length > 0 &&
            friends.map((friend: any) => {
              let friendObj = null;
              console.log(friend);
              switch (selectedOption) {
                case "Direct Messages":
                  friendObj = friend.fromUser;
                  break;
                case "Blocked":
                  friendObj = friend.friend;
                  break;
                case "All":
                  friendObj = friend.friend;
                  break;
              }
              return (
                <>
                  <Contact
                    key={friend.fromUserId}
                    data={friendObj}
                    onClick={() => {
                      onContactClick(friendObj);
                    }}
                  />
                </>
              );
            })}
          {!menuOption &&
            groups &&
            groups.length > 0 &&
            groups.map((group: any) => {
              let groupObj = null;
              switch (selectedOption) {
                case "Groups":
                  // console.log(" grp in grps", group);
                  groupObj =
                    group && group.message ? group.message[0].group : group;
                  break;
                case "All":
                  groupObj = group.group;
                  break;
              }
              // console.log("Selected grp obj,", groupObj);
              return (
                <Grp
                  key={group}
                  data={groupObj}
                  onClick={() => {
                    onGroupClick(groupObj);
                  }}
                />
              );
            })}
          {menuOption == "addFriend" && (
            <AddFriend
              setMenuOption={setMenu}
              setForRendering={setForRendering}
              socket={socket}
            />
          )}
          {menuOption == "addGroup" && (
            <AddGroup
              setMenuOption={setMenu}
              setGroupId={setGroupId}
              setForRendering={setForRendering}
            />
          )}
          {menuOption == "addGroupMembers" && (
            <AddGroupMembers
              groupId={groupId}
              setMenuOption={setMenu}
              setForRendering={setForRendering}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatList;
