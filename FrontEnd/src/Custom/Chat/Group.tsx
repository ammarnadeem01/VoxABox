import React, { useEffect, useState } from "react";
import User from "../../assets/manprvtcaht.png";
import ChatContent from "./ChatContent";
interface GroupInterface {
  name: string;
  id: number;
  description: string;
  avatar: string | null;
}
interface GroupProps {
  data: {
    clearedAt: string | null;
    createdAt: string;
    group: GroupInterface;
    groupId: number;
    id: number;
    joinedAt: string;
    leftAt: null;
    memberId: string;
    membershipStatus: "Pending" | "Left";
    role: "Admin" | "Regular";
    updatedAt: string | null;
  };
}
const Group: React.FC<GroupProps> = ({ data }) => {
  const [group, setGroup] = useState<GroupInterface | null>();

  useEffect(() => {
    setGroup(data?.group);
    console.log("group", group);
  }, [data]);
  return (
    <div className="w-full flex flex-wrap justify-start cursor-pointer">
      <div className="w-full flex justify-start items-center p-1 rounded-xl">
        <div className="w-1/4">
          <img src={User} alt="" className="w-12 h-12 rounded-full" />
        </div>
        <div className="w-2/4 flex flex-wrap justify-start items-center">
          <p className="w-full font-semibold">{group?.name}</p>
          <p className="w-full text-xs line-clamp-1 ">{group?.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Group;
