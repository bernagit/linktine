import { prisma } from "../src/db/prisma";
import bcrypt from "bcryptjs";

async function main() {
    // clear the database in dependency order
    await prisma.sharedCollection.deleteMany();
    await prisma.sharedLink.deleteMany();
    await prisma.linkTag.deleteMany();
    await prisma.tag.deleteMany();
    await prisma.link.deleteMany();
    await prisma.collection.deleteMany();
    await prisma.user.deleteMany();

    // create admin user
    const password = await bcrypt.hash("admin123", 10);
    const admin = await prisma.user.create({
        data: {
            email: "admin@example.com",
            name: "Admin",
            password,
            role: "ADMIN",
        },
    });

    // create a few collections
    const work = await prisma.collection.create({
        data: {
            name: "Work",
            description: "Work-related bookmarks",
            userId: admin.id,
            color: "#FF5733",
        },
    });

    const projectA = await prisma.collection.create({
        data: {
            name: "Project A",
            description: "Links for Project A",
            userId: admin.id,
            parentId: work.id, // nested under "Work"
            color: "#33C3FF",
        },
    });

    const personal = await prisma.collection.create({
        data: {
            name: "Personal",
            description: "Personal reading and bookmarks",
            userId: admin.id,
            color: "#75FF33",
        },
    });

    // create some tags
    const tagDev = await prisma.tag.create({ data: { name: "dev" } });
    const tagAI = await prisma.tag.create({ data: { name: "ai" } });
    const tagNews = await prisma.tag.create({ data: { name: "news" } });

    // create links and assign to collections + tags
    const openaiLink = await prisma.link.create({
        data: {
            url: "https://openai.com",
            title: "OpenAI",
            description: "Artificial Intelligence research and deployment company",
            domain: "openai.com",
            userId: admin.id,
            collectionId: projectA.id,
            tags: {
                create: [
                    { tag: { connect: { id: tagAI.id } } },
                    { tag: { connect: { id: tagDev.id } } },
                ],
            },
        },
    });

    const prismaLink = await prisma.link.create({
        data: {
            url: "https://www.prisma.io",
            title: "Prisma ORM",
            description: "Next-generation Node.js and TypeScript ORM",
            domain: "prisma.io",
            userId: admin.id,
            collectionId: work.id,
            tags: {
                create: [{ tag: { connect: { id: tagDev.id } } }],
            },
        },
    });

    const nytimesLink = await prisma.link.create({
        data: {
            url: "https://www.nytimes.com",
            title: "The New York Times",
            description: "News, analysis and opinion",
            domain: "nytimes.com",
            userId: admin.id,
            collectionId: personal.id,
            tags: {
                create: [{ tag: { connect: { id: tagNews.id } } }],
            },
        },
    });

    const mantineLink = await prisma.link.create({
        data: {
            url: "https://mantine.dev/",
            title: "Mantine components",
            description: "test",
            domain: "mantine.dev",
            userId: admin.id,
            collectionId: personal.id,
            tags: {
                create: [{ tag: { connect: {id: tagNews.id } } }],
            }
        }
    })

    console.log("Database seeded with:");
    console.log({
        user: admin,
        collections: [work, projectA, personal],
        links: [openaiLink, prismaLink, nytimesLink],
    });
}

main()
    .catch((e) => {
        console.error(e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
