import { UpdateUSerDTO } from "../dto/user.dto";
import { prisma } from "../libs/prisma";

class UserRepositories {
  async getAllUser() {
    return prisma.user.findMany({
      include: {
        followers: true,
      },
    });
  }

  async getSuggestedUser() {
    return prisma.$queryRaw`SELECT * FROM user ORDER BY RANDOM() LIMIT 5`;
  }

  async getUserByUsername(username: string) {
    return prisma.user.findUnique({
      where: {
        username,
      },
    });
  }

  async findUserById(id: number) {
    return prisma.user.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            following: true,
            followers: true,
          },
        },
        followers: true,
        following: true,

        threads: {
          include: {
            author: true,
            like: true,
            replies: true,
          },
        },
      },
    });
  }

  async updateUser(data: UpdateUSerDTO) {
    return prisma.user.update({
      data: data,
      where: { id: data.id },
    });
  }
}

export default new UserRepositories();
