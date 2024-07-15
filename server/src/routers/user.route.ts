import express from "express";
import usersController from "../controllers/users.controller";
import roleValidator from "../middleware/role.validator";
import requestValidator from "../middleware/request.validator";
import { userSchema } from "../dtos/user.dto";
import { registerSchema } from "../dtos/auth.dto";

const userRouter = express.Router();
userRouter.use("/admin", roleValidator("administrator"));
userRouter.get("/admin/users", usersController.fetchAllUsers);
userRouter.delete(
  "/admin/users/:id",
  requestValidator(userSchema),
  usersController.deleteUser
);
userRouter.patch(
  "/admin/users/:id",
  requestValidator(userSchema),
  usersController.updateUser
);
userRouter.post(
  "/admin/users",
  requestValidator(registerSchema),
  usersController.addUser
);

export default userRouter;
