import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
    DATABASE_URL: z.url(),
    PORT: z.string().default("4000"),
    JWT_SECRET: z.string().min(10),
    JWT_EXPIRES_IN: z
        .string()
        .min(0)
        .default("3600s")
        .refine((val) => /^\d+(s|m|h|d)?$/.test(val), {
            message:
                "JWT_EXPIRES_IN must be a number followed by an optional time unit (s, m, h, d)",
        })
        .transform((val) => {
            const match = val.match(/^(\d+)(s|m|h|d)?$/);
            if (!match) return 3600; // default to 1 hour in seconds
            const num = parseInt(match[1], 10);
            const unit = match[2] || "s";
            switch (unit) {
                case "s":
                    return num;
                case "m":
                    return num * 60;
                case "h":
                    return num * 3600;
                case "d":
                    return num * 86400;
                default:
                    return num;
            }
        }),
    NODE_ENV: z.enum(["development", "production"]).default("development"),
    BASE_URL: z.url().optional(),
    DISABLE_SIGNUP: z
        .string()
        .default("false")
        .transform((val) => val === "true"),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
    console.error("Invalid environment variables", z.treeifyError(_env.error));
    process.exit(1);
}

export const env = _env.data;
