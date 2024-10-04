"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = authorization;
function authorization(role) {
    return (req, res, next) => {
        const user = req.user;
        if (user.role != role) {
            return res.status(403).json({
                message: "FORBIDDEN",
            });
        }
        next();
    };
}
