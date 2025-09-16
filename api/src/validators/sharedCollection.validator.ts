import { z } from "zod";

export const createSharedCollectionSchema = z.object({
    body: z.object({
        collectionId: z.string(),
        access: z.enum(["READ", "EDIT"]).optional(),
        expiresAt: z.string().datetime().optional(),
    }),
});
