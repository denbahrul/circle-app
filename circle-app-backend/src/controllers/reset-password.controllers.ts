import { Request, Response } from "express";
import resetPasswordServices from "../services/reset-password.services";

class ResetPasswordController {
  async forgotPassword(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const token = await resetPasswordServices.sendEmail(email);
      res.json(token);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async resetPassword(req: Request, res: Response) {
    try {
      const { token } = req.params;
      const { newPassword } = req.body;

      const reset = await resetPasswordServices.resetPassword(token, newPassword);
      res.json(reset);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

export default new ResetPasswordController();
