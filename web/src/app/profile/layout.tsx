import ProfileSidebar from "@/components/layouts/ProfileSidebar";
import { ActionIcon, Avatar, Container, Flex, Space, Text, Title } from "@mantine/core";

import "@mantine/dates/styles.css";
import Link from "next/link";
import { FaTimes } from "react-icons/fa";
import { FaX } from "react-icons/fa6";

export default function ProfileLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Container h="100vh" py="xl">
            <Flex justify="space-between">
                <Flex align="center" gap="xs">
                    <Avatar size="lg" />

                    <Flex direction="column">
                        <Title order={3}>Username</Title>
                        <Text size="sm" c="dimmed">
                            email@gmail.com
                        </Text>
                    </Flex>
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
