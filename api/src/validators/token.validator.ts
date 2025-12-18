import { z } from "zod";

export const createTokenSchema = z.object({
    body: z.object({
        name: z.string().min(0, "A name but be specified"),
        description: z.string().optional().nullable(),
        expiresAt: z.iso.datetime().optional().nullable(),
    }),
});

export type CreateTokenInput = z.infer<typeof createTokenSchema>["body"];
