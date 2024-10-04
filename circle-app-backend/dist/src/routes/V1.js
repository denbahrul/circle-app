"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerV1 = void 0;
const express_1 = __importDefault(require("express"));
const user_controllers_1 = __importDefault(require("../controllers/user.controllers"));
const thread_controllers_1 = __importDefault(require("../controllers/thread.controllers"));
const auth_controllers_1 = __importDefault(require("../controllers/auth.controllers"));
const authentication_1 = require("../middlewares/authentication");
const reaction_controller_1 = __importDefault(require("../controllers/reaction.controller"));
const follow_controller_1 = __importDefault(require("../controllers/follow.controller"));
const upload_file_1 = require("../middlewares/upload-file");
exports.routerV1 = express_1.default.Router();
// AUTH
exports.routerV1.post("/auth/login", auth_controllers_1.default.login);
exports.routerV1.post("/auth/register", auth_controllers_1.default.register);
exports.routerV1.get("/user/me", authentication_1.authentication, auth_controllers_1.default.getUserLogged);
// USER
exports.routerV1.get("/users", authentication_1.authentication, user_controllers_1.default.findAll);
exports.routerV1.get("/users/:id", authentication_1.authentication, user_controllers_1.default.findOne);
// routerV1.post("/users", UserController.create);
exports.routerV1.patch("/users", authentication_1.authentication, upload_file_1.upload.single("profilePhoto"), user_controllers_1.default.update);
// FOLLOW
exports.routerV1.post("/follow", authentication_1.authentication, follow_controller_1.default.follow);
exports.routerV1.delete("/unfollow/:id", authentication_1.authentication, follow_controller_1.default.unfollow);
exports.routerV1.get("/follows", authentication_1.authentication, follow_controller_1.default.followList);
// THREADS
exports.routerV1.get("/threads", authentication_1.authentication, thread_controllers_1.default.findAll);
exports.routerV1.get("/threads/:id", authentication_1.authentication, thread_controllers_1.default.findOne);
exports.routerV1.get("/user/threads/:id", authentication_1.authentication, thread_controllers_1.default.findByUser);
exports.routerV1.post("/threads", authentication_1.authentication, upload_file_1.upload.single("image"), thread_controllers_1.default.create);
exports.routerV1.delete("/threads/:id", authentication_1.authentication, thread_controllers_1.default.delete);
// THREAD REACTION
exports.routerV1.post("/threads/:id/reply", authentication_1.authentication, reaction_controller_1.default.reply);
exports.routerV1.delete("/threads/reply/:id", authentication_1.authentication, reaction_controller_1.default.deleteReply);
exports.routerV1.post("/threads/like", authentication_1.authentication, reaction_controller_1.default.like);
exports.routerV1.post("/threads/islike", authentication_1.authentication, reaction_controller_1.default.isLike);
exports.routerV1.delete("/threads/like/:id", authentication_1.authentication, reaction_controller_1.default.unlike);
//DASHBOARD ADMIN
// routerV1.get("/dashboard", authentication, authorization("ADMIN"), (req: Request, res: Response) => {
//   res.json({ message: "Dashboard Admin" });
// });
