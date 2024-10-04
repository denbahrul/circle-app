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
const auth_services_1 = __importDefault(require("../services/auth.services"));
const auth_schema_1 = require("../utils/schemas/auth.schema");
const user_services_1 = __importDefault(require("../services/user.services"));
class AuthController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            // #swagger.tags = ['Auth']
            /*  #swagger.requestBody = {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/registerSchema"
                            }
                        }
                    }
                }
            */
            try {
                const value = yield auth_schema_1.RegisterSchema.validateAsync(req.body);
                yield auth_services_1.default.register(value);
                const user = yield auth_services_1.default.login(value);
                res.json({
                    status: "success",
                    message: "User Created",
                    data: {
                        accessToken: (_a = user.data) === null || _a === void 0 ? void 0 : _a.accessToken,
                        user: (_b = user.data) === null || _b === void 0 ? void 0 : _b.user,
                    },
                });
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // #swagger.tags = ['Auth']
            /*  #swagger.requestBody = {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/loginSchema"
                            }
                        }
                    }
                }
            */
            try {
                const value = yield auth_schema_1.LoginSchema.validateAsync(req.body);
                const user = yield auth_services_1.default.login(value);
                res.json(user);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    getUserLogged(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // #swagger.tags = ['Auth']
            try {
                const userId = req.user.id;
                const user = yield user_services_1.default.getUserById(userId);
                res.json(user);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
}
exports.default = new AuthController();
