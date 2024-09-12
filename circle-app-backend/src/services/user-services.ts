import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export async function getAllUsers(): Promise<User[]> {
  return await prisma.user.findMany();
}
