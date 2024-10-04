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
class ReactionServices {
    createReply(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.reply.create({ data });
        });
    }
    deleteReply(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const reply = yield prisma.reply.findUnique({
                where: { id },
            });
            if (!reply) {
                throw {
                    status: 404,
                    message: "Reply Not Found!",
                    code: "REPLY_NOT_EXIST",
                };
            }
            return yield prisma.reply.delete({
                where: { id },
            });
        });
    }
    isLike(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const like = yield prisma.like.findFirst({
                where: {
                    threadId: data.threadId,
                    authorId: data.authorId,
                },
            });
            if (like) {
                return {
                    isLike: true,
                };
            }
            return {
                isLike: false,
            };
        });
    }
    like(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const like = yield prisma.like.findFirst({
                where: {
                    threadId: data.threadId,
                    authorId: data.authorId,
                },
            });
            if (like) {
                throw {
                    status: "fail",
                    message: "You have already liked this thread",
                };
            }
            const likes = yield prisma.like.create({ data });
            return {
                status: "success",
                message: "Thread liked",
            };
        });
    }
    unlike(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const likeRecord = yield prisma.like.findFirst({
                where: {
                    authorId: userId,
                    threadId: id,
                },
            });
            if (!likeRecord) {
                throw new Error("Like not found");
            }
            const unLike = yield prisma.like.delete({
                where: {
                    id: likeRecord.id,
                },
            });
            return {
                status: "success",
                message: "Thread unliked",
            };
        });
    }
}
exports.default = new ReactionServices();
