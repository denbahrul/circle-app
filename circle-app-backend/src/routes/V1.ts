import express from "express";
import GreetingMiddleware from "../middlewares/greeting";
import HelloController from "../controllers/hello.controllers";
import UserController from "../controllers/user.controllers";
import ThreadController from "../controllers/thread.controllers";
import authControllers from "../controllers/auth.controllers";
import { authMiddleware } from "../middlewares/authentication";

export const routerV1 = express.Router();

routerV1.get("/", GreetingMiddleware, HelloController);

// USER
routerV1.get("/users", UserController.findAll);
routerV1.get("/users/:id", UserController.findOne);
routerV1.post("/users", UserController.create);
routerV1.patch("/users", UserController.update);

// AUTH
routerV1.post("/auth/login", authControllers.login);
routerV1.post("/auth/register", authControllers.register);
routerV1.get("/user/me", authMiddleware, authControllers.getUserLogged);

// THREADS
routerV1.get("/threads", ThreadController.findAll);
routerV1.get("/threads/:id", ThreadController.findOne);
routerV1.get("/user/threads/:id", ThreadController.findByUser);
routerV1.post("/threads", ThreadController.create);
routerV1.delete("/threads/:id", ThreadController.delete);
