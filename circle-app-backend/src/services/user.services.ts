import { PrismaClient, User } from "@prisma/client";
import { UpdateUSerDTO } from "../dto/user.dto";
import { customError } from "../types/custom-error";
import { SuccessResponse } from "../types/success-respons";
import UserRepositories from "../repositories/user";

const prisma = new PrismaClient();

class UserServices {
  async getAllUsers(userId: number): Promise<User[]> {
    const users = await UserRepositories.getAllUser();

    const followedUsers = await prisma.follow.findMany({
      where: { followersId: userId },
      select: { followingId: true },
    });

    const followedIds = new Set(followedUsers.map((follow) => follow.followingId));

    return users.map((user) => ({
      ...user,
      isFollow: followedIds.has(user.id),
    }));
  }

  async isFollow(userLoginId: number, userId: number): Promise<boolean> {
    const follow = await prisma.follow.findFirst({
      where: {
        followersId: userId,
        followingId: userLoginId,
      },
    });

    return follow !== null; // Mengembalikan true jika follow ada, false jika tidak
  }

  async getUserById(userId: number): Promise<User | null> {
    const user = await UserRepositories.findUserById(userId);

    if (!user) {
      throw {
        code: "USER_NOT_EXIST",
        status: 404,
        message: "User Not Found!",
      } as customError;
    }

    return user;
  }

  // async createUser(data: CreateUserDTO): Promise<User | null> {
  //   return await prisma.user.create({ data });
  // }

  async updateUser(data: UpdateUSerDTO): Promise<SuccessResponse<Pick<User, "profilePhoto" | "bio" | "fullname" | "username"> | null>> {
    const user = await UserRepositories.findUserById(data.id);

    if (!user) {
      throw {
        status: 404,
        message: "User Not Found!",
        code: "USER_NOT_EXIST",
      } as customError;
    }

    const update = await UserRepositories.updateUser(data);

    return {
      status: "success",
      message: "Profile successfully edited",
      data: { profilePhoto: update.profilePhoto, fullname: update.fullname, username: update.username, bio: update.bio },
    };
  }
}

export default new UserServices();
