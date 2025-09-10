import { prisma } from "../db/prisma";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../utils/jwt";
import { LoginInput, RegisterInput } from "validators/auth.validator";

export async function register(data: RegisterInput) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
        data: {
            email: data.email,
            password: hashedPassword,
        },
    });

    const token = createAccessToken({ id: user.id, role: user.role });

    return { user: { id: user.id, email: user.email, role: user.role }, token };
}

export async function login(data: LoginInput) {
    const user = await prisma.user.findUnique({ where: { email: data.email } });
    if (!user) throw new Error("Invalid credentials");

    const valid = await bcrypt.compare(data.password, user.password);
    if (!valid) throw new Error("Invalid credentials");

    const token = createAccessToken({ id: user.id, role: user.role });

    return { user: { id: user.id, email: user.email, role: user.role }, token };
}
