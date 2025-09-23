"use client";

import api from "@/utils/ky";
import {
    ActionIcon,
    Avatar,
    Burger,
    Container,
    Group,
    Menu,
    Modal,
    rem,
    TextInput,
    useMantineColorScheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
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
    const [searchValue, setSearchValue] = useState("");
    const [searchOpened, { open: openSearch, close: closeSearch }] = useDisclosure();
    const [mounted, setMounted] = useState(false);
    
    useEffect(() => {
        setMounted(true);
    }, []);

    const goHome = () => {
        closeBurger();
        router.push("/");
    };

    const handleLogout = useCallback(async () => {
        await api.post("auth/logout");
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

                    <Group visibleFrom="md">
                        <TextInput
                            placeholder="Search..."
                            leftSection={<FaSearch size={16} />}
                            radius="md"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.currentTarget.value)}
                            w={rem(300)}
                            maw="40vw"
                        />
                    </Group>

                    <Group gap="sm">
                        <ActionIcon
                            variant="subtle"
                            radius="xl"
                            size="lg"
                            onClick={openSearch}
                            hiddenFrom="md"
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
            <Modal opened={searchOpened} onClose={closeSearch} title="Search" size="lg" centered>
                <TextInput
                    placeholder="Search..."
                    leftSection={<FaSearch size={16} />}
                    radius="md"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.currentTarget.value)}
                    size="md"
                    autoFocus
                />
            </Modal>
        </>
    );
}
