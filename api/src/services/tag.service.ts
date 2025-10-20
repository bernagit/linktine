import { prisma } from "../db/prisma";

const create = async (data: { name: string; color?: string }) => {
    return prisma.tag.create({ data });
};

const list = async () => {
    return prisma.tag.findMany({
        include: { links: { include: { link: true } } },
        orderBy: { createdAt: "desc" },
    });
};

const update = async (id: string, data: { name: string; color?: string }) => {
    return prisma.tag.update({ where: { id }, data });
};

const remove = async (id: string) => {
    await prisma.tag.delete({ where: { id } });
};

const getSuggestions = async (query: string) => {
    const tags = await prisma.tag.findMany({
        where: {
            name: {
                contains: query,
                mode: "insensitive",
            },
        },
        select: { id: true, name: true, color: true },
        orderBy: { name: "asc" },
        take: 5,
    });
    return tags;
};

const tagsService = { create, list, update, remove, getSuggestions };
export default tagsService;
