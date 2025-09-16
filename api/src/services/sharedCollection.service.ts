import { prisma } from "../db/prisma";
import { randomUUID } from "crypto";

interface CreateSharedCollectionInput {
    collectionId: string;
    access?: "READ" | "EDIT";
    expiresAt?: Date | null;
    ownerId: string;
}

const create = async (input: CreateSharedCollectionInput) => {
    const { collectionId, access = "READ", expiresAt, ownerId } = input;
    return prisma.sharedCollection.create({
        data: {
            collectionId,
            ownerId,
            access,
            expiresAt,
            token: randomUUID(),
        },
    });
};

const access = async (token: string) => {
    const shared = await prisma.sharedCollection.findUnique({
        where: { token },
        include: { collection: { include: { links: true, children: true } } },
    });
    if (!shared) return null;
    if (shared.expiresAt && shared.expiresAt < new Date()) return null;
    return shared;
};

const sharedCollectionsService = { create, access };
export default sharedCollectionsService;
