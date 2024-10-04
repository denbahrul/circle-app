"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = HelloController;
const hello_services_1 = __importDefault(require("../services/hello.services"));
function HelloController(req, res) {
    try {
        const hello = (0, hello_services_1.default)();
        // throw new Error();
        res.send(`${hello}`);
    }
    catch (error) {
        res.status(500).json({
            messages: "404 Not Found wkwkwk",
        });
    }
}
