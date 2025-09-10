// src/server.ts
import app from "./app";
import { env } from "./config/env";
import { prisma } from "./db/prisma";

const PORT = Number(env.PORT || 4000);

const server = app.listen(PORT, () => {
    console.log(`🚀 Server listening on ${env.BASE_URL ?? `http://localhost:${PORT}`}`);
});

async function gracefulShutdown() {
    console.log("⏳ Shutting down...");
    server.close(async () => {
        try {
            await prisma.$disconnect();
            console.log("✅ Prisma disconnected");
            process.exit(0);
        } catch (err) {
            console.error("Error during shutdown:", err);
            process.exit(1);
        }
    });
}

process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);
