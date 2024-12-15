import { useEffect, useState } from "react";
import U from "../../../assets/manprvtcaht.png";
import * as React from "react";
import type { MemberProps } from "../../../Types";
import api from "../../../axiosConfig";
import useStore from "../../../store";

const Member: React.FC<MemberProps> = ({ data, group, setForRendering }) => {
  const [ErrorMessage, setErrorMessage] = useState("");
  const { userId } = useStore();
  function removeMember(email: string) {
    console.log(email, group.id, group);
    api
      .patch(`api/v1/groupmember`, {
        memberId: email,
        groupId: group.id,
        adminId: group.adminId,
      })
      .then((res) => {
        console.log(res);
        setForRendering((pre: any) => pre + 1);
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage(err.response.data.message);
      });
  }
  useEffect(() => {
    console.log("first,", data);
  }, []);

  return (
    <div className="flex w-full justify-start flex-wrap items-center">
      <div className="flex w-full justify-start items-center gap-1">
        <div>
          <img src={U} alt="" className="w-12 h-12 rounded-full" />
        </div>
        <div className="w-full line-clamp-1">
          <div className="flex w-full justify-start gap-2 items-center">
            <p className="line-clamp-1">
              {data.member.fname + " " + data.member.lname}
            </p>
            {data.role === "Admin" && (
              <p className="bg-purple-500 text-white font-semibold text-xs px-1  rounded-full">
                {data.role}
              </p>
            )}
          </div>
          <p className="text-xs text-gray-400">{data.member.email}</p>
        </div>
      </div>
      {data.role === "Regular" && userId === group.adminId && (
        <p
          className="text-xs text-center cursor-pointer text-red-400"
          onClick={() => removeMember(data.member.email)}
        >
          Remove
        </p>
      )}
      {ErrorMessage && <p className="text-red-600">{ErrorMessage}</p>}
    </div>
  );
};

export default Member;
