"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Return verified token if successful or nothing
function verify(token) {
    var _a;
    try {
        const v = jsonwebtoken_1.default.verify(token, process.env.JT_SECRET);
        return v;
    }
    catch (error) {
        console.error((_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : error);
        return null;
    }
}
// Signs new token using provided data
function sign(payload, options) {
    return jsonwebtoken_1.default.sign(payload, process.env.JT_SECRET, options);
}
exports.default = { sign, verify };
