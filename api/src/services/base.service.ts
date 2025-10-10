import { prisma } from "../db/prisma";

const getDashboard = async (userId: string) => {
    // 1. Statistics
    const [
        totalLinks,
        readLinks,
        favoriteLinks,
        archivedLinks,
        totalCollections,
        totalTags,
        sharedLinks,
        sharedCollections,
    ] = await Promise.all([
        prisma.link.count({ where: { userId } }),
        prisma.link.count({ where: { userId, read: true } }),
        prisma.link.count({ where: { userId, favorite: true } }),
        prisma.link.count({ where: { userId, archived: true } }),
        prisma.collection.count({ where: { userId } }),
        prisma.tag.count(),
        prisma.sharedLink.count({ where: { ownerId: userId } }),
        prisma.sharedCollection.count({ where: { ownerId: userId } }),
    ]);

    // 2. Recent links
    const recentLinks = await prisma.link.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        take: 5,
        select: { id: true, title: true, url: true, createdAt: true },
    });

    // 3. Recent collections
    const recentCollections = await prisma.collection.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        take: 5,
        select: { id: true, name: true, color: true },
    });

    // 4. Top tags by number of links
    const topTags = await prisma.tag.findMany({
        orderBy: { links: { _count: "desc" } },
        take: 5,
        select: {
            id: true,
            name: true,
            color: true,
            links: { select: { linkId: true } },
        },
    });

    const topTagsWithCount = topTags.map((tag) => ({
        id: tag.id,
        name: tag.name,
        color: tag.color,
        count: tag.links.length,
    }));

    return {
        stats: {
            totalLinks,
            readLinks,
            favoriteLinks,
            archivedLinks,
            totalCollections,
            totalTags,
            sharedLinks,
            sharedCollections,
        },
        recentLinks,
        recentCollections,
        topTags: topTagsWithCount,
    };
};

const globalSearch = async (userId: string, query: string) => {
    const links = await prisma.link.findMany({
        where: {
            userId,
            OR: [
                { title: { contains: query, mode: "insensitive" } },
                { url: { contains: query, mode: "insensitive" } },
                { description: { contains: query, mode: "insensitive" } },
            ],
        },
        select: { id: true, title: true, url: true, description: true },
        take: 20,
    });

    const collections = await prisma.collection.findMany({
        where: {
            userId,
            name: { contains: query, mode: "insensitive" },
        },
        select: { id: true, name: true, color: true },
        take: 20,
    });

    const tags = await prisma.tag.findMany({
        where: {
            name: { contains: query, mode: "insensitive" },
        },
        select: { id: true, name: true, color: true },
        take: 20,
    });

    return { links, collections, tags };
};

const baseService = {
    getDashboard,
    globalSearch,
};

export default baseService;
