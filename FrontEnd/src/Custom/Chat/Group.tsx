import { useEffect, useState } from "react";
import User from "../../assets/manprvtcaht.png";
// import ChatContent from "./ChatContent";
interface GroupInterface {
  name: string;
  id: number;
  description: string;
  avatar: string | null;
}
interface GroupProps {
  data: any;
  //  {
  //   clearedAt: string | null;
  //   createdAt: string;
  //   group: GroupInterface;
  //   groupId: number;
  //   id: number;
  //   joinedAt: string;
  //   leftAt: null;
  //   memberId: string;
  //   membershipStatus: "Pending" | "Left";
  //   role: "Admin" | "Regular";
  //   updatedAt: string | null;
  // };
  onClick: any;
}
const Group: React.FC<GroupProps> = ({ data, onClick }) => {
  const [group, setGroup] = useState<GroupInterface | null>();

  useEffect(() => {
    setGroup(data.message[0].group);
  }, [data]);
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
            <p className="w-full font-semibold">{group?.name}</p>

            <p className="w-full text-xs line-clamp-1 ">{group?.description}</p>
          </div>
        </div>
        <div className="w-1/6   text-black text-xs flex justify-center items-center ">
          <p className="bg-white rounded-full px-1">5</p>
        </div>
      </div>
    </div>
  );
};

export default Group;
