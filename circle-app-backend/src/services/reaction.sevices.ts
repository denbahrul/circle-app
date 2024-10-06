import { Like, LikeReply, PrismaClient, Reply } from "@prisma/client";
import { CreateReplyDTO, LikeDTO, LikeRepliesDTO } from "../dto/reaction.dto";
import { customError } from "../types/custom-error";
import { SuccessResponse } from "../types/success-respons";

const prisma = new PrismaClient();

class ReactionServices {
  async createReply(data: CreateReplyDTO): Promise<SuccessResponse<Reply | null>> {
    const result = await prisma.reply.create({ data });
    return {
      status: "success",
      message: "Reply Created",
      data: result,
    };
  }

  async deleteReply(id: number): Promise<Reply | null> {
    const reply = await prisma.reply.findUnique({
      where: { id },
    });

    if (!reply) {
      throw {
        status: 404,
        message: "Reply Not Found!",
        code: "REPLY_NOT_EXIST",
      } as customError;
    }

    return await prisma.reply.delete({
      where: { id },
    });
  }

  async isLikeReplies(data: LikeRepliesDTO) {
    const like = await prisma.likeReply.findFirst({
      where: {
        repliesId: data.repliesId,
        authorId: data.authorId,
      },
    });

    if (like) {
      return true;
    }

    return false;
  }

  async likeReplies(data: LikeRepliesDTO): Promise<SuccessResponse<LikeReply | null>> {
    const like = await prisma.likeReply.findFirst({
      where: {
        repliesId: data.repliesId,
        authorId: data.authorId,
      },
    });

    if (like) {
      throw {
        status: "fail",
        message: "You have already liked this reply",
      };
    }
    const likes = await prisma.likeReply.create({ data });

    return {
      status: "success",
      message: "Reply liked",
    };
  }

  async unlikeReplies(data: LikeRepliesDTO): Promise<SuccessResponse<Like | null>> {
    const likeRecord = await prisma.likeReply.findFirst({
      where: {
        repliesId: data.repliesId,
        authorId: data.authorId,
      },
    });

    if (!likeRecord) {
      throw new Error("Like replies not found");
    }

    const unLike = await prisma.likeReply.delete({
      where: {
        id: likeRecord.id,
      },
    });

    return {
      status: "success",
      message: "Reply unliked",
    };
  }

  // =============================== LIKE ============================================

  async isLike(data: LikeDTO) {
    const like = await prisma.like.findFirst({
      where: {
        threadId: data.threadId,
        authorId: data.authorId,
      },
    });

    if (like) {
      return true;
    }

    return false;
  }

  async like(data: LikeDTO): Promise<SuccessResponse<Like | null>> {
    const like = await prisma.like.findFirst({
      where: {
        threadId: data.threadId,
        authorId: data.authorId,
      },
    });

    if (like) {
      throw {
        status: "fail",
        message: "You have already liked this thread",
      };
    }
    const likes = await prisma.like.create({ data });

    return {
      status: "success",
      message: "Thread liked",
    };
  }

  async unlike(data: LikeDTO): Promise<SuccessResponse<Like | null>> {
    const likeRecord = await prisma.like.findFirst({
      where: {
        threadId: data.threadId,
        authorId: data.authorId,
      },
    });

    if (!likeRecord) {
      throw new Error("Like not found");
    }

    const unLike = await prisma.like.delete({
      where: {
        id: likeRecord.id,
      },
    });

    return {
      status: "success",
      message: "Thread unliked",
    };
  }
}

export default new ReactionServices();
