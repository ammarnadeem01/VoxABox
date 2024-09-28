import { Group, User } from "../../../Types";
import GroupChatContent from "./GroupChatContent";
import PrivateChatContent from "./PrivateChatContent";
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
}
const ChatContent: React.FC<ChatContentProps> = ({
  InfoOn,
  toggleInfo,
  // data,
  socket,
  contact,
  group,
}) => {
  return (
    <>
      {contact && (
        <PrivateChatContent
          InfoOn={InfoOn}
          toggleInfo={toggleInfo}
          // data={data}
          socket={socket}
          contact={contact}
        />
      )}
      {group && (
        <GroupChatContent
          InfoOn={InfoOn}
          toggleInfo={toggleInfo}
          socket={socket}
          // data={data}
          group={group}
        />
      )}
    </>
  );
};

export default ChatContent;
