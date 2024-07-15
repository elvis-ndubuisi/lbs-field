import express, { Response, Request } from "express";
import booksRouter from "./books.route";
import authRouter from "./auth.route";
import userRouter from "./user.route";
import authValidator from "../middleware/auth.validator";
import deserializeUser from "../middleware/deserialize-user.middleware";

const indexRouter = express.Router();
indexRouter.use("/api/auth", authRouter);
indexRouter.use("/api/books", deserializeUser, authValidator, booksRouter);
indexRouter.use("/api", deserializeUser, authValidator, userRouter);
indexRouter.get("/health", (req: Request, res: Response) => {
  return res.json({ message: "LBS" });
});
indexRouter.all("*", (_, res: Response) => {
  res.status(404).send({ message: "Resource not found" });
});
export default indexRouter;
