"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** Checks deserialized user role agains required role. */
function roleValidator(role) {
    return (req, res, next) => {
        var _a;
        const signedUser = (_a = res.locals) === null || _a === void 0 ? void 0 : _a.user;
        if (Array.isArray(role)) {
            if (!role.includes(signedUser.role)) {
                return res.status(401).json({ message: "Access denied" });
            }
        }
        else {
            if (signedUser.role !== role) {
                return res.status(401).json({ message: "Access denied" });
            }
        }
        next();
    };
}
exports.default = roleValidator;
