import { SetStateAction } from 'react';
export interface Info {
  name: string;
  birth: string;
  email: string;
  password: string;
}

export interface InputRef {
  current: HTMLInputElement;
}
export interface ChatDataProps {
  open: boolean;
  data: ChatDataObj[];
  opId: number;
  roomId: string;
  nickname: string;
}

export interface ChatListProps {
  id: number;
  nickname: string;
  recentMsg: string;
  sendTime: string;
  roomId: string;
  data: React.Dispatch<React.SetStateAction<ChatDataProps>>;
  active: string;
}

export interface ChatMsgProps {
  text: string;
  sendTime: string;
}

export interface SendMsgProps {
  userId: number;
  chatlist?: any;
}
export interface UserProps {
  id: number;
  username: string;
  birth: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

export interface EditorProps {
  body: string;
  setBody: React.Dispatch<SetStateAction<string>>;
}
export interface ThemeStyle {
  color: string;
  background: string;
  fontWeight?: string;
}

export interface ColorObject {
  color: string;
  background: string;
}

export interface BlogObject {
  id: number;
  blogTitle: string;
  nickname: string;
  writerImg?: string | null;
  subscribeCount?: number;
  memberId?: number | null;
  view?: number;
}
export interface PostObject {
  id: number;
  postTitle: string;
  content: string;
  hashtag: any[];
  likeCount?: number;
  categoryId?: number | null;
  createdAt?: string;
  blogId?: number;
  view?: number;
}

export interface OtherPostObj {
  id: number;
  postTitle: string;
}

export interface CommentObj {
  id: number;
  memberId: number;
  content: string;
  isSecret: number;
  parentIndex: number | null;
  createdAt: string;
  nickname: string;
}

export interface WriterInfoObj {
  memberId: number;
  nickname: string;
  subscribeCount: number;
  postCount: number;
  blogInfo: string;
}
export interface PostInfoObj {
  memberId: number;
  blogId: number;
  nickname: string;
  title: string;
  content: string;
  createdAt: string;
}

export interface CategoryObj {
  id: number;
  categoryName: string;
  group: string;
}

export interface ChatDataObj {
  id?: number;
  chatMsg?: string;
  createdAt?: string;
  userId?: number;
}
