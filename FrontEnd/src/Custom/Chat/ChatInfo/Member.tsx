import { useEffect, useState } from "react";
import U from "../../../assets/manprvtcaht.png";
import * as React from "react";
import type { Member, MemberProps, User } from "../../../Types";

const Member: React.FC<MemberProps> = ({ data }) => {
  const [member, setMember] = useState<User>();
  const [role, setRole] = useState<"Regular" | "Admin">("Regular");
  useEffect(() => {
    setMember(data.member);
    setRole(data.role);
  }, [data]);
  return (
    <div className="flex w-full justify-start gap-1 items-center">
      <div>
        <img src={U} alt="" className="w-12 h-12 rounded-full" />
      </div>
      <div className="w-full line-clamp-1">
        <div className="flex w-full justify-start gap-2 items-center">
          <p className="line-clamp-1">{member?.fname + " " + member?.lname}</p>
          {role === "Admin" && (
            <p className="bg-purple-500 text-white font-semibold text-xs px-1  rounded-full">
              {role}
            </p>
          )}
        </div>
        <p className="text-xs text-gray-400">{member?.email}</p>
      </div>
    </div>
  );
};

export default Member;
