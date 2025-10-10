import { prisma } from "../db/prisma";
import { fetchMetadata } from "./metadata.service";

interface CreateLinkInput {
    url: string;
    tags?: string[];
    collectionId?: string;
    note?: string;
    read?: boolean;
    userId: string;
}

interface UpdateLinkInput {
    id: string;
    userId: string;
    data: {
        url?: string;
        tags?: string[];
        collectionId?: string | null;
        note?: string | null;
        read?: boolean;
        archived?: boolean;
        favorite?: boolean;
    };
}

const read = async (id: string, userId: string) => {
    const link = await prisma.link.findUnique({
        where: { id_userId: { id, userId } },
        include: { tags: { include: { tag: true } }, collection: true },
    });
    return link;
};

const create = async (input: CreateLinkInput) => {
    const { url, tags = [], collectionId, note, read, userId } = input;
    const meta = await fetchMetadata(url);

    const link = await prisma.link.create({
        data: {
            url,
            title: meta.title,
            description: meta.description,
            thumbnail: meta.thumbnail,
            domain: meta.domain,
            note,
            read,
            userId,
            collectionId,
            tags: {
                create: tags.map((t) => ({
                    tag: { connectOrCreate: { where: { name: t }, create: { name: t } } },
                })),
            },
        },
        include: { tags: { include: { tag: true } } },
    });

    return link;
};

const list = async (userId: string, filters: any, pagination: { page: number; limit: number }) => {
    const { q, tag, collectionId, read, archived } = filters;
    const { page, limit } = pagination;

    const where: any = { userId };

    if (q) {
        where.OR = [
            { title: { contains: q, mode: "insensitive" } },
            { description: { contains: q, mode: "insensitive" } },
            { domain: { contains: q, mode: "insensitive" } },
        ];
    }
    if (typeof read !== "undefined") where.read = read === "true";
    if (typeof archived !== "undefined") where.archived = archived === "true";
    if (collectionId) where.collectionId = collectionId;
    if (tag) where.tags = { some: { tag: { name: tag } } };

    const [data, total] = await Promise.all([
        prisma.link.findMany({
            where,
            include: { tags: { include: { tag: true } }, collection: true },
            orderBy: { createdAt: "desc" },
            skip: (page - 1) * limit,
            take: limit,
        }),
        prisma.link.count({ where }),
    ]);

    return { data, total, page, pageSize: limit };
};

const update = async (input: UpdateLinkInput) => {
    const { id, userId, data } = input;

    // re-fetch metadata if URL changes
    let meta = {};
    if (data.url) {
        meta = await fetchMetadata(data.url);
    }

    const link = await prisma.link.update({
        where: { id_userId: { id, userId } },
        data: {
            ...data,
            ...meta,
            tags: data.tags
                ? {
                      deleteMany: {}, // remove existing tags
                      create: data.tags.map((t) => ({
                          tag: { connectOrCreate: { where: { name: t }, create: { name: t } } },
                      })),
                  }
                : undefined,
        },
        include: { tags: { include: { tag: true } } },
    });

    return link;
};

const remove = async (id: string, userId: string) => {
    await prisma.linkTag.deleteMany({ where: { linkId: id } });
    await prisma.link.delete({ where: { id_userId: { id, userId } } });
};

const LinkService = {
    create,
    read,
    list,
    update,
    remove,
};

export default LinkService;
