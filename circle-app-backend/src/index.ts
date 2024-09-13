// const express = require("express");
// const detenv = require("dotenv");
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import HelloController from "./controllers/hello.controllers";
import GreetingMiddleware from "./middlewares/greeting";
import UserController from "./controllers/user.controllers";
import ThreadController from "./controllers/thread.controllers";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", GreetingMiddleware, HelloController);

app.get("/users", UserController.find);
app.post("/users", UserController.create);
app.patch("/users", UserController.update);

app.get("/threads", ThreadController.findAll);
app.get("/threads/:id", ThreadController.findOne);
app.delete("/threads/:id", ThreadController.delete);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
