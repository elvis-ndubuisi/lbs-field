"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const zod_1 = require("zod");
exports.userSchema = zod_1.z.object({
    body: zod_1.z.object({
        role: zod_1.z.enum(["member", "liberian", "administrator"]).optional(),
    }),
    params: zod_1.z.object({
        id: zod_1.z.string({ required_error: "User ID is required" }),
    }),
});
