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
      const followersId = (req as any).user.id;
      const { followingId } = req.body;

      const follow = await followServices.follow({ followingId, followersId });

      res.json(follow);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async unfollow(req: Request, res: Response) {
    // #swagger.tags = ['Follow']
    // #swagger.summary = 'Unfollow User'
    try {
      const followersId = (req as any).user.id;
      const followingId = Number(req.params.id);

      const unfollow = await followServices.unfollow({ followingId, followersId });
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
