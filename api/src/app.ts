import "express-async-errors";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import linksRouter from "./routes/link.route";
import authRouter from "./routes/auth.route";
import collectionsRouter from "./routes/collection.route";
import tagsRouter from "./routes/tag.route";
import sharedLinksRouter from "./routes/sharedLink.route";
import sharedCollectionsRouter from "./routes/sharedCollection.route";
import baseRouter from "./routes/base.route";
import tokenRouter from "./routes/token.route";
import errorHandler from "./middlewares/error";
import notFoundHandler from "./middlewares/not-found";
import { env } from "./config/env";

const app = express();

app.use(helmet());
app.use(cookieParser());
app.use(
    cors({
        origin: env.CORS_ORIGINS,
        credentials: true,
    })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Healthcheck
app.get("/healthz", (_req, res) => res.json({ ok: true }));

app.use("/api/v1/links", linksRouter);
app.use("/api/v1/collections", collectionsRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/tags", tagsRouter);
app.use("/api/v1/sharedLinks", sharedLinksRouter);
app.use("/api/v1/sharedCollections", sharedCollectionsRouter);
app.use("/api/v1/base", baseRouter);
app.use("/api/v1/tokens", tokenRouter);

// 404 handler
app.use(notFoundHandler);

app.use(errorHandler);

export default app;
