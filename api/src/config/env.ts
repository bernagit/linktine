import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
    DATABASE_URL: z.url(),
    PORT: z.string().default("4000"),
    JWT_SECRET: z.string().min(10),
    JWT_EXPIRES_IN: z.union([z.string(), z.number()]).default("3600s"),
    BASE_URL: z.url().optional(),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
    console.error("Invalid environment variables", z.treeifyError(_env.error));
    process.exit(1);
}

export const env = _env.data;
