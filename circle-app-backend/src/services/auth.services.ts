import { PrismaClient, User } from "@prisma/client";
import { LoginDTO, RegisterDTO } from "../dto/auth.dto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { customError } from "../types/custom-error";
import { SuccessResponse } from "../types/success-respons";
import UserRepositories from "../repositories/user";

const prisma = new PrismaClient();

class AuthServices {
  async register(data: RegisterDTO): Promise<SuccessResponse<{ user: Omit<User, "password"> }>> {
    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (data.email == user?.email) {
      throw {
        status: "fail",
        message: "Email already use",
      };
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);
    let generateUsername;
    let existedUsername;

    do {
      const randomMath = Math.floor(Math.random() * 1000);
      const emailSplit = data.email.split("@")[0];
      generateUsername = `${emailSplit}${randomMath}`;

      existedUsername = await UserRepositories.getUserByUsername(generateUsername);
    } while (existedUsername);

    const { password, ...result } = await prisma.user.create({
      data: {
        ...data,
        username: generateUsername,
        password: hashedPassword,
      },
    });

    return {
      status: "success",
      message: "User Created",
      data: {
        user: result,
      },
    };
  }

  async login(data: LoginDTO): Promise<SuccessResponse<{ user?: Omit<User, "password">; accessToken: string }>> {
    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
      include: {
        followers: true,
        following: true,
      },
    });

    if (!user) {
      throw {
        code: "USER_NOT_EXIST",
        status: 404,
        message: "Incorrect Email / Password",
      } as customError;
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
      throw {
        code: "USER_NOT_EXIST",
        status: 404,
        message: "Incorrect Email / Password",
      } as customError;
    }

    const { password, ...userToSign } = user;

    const secretKey = process.env.JWT_SECRET_KEY as string;

    const token = jwt.sign(userToSign, secretKey);

    return {
      status: "success",
      message: "User logged succesfully",
      data: {
        accessToken: token,
        user: userToSign,
      },
    };
  }
}

export default new AuthServices();
