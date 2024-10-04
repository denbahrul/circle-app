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
const thread_services_1 = __importDefault(require("../services/thread.services"));
const thread_services_2 = __importDefault(require("../services/thread.services"));
const threads_schema_1 = require("../utils/schemas/threads.schema");
const cloudinary_services_1 = __importDefault(require("../services/cloudinary.services"));
class ThreadController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // #swagger.tags = ['Threads']
            // #swagger.summary = 'Create new thread'
            /*  #swagger.requestBody = {
                    required: true,
                    content: {
                        "multipart/form-data": {
                            schema: {
                                $ref: "#/components/schemas/createThreadSchema"
                            }
                        }
                    }
                }
            */
            try {
                const authorId = req.user.id;
                const fileUpload = req.file;
                let imageUrl = null;
                if (fileUpload) {
                    const image = yield cloudinary_services_1.default.upload(req.file);
                    imageUrl = image.secure_url;
                }
                const value = Object.assign(Object.assign({}, req.body), { image: imageUrl, authorId: authorId });
                const data = yield threads_schema_1.CreateThreadSchema.validateAsync(value);
                const threads = yield thread_services_2.default.createThread(data);
                res.json(threads);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // #swagger.tags = ['Threads']
            // #swagger.summary = 'Get all thread'
            try {
                const userId = req.user.id;
                const threads = yield thread_services_1.default.getAllThreads(userId);
                res.json(threads);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    findOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // #swagger.tags = ['Threads']
            // #swagger.summary = 'get single thread'
            try {
                const { id } = req.params;
                const userId = req.user.id;
                const thread = yield thread_services_1.default.getThreadById(Number(id), userId);
                res.json(thread);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    findByUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // #swagger.tags = ['Threads']
            try {
                const { id } = req.params;
                const threads = yield thread_services_1.default.getThreadByUser(Number(id));
                res.json(threads);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // #swagger.tags = ['Threads']
            // #swagger.summary = 'Delete thread'
            try {
                const { id } = req.params;
                const thread = yield thread_services_1.default.deleteThread(Number(id));
                res.json({
                    status: "success",
                    message: "Thread deleted",
                });
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
}
exports.default = new ThreadController();
