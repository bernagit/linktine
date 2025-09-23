"use client";

import { Card, Text, Title, Group, Stack, SimpleGrid } from "@mantine/core";
import { useRouter } from "next/navigation";
import { Collection } from "@/models/collection";

interface Props {
    childrenCollections?: Collection[];
}

export default function CollectionChildren({ childrenCollections }: Props) {
    const router = useRouter();

    if (!childrenCollections || childrenCollections.length === 0) return null;

    return (
        <Stack mt="lg" gap="md">
            <Title order={4} c="dimmed">
                Sub-collections
            </Title>
            <SimpleGrid cols={4} spacing="md">
                {childrenCollections.map((child) => (
                    <Card
                        key={child.id}
                        withBorder
                        shadow="xs"
                        radius="sm"
                        p="md"
                        style={{ cursor: "pointer", transition: "transform 150ms" }}
                        onClick={() => router.push(`/collections/${child.id}`)}
                        onMouseEnter={(e) =>
                            (e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)")
                        }
                        onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
                    >
                        <Group justify="space-between" align="flex-start">
                            <Stack gap={4} style={{ flex: 1 }}>
                                <Text fw={600}>{child.name}</Text>
                                <Text size="sm" c="dimmed">
                                    {child.description ?? "No description"}
                                </Text>
                            </Stack>

                            {child._count && (
                                <Text size="sm" c="dimmed">
                                    {child._count.links} links · {child._count.children} sub
                                </Text>
                            )}
                        </Group>
                    </Card>
                ))}
            </SimpleGrid>
        </Stack>
    );
}
