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
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.user.findMany();
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma.user.findUnique({
                where: { id },
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
    createUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.user.create({ data });
        });
    }
    updateUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma.user.findUnique({
                where: {
                    id: 8,
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
            if (data.password) {
                user.password = data.password;
            }
            if (data.username) {
                user.username = data.username;
            }
            return yield prisma.user.update({
                data: user,
                where: { id: 8 },
            });
        });
    }
}
exports.default = new UserServices();
