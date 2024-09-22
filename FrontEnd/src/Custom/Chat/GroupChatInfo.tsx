import User from "../../assets/manprvtcaht.png";
import DeleteIcon from "@mui/icons-material/Delete";
import AppBlockingIcon from "@mui/icons-material/AppBlocking";
import { useEffect, useState } from "react";
import Member from "./Member";
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
}
const GroupChatInfo: React.FC<GroupChatInfoProps> = ({ data }) => {
  const [group, setGroup] = useState<GroupChatInfoProps["data"]>();

  useEffect(() => {
    console.log(data);
    setGroup(data);
  }, [data]);
  return (
    <>
      <div className="flex flex-col justify-center  items-center bg-[#404040] p-5 gap-1">
        <img src={User} alt="" className="w-[100%] h-[100%] rounded-full" />
        <p className="text-[#e5e5e7]">{group?.name}</p>
      </div>
      <div className=" w-full  h-[40%] ">
        <p className="bg-[#404040] text-center">Members Of Group</p>
        <div className="bg-[#404040] w-full h-full flex flex-col justify-start items-start pl-4 gap-1 py-2 overflow-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-[#363638]">
          <Member />
        </div>
      </div>
      <div className="bg-[#404040]  w-full flex flex-col justify-center  text-red-700 font-semibold items-start pl-4 gap-2 py-2">
        <p className="cursor-pointer">
          <DeleteIcon /> Delete Chat
        </p>
        <p className="cursor-pointer">
          <AppBlockingIcon /> Block
        </p>
      </div>
    </>
  );
};

export default GroupChatInfo;
