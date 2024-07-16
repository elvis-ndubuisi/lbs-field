"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const index_route_1 = __importDefault(require("./routers/index.route"));
const PORT = process.env.PORT || 8080;
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use((0, compression_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: ["http://localhost:5173", "https://lbs-field.vercel.app"],
    credentials: true,
    allowedHeaders: [
        "Access-Control-Allow-Origin",
        "Content-Type",
        "Authorization",
    ],
}));
app.use((0, cookie_parser_1.default)());
app.use(index_route_1.default);
app.use((err, req, res, next) => {
    var _a;
    console.error("");
    res.status((err === null || err === void 0 ? void 0 : err.status) || 500);
    return res.json({
        message: (_a = err === null || err === void 0 ? void 0 : err.message) !== null && _a !== void 0 ? _a : "Internal server error",
        error: {},
    });
});
app.listen(PORT, () => {
    console.log(`server started:${PORT}`);
});
