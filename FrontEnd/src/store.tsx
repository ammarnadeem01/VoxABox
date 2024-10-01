import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type UnreadPrivateMessage = {
  fromUser: any;
  fromUserId: string;
  unreadCount: number;
};

type UnreadPrivateMessagesState = {
  unreadPrivateMessages: { data: UnreadPrivateMessage[] };
  setUnreadPrivateMessagesStore: (data: UnreadPrivateMessage[]) => void;
  resetUnreadCountForUser: (fromUserId: string) => void;
};

interface SocketState {
  socketId: string;
  setSocketId: (socketId: string) => void;

  roomId: string | number;
  setRoomId: (roomId: string | number) => void;

  privateMessages: { [key: string]: any[] };
  setPrivateMessages: (roomId: string, message: any) => void;

  groupMessages: { [key: string]: any[] };
  setGroupMessages: (roomId: string, message: any) => void;
}

// Define the state for private chat
interface PrivateChatState {
  selectedFriendId: string | null;
  selectedFriendName: string | null;
  selectedPrivateChatId: any | null;
  onlineStatus: "online" | "offline";
  friends: any[];
  unreadPrivateMessages: { data: UnreadPrivateMessage[] };
  selectedFriend: any;
  setSelectedFriend: (contact: any) => void;
  setUnreadPrivateMessagesStore: (data: any) => void;
  resetUnreadCountForUser: (fromUserId: any) => void;
  setFriends: (data: any[]) => void;
  setOnlineStatus: (status: "online" | "offline") => void;
  setSelectedPrivateChatId: (chatId: string) => void;
  setFriendId: (id: string) => void;
  setFriendName: (name: string) => void;
}

// Define the state for group chat
interface GroupChatState {
  selectedGroupId: string | null;
  selectedGroupName: string | null;
  selectedChatId: number | null;
  setSelectedChat: (chatId: number) => void;
  setGroupId: (id: string) => void;
  setGroupName: (name: string) => void;
  selectedGrp: any;
  setSelectedGrp: (grp: any) => void;
}

// Define the state for user authentication
interface AuthState {
  userId: string | null;
  userAvatar: string | null;
  userName: string | null;
  token: string | null;
  login: (
    userId: string,
    token: string,
    userName: string,
    userAvatar: string
  ) => void;
  logout: () => void;
}

// Combine all states into one function
const useAppStore = (
  set: (
    fn: (
      state: AuthState &
        PrivateChatState &
        GroupChatState &
        SocketState &
        UnreadPrivateMessagesState
    ) => Partial<
      AuthState &
        PrivateChatState &
        GroupChatState &
        SocketState &
        UnreadPrivateMessagesState
    >
  ) => void
): AuthState &
  PrivateChatState &
  GroupChatState &
  SocketState &
  UnreadPrivateMessagesState => ({
  // Socket
  socketId: "",
  roomId: "",
  privateMessages: {},
  groupMessages: {},

  setSocketId: (socketId: string) => set(() => ({ socketId })),

  setRoomId: (roomId: string | number) => set(() => ({ roomId })),

  setPrivateMessages: (roomId: string, message: any) =>
    set((state) => ({
      privateMessages: {
        ...state.privateMessages,
        [roomId]: [...(state.privateMessages[roomId] || []), message],
      },
    })),
  setGroupMessages: (roomId: string, message: any) =>
    set((state) => ({
      privateMessages: {
        ...state.groupMessages,
        [roomId]: [...(state.groupMessages[roomId] || []), message],
      },
    })),

  // Private Chat slice
  selectedFriend: null,
  setSelectedFriend: (contact: any) => set(() => ({ selectedFriend: contact })),
  onlineStatus: "online",
  unreadPrivateMessages: { data: [] },

  setUnreadPrivateMessagesStore: (data: any) =>
    set((state) => ({
      unreadPrivateMessages: { ...state.unreadPrivateMessages, data },
    })),

  resetUnreadCountForUser: (fromUserId) =>
    set((state) => ({
      unreadPrivateMessages: {
        data: state.unreadPrivateMessages.data.map((message: any) =>
          message.fromUserId === fromUserId
            ? { ...message, unreadCount: 0 }
            : message
        ),
      },
    })),
  //
  //
  friends: [],
  setFriends: (data: any[]) => set(() => ({ friends: data })),
  setOnlineStatus: (status: "offline" | "online") =>
    set(() => ({ onlineStatus: status })),
  selectedFriendId: null,
  selectedFriendName: null,
  selectedPrivateChatId: null,
  setSelectedPrivateChatId: (chatId: string) =>
    set(() => ({ selectedPrivateChatId: chatId })),
  setFriendId: (id: string) => set(() => ({ selectedFriendId: id })),
  setFriendName: (name: string) => set(() => ({ selectedFriendName: name })),

  // Group Chat slice
  selectedGrp: null,
  setSelectedGrp: (grp: any) => set(() => ({ selectedGrp: grp })),
  selectedGroupId: null,
  selectedGroupName: null,
  selectedChatId: null,
  setSelectedChat: (chatId: number) => set(() => ({ selectedChatId: chatId })),
  setGroupId: (id: string) => set(() => ({ selectedGroupId: id })),
  setGroupName: (name: string) => set(() => ({ selectedGroupName: name })),

  // Auth slice
  userId: null,
  userAvatar: null,
  userName: null,
  token: null,
  login: (
    userId: string,
    token: string,
    userName: string,
    userAvatar: string
  ) =>
    set(() => ({
      userId,
      token,
      userName,
      userAvatar,
    })),
  logout: () => {
    set(() => ({
      userId: null,
      token: null,
      userName: null,
      userAvatar: null,
    })),
      useStore.persist.clearStorage(); // Clear storage on logout
  },
});

// Pass the function to `create()` and persist
const useStore = create(
  devtools(
    persist(useAppStore, {
      name: "chat-app-storage",
      partialize: (state) => ({
        onlineStatus: state.onlineStatus,
        userId: state.userId,
        token: state.token,
        selectedPrivateChatId: state.selectedPrivateChatId,
        selectedGroupId: state.selectedGroupId,
      }),
    })
  )
);

export default useStore;
