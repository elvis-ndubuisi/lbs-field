"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const books_route_1 = __importDefault(require("./books.route"));
const auth_route_1 = __importDefault(require("./auth.route"));
const user_route_1 = __importDefault(require("./user.route"));
const auth_validator_1 = __importDefault(require("../middleware/auth.validator"));
const deserialize_user_middleware_1 = __importDefault(require("../middleware/deserialize-user.middleware"));
const indexRouter = express_1.default.Router();
indexRouter.use("/api/auth", auth_route_1.default);
indexRouter.use("/api/books", deserialize_user_middleware_1.default, auth_validator_1.default, books_route_1.default);
indexRouter.use("/api", deserialize_user_middleware_1.default, auth_validator_1.default, user_route_1.default);
indexRouter.get("/health", (req, res) => {
    return res.json({ message: "LBS" });
});
indexRouter.all("*", (_, res) => {
    res.status(404).send({ message: "Resource not found" });
});
exports.default = indexRouter;
