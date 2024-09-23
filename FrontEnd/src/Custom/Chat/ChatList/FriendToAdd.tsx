import User from "../../../assets/manprvtcaht.png";
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
interface FriendToAddProps {
  friend: any;
  onCheckboxChange: (friendId: string) => void;
  isChecked: boolean;
}
const FriendToAdd: React.FC<FriendToAddProps> = ({
  friend,
  onCheckboxChange,
  isChecked,
}) => {
  return (
    <div className="flex py-2 w-full gap-2 bg-[#363638] rounded-md">
      <div>
        <img
          src={User || friend.avatar}
          alt=""
          className="h-10 w-10 rounded-full"
        />
      </div>
      <div className="w-3/4 flex flex-wrap">
        <p className="w-full">{friend.fname + " " + friend.lname}</p>
        <p className="text-xs text-gray-300">{friend.email}</p>
      </div>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => onCheckboxChange(friend.email)}
        className="bg-black"
      />
    </div>
  );
};

export default FriendToAdd;
