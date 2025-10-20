import { z } from "zod";

export const createLinkSchema = z.object({
    body: z.object({
        url: z.url(),
        tags: z.array(z.string()).optional(),
        collectionId: z.string().optional(),
        name: z.string().optional(),
        note: z.string().optional(),
    }),
});

export const updateLinkSchema = z.object({
    params: z.object({
        id: z.string(),
    }),
    body: z.object({
        url: z.url().optional(),
        tags: z.array(z.string()).optional(),
        collectionId: z.string().optional().nullable(),
        note: z.string().optional().nullable(),
        read: z.boolean().optional(),
        archived: z.boolean().optional(),
        favorite: z.boolean().optional(),
    }),
});

export const getLinksQuerySchema = z.object({
    query: z.object({
        q: z.string().optional(),
        tag: z.string().optional(),
        collectionId: z.string().optional(),
        read: z.string().optional(),
        archived: z.string().optional(),
        page: z.string().optional(),
        limit: z.string().optional(),
    }),
});
