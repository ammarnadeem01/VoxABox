import GroupChatContent from "./GroupChatContent";
import PrivateChatContent from "./PrivateChatContent";
import { ChatContentProps } from "../../../Types";

const ChatContent: React.FC<ChatContentProps> = ({
  InfoOn,
  toggleInfo,
  data,
  contact,
  group,
}) => {
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
        />
      )}
    </>
  );
};

export default ChatContent;
