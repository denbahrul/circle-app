import { Request, Response } from "express";
import Hello from "../services/hello-services";

export default function HelloController(req: Request, res: Response) {
  try {
    const hello = Hello();
    throw new Error();
    res.send(`${hello}`);
  } catch (error: unknown) {
    res.status(500).json({
      messages: "404 Not Found wkwkwk",
    });
  }
}
