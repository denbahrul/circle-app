import { Request, Response } from "express";
import { CreateReplySchema } from "../utils/schemas/reaction.schema";
import reactionSevices from "../services/reaction.sevices";
import cloudinaryServices from "../services/cloudinary.services";

class ReactionController {
  async reply(req: Request, res: Response) {
    // #swagger.tags = ['Reaction']
    // #swagger.summary = 'Create new Reply'
    /*  #swagger.requestBody = {
                required: true,
                content: {
                    "multipart/form-data": {
                        schema: {
                            $ref: "#/components/schemas/createReplySchema"
                        }  
                    }
                }
            } 
        */
    try {
      const authorId = (req as any).user.id;
      const { id } = req.params;
      const threadId = Number(id);
      const { content } = req.body;
      const fileUpload = req.file;

      let imageUrl = null;

      if (fileUpload) {
        const image = await cloudinaryServices.upload(fileUpload as Express.Multer.File);
        imageUrl = image.secure_url;
      }

      const reply = await reactionSevices.createReply({
        threadId,
        content,
        image: imageUrl,
        authorId,
      });

      res.json(reply);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async deleteReply(req: Request, res: Response) {
    // #swagger.tags = ['Reaction']
    // #swagger.summary = 'Delete reply'
    try {
      const { id } = req.params;
      const thread = await reactionSevices.deleteReply(Number(id));
      res.json({
        status: "success",
        message: "Reply deleted",
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async likeReplies(req: Request, res: Response) {
    // #swagger.tags = ['Reaction']
    // #swagger.summary = 'Like a thread reply'
    /*  #swagger.requestBody = {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/likeRepliesSchema"
                        }  
                    }
                }
            } 
        */
    try {
      const authorId = (req as any).user.id;
      const { repliesId } = req.body;
      const isLike = await reactionSevices.isLikeReplies({ repliesId, authorId });
      if (!isLike) {
        const like = await reactionSevices.likeReplies({
          repliesId,
          authorId,
        });
        res.json(like);
      } else {
        const like = await reactionSevices.unlikeReplies({ repliesId, authorId });

        res.json(like);
      }
    } catch (error) {
      console.log(error);

      res.status(500).json(error);
    }
  }

  async isLike(req: Request, res: Response) {
    // #swagger.tags = ['Reaction']
    // #swagger.summary = 'Thread isLike'
    /*  #swagger.requestBody = {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/likeSchema"
                        }  
                    }
                }
            } 
        */
    try {
      const authorId = (req as any).user.id;
      const { threadId } = req.body;
      const like = await reactionSevices.isLike({
        threadId,
        authorId,
      });
      res.json(like);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async like(req: Request, res: Response) {
    // #swagger.tags = ['Reaction']
    // #swagger.summary = 'Like a thread'
    /*  #swagger.requestBody = {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/likeSchema"
                        }  
                    }
                }
            } 
        */
    try {
      const authorId = (req as any).user.id;
      const { threadId } = req.body;
      const isLike = await reactionSevices.isLike({ threadId, authorId });
      if (!isLike) {
        const like = await reactionSevices.like({
          threadId,
          authorId,
        });
        res.json(like);
      } else {
        const like = await reactionSevices.unlike({ threadId, authorId });

        res.json(like);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async unlike(req: Request, res: Response) {
    // #swagger.tags = ['Reaction']
    // #swagger.summary = 'Unlike a thread'
    try {
      const authorId = (req as any).user.id;
      const threadId = Number(req.params.id);
      const unLike = await reactionSevices.unlike({ threadId, authorId });
      res.json(unLike);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

export default new ReactionController();
