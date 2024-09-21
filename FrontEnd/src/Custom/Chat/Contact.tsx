import { useEffect, useState } from "react";
import User from "../../assets/manprvtcaht.png";
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
interface ContactProps {
  data: {
    clearedAt: string;
    createdAt: string | null;
    friend: Friend;
    friendId: string;
    id: number;
    status: "offline" | "online";
    updatedAt: string | null;
    userId: string;
  };

  onClick: any;
}
const Contact: React.FC<ContactProps> = ({ data, onClick }) => {
  const [friend, setFriend] = useState<Friend | null>();

  useEffect(() => {
    setFriend(data?.friend);
    console.log("friend", friend);
  }, [data, friend]);
  return (
    <div
      className="w-full flex flex-wrap justify-start cursor-pointer"
      onClick={onClick}
    >
      <div className="w-full flex justify-between items-center p-1 rounded-xl">
        <div className="w-4/5 flex justify-start items-center">
          <div className="w-1/4 ">
            <img src={User} alt="" className="w-12 h-12 rounded-full" />
          </div>
          <div className="w-3/5 flex flex-wrap justify-start items-center">
            <p className="w-full font-semibold">
              {friend?.fname + " " + friend?.lname}
            </p>
            <p className="w-full flex  items-center gap-3 text-xs">
              {friend?.email}
              {friend?.status == "online" ? (
                <p className="text-xs w-2 h-2 rounded-full bg-green-600"></p>
              ) : (
                <></>
              )}
            </p>
          </div>
        </div>
        <div className="w-1/6   text-black text-xs flex justify-center items-center ">
          <p className="bg-white rounded-full px-1">5</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
