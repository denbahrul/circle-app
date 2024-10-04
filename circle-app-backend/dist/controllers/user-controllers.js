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
class UserController {
    find(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_services_1.default;
                res.json(users);
            }
            catch (error) {
                res.status(404).json({
                    messages: "404 Not Found",
                });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const value = req.body;
                console.log(value);
                const user = yield createUser(value);
                res.json(user);
            }
            catch (error) { }
        });
    }
}
exports.default = new UserController();
