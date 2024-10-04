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
class ThreadServies {
    createThread(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield prisma.thread.create({ data });
            return {
                status: "success",
                message: "Thread Created",
                data: result,
            };
        });
    }
    getAllThreads(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const threads = yield prisma.thread.findMany({
                include: {
                    author: true,
                    replies: true,
                    like: true,
                },
            });
            const threadWithIsLike = threads.map((thread) => {
                const isLike = thread.like.some((like) => like.authorId === userId);
                return Object.assign(Object.assign({}, thread), { isLike });
            });
            return {
                status: "success",
                message: "Threads retrived",
                data: threadWithIsLike,
            };
        });
    }
    getThreadById(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const thread = yield prisma.thread.findFirst({
                where: { id },
                include: {
                    author: true,
                    replies: {
                        include: { author: true },
                    },
                    like: true,
                },
            });
            if (!thread) {
                throw {
                    status: 404,
                    message: "Thread Not Found!",
                    code: "USER_NOT_EXIST",
                };
            }
            const isLike = thread.like.some((like) => like.authorId === userId);
            return {
                status: "success",
                message: "Thread retrived",
                data: Object.assign(Object.assign({}, thread), { isLike }),
            };
        });
    }
    getThreadByUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const thread = yield prisma.thread.findMany({
                where: { authorId: id },
                include: {
                    author: true,
                    replies: true,
                    like: true,
                },
            });
            if (!thread) {
                throw {
                    code: "USER_NOT_EXIST",
                    status: 404,
                    message: "User Not Found!",
                };
            }
            return {
                status: "success",
                message: "Threads retrived",
                data: thread,
            };
        });
    }
    deleteThread(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const thread = yield prisma.thread.findUnique({
                where: { id },
            });
            if (!thread) {
                throw {
                    status: 404,
                    message: "Thread Not Found!",
                    code: "THREAD_NOT_EXIST",
                };
            }
            return yield prisma.thread.delete({
                where: { id },
            });
        });
    }
}
exports.default = new ThreadServies();
