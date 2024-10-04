"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateReplySchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.CreateReplySchema = joi_1.default.object({
    content: joi_1.default.string(),
    image: joi_1.default.string(),
    authorId: joi_1.default.number(),
});
