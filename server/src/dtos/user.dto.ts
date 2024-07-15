import { z } from "zod";

export const userSchema = z.object({
  body: z.object({
    role: z.enum(["member", "liberian", "administrator"]).optional(),
  }),
  params: z.object({
    id: z.string({ required_error: "User ID is required" }),
  }),
});
export type UserSchema = z.TypeOf<typeof userSchema>;
