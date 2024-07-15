"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_controller_1 = __importDefault(require("../controllers/users.controller"));
const role_validator_1 = __importDefault(require("../middleware/role.validator"));
const request_validator_1 = __importDefault(require("../middleware/request.validator"));
const user_dto_1 = require("../dtos/user.dto");
const auth_dto_1 = require("../dtos/auth.dto");
const userRouter = express_1.default.Router();
userRouter.use("/admin", (0, role_validator_1.default)("administrator"));
userRouter.get("/admin/users", users_controller_1.default.fetchAllUsers);
userRouter.delete("/admin/users/:id", (0, request_validator_1.default)(user_dto_1.userSchema), users_controller_1.default.deleteUser);
userRouter.patch("/admin/users/:id", (0, request_validator_1.default)(user_dto_1.userSchema), users_controller_1.default.updateUser);
userRouter.post("/admin/users", (0, request_validator_1.default)(auth_dto_1.registerSchema), users_controller_1.default.addUser);
exports.default = userRouter;
