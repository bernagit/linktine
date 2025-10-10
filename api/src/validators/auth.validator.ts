import { z } from "zod";

export const registerSchema = z.object({
    body: z.object({
        name: z.string().min(3, "Name must be at least 3 characters"),
        email: z.email(),
        password: z.string().min(8, "Password must be at least 8 characters"),
    }),
});

export const loginSchema = z.object({
    body: z.object({
        identifier: z.union([z.email(), z.string().min(3)]),
        password: z.string().min(8, "Password must be at least 8 characters"),
    }),
});

export const updateSchema = z.object({
    body: z.object({
        name: z.string().min(3, "Name must be at least 3 characters").optional(),
        prefs: z.object().optional(),
    }),
});

export const changePwdSchema = z.object({
    body: z.object({
        currentPassword: z.string().min(8, "Password must be at least 8 characters"),
        newPassword: z.string().min(8, "Password must be at least 8 characters"),
    }),
});

export type RegisterInput = z.infer<typeof registerSchema>["body"];
export type LoginInput = z.infer<typeof loginSchema>["body"];
export type UpdateInput = z.infer<typeof updateSchema>["body"];
export type ChangePwdInput = z.infer<typeof changePwdSchema>["body"];
