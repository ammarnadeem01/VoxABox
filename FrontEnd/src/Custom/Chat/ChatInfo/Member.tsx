import { useEffect, useState } from "react";
import User from "../../assets/manprvtcaht.png";
import * as React from "react";
interface User {
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
interface MemberProps {
  data: {
    clearedAt: string | null;
    createdAt: string;
    groupId: number;
    id: number;
    joinedAt: string;
    leftAt: string | null;
    member: User;
    memberId: string;
    membershipStatus: "Pending" | "Left" | "Accepted";
    role: "Admin" | "Regular";
    updatedAt: string | null;
  };
}
const Member: React.FC<MemberProps> = ({ data }) => {
  const [member, setMember] = useState<User>();
  const [role, setRole] = useState("Regular");
  useEffect(() => {
    setMember(data.member);
    setRole(data.role);
  }, [data]);
  return (
    <div className="flex w-full justify-start gap-1 items-center">
      <div>
        <img src={User} alt="" className="w-12 h-12 rounded-full" />
      </div>
      <div className="w-full line-clamp-1">
        <div className="flex w-full justify-start gap-2 items-center">
          <p className="line-clamp-1">{member?.fname + " " + member?.lname}</p>
          <p className="text-green-600">{role === "Admin" ? "Admin" : ""}</p>
        </div>
        <p className="text-xs text-gray-400">{member?.email}</p>
      </div>
    </div>
  );
};

export default Member;
