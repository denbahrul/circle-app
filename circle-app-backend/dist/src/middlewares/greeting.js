"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GreetingMiddleware;
function GreetingMiddleware(req, res, next) {
    console.log("Welcome");
    next();
}
