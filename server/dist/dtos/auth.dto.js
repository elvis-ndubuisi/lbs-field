"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    body: zod_1.z.object({
        username: zod_1.z.string({ required_error: "Provide a unique username" }),
        password: zod_1.z
            .string({ required_error: "Password is required" })
            .min(6, "Password lengt must be more than 6"),
        role: zod_1.z.enum(["member", "liberian", "administrator"]).default("member"),
    }),
});
exports.loginSchema = zod_1.z.object({
    body: zod_1.z.object({
        username: zod_1.z.string({ required_error: "User name is required" }),
        password: zod_1.z.string({ required_error: "Provide a valid password" }),
    }),
});
