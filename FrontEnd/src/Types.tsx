import { Socket } from "socket.io-client";

export interface CustomDropDownProps {
  table: {
    option: string;
    action: () => void;
  }[];
}

export interface SideBarProps {
  data: {
    friendsCount: number;
    groupsCount: number;
    privateChatCount: number;
    groupChatCount: number;
    blockedFriendsCount: number;
    unreadGroupMessagesCount: number;
    unreadPrivateMessagesCount: number;
  };
  option: (option: string) => void;
}

export interface ChatInfoProps {
  InfoOn: boolean;
  toggleInfo: () => void;
  data: {};
  selectedCnt: any;
  selectedGrp: any;
  allMembers: any;
}

export interface GroupInterface {
  name: string;
  id: number;
  description: string;
  avatar: string | null;
}
export interface GroupMessage {}
export interface PrivateMessage {
  content: string;
  createdAt: string;
  fromUserId: string;
  id: number;
  seenStatus: "Not Seen" | "Seen";
  toUserId: string;
  updatedAt: string | null;
}
export interface FriendToAddProps {
  friend: any;
  onCheckboxChange: (friendId: string) => void;
  isChecked: boolean;
}
export interface User {
  avatar: string | null;
  createdAt: string | null;
  deletedAt: string | null;
  email: string;
  fname: string;
  lname: string;
  password: string;
  status: "offline" | "online";
  updatedAt: string | null;
}
export interface Group {
  adminId: string;
  avatar: string | null;
  createdAt: string;
  description: string;
  id: number;
  name: string;
  updatedAt: string | null;
}
export interface UnreadPrivateMessage {
  fromUser: User;
  fromUserId: string;
  unreadCount: string;
}

export interface UnreadGroupMessage {
  message: Message[];
}

interface Message {
  content: string;
  createdAt: string;
  fromUserId: string;
  id: number;
  sentAt: string;
  toGroupId: number;
  updatedAt: string | null;
  group: Group;
}

export interface BlockedFriends {
  friendId: string;
  id: number;
  status: "Blocked" | "Pending" | "Accepted";
  updatedAt: string | null;
  userId: string;
  clearedAt: string | null;
  createdAt: string;
  friend: User;
}

export interface AllPrivateMessages {
  message: {
    content: string;
    createdAt: string;
    fromUserId: string;
    id: number;
    seenStatus: "Seen" | "Not Seen";
    toUserId: string;
    updatedAt: string | null;
  };
}
export interface AllGroupMessages {
  message: {
    content: string;
    fromUserId: string;
    id: number;
    toGroupId: number;
    user: User;
  };
  messageStatus: {
    createdAt: string;
    id: number;
    isDeleted: boolean;
    messageId: number;
    seenStatus: "Not Seen" | "Seen";
    updatedAt: string | null;
    userId: string;
  };
}

export interface GroupChatInfoProps {
  data: Group;
}
export interface Member {
  clearedAt: string | null;
  createdAt: string;
  groupId: number;
  id: number;
  joinedAt: string;
  leftAt: string | null;
  memberId: string;
  membershipStatus: "Pending" | "Left" | "Accepted";
  role: "Admin" | "Regular";
  updatedAt: string | null;
  member: User;
}

export interface MemberProps {
  data: Member;
  group: Group;
  setForRendering: any;
}
export interface AddGroupMembersProps {
  setMenuOption: (option: string | null) => void;
  groupId: number | undefined;
  setForRendering: any;
}
export interface ChatListProps {
  data: {
    allFriends: User[] | undefined;
    allGroups: Group[] | undefined;
    blockedFriends: BlockedFriends[] | undefined;
    unreadGroupMessages: UnreadGroupMessage[] | undefined;
    unreadPrivateMessages: UnreadPrivateMessage[] | undefined;
    friendsCount: number;
    groupsCount: number;
  };
  // socket: any;
  onContactClick: (contact: User) => void;
  onGroupClick: (group: Group) => void;
  selectedOption: string | undefined;
}

export interface ContactProps {
  data: User;
  onClick: () => void;
}

export interface GroupProps {
  data: Group;
  onClick: () => void;
}

export interface ChatContentProps {
  InfoOn: boolean;
  toggleInfo: () => void;
  // data: {
  //   privateChat: AllPrivateMessages[] | undefined;
  //   groupChat: AllGroupMessages[] | undefined;
  // };
  contact: User | null;
  group: Group | null;
}

export interface GroupMessageInterface {
  data: AllGroupMessages;
  socket: any;
  setMessages: any;
  groupId: any;
}

export interface GroupChatContentProps {
  InfoOn: boolean;
  toggleInfo: () => void;
  // data: {
  //   privateChat: AllPrivateMessages[] | undefined;
  //   groupChat: AllGroupMessages[] | undefined;
  // };
  group: Group | null;
  socket: any;
  setForRendering: any;
}

export interface PrivateChatContentProps {
  InfoOn: boolean;
  toggleInfo: () => void;
  // data: {
  //   privateChat: AllPrivateMessages[] | undefined;
  //   groupChat: AllGroupMessages[] | undefined;
  // };
  socket: any;
  contact: User | null;
  setStatus: any;
}

export interface CommonGroupProps {
  data: Group;
}

export interface ContactChatInfoProps {
  data: User | null;
  setForRender: any;
  // onClick: () => void;
}
