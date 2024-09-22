import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import ContactChatInfo from "../ChatInfo/ContactChatInfo";
import GroupChatInfo from "../ChatInfo/GroupChatInfo";
interface ChatInfoProps {
  InfoOn: boolean;
  toggleInfo: () => void;
  data: {};
  selectedCnt: any;
  selectedGrp: any;
  allMembers: any;
}
const ChatInfo: React.FC<ChatInfoProps> = ({
  InfoOn,
  toggleInfo,
  data,
  selectedCnt,
  selectedGrp,
  allMembers,
}) => {
  const [contact, setContact] = useState();
  const [group, setGroup] = useState();

  useEffect(() => {
    setContact(selectedCnt);
    setGroup(selectedGrp);
  }, [data, selectedCnt, selectedGrp]);
  return (
    <div
      className={`${
        InfoOn ? "w-1/5" : "hidden"
      } h-full text-white   flex flex-col flex-wrap`}
    >
      <div className="w-full max-h-full flex flex-col justify-start items-center gap-2">
        {/* menu btn */}
        <div className="w-full flex justify-start items-start text-5xl">
          <CloseIcon
            fontSize="inherit"
            className="cursor-pointer"
            onClick={toggleInfo}
          />
        </div>
        {/* start */}
        {contact && <ContactChatInfo data={contact} />}
        {group && <GroupChatInfo data={group} allMembers={allMembers} />}
        {/* end */}
      </div>
    </div>
  );
};

export default ChatInfo;
