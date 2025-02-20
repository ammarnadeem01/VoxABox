import { useEffect, useState } from "react";
import useStore from "../../../store";
import FriendToAdd from "./FriendToAdd";
import api from "../../../axiosConfig";
import { AddGroupMembersProps, Member, User } from "../../../Types";

const AddGroupMembers: React.FC<AddGroupMembersProps> = ({
  setMenuOption,
  groupId,
  setForRendering,
  socket,
}) => {
  const { friends } = useStore();
  const [checkedFriends, setCheckedFriends] = useState<string[]>([]);
  const [mem, setMem] = useState<Member[]>();
  function members() {
    if (groupId) {
      api
        .get(`api/v1/groupmember/allMembers/${groupId}`)
        .then((res) => {
          const data = res.data.data.group_members;
          setMem(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  const newMembers = () => {};
  useEffect(() => {
    members();
    newMembers();
  }, [mem]);
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
            //
            try {
              socket.emit("friendAddedInGroup", {
                friend,
                groupId,
              });
            } catch (error) {
              console.log("eror co", error);
            }
            //
            setForRendering((prev: number) => prev + 1);
          })
          .catch((err) => {
            setMenuOption(null);
            console.log(err);
          });
      });
    }
    setMenuOption(null);
  };

  return (
    <div className="w-full flex flex-start flex-wrap justify-center ">
      <p>Select the friends you want to add in the group : </p>
      {friends &&
        friends.length > 0 &&
        friends.map((friend: User) => {
          const isMember = mem?.some((m: Member) => {
            console.log(
              "m.email",
              m.member.email,
              "friend.email",
              friend.email
            );
            return m?.member.email === friend.email;
          });
          return (
            <>
              {!isMember && (
                <FriendToAdd
                  key={friend.email}
                  friend={friend}
                  onCheckboxChange={handleCheckboxChange}
                  isChecked={checkedFriends.includes(friend.email)}
                />
              )}
            </>
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
