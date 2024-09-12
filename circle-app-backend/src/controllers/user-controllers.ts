import { Request, Response } from "express";
import Hello from "../services/hello-services";
import { getAllUsers } from "../services/user-services";

export async function UsersController(req: Request, res: Response) {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error: unknown) {
    res.status(404).json({
      messages: "404 Not Found",
    });
  }
}
