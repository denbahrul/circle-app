import { PrismaClient } from "@prisma/client";
import { customError } from "../types/custom-error";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import { error, info, log } from "console";
import { SuccessResponse } from "../types/success-respons";

const prisma = new PrismaClient();

class ResetPasswordServices {
  async sendEmail(email: string): Promise<SuccessResponse<string>> {
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
      html: `
      <html lang="en">
        <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0">
          <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; padding: 20px; border-radius: 8px; text-align: center">
            <h2 style="font-size: 24px; color: #333333">Forget password ?</h2>
            <p style="font-size: 16px; color: #555555">If you've lost your password or wish to reset it, use the link below to get started:</p>
            <a href="http://localhost:5173/reset-password/${token}" style="color: #3498db; text-decoration: none; display: block; margin: 10px 0">http://localhost:5173/reset-password/</a>
            <p style="font-size: 16px; color: #555555">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation.
            </p>
            <a href="http://localhost:5173/reset-password/${token}" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background-color: #04a51e; color: #ffffff; text-decoration: none; font-size: 16px; border-radius: 5px"
              >Reset Your Password</a
            >
          </div>
        </body>
      </html>
      `,
    };

    const response = transporter.sendMail(mailOption, (error, info) => {
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

    return {
      status: "success",
      message: "Check your email for instructions on resetting your password",
    };
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
