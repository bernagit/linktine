"use client";

import { authService } from "@/services/base";
import {
    ActionIcon,
    Avatar,
    Burger,
    Container,
    Group,
    Menu,
    useMantineColorScheme,
} from "@mantine/core";
import { spotlight } from "@mantine/spotlight";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { FaHome, FaMoon, FaSearch, FaSun, FaUser } from "react-icons/fa";
import { MdLogout, MdPerson } from "react-icons/md";

type AppHeaderProps = {
    opened: boolean;
    toggle: () => void;
    closeBurger: () => void;
};

export default function AppHeader({ opened, toggle, closeBurger }: AppHeaderProps) {
    const router = useRouter();
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const goHome = () => {
        closeBurger();
        router.push("/");
    };

    const handleLogout = useCallback(async () => {
        await authService.logout();
        router.push("/login");
    }, [router]);
    return (
        <>
            <Container
                size="100%"
                px="md"
                h="100%"
                style={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <Group justify="space-between" w="100%">
                    <Group gap="sm">
                        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                        <ActionIcon variant="subtle" radius="xl" size="lg" onClick={goHome}>
                            <FaHome size={18} />
                        </ActionIcon>
                    </Group>

                    <Group gap="sm">
                        <ActionIcon
                            variant="subtle"
                            radius="xl"
                            size="lg"
                            onClick={() => spotlight.open()}
                        >
                            <FaSearch size={16} />
                        </ActionIcon>

                        <ActionIcon
                            variant="subtle"
                            radius="xl"
                            size="lg"
                            onClick={() => toggleColorScheme()}
                        >
                            {mounted &&
                                (colorScheme === "dark" ? (
                                    <FaSun size={16} />
                                ) : (
                                    <FaMoon size={16} />
                                ))}
                        </ActionIcon>

                        <Menu shadow="md" width={180}>
                            <Menu.Target>
                                <ActionIcon variant="transparent" radius="xl" size="lg">
                                    <Avatar radius="xl" size={32}>
                                        <FaUser size={16} />
                                    </Avatar>
                                </ActionIcon>
                            </Menu.Target>

                            <Menu.Dropdown>
                                <Menu.Item leftSection={<MdPerson size={16} />}>Profile</Menu.Item>
                                <Menu.Item
                                    leftSection={<MdLogout size={16} />}
                                    color="red"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                    </Group>
                </Group>
            </Container>
        </>
    );
}
