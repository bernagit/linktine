// src/app.ts
import "express-async-errors";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";

import linksRouter from "./routes/link.route";
import authRouter from "./routes/auth.route";
import collectionsRouter from "./routes/collection.route";
import { errorHandler } from "./middlewares/error";
import { notFoundHandler } from "./middlewares/notfound";

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Healthcheck
app.get("/healthz", (_req, res) => res.json({ ok: true }));

app.use("/api/links", linksRouter);
app.use("/api/collections", collectionsRouter);
app.use("/api/auth", authRouter);

// 404 handler
app.use(notFoundHandler);

app.use(errorHandler);

export default app;
