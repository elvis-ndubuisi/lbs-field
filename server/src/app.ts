import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import cookieParser from "cookie-parser";
import indexRouter from "./routers/index.route";

const PORT = process.env.PORT || 8080;
const app = express();

app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "https://lbs-field.vercel.app",
    credentials: true,
    // allowedHeaders: [
    //   "Access-Control-Allow-Origin",
    //   "Content-Type",
    //   "Authorization",
    // ],
  })
);
app.use(cookieParser());
app.use(indexRouter);
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("");
  res.status(err?.status || 500);
  return res.json({
    message: err?.message ?? "Internal server error",
    error: {},
  });
});

app.listen(PORT, () => {
  console.log(`server started:${PORT}`);
});
