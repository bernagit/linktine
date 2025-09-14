import { prisma } from "../db/prisma";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../utils/jwt";
import { ChangePwdInput, LoginInput, RegisterInput, UpdateInput } from "validators/auth.validator";
import createHttpError from "http-errors";
import { Prisma } from "@prisma/client";

export async function register(data: RegisterInput) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            password: hashedPassword,
        },
    });

    const token = createAccessToken({ id: user.id, role: user.role });

    return { user: { id: user.id, email: user.email, role: user.role, name: user.name }, token };
}

export async function login(data: LoginInput) {
    const whereClause = {
        OR: [
            { email: { equals: data.identifier, mode: Prisma.QueryMode.insensitive } },
            { name: { equals: data.identifier, mode: Prisma.QueryMode.insensitive } },
        ],
    };
    const user = await prisma.user.findFirst({ where: whereClause });
    if (!user) throw createHttpError(401, "Invalid credentials");

    const valid = await bcrypt.compare(data.password, user.password);
    if (!valid) throw createHttpError(401, "Invalid credentials");

    const token = createAccessToken({ id: user.id, role: user.role });

    return { user: { id: user.id, email: user.email, role: user.role, name: user.name }, token };
}

export async function getMe(userId: string) {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, email: true, role: true, name: true, prefs: true },
    });
    if (!user) throw createHttpError(404, "User not found");
    return user;
}

export async function updateMe(userId: string, data: UpdateInput) {
    const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
            name: data.name,
            prefs: data.prefs,
        },
        select: { id: true, email: true, role: true, name: true, prefs: true },
    });
    return updatedUser;
}

export async function changePwd(userId: string, data: ChangePwdInput) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw createHttpError(404, "User not found");

    // Verify current password
    const valid = await bcrypt.compare(data.currentPassword, user.password);
    if (!valid) throw createHttpError(401, "Current password is incorrect");

    // Prevent reusing the same password
    const sameAsOld = await bcrypt.compare(data.newPassword, user.password);
    if (sameAsOld) throw createHttpError(400, "New password must be different from the current password");

    const hashedPassword = await bcrypt.hash(data.newPassword, 10);

    await prisma.user.update({
        where: { id: userId },
        data: { password: hashedPassword },
    });

    return { message: "Password changed successfully" };
}

