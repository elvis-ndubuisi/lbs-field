"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const books_controller_1 = __importDefault(require("../controllers/books.controller"));
const deserialize_user_middleware_1 = __importDefault(require("../middleware/deserialize-user.middleware"));
const request_validator_1 = __importDefault(require("../middleware/request.validator"));
const role_validator_1 = __importDefault(require("../middleware/role.validator"));
const book_dto_1 = require("../dtos/book.dto");
const auth_validator_1 = __importDefault(require("../middleware/auth.validator"));
const booksRouter = express_1.default.Router();
booksRouter.get("/", books_controller_1.default.getAll);
booksRouter.post("/", (0, request_validator_1.default)(book_dto_1.addBookSchema), (0, role_validator_1.default)(["administrator", "liberian"]), books_controller_1.default.add);
booksRouter.use("/genre", (0, role_validator_1.default)(["administrator", "liberian"]));
booksRouter
    .route("/genre")
    .get(books_controller_1.default.getGenre)
    .post((0, request_validator_1.default)(book_dto_1.addGenre), books_controller_1.default.addGenre);
booksRouter.use("/borrow", deserialize_user_middleware_1.default, auth_validator_1.default);
booksRouter.get("/borrow", (0, role_validator_1.default)("member"), books_controller_1.default.getBorrowed);
booksRouter.post("/borrow/:id", (0, request_validator_1.default)(book_dto_1.bookSchema), (0, role_validator_1.default)("member"), books_controller_1.default.borrow);
booksRouter.get("/borrow/history", (0, role_validator_1.default)(["liberian", "member"]), books_controller_1.default.listHistory);
booksRouter.patch("/borrow/history/:id", (0, request_validator_1.default)(book_dto_1.bookSchema), (0, role_validator_1.default)("liberian"), books_controller_1.default.approveHistory);
booksRouter.get("/:id", (0, request_validator_1.default)(book_dto_1.bookSchema), books_controller_1.default.getOne);
booksRouter.put("/:id", (0, request_validator_1.default)(book_dto_1.addBookSchema), books_controller_1.default.update);
booksRouter.delete("/:id", (0, request_validator_1.default)(book_dto_1.bookSchema), (0, role_validator_1.default)(["administrator", "liberian"]), books_controller_1.default.remove);
exports.default = booksRouter;
