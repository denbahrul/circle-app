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
class ThreadController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const value = yield threads_schema_1.CreateThreadSchema.validateAsync(req.body);
                const threads = yield thread_services_2.default.createThread(value);
                res.json(threads);
            }
            catch (error) {
                res.json(error);
            }
        });
    }
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const threads = yield thread_services_1.default.getAllThreads();
                res.json(threads);
            }
            catch (error) {
                res.json(error);
            }
        });
    }
    findOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const thread = yield thread_services_1.default.getThreadById(Number(id));
                res.json(thread);
            }
            catch (error) {
                res.json(error);
            }
        });
    }
    findByUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const threads = yield thread_services_1.default.getThreadByUser(Number(id));
                res.json(threads);
            }
            catch (error) {
                res.json(error);
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const thread = yield thread_services_1.default.deleteThread(Number(id));
                res.json(thread);
            }
            catch (error) {
                res.json(error);
            }
        });
    }
}
exports.default = new ThreadController();
