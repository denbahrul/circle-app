// const express = require("express");
// const detenv = require("dotenv");
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import HelloController from "./controllers/hello-controllers";
import GreetingMiddleware from "./middlewares/greeting";
import { UsersController } from "./controllers/user-controllers";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", GreetingMiddleware, HelloController);

app.get("/users", UsersController);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
