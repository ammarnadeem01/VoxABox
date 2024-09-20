import SearchIcon from "@mui/icons-material/Search";
import Contact from "./Contact";
import React, { useEffect, useState } from "react";
import CustomDropdown from "./DropDown";
import Group from "./Group";
import SideBar from "./SideBar";

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
// allFriends: Friend[];
// allGroups: GroupInterface[];
// blockedFriends: Friend[];
// unreadGroupMessages: GroupMessage[];
// unreadPrivateMessages: PrivateMessage[];
// friendsCount: number;
// groupsCount: number;
// };
// }
interface ChatListProps {
  data: {
    allFriends: any;
    allGroups: any;
    blockedFriends: any;
    unreadGroupMessages: any;
    unreadPrivateMessages: any;
    friendsCount: number;
    groupsCount: number;
  };
  onContactClick: any;
}
const ChatList: React.FC<ChatListProps> = ({ data, onContactClick }) => {
  const [friends, setFriends] = useState<any>([]);
  // const [groups, setGroups] = useState<any | null>([]);

  useEffect(() => {
    console.log(data?.allFriends);
    // setGroups(data?.allGroups);
    // if (data?.allFriends) {
    setFriends(data?.allFriends);
    // }
  }, [data]);

  return (
    <div className="w-1/5 h-[95%] text-white flex flex-wrap justify-betweeen items-start overflow-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-[#363638]">
      <div className="w-full flex flex-wrap justify-start items-start  ">
        <div className="flex justify-end items-center w-full">
          <CustomDropdown options={["Add Friend", "Create Group"]} />
        </div>
        <div className="w-full flex justify-center items-start text-black ">
          <div className="flex items-center w-10/12 text-white  bg-[#101717]  rounded-lg">
            <div className="p-2 ">
              <SearchIcon />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="py-2 px-4 border-none outline-none  rounded-lg w-full bg-[#101717]"
            />
          </div>
        </div>
        <div className="w-full flex flex-wrap justify-center items-center py-3 pl-2 gap-3">
          {friends && friends.length > 0 ? (
            friends.map((friend: any) => (
              <Contact
                key={friend.email}
                data={friend}
                onClick={() => onContactClick(friend.friendId)}
              />
            ))
          ) : (
            <p>No friends available</p>
          )}

          {/* {groups && groups.length > 0 ? (
            groups.map((group: any) => (
              <Group
                key={group.email}
                data={group}
               
              />
            ))
          ) : (
            <p>No groups available</p>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default ChatList;
