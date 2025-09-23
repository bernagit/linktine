"use client";

import { Table, Group, Card, Text } from "@mantine/core";
import { Collection } from "@/models/collection";
import DraggableLinkRow from "./DraggableLinkRow";
import { useContextMenu } from "mantine-contextmenu";
import { FaCopy, FaDownload } from "react-icons/fa6";

interface Props {
    collection: Collection;
    viewMode: "list" | "grid";
}

export default function CollectionLinks({ collection, viewMode }: Props) {
    const { showContextMenu } = useContextMenu();

    if (!collection.links || collection.links.length === 0) return null;

    if (viewMode === "list") {
        return (
            <Card withBorder shadow="xs" radius="md" p="lg">
                <Text size="lg" w={500} mb="md">
                    Links
                </Text>
                <Table striped highlightOnHover>
                    <Table.Thead>
                        <Table.Tr>
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
            </Card>
        );
    }

    // Grid view
    return (
        <Card withBorder shadow="xs" radius="md" p="lg">
            <Text size="lg" w={500} mb="md">
                Links
            </Text>
            <Group gap="md" wrap="wrap">
                {collection.links.map((link) => (
                    <Card
                        key={link.id}
                        p="sm"
                        style={{ width: 200 }}
                        onContextMenu={showContextMenu([
                            {
                                key: "copy",
                                icon: <FaCopy size={16} />,
                                title: "Copy to clipboard",
                                onClick: () => console.log("Copy", link.url),
                            },
                            {
                                key: "download",
                                icon: <FaDownload size={16} />,
                                title: "Download to your device",
                                onClick: () => console.log("Download", link.url),
                            },
                        ])}
                    >
                        <Text w={500}>{link.title ?? link.url}</Text>
                        <Text size="sm" c="dimmed">
                            {link.domain ?? "—"}
                        </Text>
                    </Card>
                ))}
            </Group>
        </Card>
    );
}
