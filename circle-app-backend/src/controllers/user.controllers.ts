import { Request, Response } from "express";
import Hello from "../services/hello.services";
import UserServices from "../services/user.services";

class UserController {
  async find(req: Request, res: Response) {
    try {
      const users = await UserServices.getAllUsers();
      res.json(users);
    } catch (error: unknown) {
      res.status(404).json({
        messages: "404 Not Found",
      });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const value = req.body;

      const user = await UserServices.createUser(value);
      res.json(user);
    } catch (error) {
      res.status(404).json({
        messages: "404 Not Found",
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const value = req.body;

      const user = await UserServices.updateUser(value);
      res.json(user);
    } catch (error) {
      res.status(404).json({
        messages: "404 Not Found",
      });
    }
  }
}

export default new UserController();
