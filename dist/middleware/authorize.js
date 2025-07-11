"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
const authorize = (allowedRoles) => {
    return (req, res, next) => {
        const user = req.user;
        if (!(user === null || user === void 0 ? void 0 : user.role) || !allowedRoles.includes(user.role)) {
            return res
                .status(403)
                .json({ error: "Access forbidden: insufficient rights" });
        }
        console.log(`User with role ${user.role} authorized.`);
        next();
    };
};
exports.authorize = authorize;
