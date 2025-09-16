import { z } from "zod";

export const createSharedLinkSchema = z.object({
    body: z.object({
        linkId: z.string(),
        access: z.enum(["READ", "EDIT"]).optional(),
        expiresAt: z.iso.datetime().optional(),
    }),
});
