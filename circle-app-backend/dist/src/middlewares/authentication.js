"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authentication = authentication;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authentication(req, res, next) {
    /* #swagger.security = [{
              "bearerAuth": []
      }] */
    const authorizationHeader = req.header("Authorization");
    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Invalid authorization header" });
    }
    const token = authorizationHeader.replace("Bearer ", "");
    if (!token) {
        return res.status(401).json({ message: "Authorization token not found" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Invalid token" });
    }
}
