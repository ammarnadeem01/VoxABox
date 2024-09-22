import User from "../../assets/manprvtcaht.png";
import DeleteIcon from "@mui/icons-material/Delete";
import AppBlockingIcon from "@mui/icons-material/AppBlocking";
import { useEffect, useState } from "react";
import api from "../../../axiosConfig";
import useStore from "../../../store";
import GroupInCommon from "../GroupInCommon";
interface ContactChatInfoProps {
  data: {
    avatar: string | null;
    createdAt: string;
    deletedAt: string | null;
    email: string;
    fname: string;
    lname: string;
    password: string;
    status: "offline" | "onlinne";
    updatedAt: string | null;
  };
}
interface Group {
  adminId: string;
  avatar: string | null;
  createdAt: string;
  description: string;
  id: number;
  name: string;
  updatedAt: string | null;
}
const ContactChatInfo: React.FC<ContactChatInfoProps> = ({ data }) => {
  const { userId, selectedPrivateChatId } = useStore();
  const [contact, setContact] = useState<ContactChatInfoProps["data"]>();
  const [commonGroup, setCommonGroup] = useState<Group[]>();
  function fetchCommonGroups() {
    api
      .get(`api/v1/groupmember/commonGroups`, {
        params: {
          userId1: userId,
          userId2: selectedPrivateChatId.email,
        },
      })
      .then((res) => {
        const data = res.data.data.commonGroups;
        console.log("data", res.data.data.commonGroups);
        setCommonGroup(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    setContact(data);
    if (userId && selectedPrivateChatId) {
      console.log(1);
      fetchCommonGroups();
    }
  }, [data, contact]);
  return (
    <>
      <div className="flex flex-col justify-center  items-center bg-[#404040] p-5 gap-1">
        <img src={User} alt="" className="w-[50%] h-[50%] rounded-full" />
        <p className="text-[#e5e5e7]">
          {contact?.fname + " " + contact?.lname}
        </p>
        <p className="text-[#e5e5e7]">{contact?.email}</p>
      </div>
      <div className=" w-full  h-[40%] ">
        <p className="bg-[#404040] text-center">
          {commonGroup?.length}&nbsp; Group(s) in common
        </p>
        <div className="bg-[#404040] w-full h-full flex flex-col justify-start items-start pl-4 gap-1 py-2 overflow-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-[#363638]">
          {commonGroup?.map((group) => (
            <GroupInCommon data={group} />
          ))}
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

export default ContactChatInfo;
