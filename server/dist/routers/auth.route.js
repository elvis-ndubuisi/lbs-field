"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const request_validator_1 = __importDefault(require("../middleware/request.validator"));
const auth_dto_1 = require("../dtos/auth.dto");
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const authRouter = express_1.default.Router();
authRouter.post("/signup", (0, request_validator_1.default)(auth_dto_1.registerSchema), auth_controller_1.default.register);
authRouter.post("/signin", (0, request_validator_1.default)(auth_dto_1.loginSchema), auth_controller_1.default.signIn);
authRouter.post("/logout", auth_controller_1.default.signOut);
authRouter.post("/refresh", auth_controller_1.default.refreshToken);
exports.default = authRouter;
