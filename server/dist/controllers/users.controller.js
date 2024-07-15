"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../utils/prisma"));
const argon2_1 = __importDefault(require("argon2"));
const client_1 = require("@prisma/client");
function fetchAllUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const signedUser = (_a = res.locals) === null || _a === void 0 ? void 0 : _a.user;
        try {
            const users = yield prisma_1.default.user.findMany({
                where: { NOT: { id: signedUser.id } },
                select: { id: true, name: true, role: true },
            });
            return res.json(users);
        }
        catch (error) {
            return res
                .status(500)
                .json({ message: "Unable to process request.", name: "", data: {} });
        }
    });
}
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const userId = (_a = req.params) === null || _a === void 0 ? void 0 : _a.id;
        try {
            const deletedUser = yield prisma_1.default.user.delete({ where: { id: userId } });
            return res.status(201).json(deletedUser);
        }
        catch (error) {
            return res
                .status(500)
                .json({ message: "Unable to process request.", name: "", data: {} });
        }
    });
}
function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const userId = (_a = req.params) === null || _a === void 0 ? void 0 : _a.id;
        const body = req.body;
        try {
            const updatedUser = yield prisma_1.default.user.update({
                where: { id: userId },
                data: { role: body.role },
            });
            return res.status(201).json(updatedUser);
        }
        catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ message: "Unable to process request.", name: "", data: {} });
        }
    });
}
function addUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = req.body;
        try {
            const hashed = yield argon2_1.default.hash(body.password);
            const user = yield prisma_1.default.user.create({
                data: { name: body.username, password: hashed, role: body.role },
            });
            res.status(201);
            return res.json({
                message: "Adding user was successful",
                user: {
                    route: user.role.toLowerCase(),
                },
            });
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError &&
                error.code === "P2002") {
                return res.status(409).json({
                    message: "User already exists. Change username",
                    name: "Unique constraint",
                    data: {},
                });
            }
            return res
                .status(500)
                .json({ message: "Unable to process request.", name: "", data: {} });
        }
    });
}
exports.default = { fetchAllUsers, deleteUser, updateUser, addUser };
