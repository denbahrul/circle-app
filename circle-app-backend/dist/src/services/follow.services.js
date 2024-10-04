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
class FollowServices {
    follow(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const isFollow = yield prisma.follow.findFirst({
                where: {
                    followersId: data.followersId,
                    followingId: data.followingId,
                },
            });
            if (isFollow) {
                throw {
                    status: "fail",
                    message: "You have already follow this user",
                };
            }
            const follow = yield prisma.follow.create({ data });
            return {
                status: "success",
                message: "Followed",
                data: follow,
            };
        });
    }
    unfollow(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const followRecord = yield prisma.follow.findFirst({
                where: {
                    followersId: data.followersId,
                    followingId: data.followingId,
                },
            });
            if (!followRecord) {
                throw {
                    status: "fail",
                    message: "you haven't followed this account yet",
                };
            }
            const unfollow = yield prisma.follow.delete({
                where: { id: followRecord.id },
            });
            return {
                status: "success",
                message: "Unfollowed",
            };
        });
    }
    followList(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const following = yield prisma.follow.findMany({
                where: {
                    followersId: userId,
                },
                include: {
                    following: {
                        select: {
                            id: true,
                            fullname: true,
                            username: true,
                            bio: true,
                            profilePhoto: true,
                        },
                    },
                },
            });
            const followers = yield prisma.follow.findMany({
                where: {
                    followingId: userId,
                },
                include: {
                    followers: {
                        select: {
                            id: true,
                            fullname: true,
                            username: true,
                            bio: true,
                            profilePhoto: true,
                        },
                    },
                },
            });
            const followedUsers = yield prisma.follow.findMany({
                where: { followersId: userId },
                select: { followingId: true },
            });
            const followedIds = new Set(followedUsers.map((follow) => follow.followingId));
            const followersWithIsFollow = followers.map((follow) => (Object.assign(Object.assign({}, follow), { isFollow: followedIds.has(follow.followers.id) })));
            const followingWithIsFollow = following.map((follow) => (Object.assign(Object.assign({}, follow), { isFollow: followedIds.has(follow.following.id) })));
            return {
                status: "success",
                message: "Following and Followers List Retrived",
                data: {
                    followers: followersWithIsFollow,
                    following: followingWithIsFollow,
                },
            };
        });
    }
}
exports.default = new FollowServices();
