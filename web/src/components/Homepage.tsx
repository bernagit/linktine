"use client";

import { useState, useEffect, useMemo } from "react";
import {
    Stack,
    Paper,
    Text,
    Group,
    Loader,
    Badge,
    ScrollArea,
    Title,
    Grid,
    useMantineTheme,
} from "@mantine/core";
import { FaLink, FaFolder, FaTags, FaStar, FaHistory } from "react-icons/fa";
import { DashboardData } from "@/models/shared";
import { nameToColor } from "@/utils/color";
import { baseService } from "@/services/base";

function StatsCard({
    icon: Icon,
    label,
    value,
    color,
}: {
    icon: React.ElementType;
    label: string;
    value: number;
    color: string;
}) {
    return (
        <Paper p="sm" shadow="sm" withBorder radius="md">
            <Group align="center" justify="space-between">
                <Icon size={20} color={color} />
                <Text size="lg" style={{ fontWeight: 700 }}>
                    {value}
                </Text>
            </Group>
            <Text size="sm" c="dimmed" mt={4}>
                {label}
            </Text>
        </Paper>
    );
}

export default function Homepage() {
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const theme = useMantineTheme();

    useEffect(() => {
        async function fetchDashboard() {
            try {
                const response = await baseService.getDashboard();
                setData(response);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchDashboard();
    }, []);

    const statItems = useMemo(() => {
        if (!data) return [];
        return [
            {
                icon: FaLink,
                label: "Total Links",
                value: data.stats.totalLinks,
                color: nameToColor(theme, "links"),
            },
            {
                icon: FaFolder,
                label: "Collections",
                value: data.stats.totalCollections,
                color: nameToColor(theme, "collections"),
            },
            {
                icon: FaStar,
                label: "Favorites",
                value: data.stats.favoriteLinks,
                color: nameToColor(theme, "favorites"),
            },
            {
                icon: FaTags,
                label: "Tags",
                value: data.stats.totalTags,
                color: nameToColor(theme, "tags"),
            },
        ];
    }, [data, theme]);

    if (loading)
        return (
            <Group justify="center" mt="xl">
                <Loader size="lg" />
            </Group>
        );

    if (!data)
        return (
            <Text ta="center" mt="xl" c="dimmed">
                Failed to load dashboard
            </Text>
        );

    return (
        <Stack p="sm" gap="lg">
            <Grid>
                {statItems.map(({ icon: Icon, label, value, color }) => (
                    <Grid.Col span={{ base: 12, sm: 6, md: 3 }} key={label}>
                        <StatsCard icon={Icon} label={label} value={value} color={color} />
                    </Grid.Col>
                ))}
            </Grid>

            {/* Recent links */}
            <Paper p="md" shadow="sm" withBorder radius="md">
                <Title order={3} mb="sm">
                    <Group justify="flex-start" align="center" gap={8}>
                        <FaHistory style={{ marginBottom: 6 }} size={22} />
                        Recent Links
                    </Group>
                </Title>
                <ScrollArea.Autosize mih={"20vh"} mah={"40vh"}>
                    <Stack gap="xs">
                        {data.recentLinks.map((link) => (
                            <Paper key={link.id} p="sm" radius="md" withBorder>
                                <Text w={500}>{link.title || link.url}</Text>
                                <Text size="xs" c="dimmed">
                                    {link.url}
                                </Text>
                            </Paper>
                        ))}
                    </Stack>
                </ScrollArea.Autosize>
            </Paper>

            {/* Recent Collections */}
            <Paper p="md" shadow="sm" withBorder radius="md">
                <Title order={4} mb="sm">
                    Recent Collections
                </Title>
                <Group gap="sm">
                    {data.recentCollections.map((col) => (
                        <Badge
                            key={col.id}
                            color={col.color || "gray"}
                            variant="filled"
                            radius="sm"
                        >
                            {col.name}
                        </Badge>
                    ))}
                </Group>
            </Paper>

            {/* Top Tags */}
            <Paper p="md" shadow="sm" withBorder radius="md">
                <Title order={4} mb="sm">
                    Top Tags
                </Title>
                <Group gap="sm">
                    {data.topTags.map((tag) => (
                        <Badge
                            key={tag.id}
                            color={tag.color || "gray"}
                            variant="filled"
                            radius="sm"
                        >
                            {tag.name} ({tag.count})
                        </Badge>
                    ))}
                </Group>
            </Paper>
        </Stack>
    );
}
