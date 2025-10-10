"use client";

import { Table, Group, Card, Stack, Title } from "@mantine/core";
import { Collection } from "@/models/collection";
import DraggableLinkRow from "./DraggableLinkRow";
import { useState } from "react";
import CollectionViewToggle from "./CollectionViewToggle";
import DraggableLinkCard from "./DraggableLinkCard";

interface Props {
    collection: Collection;
}

export default function CollectionLinks({ collection }: Props) {
    const [viewMode, setViewMode] = useState<"list" | "grid">("list");

    if (!collection.links || collection.links.length === 0) return null;

    return (
        <Stack gap={'xs'}>
            <Group justify="space-between">
                <Title order={3} mb="md">Links</Title>
                <CollectionViewToggle viewMode={viewMode} setViewMode={setViewMode} />
            </Group>
            <Card withBorder shadow="xs" radius="md">
                {viewMode === "list" ? (
                    <Table striped highlightOnHover>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>Preview</Table.Th>
                                <Table.Th>Title</Table.Th>
                                <Table.Th>Domain</Table.Th>
                                <Table.Th>Status</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {collection.links.map((link) => (
                                <DraggableLinkRow key={link.id} link={link} />
                            ))}
                        </Table.Tbody>
                    </Table>
                ) : (
                    <Group gap="md" wrap="wrap">
                        {collection.links.map((link) => (
                            <DraggableLinkCard key={link.id} link={link} />
                        ))}
                    </Group>
                )}
            </Card>
        </Stack>
    );
}
