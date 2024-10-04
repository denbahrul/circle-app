"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class UserServices {
    getAllUsers(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield prisma.user.findMany({
                include: {
                    followers: true,
                },
            });
            const followedUsers = yield prisma.follow.findMany({
                where: { followersId: userId },
                select: { followingId: true },
            });
            const followedIds = new Set(followedUsers.map((follow) => follow.followingId));
            return users.map((user) => (Object.assign(Object.assign({}, user), { isFollow: followedIds.has(user.id) })));
        });
    }
    isFollow(userLoginId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const follow = yield prisma.follow.findFirst({
                where: {
                    followersId: userId,
                    followingId: userLoginId,
                },
            });
            return follow !== null; // Mengembalikan true jika follow ada, false jika tidak
        });
    }
    getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma.user.findUnique({
                where: { id: userId },
                include: {
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
            if (!user) {
                throw {
                    code: "USER_NOT_EXIST",
                    status: 404,
                    message: "User Not Found!",
                };
            }
            return user;
        });
    }
    // async createUser(data: CreateUserDTO): Promise<User | null> {
    //   return await prisma.user.create({ data });
    // }
    updateUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma.user.findUnique({
                where: {
                    id: data.id,
                },
            });
            if (!user) {
                throw {
                    status: 404,
                    message: "User Not Found!",
                    code: "USER_NOT_EXIST",
                };
            }
            if (data.fullname) {
                user.fullname = data.fullname;
            }
            if (data.username) {
                user.username = data.username;
            }
            if (data.bio) {
                user.bio = data.bio;
            }
            if (data.profilePhoto) {
                user.profilePhoto = data.profilePhoto;
            }
            yield prisma.user.update({
                data: data,
                where: { id: data.id },
            });
            return {
                status: "success",
                message: "Profile successfully edited",
            };
        });
    }
}
exports.default = new UserServices();
