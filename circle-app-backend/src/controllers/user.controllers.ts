import { Request, Response } from "express";
import Hello from "../services/hello.services";
import UserServices from "../services/user.services";

class UserController {
  async find(req: Request, res: Response) {
    try {
      const users = await UserServices.getAllUsers();
      res.json(users);
    } catch (error: unknown) {
      res.json(error);
    }
  }

  async create(req: Request, res: Response) {
    try {
      const value = req.body;

      const user = await UserServices.createUser(value);
      res.json(user);
    } catch (error) {
      res.json(error);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const value = req.body;

      const user = await UserServices.updateUser(value);
      res.json(user);
    } catch (error) {
      res.json(error);
    }
  }
}

export default new UserController();
