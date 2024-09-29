import { UserEntity } from "./user";

export interface ThreadEntity {
  id: number;
  content: string;
  image?: string;
  author: UserEntity;
  authorId: number;
  replies: any[];
  like: any[];
  createdAt: Date;
  updateAt: Date;
}
