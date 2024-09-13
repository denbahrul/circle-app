import { PrismaClient, Thread } from "@prisma/client";

const prisma = new PrismaClient();

class ThreadServies {
  async getAllThreads(): Promise<Thread[]> {
    return await prisma.thread.findMany();
  }

  async getThreadById(id: number): Promise<Thread | null> {
    return await prisma.thread.findFirst({
      where: { id },
    });
  }

  async deleteThread(id: number): Promise<Thread | null> {
    const thread = await prisma.thread.findUnique({
      where: { id },
    });

    if (!thread) {
      throw new Error("Thread not found!");
    }

    return await prisma.thread.delete({
      where: { id },
    });
  }
}

export default new ThreadServies();
