export interface Room {
  id: string;
  title: string;
  host: string;
  date: string;
  image: string;
  membersCount: number;
  messageCount: number;
  lastMessageTime: string;
}

export type SortType = '최근순' | '안읽은순';

export interface InitialData {
  isJoined: boolean;
  image?: string;
  title?: string;
  description?: string;
  host?: string;
  hostImage?: string;
  totalMembersCount?: number;
  membersCount?: number;
}

export interface JoinedData extends InitialData {
  messages?: Message[];
  participants?: Participant[];
  images?: ImageInfo[];
}

export interface ImageInfo {
  image: string[];
  uploadDate: string;
  uploader: string;
}

export interface Message {
  id: string;
  user: string;
  image: string;
  text: string;
  images: File[];
  timestamp: string;
  isMine: boolean;
  unseenUserCount: number;
}

export interface Participant {
  user: string;
  image: string;
  isMe: boolean;
}
