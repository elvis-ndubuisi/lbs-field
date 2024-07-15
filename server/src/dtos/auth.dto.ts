import { z } from "zod";

export const registerSchema = z.object({
  body: z.object({
    username: z.string({ required_error: "Provide a unique username" }),
    password: z
      .string({ required_error: "Password is required" })
      .min(6, "Password lengt must be more than 6"),
    role: z.enum(["member", "liberian", "administrator"]).default("member"),
  }),
});
export type RegisterSchema = z.TypeOf<typeof registerSchema>["body"];

export const loginSchema = z.object({
  body: z.object({
    username: z.string({ required_error: "User name is required" }),
    password: z.string({ required_error: "Provide a valid password" }),
  }),
});
export type LoginSchema = z.TypeOf<typeof loginSchema>["body"];
