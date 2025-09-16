import { prisma } from "../db/prisma";

interface CreateCollectionInput {
    name: string;
    description?: string;
    parentId?: string | null;
    userId: string;
    color?: string | null;
}

interface UpdateCollectionInput {
    id: string;
    userId: string;
    data: {
        name?: string;
        description?: string | null;
        parentId?: string | null;
        color?: string | null;
    };
}

const read = async (id: string, userId: string) => {
    return prisma.collection.findUnique({
        where: { id },
        include: { children: true, links: true },
    }).then(col => col && col.userId === userId ? col : null);
};

const create = async (input: CreateCollectionInput) => {
    const { name, description, parentId, userId, color } = input;
    return prisma.collection.create({
        data: {
            name,
            description,
            parentId,
            userId,
            color,
        },
    });
};

const list = async (userId: string, filters: any, pagination: { page: number; limit: number }) => {
    const { q, parentId } = filters;
    const { page, limit } = pagination;

    const where: any = { userId };
    if (q) {
        where.OR = [
            { name: { contains: q, mode: "insensitive" } },
            { description: { contains: q, mode: "insensitive" } },
        ];
    }
    if (parentId) where.parentId = parentId;

    const [data, total] = await Promise.all([
        prisma.collection.findMany({
            where,
            include: { children: true, links: true },
            orderBy: { createdAt: "desc" },
            skip: (page - 1) * limit,
            take: limit,
        }),
        prisma.collection.count({ where }),
    ]);

    return { data, total, page, pageSize: limit };
};

const update = async (input: UpdateCollectionInput) => {
    const { id, userId, data } = input;
    return prisma.collection.update({
        where: { id },
        data: {
            ...data,
        },
    });
};

const remove = async (id: string, userId: string) => {
    // Ensure it belongs to the user before deleting
    const collection = await prisma.collection.findUnique({ where: { id } });
    if (!collection || collection.userId !== userId) throw new Error("Forbidden");

    return prisma.collection.delete({ where: { id } });
};

const collectionsService = {
    create,
    read,
    list,
    update,
    remove,
};

export default collectionsService;
