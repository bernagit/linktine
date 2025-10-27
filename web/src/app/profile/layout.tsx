"use client";

import ProfileSidebar from "@/components/layouts/ProfileSidebar";
import { useUserStore } from "@/stores/useUserStore";
import { ActionIcon, Avatar, Container, Flex, Loader, Space, Text, Title } from "@mantine/core";

import "@mantine/dates/styles.css";
import Link from "next/link";
import { FaTimes } from "react-icons/fa";

export default function ProfileLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { user, loading: isUserLoading } = useUserStore();

    return (
        <Container h="100vh" py="xl">
            <Flex justify="space-between">
                <Flex align="center" gap="xs">
                    <Avatar size="lg" />
                    {isUserLoading ? (
                        <Flex>
                            <Loader />
                        </Flex>
                    ) : (
                        <Flex direction="column">
                            <Title order={3}>{user?.name}</Title>
                            <Text size="sm" c="dimmed">
                                {user?.email}
                            </Text>
                        </Flex>
                    )}
                </Flex>

                <ActionIcon size="xl" radius="xl" variant="subtle" component={Link} href="/">
                    <FaTimes />
                </ActionIcon>
            </Flex>

            <Space my="xl" />

            <Flex gap="xl">
                <ProfileSidebar />

                <Flex flex={1}>{children}</Flex>
            </Flex>
        </Container>
    );
}
