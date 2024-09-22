import { useEffect } from "react";
import GroupChatContent from "./GroupChatContent";
import PrivateChatContent from "./PrivateChatContent";

interface ChatContentProps {
  InfoOn: boolean;
  toggleInfo: () => void;
  data: any;
  contact: any;
  group: any;
  allMembers: any;
}
const ChatContent: React.FC<ChatContentProps> = ({
  InfoOn,
  toggleInfo,
  data,
  contact,
  group,
  allMembers,
}) => {
  useEffect(() => {}, [data, allMembers]);
  return (
    <>
      {contact && (
        <PrivateChatContent
          InfoOn={InfoOn}
          toggleInfo={toggleInfo}
          data={data}
          contact={contact}
        />
      )}
      {group && (
        <GroupChatContent
          InfoOn={InfoOn}
          toggleInfo={toggleInfo}
          data={data}
          group={group}
          members={allMembers}
        />
      )}
    </>
  );
};

export default ChatContent;
