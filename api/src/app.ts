// src/app.ts
import "express-async-errors";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import linksRouter from "./routes/link.route";
import authRouter from "./routes/auth.route";
import collectionsRouter from "./routes/collection.route";
import errorHandler from "./middlewares/error";
import notFoundHandler from "./middlewares/not-found";

const app = express();

app.use(helmet());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Healthcheck
app.get("/healthz", (_req, res) => res.json({ ok: true }));

app.use("/api/v1/links", linksRouter);
app.use("/api/v1/collections", collectionsRouter);
app.use("/api/v1/auth", authRouter);

// 404 handler
app.use(notFoundHandler);

app.use(errorHandler);

export default app;
