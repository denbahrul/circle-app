import express from "express";
import GreetingMiddleware from "../middlewares/greeting";
import HelloController from "../controllers/hello.controllers";
import UserController from "../controllers/user.controllers";
import ThreadController from "../controllers/thread.controllers";
import authControllers from "../controllers/auth.controllers";

export const routerV1 = express.Router();

routerV1.get("/", GreetingMiddleware, HelloController);

routerV1.get("/users", UserController.find);
routerV1.post("/users", UserController.create);
routerV1.patch("/users", UserController.update);

routerV1.get("/threads", ThreadController.findAll);
routerV1.get("/threads/:id", ThreadController.findOne);
routerV1.delete("/threads/:id", ThreadController.delete);

routerV1.post("/auth/login", authControllers.login);
routerV1.post("/auth/register", authControllers.register);
