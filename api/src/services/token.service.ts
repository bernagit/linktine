import createHttpError from "http-errors";
import { prisma } from "../db/prisma";
import { CreateTokenInput } from "validators/token.validator";
import crypto from "crypto";

export async function find(tokenId: string) {
    return await prisma.apiToken.findFirst({
        where: {
            id: tokenId,
        },
    });
}

export async function list(userId: string) {
    return await prisma.apiToken.findMany({
        where: {
            userId,
        },
    });
}

export async function create(userId: string, data: CreateTokenInput) {
    const tokenBuffer = new Uint8Array(16);
    crypto.getRandomValues(tokenBuffer);
    const hexToken = Array.from(tokenBuffer, (b) => b.toString(16).padStart(2, "0")).join("");

    const hashedToken = crypto.createHash("sha256").update(hexToken).digest("hex");

    const token = await prisma.apiToken.create({
        data: {
            name: data.name,
            tokenHash: hashedToken,
            description: data.description,
            userId: userId,
            expiresAt: data.expiresAt,
        },
    });

    return { token: { ...token, hexToken } };
}

export async function revoke(tokenId: string) {
    const updatedToken = await prisma.apiToken.update({
        where: { id: tokenId },
        data: {
            revokedAt: new Date(),
        },
    });

    return { token: updatedToken };
}

export async function check(userId: string, token: string) {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const savedToken = prisma.apiToken.findFirst({
        where: {
            userId,
            tokenHash: hashedToken,
        },
    });

    return savedToken;
}

export async function remove(tokenId: string) {
    await prisma.apiToken.delete({
        where: {
            id: tokenId,
        },
    });
}

const apiTokenService = {
    find,
    list,
    create,
    revoke,
    check,
    remove,
};

export default apiTokenService;
