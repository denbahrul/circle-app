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
const user_services_1 = __importDefault(require("../services/user.services"));
const user_schema_1 = require("../utils/schemas/user.schema");
const user_services_2 = __importDefault(require("../services/user.services"));
class UserController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const value = yield user_schema_1.createUserSchema.validateAsync(req.body);
                const user = yield user_services_1.default.createUser(value);
                res.json(user);
            }
            catch (error) {
                res.json(error);
            }
        });
    }
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_services_1.default.getAllUsers();
                res.json(users);
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
                const user = yield user_services_2.default.getUserById(Number(id));
                res.json(user);
            }
            catch (error) {
                res.json(error);
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const value = req.body;
                const user = yield user_services_1.default.updateUser(value);
                res.json(user);
            }
            catch (error) {
                res.json(error);
            }
        });
    }
}
exports.default = new UserController();
