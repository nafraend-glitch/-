export interface SubSection {
  id: string;
  number: string;
  title: string;
  summary: string;
  content: string;
  keyPoints?: string[];
  specs?: Record<string, string | number>;
  mockupText?: string;
  codeSnippet?: {
    language: string;
    code: string;
    caption: string;
  };
}

export interface Section {
  id: string;
  number: string;
  title: string;
  englishTitle: string;
  icon: string;
  summary: string;
  subsections: SubSection[];
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  senderRole?: 'user' | 'support' | 'member' | 'bot';
  text: string;
  timestamp: string;
  status: 'sending' | 'sent' | 'delivered' | 'read';
  isMe: boolean;
  replyTo?: {
    senderName: string;
    text: string;
  };
  reaction?: string;
  mediaType?: 'image' | 'audio' | 'document';
  mediaUrl?: string;
  mediaDuration?: string;
  mediaFileName?: string;
}

export interface ChatThread {
  id: string;
  type: 'direct' | 'group' | 'support';
  title: string;
  avatar: string;
  online: boolean;
  lastSeen?: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  pinned: boolean;
  muted: boolean;
  typing?: boolean;
  messages: ChatMessage[];
  membersCount?: number;
}

export interface DesignToken {
  category: string;
  name: string;
  lightValue: string;
  darkValue: string;
  usage: string;
  contrastRatio?: string;
}
