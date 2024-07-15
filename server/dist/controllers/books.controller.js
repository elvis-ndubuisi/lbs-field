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
const genIsbn_1 = require("../utils/genIsbn");
function addGenre(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = req.body;
        try {
            yield prisma_1.default.genre.create({ data: { title: body.title } });
            return res.sendStatus(201);
        }
        catch (error) {
            return res
                .status(500)
                .json({ message: "Unable to process request.", name: "", data: {} });
        }
    });
}
function getGenre(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const genre = yield prisma_1.default.genre.findMany({});
            return res.json(genre);
        }
        catch (error) {
            return res
                .status(500)
                .json({ message: "Unable to process request.", name: "", data: {} });
        }
    });
}
function getAll(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const books = yield prisma_1.default.book.findMany({});
            return res.json(books);
        }
        catch (error) {
            return res
                .status(500)
                .json({ message: "Unable to process request.", name: "", data: {} });
        }
    });
}
function getOne(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const params = req.params;
        try {
            const book = yield prisma_1.default.book.findUnique({
                where: { id: params.id },
            });
            return res.json(book);
        }
        catch (error) {
            return res
                .status(500)
                .json({ message: "Unable to process request.", name: "", data: {} });
        }
    });
}
function add(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const user = (_a = res.locals) === null || _a === void 0 ? void 0 : _a.user;
        const body = req.body;
        try {
            yield prisma_1.default.book.create({
                data: {
                    author: body.author,
                    copies: body.copies,
                    title: body.title,
                    genreId: body.genre,
                    isbn: (0, genIsbn_1.generateRandomISBN)(),
                    publicationDate: new Date(),
                },
            });
            return res.sendStatus(201);
        }
        catch (error) {
            return res
                .status(500)
                .json({ message: "Unable to process request.", name: "", data: {} });
        }
    });
}
function update(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const params = req.params;
        const body = req.body;
        try {
            yield prisma_1.default.book.update({
                where: { id: params.id },
                data: {
                    author: body.author,
                    copies: body.copies,
                    title: body.title,
                    genreId: body.genre,
                },
            });
            return res.sendStatus(201);
        }
        catch (error) {
            return res
                .status(500)
                .json({ message: "Unable to process request.", name: "", data: {} });
        }
    });
}
function remove(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const params = req.params;
        try {
            yield prisma_1.default.book.delete({ where: { id: params.id } });
            return res.sendStatus(201);
        }
        catch (error) {
            return res
                .status(500)
                .json({ message: "Unable to process request.", name: "", data: {} });
        }
    });
}
exports.default = {
    addGenre,
    getGenre,
    getAll,
    add,
    update,
    remove,
    getOne,
};
