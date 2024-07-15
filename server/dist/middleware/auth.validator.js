"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = authValidator;
function authValidator(req, res, next) {
    const user = res.locals.user;
    if (!user) {
        return res.sendStatus(403);
    }
    return next();
}
