// prisma/seed.ts
import { prisma } from "../src/db/prisma";
import bcrypt from "bcryptjs";

async function main() {
    // clear the database
    await prisma.link.deleteMany();
    await prisma.user.deleteMany();

    const password = await bcrypt.hash("admin123", 10);

    const admin = await prisma.user.upsert({
        where: { email: "admin@example.com" },
        update: {},
        create: {
            email: "admin@example.com",
            name: "Admin",
            password,
            role: "ADMIN",
        },
    });

    // now create some sample links for this user
    await prisma.link.createMany({
        data: [
            { url: "https://example.com", userId: admin.id },
            { url: "https://openai.com", userId: admin.id },
        ],
        skipDuplicates: true,
    });

    console.log("Database seeded");
}

main()
    .catch((e) => {
        console.error(e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
