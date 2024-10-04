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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const reaction_sevices_1 = __importDefault(require("../services/reaction.sevices"));
class ReactionController {
    reply(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // #swagger.tags = ['Reaction']
            // #swagger.summary = 'Create new Reply'
            /*  #swagger.requestBody = {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/createReplySchema"
                                }
                            }
                        }
                    }
                */
            try {
                const authorId = req.user.id;
                const { id } = req.params;
                const threadId = Number(id);
                const { content, image } = req.body;
                const reply = yield reaction_sevices_1.default.createReply({
                    threadId,
                    content,
                    image,
                    authorId,
                });
                res.json({
                    status: "success",
                    message: "Reply Created",
                });
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    deleteReply(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // #swagger.tags = ['Reaction']
            // #swagger.summary = 'Delete reply'
            try {
                const { id } = req.params;
                const thread = yield reaction_sevices_1.default.deleteReply(Number(id));
                res.json({
                    status: "success",
                    message: "Reply deleted",
                });
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    isLike(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // #swagger.tags = ['Reaction']
            // #swagger.summary = 'Thread isLike'
            /*  #swagger.requestBody = {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/likeSchema"
                                }
                            }
                        }
                    }
                */
            try {
                const authorId = req.user.id;
                const { threadId } = req.body;
                const like = yield reaction_sevices_1.default.isLike({
                    threadId,
                    authorId,
                });
                res.json(like);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    like(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // #swagger.tags = ['Reaction']
            // #swagger.summary = 'Like a thread'
            /*  #swagger.requestBody = {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/likeSchema"
                                }
                            }
                        }
                    }
                */
            try {
                const authorId = req.user.id;
                const { threadId } = req.body;
                const like = yield reaction_sevices_1.default.like({
                    threadId,
                    authorId,
                });
                res.json(like);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    unlike(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // #swagger.tags = ['Reaction']
            // #swagger.summary = 'Unlike a thread'
            try {
                const userId = req.user.id;
                const { id } = req.params;
                const unLike = yield reaction_sevices_1.default.unlike(Number(id), userId);
                res.json(unLike);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
}
exports.default = new ReactionController();
