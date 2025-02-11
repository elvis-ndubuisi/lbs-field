import express from "express";
import booksController from "../controllers/books.controller";
import deserializeUser from "../middleware/deserialize-user.middleware";
import requestValidator from "../middleware/request.validator";
import roleValidator from "../middleware/role.validator";
import { addBookSchema, addGenre, bookSchema } from "../dtos/book.dto";
import authValidator from "../middleware/auth.validator";

const booksRouter = express.Router();
booksRouter.get("/", booksController.getAll);
booksRouter.post(
  "/",
  requestValidator(addBookSchema),
  roleValidator(["administrator", "liberian"]),
  booksController.add,
);

booksRouter.use("/genre", roleValidator(["administrator", "liberian"]));
booksRouter
  .route("/genre")
  .get(booksController.getGenre)
  .post(requestValidator(addGenre), booksController.addGenre);

booksRouter.use("/borrow", deserializeUser, authValidator);
booksRouter.get(
  "/borrow",
  roleValidator("member"),
  booksController.getBorrowed,
);
booksRouter.post(
  "/borrow/:id",
  requestValidator(bookSchema),
  roleValidator("member"),
  booksController.borrow,
);
booksRouter.get(
  "/borrow/history",
  roleValidator(["liberian", "member"]),
  booksController.listHistory,
);
booksRouter.patch(
  "/borrow/history/:id",
  requestValidator(bookSchema),
  roleValidator("liberian"),
  booksController.approveHistory,
);

booksRouter.get("/:id", requestValidator(bookSchema), booksController.getOne);
booksRouter.put(
  "/:id",
  requestValidator(addBookSchema),
  booksController.update,
);
booksRouter.delete(
  "/:id",
  requestValidator(bookSchema),
  roleValidator(["administrator", "liberian"]),
  booksController.remove,
);

export default booksRouter;
