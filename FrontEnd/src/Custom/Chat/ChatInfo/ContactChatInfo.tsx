import User from "../../../assets/manprvtcaht.png";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import api from "../../../axiosConfig";
import useStore from "../../../store";
import GroupInCommon from "./GroupInCommon";
import { ContactChatInfoProps, Group, User as U } from "../../../Types";

const ContactChatInfo: React.FC<ContactChatInfoProps> = ({
  data,
  setForRender,
  toggleInfo,
}) => {
  const { userId, selectedPrivateChatId, setSelectedFriend } = useStore();
  const [contact, setContact] = useState<U | null>();
  const [commonGroup, setCommonGroup] = useState<Group[]>();
  const [forRendering, setForRendering] = useState(0);
  function fetchCommonGroups(): void {
    api
      .get(`api/v1/groupmember/commonGroups`, {
        params: {
          userId1: userId,
          userId2: selectedPrivateChatId,
        },
      })
      .then((res) => {
        const data = res.data.data.commonGroups;
        setCommonGroup(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    setContact(data);
    if (userId && selectedPrivateChatId) {
      fetchCommonGroups();
    }
  }, [data, contact, forRendering]);
  const unFriend = (): void => {
    api
      .delete(`api/v1/friend/unfriend`, {
        data: { userId, friendId: contact?.email },
      })
      .then((res) => {
        setForRender((pre: any) => pre + 1);
        setSelectedFriend(null);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className="flex flex-col justify-center  items-center bg-[#404040] p-5 gap-1">
        <img
          src={contact?.avatar ? contact.avatar : User}
          alt=""
          className="w-[50%] h-[50%] rounded-full"
        />
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
        <p
          className="cursor-pointer"
          onClick={() => {
            unFriend();
            toggleInfo();
          }}
        >
          <DeleteIcon /> UnFriend
        </p>
      </div>
    </>
  );
};

export default ContactChatInfo;
