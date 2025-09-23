"use client";

import { useState, useEffect, useMemo } from "react";
import api from "@/utils/ky";
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
} from "@mantine/core";
import { FaLink, FaFolder, FaTags, FaStar, FaHistory } from "react-icons/fa";
import { DashboardData } from "@/models/shared";

function StatsCard({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: number }) {
    return (
        <Paper p="sm" shadow="sm" withBorder radius="md">
            <Group style={{ justifyContent: "space-between", alignItems: "center" }}>
                <Icon size={20} />
                <Text style={{ fontWeight: 700, fontSize: 18 }}>{value}</Text>
            </Group>
            <Text style={{ color: "gray", fontSize: 12, marginTop: 4 }}>{label}</Text>
        </Paper>
    );
}

export default function Homepage() {
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchDashboard() {
            try {
                const response = await api.get<DashboardData>("dashboard").json();
                setData(response);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchDashboard();
    }, []);

    const statItems = useMemo(
        () => {
            if (!data) return [];
            return [
                { icon: FaLink, label: "Total Links", value: data.stats.totalLinks },
                { icon: FaFolder, label: "Collections", value: data.stats.totalCollections },
                { icon: FaStar, label: "Favorites", value: data.stats.favoriteLinks },
                { icon: FaTags, label: "Tags", value: data.stats.totalTags },
            ]
        },
        [data]
    );

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
                {statItems.map(({ icon: Icon, label, value }) => (
                    <Grid.Col span={{ base: 12, sm: 6, md: 3 }} key={label}>
                        <StatsCard icon={Icon} label={label} value={value} />
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
                <ScrollArea h={200} mah={200}>
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
                </ScrollArea>
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
