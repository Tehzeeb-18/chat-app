export interface User {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  createdAt: Date;
}

export interface Message {
  id: string;
  content: string;
  createdAt: Date;
  read: boolean;
  delivered: boolean;
  senderId: string;
  receiverId: string;
  conversationId: string;
  sender: User;
  receiver: User;
  type?: string;
  fileUrl?: string | null;
  fileName?: string | null;
  fileSize?: number | null;
  fileMimeType?: string | null;
}

export interface Conversation {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  participants: User[];
  messages: Message[];
  lastMessage?: Message;
  unreadCount?: number;
}

export interface TypingStatus {
  userId: string;
  conversationId: string;
  isTyping: boolean;
}

export interface OnlineStatus {
  userId: string;
  isOnline: boolean;
  lastSeen?: Date;
}
