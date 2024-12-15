import { useEffect } from "react";
import { Group, User } from "../../../Types";
import DummyElement from "./DummyElement";
import GroupChatContent from "./GroupChatContent";
import PrivateChatContent from "./PrivateChatContent";
import useStore from "../../../store";
// import { ChatContentProps } from "../../../Types";

export interface ChatContentProps {
  InfoOn: boolean;
  toggleInfo: () => void;
  // data: {
  //   privateChat: AllPrivateMessages[] | undefined;
  //   groupChat: AllGroupMessages[] | undefined;
  // };
  contact: User | null;
  socket: any;
  group: Group | null;
  setStatus: any;
  setForRendering: any;
  setSelectedContact: any;
  setSelectedGroup: any;
}
const ChatContent: React.FC<ChatContentProps> = ({
  InfoOn,
  toggleInfo,
  // data,
  socket,
  contact,
  group,
  setStatus,
  setForRendering,
}) => {
  const { selectedFriend, selectedGrp } = useStore();
  useEffect(() => {}, [selectedFriend]);
  return (
    <>
      {!selectedFriend && !selectedGrp && <DummyElement />}
      {selectedFriend && (
        <PrivateChatContent
          InfoOn={InfoOn}
          toggleInfo={toggleInfo}
          // data={data}
          socket={socket}
          contact={contact}
          setStatus={setStatus}
        />
      )}
      {selectedGrp && (
        <GroupChatContent
          InfoOn={InfoOn}
          toggleInfo={toggleInfo}
          socket={socket}
          // data={data}
          group={group}
          setForRendering={setForRendering}
        />
      )}
    </>
  );
};

export default ChatContent;
