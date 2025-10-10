import { z } from "zod";

export const createCollectionSchema = z.object({
    body: z.object({
        name: z.string().min(1),
        description: z.string().optional(),
        parentId: z.string().optional().nullable(),
        color: z
            .string()
            .regex(/^#?([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/)
            .optional(),
    }),
});

export const updateCollectionSchema = z.object({
    params: z.object({
        id: z.string(),
    }),
    body: z.object({
        name: z.string().min(1).optional(),
        description: z.string().optional().nullable(),
        parentId: z.string().optional().nullable(),
        color: z
            .string()
            .regex(/^#?([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/)
            .optional()
            .nullable(),
    }),
});

export const getCollectionsQuerySchema = z.object({
    query: z.object({
        q: z.string().optional(),
        parentId: z.string().optional(),
        page: z.string().optional(),
        limit: z.string().optional(),
    }),
});
