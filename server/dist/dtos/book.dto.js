"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addGenre = exports.bookSchema = exports.addBookSchema = void 0;
const zod_1 = require("zod");
exports.addBookSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({ required_error: "Book name is required" }),
        author: zod_1.z.string({ required_error: "Book author is required" }),
        genre: zod_1.z.string({ required_error: "Genre ID is required" }),
        copies: zod_1.z.number({ required_error: "Available copies are required" }),
    }),
});
exports.bookSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string({ required_error: "Book ID is required" }),
    }),
});
exports.addGenre = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({ required_error: "Genre title is required" }),
    }),
});
