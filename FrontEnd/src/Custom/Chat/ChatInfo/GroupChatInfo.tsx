import User from "../../../assets/manprvtcaht.png";
import DeleteIcon from "@mui/icons-material/Delete";
import AppBlockingIcon from "@mui/icons-material/AppBlocking";
import { useEffect, useState } from "react";
import Member from "./Member";
import api from "../../../axiosConfig";
import useStore from "../../../store";
import AddGroupMembers from "../ChatList/AddGroupMembers";
interface GroupChatInfoProps {
  data: {
    adminId: string;
    avatar: string | null;
    createdAt: string;
    description: string;
    id: number;
    name: string;
    updatedAt: string | null;
  };
  allMembers: any;
}
const GroupChatInfo: React.FC<GroupChatInfoProps> = ({ data, allMembers }) => {
  const { userId } = useStore();
  const [group, setGroup] = useState<GroupChatInfoProps["data"]>();
  const [mem, setMem] = useState<any[]>();
  const [ErrorMessage, setErrorMessage] = useState("");
  const [option, setOption] = useState("");
  function members() {
    api
      .get(`api/v1/groupmember/allMembers/${group?.id}`)
      .then((res) => {
        const data = res.data.data.group_members;
        setMem(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function addGrpMembers() {
    setOption("addGroupMembers");
  }

  useEffect(() => {
    setGroup(data);
    members();
  }, [data, allMembers]);

  function deleteGroup() {
    api
      .delete(`api/v1/group`, {
        data: { memberId: userId, groupId: group?.id },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message);
        console.log(err);
      });
  }
  return (
    <>
      {option === "addGroupMembers" && (
        <AddGroupMembers setMenuOption={setOption} groupId={group?.id} />
      )}
      {!option && (
        <>
          <div className="flex flex-col justify-center  items-center bg-[#404040] p-5 gap-1">
            <img src={User} alt="" className="w-[75%] h-[75%] rounded-full" />
            <p className="text-[#e5e5e7]">{group?.name}</p>
          </div>
          <div className=" w-full  h-[40%] ">
            <p className="bg-[#404040] text-center font-semibold py-1">
              {mem?.length}&nbsp; Member(s) Of Group
            </p>
            <div className="bg-[#404040] w-full h-full flex flex-col justify-start items-start pl-4 gap-1 py-2 overflow-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-[#363638]">
              {mem?.map((mem) => (
                <Member data={mem} />
              ))}
            </div>
          </div>
          <div className="bg-[#404040]  w-full flex flex-col justify-center  text-red-700 font-semibold items-start pl-4 gap-2 py-2">
            {ErrorMessage && <p className="text-red-600">{ErrorMessage}</p>}
            <p className="cursor-pointer" onClick={deleteGroup}>
              <DeleteIcon /> Delete Group
            </p>
            <p className="cursor-pointer" onClick={addGrpMembers}>
              <AppBlockingIcon /> Add Group Members
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default GroupChatInfo;
