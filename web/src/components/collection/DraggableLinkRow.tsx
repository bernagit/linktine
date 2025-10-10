"use client";

import { Table, Anchor, Badge, Group, Image } from "@mantine/core";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Link } from "@/models/link";

export default function DraggableLinkRow({ link }: { link: Link }) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: `link-${link.id}`,
        data: { type: "link", link },
    });

    const style = {
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0.6 : 1,
        cursor: "grab",
        boxShadow: isDragging ? "0 4px 12px rgba(0,0,0,0.15)" : "0 1px 3px rgba(0,0,0,0.05)",
        backgroundColor: isDragging ? "#f8f9fa" : "transparent",
        transition: "box-shadow 150ms ease, background-color 150ms ease",
    };

    return (
        <Table.Tr ref={setNodeRef} style={style} {...listeners} {...attributes}>
            <Table.Td>
                <Image
                    src={link.thumbnail ?? "/url-thumbnail.png"}
                    alt="Thumbnail"
                    w={40}
                    fit="contain"
                />
            </Table.Td>
            <Table.Td>
                <Anchor href={link.url} target="_blank">
                    {link.title ?? link.url}
                </Anchor>
            </Table.Td>
            <Table.Td>{link.domain ?? "—"}</Table.Td>
            <Table.Td>
                <Group gap="xs">
                    {link.read && <Badge color="green">Read</Badge>}
                    {link.archived && <Badge color="gray">Archived</Badge>}
                    {link.favorite && <Badge color="yellow">Favorite</Badge>}
                </Group>
            </Table.Td>
        </Table.Tr>
    );
}
