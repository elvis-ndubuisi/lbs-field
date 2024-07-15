"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = deserializeUser;
const tokenizer_1 = __importDefault(require("../utils/tokenizer"));
/** Verifies *user* token(access token) in request header
 * and appends verified result to locals (request-level info)
 * @returns {id:string, username:string, role: Role} | null
 * @usage res.locals.user
 */
function deserializeUser(req, res, next) {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token)
        return next();
    const user = tokenizer_1.default.verify(token);
    if (user)
        res.locals.user = user;
    return next();
}
