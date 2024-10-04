"use strict";
// import Joi from "joi";
// import { CreateUserDTO } from "../../dto/user.dto";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginSchema = exports.RegisterSchema = void 0;
// export const createUserSchema = Joi.object<CreateUserDTO>({
//   email: Joi.string().email().required(),
//   fullname: Joi.string(),
//   password: Joi.string().min(6),
//   username: Joi.string().required(),
// });
const joi_1 = __importDefault(require("joi"));
exports.RegisterSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    fullname: joi_1.default.string().required(),
    password: joi_1.default.string().min(6),
});
exports.LoginSchema = joi_1.default.object({
    email: joi_1.default.string().email(),
    password: joi_1.default.string(),
});
