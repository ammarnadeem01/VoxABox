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
  option: any;
}

export interface AddProps {
  setMenuOption: any;
}
export interface AddGroupProps {
  setMenuOption: any;
  setGroupId: any;
}
export interface AddGroupMembersProps {
  setMenuOption: any;
  groupId: number | undefined;
}
export interface ChatInfoProps {
  InfoOn: boolean;
  toggleInfo: () => void;
  data: {};
  selectedCnt: any;
  selectedGrp: any;
  allMembers: any;
}

export interface Friend {
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
export interface ChatListProps {
  //   data: {
  //     allFriends: Friend[];
  //     allGroups: GroupInterface[];
  //     blockedFriends: Friend[];
  //     unreadGroupMessages: GroupMessage[];
  //     unreadPrivateMessages: PrivateMessage[];
  //     friendsCount: number;
  //     groupsCount: number;
  //   };
  //   onContactClick: any;
  // }
}
export interface ChatListProps {
  data: any;
  onContactClick: any;
  onGroupClick: any;
  selectedOption: any;
}
export interface GroupInterface {
  name: string;
  id: number;
  description: string;
  avatar: string | null;
}
export interface GroupProps {
  data: any;
  //  {
  //   clearedAt: string | null;
  //   createdAt: string;
  //   group: GroupInterface;
  //   groupId: number;
  //   id: number;
  //   joinedAt: string;
  //   leftAt: null;
  //   memberId: string;
  //   membershipStatus: "Pending" | "Left";
  //   role: "Admin" | "Regular";
  //   updatedAt: string | null;
  // };
  onClick: any;
}
export interface Friend {
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
export interface MemberProps {
  data: {
    clearedAt: string | null;
    createdAt: string;
    groupId: number;
    id: number;
    joinedAt: string;
    leftAt: string | null;
    member: User;
    memberId: string;
    membershipStatus: "Pending" | "Left" | "Accepted";
    role: "Admin" | "Regular";
    updatedAt: string | null;
  };
}
export interface CommonGroupProps {
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
export interface GroupChatInfoProps {
  data: {
    adminId: string;
    avatar: string | null;
    createdAt: string;
    description: string;
    id: number;
    name: string;
    updatedAt: string | null;
  };
  allMembers: any;
}
export interface ContactChatInfoProps {
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
export interface Group {
  adminId: string;
  avatar: string | null;
  createdAt: string;
  description: string;
  id: number;
  name: string;
  updatedAt: string | null;
}
export interface PrivateMessageProps {
  data: any;
  // data: {
  //   content: string;
  //   createdAt: string;
  //   fromUserId: string;
  //   id: number;
  //   seenStatus: "Not Seen" | "Seen";
  //   toUserId: string;
  //   updatedAt: string | null;
  // };
}
export interface PrivateChatContentProps {
  InfoOn: boolean;
  toggleInfo: () => void;
  data: any;
  contact: any;
}
export interface Friend {
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
export interface GroupMessageInterface {
  data: {
    message: {
      content: string;
      fromUserId: string;
      id: number;
      toGroupId: number;
      user: Friend;
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
  };
}
export interface GroupChatContentProps {
  InfoOn: boolean;
  toggleInfo: () => void;
  data: any;
  group: any;
  members: any;
}
export interface Friend {
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
// interface ContactProps {
//   data: {
//     clearedAt: string;
//     createdAt: string | null;
//     friend: Friend;
//     friendId: string;
//     id: number;
//     status: "offline" | "online";
//     updatedAt: string | null;
//     userId: string;
//   };

//   onClick: any;
// }
export interface ContactProps {
  data: any;
  onClick: any;
}
export interface ChatContentProps {
  InfoOn: boolean;
  toggleInfo: () => void;
  data: any;
  contact: any;
  group: any;
  allMembers: any;
}
