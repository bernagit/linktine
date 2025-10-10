import { z } from "zod";

export const createTagSchema = z.object({
    body: z.object({
        name: z.string().min(1),
        // must start with # and be a valid hex color code
        color: z
            .string()
            .regex(/^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/)
            .optional(),
    }),
});

export const updateTagSchema = z.object({
    params: z.object({ id: z.string() }),
    body: z.object({
        name: z.string().min(1),
        color: z
            .string()
            .regex(/^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/)
            .optional(),
    }),
});
