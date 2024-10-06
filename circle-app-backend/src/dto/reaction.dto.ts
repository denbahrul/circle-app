export type CreateReplyDTO = {
  threadId: number;
  content: string;
  image?: string | null;
  authorId: number;
};

export type LikeDTO = {
  threadId: number;
  authorId: number;
};
