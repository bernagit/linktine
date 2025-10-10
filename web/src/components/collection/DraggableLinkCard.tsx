"use client";

import { Card, Text, Image } from "@mantine/core";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Link } from "@/models/link";
import { useContextMenu } from "mantine-contextmenu";
import { FaCopy, FaDownload } from "react-icons/fa6";
import dayjs from "dayjs";
import { FaCalendarAlt } from "react-icons/fa";

export default function DraggableLinkCard({ link }: { link: Link }) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: `link-${link.id}`,
        data: { type: "link", link },
    });

    const { showContextMenu } = useContextMenu();

    const updated = dayjs(link.updatedAt).format("DD/MM/YYYY");

    const style = {
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0.6 : 1,
        cursor: "grab",
        boxShadow: isDragging ? "0 4px 12px rgba(0,0,0,0.15)" : "0 1px 3px rgba(0,0,0,0.05)",
        backgroundColor: isDragging ? "#f8f9fa" : "transparent",
        transition: "box-shadow 150ms ease, background-color 150ms ease",
        width: 200,
    };

    return (
        <Card
            ref={setNodeRef}
            p="sm"
            style={style}
            {...listeners}
            {...attributes}
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
            <Card.Section mb="xs">
                <Image
                    src={link.thumbnail ?? "/url-thumbnail.png"}
                    alt={link.title ?? link.url}
                    height={100}
                    width={200}
                    style={{ objectFit: "cover" }}
                />
            </Card.Section>
            <Text w={500}>{link.title ?? link.url}</Text>
            <Text size="sm" c="dimmed">
                {link.domain ?? "—"}
            </Text>
            {/* add a card section with last modified date */}
            {updated && (
                <Card.Section style={{ textAlign: "right" }} mr={5}>
                    <FaCalendarAlt size={12} style={{ marginRight: 4 }} />
                    <Text size="xs" c="dimmed" display="inline">
                        {updated}
                    </Text>
                </Card.Section>
            )}
        </Card>
    );
}
