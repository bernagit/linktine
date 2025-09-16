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

const tagsService = { create, list, update, remove };
export default tagsService;
