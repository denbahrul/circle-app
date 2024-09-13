import { Request, Response } from "express";
import ThreadServices from "../services/thread.services";

class ThreadController {
  async findAll(req: Request, res: Response) {
    try {
      const threads = await ThreadServices.getAllThreads();
      res.json(threads);
    } catch (error) {
      res.status(404).json({
        messages: "404 Not Found",
      });
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const thread = await ThreadServices.getThreadById(Number(id));
      res.json(thread);
    } catch (error) {
      res.status(404).json({
        messages: "404 Not Found",
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const thread = await ThreadServices.deleteThread(Number(id));
      res.json(thread);
    } catch (error) {
      res.status(404).json({
        messages: "404 Not Found",
      });
    }
  }
}

export default new ThreadController();
