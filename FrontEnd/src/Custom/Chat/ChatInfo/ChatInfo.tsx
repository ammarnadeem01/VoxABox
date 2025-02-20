import CloseIcon from "@mui/icons-material/Close";
// import { useEffect, useState } from "react";
import ContactChatInfo from "./ContactChatInfo";
import GroupChatInfo from "./GroupChatInfo";
import { Group, User } from "../../../Types";
interface ChatInfoProps {
  InfoOn: boolean;
  toggleInfo: () => void;
  selectedCnt: User | null;
  selectedGrp: Group | null;
  onContactClick: (contact: User) => void;
  onGroupClick: (group: Group) => void;
  setForRendering: any;
  setSelectedContact: any;
  setSelectedGroup: any;
  socket: any;
}
const ChatInfo: React.FC<ChatInfoProps> = ({
  InfoOn,
  toggleInfo,
  selectedCnt,
  selectedGrp,
  setForRendering,

  socket,
}) => {
  // const [contact, setContact] = useState<User | null>();
  // const [group, setGroup] = useState<Group | null>();

  // useEffect(() => {
  //   setContact(selectedCnt);
  //   setGroup(selectedGrp);
  // }, [selectedCnt, selectedGrp]);
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
        {selectedCnt && (
          <ContactChatInfo
            data={selectedCnt}
            setForRender={setForRendering}
            toggleInfo={toggleInfo}
          />
        )}
        {selectedGrp && (
          <GroupChatInfo
            data={selectedGrp}
            setForRender={setForRendering}
            toggleInfo={toggleInfo}
            socket={socket}
          />
        )}
        {/* end */}
      </div>
    </div>
  );
};

export default ChatInfo;
