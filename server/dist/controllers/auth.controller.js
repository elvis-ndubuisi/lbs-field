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
const argon2_1 = __importDefault(require("argon2"));
const prisma_1 = __importDefault(require("../utils/prisma"));
const client_1 = require("@prisma/client");
const tokenizer_1 = __importDefault(require("../utils/tokenizer"));
function register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = req.body;
        try {
            const hashed = yield argon2_1.default.hash(body.password);
            const user = yield prisma_1.default.user.create({
                data: { name: body.username, password: hashed, role: body.role },
            });
            const accessToken = tokenizer_1.default.sign({ name: user.name, role: user.role, id: user.id }, { expiresIn: "30s" });
            const refreshToken = tokenizer_1.default.sign({ id: user.id, role: user.role }, { expiresIn: "1d" });
            res.status(201);
            return res.json({
                message: "Registration was successful",
                user: {
                    route: user.role.toLowerCase(),
                },
                token: accessToken,
                xRefresh: refreshToken,
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
function signIn(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = req.body;
        try {
            const user = yield prisma_1.default.user.findUnique({
                where: { name: body.username },
            });
            if (!user)
                return res.status(401).json({ message: "Invalid username or password" });
            const correctPassword = yield argon2_1.default.verify(user.password, body.password);
            if (!correctPassword)
                return res.status(401).json({ message: "Invalid username or password" });
            const accessToken = tokenizer_1.default.sign({ name: user.name, role: user.role, id: user.id }, { expiresIn: "30s" });
            const refreshToken = tokenizer_1.default.sign({ id: user.id, role: user.role }, { expiresIn: "1d" });
            return res.json({
                message: "Access granted.",
                user: { route: user.role.toLowerCase() },
                token: accessToken,
                xRefresh: refreshToken,
            });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Unable to process request" });
        }
    });
}
function refreshToken(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const xRefresh = req.body.xRefresh;
        if (!xRefresh) {
            return res.status(401).json({ message: "Refresh token missing" });
        }
        try {
            const decoded = tokenizer_1.default.verify(xRefresh);
            if (!decoded)
                return res.status(401).json({ message: "Could not refresh token" });
            const user = yield prisma_1.default.user.findUnique({ where: { id: decoded.id } });
            if (!user)
                return res.status(404).json({ message: "User is missing" });
            const accessToken = tokenizer_1.default.sign({ name: user.name, role: user.role, id: user.id }, { expiresIn: "30s" });
            const refreshToken = tokenizer_1.default.sign({ id: user.id, role: user.role }, { expiresIn: "1d" });
            return res.json({
                message: "Access granted.",
                user: { route: user.role.toLowerCase() },
                token: accessToken,
                xRefresh: refreshToken,
            });
        }
        catch (error) {
            return res.status(500).json({ message: "Unable to process request" });
        }
    });
}
function signOut(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        return res
            .status(204)
            .json({ statusCode: "204", message: "Logged out successfully" });
    });
}
exports.default = { register, signIn, signOut, refreshToken };
