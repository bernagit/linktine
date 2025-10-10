    "use client";

    import { Text, Title, Group, Stack, SimpleGrid, Card } from "@mantine/core";
    import { useRouter } from "next/navigation";
    import { Collection } from "@/models/collection";
    import { FaFolder } from "react-icons/fa6";

    interface Props {
        childrenCollections?: Collection[];
    }

    export default function CollectionChildren({ childrenCollections }: Props) {
        const router = useRouter();

        if (!childrenCollections || childrenCollections.length === 0) return null;

        return (
            <Stack gap="md">
                <Title order={3}>Collections</Title>
                <SimpleGrid cols={4} spacing="md" mb={'md'}>
                    {childrenCollections.map((child) => {
                        return (
                            <Card
                                key={child.id}
                                withBorder
                                shadow="md"
                                radius="sm"
                                p="md"
                                style={{ cursor: "pointer", transition: "transform 150ms" }}
                                onClick={() => router.push(`/collections/${child.id}`)}
                                onMouseOver={(e) => {
                                    (e.currentTarget as HTMLDivElement).style.transform = "scale(1.01)";
                                }}
                                onMouseOut={(e) => {
                                    (e.currentTarget as HTMLDivElement).style.transform = "scale(1)";
                                }}
                            >
                                <Group justify="space-between" align="flex-start">
                                    <Stack gap={4} style={{ flex: 1 }}>
                                        <Group align="center" gap="xs">
                                            <FaFolder size={16} color={child.color || 'gray'} />
                                            <Text fw={600} lineClamp={1}>
                                                {child.name}
                                            </Text>
                                        </Group>
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
                        )
                    })}
                </SimpleGrid>
            </Stack>
        );
    }
