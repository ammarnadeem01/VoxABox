import User from "../../../assets/manprvtcaht.png";
import DeleteIcon from "@mui/icons-material/Delete";
import AppBlockingIcon from "@mui/icons-material/AppBlocking";
import { useEffect, useState } from "react";
import Member from "./Member";
import api from "../../../axiosConfig";
import useStore from "../../../store";
import AddGroupMembers from "../ChatList/AddGroupMembers";
import { Group, GroupChatInfoProps, Member as Mem } from "../../../Types";

const GroupChatInfo: React.FC<GroupChatInfoProps> = ({ data }) => {
  const { userId } = useStore();
  // const [group, setGroup] = useState<Group>();
  const [mem, setMem] = useState<Mem[]>();
  const [ErrorMessage, setErrorMessage] = useState<string>("");
  const [option, setOption] = useState<string | null>();
  const [forRendering, setForRendering] = useState(0);
  function members(): void {
    api
      .get(`api/v1/groupmember/allMembers/${data.id}`)
      .then((res) => {
        const data = res.data.data.group_members;
        console.log("siuuuuu", data);
        setMem(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function addGrpMembers(): void {
    setOption("addGroupMembers");
  }

  // useEffect(() => {
  //   setGroup(data);
  //   members();
  // }, [data]);
  useEffect(() => {
    console.log("rendering");
    members();
  }, [forRendering]);
  function deleteGroup(): void {
    api
      .delete(`api/v1/group`, {
        data: { memberId: userId, groupId: data.id },
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
        <AddGroupMembers setMenuOption={setOption} groupId={data.id} />
      )}
      {!option && (
        <>
          <div className="flex flex-col justify-center  items-center bg-[#404040] p-5 gap-1">
            <img src={User} alt="" className="w-[75%] h-[75%] rounded-full" />
            <p className="text-[#e5e5e7]">{data.name}</p>
          </div>
          <div className=" w-full  h-[40%] ">
            <p className="bg-[#404040] text-center font-semibold py-1">
              {mem?.length}&nbsp; Member(s) Of Group
            </p>
            <div className="bg-[#404040] w-full h-full flex flex-col justify-start items-start pl-4 gap-1 py-10 overflow-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-[#363638]">
              {mem?.map((mem) => (
                <Member
                  data={mem}
                  group={data}
                  setForRendering={setForRendering}
                />
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
