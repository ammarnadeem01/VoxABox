import { useState } from "react";
import useStore from "../../../store";
import FriendToAdd from "./FriendToAdd";
import api from "../../../axiosConfig";

interface AddGroupMembersProps {
  setMenuOption: any;
  groupId: number | undefined;
}
const AddGroupMembers: React.FC<AddGroupMembersProps> = ({
  setMenuOption,
  groupId,
}) => {
  const { friends } = useStore();
  const [checkedFriends, setCheckedFriends] = useState<string[]>([]);
  const handleCheckboxChange = (friendId: string) => {
    setCheckedFriends((prev) => {
      if (prev.includes(friendId)) {
        return prev.filter((email) => email !== friendId);
      } else {
        return [...prev, friendId];
      }
    });
  };
  const handleAddFriends = () => {
    if (groupId) {
      checkedFriends.map((friend) => {
        api
          .post("api/v1/groupmember", {
            groupId,
            memberId: friend,
          })
          .then((res) => {
            console.log(res);
            setMenuOption(null);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }
  };
  return (
    <div className="w-full flex flex-start flex-wrap justify-center ">
      {friends &&
        friends.length > 0 &&
        friends.map((friend: any) => {
          return (
            <FriendToAdd
              key={friend.id}
              friend={friend}
              onCheckboxChange={handleCheckboxChange}
              isChecked={checkedFriends.includes(friend.email)}
            />
          );
        })}
      <button
        onClick={handleAddFriends}
        className="mt-4 bg-purple-400 text-white py-2 px-4 rounded-lg"
      >
        Add Selected Friends
      </button>
    </div>
  );
};

export default AddGroupMembers;
