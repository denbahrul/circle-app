import { PrismaClient } from "@prisma/client";
import { customError } from "../types/custom-error";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import { error, info, log } from "console";
import { SuccessResponse } from "../types/success-respons";

const prisma = new PrismaClient();

class ResetPasswordServices {
  async sendEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      throw {
        status: 404,
        message: "Email Not Found!",
        code: "EMAIL_NOT_EXIST",
      } as customError;
    }

    const secretKey = process.env.JWT_SECRET_KEY as string;
    const expiresAt = new Date(Date.now() + 1800000);

    const token = jwt.sign({ userId: user.id, email: { email } }, secretKey);

    await prisma.passwordResetToken.create({
      data: {
        expiresAt,
        token,
        userId: user.id,
      },
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_NAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOption = {
      from: process.env.RESET_PASSWORD_EMAIL,
      to: email,
      subject: "Circle App - Password reset",
      text: `Click the following link to reset your password : http://localhost:5173/reset-password/${token}`,
    };

    transporter.sendMail(mailOption, (error, info) => {
      if (error) {
        console.log(error);
        throw {
          status: 500,
          message: "Error sending email!",
        };
      } else {
        console.log(`Email sent: ${info.response}`);
        return "Check your email for instructions on resetting your password";
      }
    });
  }

  async resetPassword(token: string, newPassword: string): Promise<SuccessResponse<string>> {
    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
    });

    if (!resetToken || resetToken.expiresAt < new Date()) {
      throw {
        status: 400,
        message: "Token is invalid or has expired",
        code: "TOKEN_INVALID",
      };
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: {
        id: resetToken.userId,
      },
      data: {
        password: hashedPassword,
      },
    });

    return {
      status: "success",
      message: "Password has been reset successfully",
    };
  }
}

export default new ResetPasswordServices();
