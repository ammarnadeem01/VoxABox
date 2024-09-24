import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";

import Contact from "../ChatContent/Contact";
import Group from "./Group";
import CustomDropdown from "../DropDown";
import AddFriend from "./AddFriend";
import AddGroup from "./AddGroup";
import AddGroupMembers from "./AddGroupMembers";
import useStore from "../../../store";
import { useNavigate } from "react-router-dom";

interface Friend {
  avatar: string | null;
  createdAt: string | null;
  deletedAt: string | null;
  email: string;
  fname: string;
  lname: string;
  password: string;
  status: "offline" | "online";
  updatedAt: string | null;
}
interface GroupInterface {
  name: string;
  id: number;
  description: string;
  avatar: string | null;
}
interface GroupMessage {}
interface PrivateMessage {
  content: string;
  createdAt: string;
  fromUserId: string;
  id: number;
  seenStatus: "Not Seen" | "Seen";
  toUserId: string;
  updatedAt: string | null;
}
// interface ChatListProps {
//   data: {
//     allFriends: Friend[];
//     allGroups: GroupInterface[];
//     blockedFriends: Friend[];
//     unreadGroupMessages: GroupMessage[];
//     unreadPrivateMessages: PrivateMessage[];
//     friendsCount: number;
//     groupsCount: number;
//   };
//   onContactClick: any;
// }

interface ChatListProps {
  data: any;
  onContactClick: any;
  onGroupClick: any;
  selectedOption: any;
}

const ChatList: React.FC<ChatListProps> = ({
  data,
  onContactClick,
  onGroupClick,
  selectedOption,
}) => {
  const [friends, setFriends] = useState<any>([]);
  const [search, setSearch] = useState<string>("");
  const [groups, setGroups] = useState<any | null>([]);
  const [option, setOption] = useState("All");
  const [menuOption, setMenuOption] = useState<string>("");
  const [groupId, setGroupId] = useState<number>();

  const setMenu = (option: string) => {
    setMenuOption(option);
  };

  const { logout } = useStore();
  const nav = useNavigate();
  useEffect(() => {
    setOption(selectedOption);
  }, [selectedOption, data]);

  useEffect(() => {
    if (option === "Blocked") {
      setFriends(data?.blockedFriends);
      setGroups(null);
    } else if (option === "Groups") {
      setFriends(null);
      setGroups(data?.unreadGroupMessages);
    } else if (option === "Direct Messages") {
      setFriends(data?.unreadPrivateMessages);
      setGroups(null);
    } else if (option === "All") {
      setFriends(data.allFriends);
      setGroups(data.allGroups);
    }
  }, [data, option, menuOption]);
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
          {!menuOption &&
            friends &&
            friends.length > 0 &&
            friends.map((friend: any) => {
              let friendObj = null;
              switch (option) {
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
                    onClick={() => onContactClick(friendObj)}
                  />
                </>
              );
            })}
          {!menuOption &&
            groups &&
            groups.length > 0 &&
            groups.map((group: any) => {
              let groupObj = null;
              switch (option) {
                case "Groups":
                  console.log(" grp in grps", group);
                  groupObj =
                    group && group.message ? group.message[0].group : group;
                  break;
                case "All":
                  groupObj = group.group;
                  break;
              }
              return (
                <Group
                  key={group}
                  data={groupObj}
                  onClick={() => onGroupClick(groupObj)}
                />
              );
            })}
          {menuOption == "addFriend" && <AddFriend setMenuOption={setMenu} />}
          {menuOption == "addGroup" && (
            <AddGroup setMenuOption={setMenu} setGroupId={setGroupId} />
          )}
          {menuOption == "addGroupMembers" && (
            <AddGroupMembers groupId={groupId} setMenuOption={setMenu} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatList;
