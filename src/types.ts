// src/types.ts

export type TUser = {
  id: number;
  username: string;
  imageData: string | null;
  name: string;
};

export type TPost = {
  id: number;
  user: TUser;
  imageData: string;
  content: string;
  likeCount: number;
  isLike: boolean;
  createdAt: string;
};
