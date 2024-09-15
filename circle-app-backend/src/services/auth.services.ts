import { PrismaClient, User } from "@prisma/client";
import { RegisterDTO } from "../dto/auth.dto";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

class AuthServices {
  async register(data: RegisterDTO): Promise<User | null> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);

    return await prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
  }

  async login() {}
}

export default new AuthServices();
