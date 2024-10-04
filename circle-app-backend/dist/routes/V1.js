"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerV1 = void 0;
const express_1 = __importDefault(require("express"));
const greeting_1 = __importDefault(require("../middlewares/greeting"));
const hello_controllers_1 = __importDefault(require("../controllers/hello.controllers"));
const user_controllers_1 = __importDefault(require("../controllers/user.controllers"));
const thread_controllers_1 = __importDefault(require("../controllers/thread.controllers"));
const auth_controllers_1 = __importDefault(require("../controllers/auth.controllers"));
const authentication_1 = require("../middlewares/authentication");
const authorization_1 = __importDefault(require("../middlewares/authorization"));
exports.routerV1 = express_1.default.Router();
exports.routerV1.get("/", greeting_1.default, hello_controllers_1.default);
// USER
exports.routerV1.get("/users", user_controllers_1.default.findAll);
exports.routerV1.get("/users/:id", user_controllers_1.default.findOne);
exports.routerV1.post("/users", user_controllers_1.default.create);
exports.routerV1.patch("/users", user_controllers_1.default.update);
// AUTH
exports.routerV1.post("/auth/login", auth_controllers_1.default.login);
exports.routerV1.post("/auth/register", auth_controllers_1.default.register);
exports.routerV1.get("/user/me", authentication_1.authentication, auth_controllers_1.default.getUserLogged);
//DASHBOARD ADMIN
exports.routerV1.get("/dashboard", authentication_1.authentication, (0, authorization_1.default)("ADMIN"), (req, res) => {
    res.json({ message: "Dashboard Admin" });
});
// THREADS
exports.routerV1.get("/threads", thread_controllers_1.default.findAll);
exports.routerV1.get("/threads/:id", thread_controllers_1.default.findOne);
exports.routerV1.get("/user/threads/:id", thread_controllers_1.default.findByUser);
exports.routerV1.post("/threads", thread_controllers_1.default.create);
exports.routerV1.delete("/threads/:id", thread_controllers_1.default.delete);
