"use client";

import ProfileSidebar from "@/components/layouts/ProfileSidebar";
import { useUserStore } from "@/stores/useUserStore";
import {
    ActionIcon,
    Avatar,
    Box,
    Burger,
    Container,
    Drawer,
    Flex,
    Loader,
    Space,
    Text,
    Title,
} from "@mantine/core";

import "@mantine/dates/styles.css";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import { FaTimes } from "react-icons/fa";

export default function ProfileLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { user, loading: isUserLoading } = useUserStore();
    const [opened, { toggle }] = useDisclosure();

    return (
        <Container h="100vh" py="xl">
            <Flex justify="space-between">
                <Flex align="center" gap="xs">
                    <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
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
                <Box visibleFrom="sm" w="200px">
                    <ProfileSidebar />
                </Box>

                <Flex flex={1}>{children}</Flex>
            </Flex>

            <Drawer.Root opened={opened} size="100%" position="left" onClose={() => toggle()}>
                <Drawer.Content>
                    <Drawer.Header>
                        <Flex justify="start" gap="xs" align="center">
                            <Drawer.CloseButton />
                            <Title order={3}>Profile settings</Title>
                        </Flex>
                    </Drawer.Header>
                    <Drawer.Body>
                        <ProfileSidebar />
                    </Drawer.Body>
                </Drawer.Content>
            </Drawer.Root>
        </Container>
    );
}
