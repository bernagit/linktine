"use client";

import api from "@/utils/ky";
import { Button, Container, Title, Text } from "@mantine/core";
import { useRouter } from "next/navigation";

export default function HomePage() {
    const router = useRouter();

    const handleLogout = async () => {
        await api.post("auth/logout");
        router.push("/login");
    };

    return (
        <Container size="sm" py="xl">
            <Title order={2}>Welcome to the Protected Home!</Title>
            <Text c="dimmed" mt="sm">
                You are logged in. This page is protected by Next.js middleware.
            </Text>
            <Button mt="lg" onClick={handleLogout}>
                Logout
            </Button>
        </Container>
    );
}
