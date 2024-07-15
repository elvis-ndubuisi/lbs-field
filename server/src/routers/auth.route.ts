import express from "express";
import requestValidator from "../middleware/request.validator";
import { loginSchema, registerSchema } from "../dtos/auth.dto";
import authController from "../controllers/auth.controller";

const authRouter = express.Router();
authRouter.post(
  "/signup",
  requestValidator(registerSchema),
  authController.register
);
authRouter.post(
  "/signin",
  requestValidator(loginSchema),
  authController.signIn
);
authRouter.post("/logout", authController.signOut);
authRouter.post("/refresh", authController.refreshToken);

export default authRouter;
