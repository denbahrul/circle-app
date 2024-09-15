import { Request, Response } from "express";
import authServices from "../services/auth.services";
import { RegisterSchema } from "../utils/schemas/auth.schema";

class AuthController {
  async register(req: Request, res: Response) {
    try {
      const value = await RegisterSchema.validateAsync(req.body);
      const user = await authServices.register(value);
      res.json(user);
    } catch (error) {
      res.json(error);
    }
  }

  async login(req: Request, res: Response) {
    try {
      const user = await authServices.login();
      res.json(user);
    } catch (error) {
      res.json(error);
    }
  }
}

export default new AuthController();
