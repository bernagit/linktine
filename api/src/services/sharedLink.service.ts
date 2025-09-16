import { prisma } from "../db/prisma";
import { randomUUID } from "crypto";

interface CreateSharedLinkInput {
    linkId: string;
    access?: "READ" | "EDIT";
    expiresAt?: Date | null;
    ownerId: string;
}

const create = async (input: CreateSharedLinkInput) => {
    const { linkId, access = "READ", expiresAt, ownerId } = input;
    return prisma.sharedLink.create({
        data: {
            linkId,
            ownerId,
            access,
            expiresAt,
            token: randomUUID(),
        },
    });
};

const access = async (token: string) => {
    const shared = await prisma.sharedLink.findUnique({
        where: { token },
        include: { link: true },
    });
    if (!shared) return null;
    if (shared.expiresAt && shared.expiresAt < new Date()) return null;
    return shared;
};

const sharedLinksService = { create, access };
export default sharedLinksService;
