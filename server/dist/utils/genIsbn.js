"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomISBN = generateRandomISBN;
function generateRandomISBN(length = 13) {
    const characters = "0123456789-";
    let isbn = "";
    for (let i = 0; i < length; i++) {
        isbn += characters[Math.floor(Math.random() * characters.length)];
    }
    return isbn;
}
