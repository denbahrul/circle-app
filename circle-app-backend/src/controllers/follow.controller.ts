import { Request, Response } from "express";
import followServices from "../services/follow.services";

class FollowController {
  async follow(req: Request, res: Response) {
    // #swagger.tags = ['Follow']
    // #swagger.summary = 'Follow User'
    /*  #swagger.requestBody = {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/followSchema"
                        }  
                    }
                }
            } 
        */
    try {
      const followingId = (req as any).user.id;
      const { followersId } = req.body;

      const follow = await followServices.follow({ followingId, followersId });

      res.json(follow);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async unfollow(req: Request, res: Response) {
    // #swagger.tags = ['Follow']
    // #swagger.summary = 'Unollow User'
    try {
      const { userId } = req.body;
      const unfollow = await followServices.unfollow(userId);
      res.json(unfollow);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async followList(req: Request, res: Response) {
    // #swagger.tags = ['Follow']
    // #swagger.summary = 'Following and Followers List'
    try {
      const userId = (req as any).user.id;
      const follows = await followServices.followList(userId);
      res.json(follows);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

export default new FollowController();
