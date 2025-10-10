"use client";

import { useState } from "react";
import { NavLink, ActionIcon, Group, Text, useMantineTheme } from "@mantine/core";
import { FaFolder, FaChevronRight } from "react-icons/fa6";
import { usePathname, useRouter } from "next/navigation";
import { Collection } from "@/models/collection";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { useCollectionsStore } from "@/stores/useCollectionsStore";
import { hexToRgba } from "@/utils/color";

export default function TreeNode({
    node,
    closeBurger,
}: {
    node: Collection;
    closeBurger?: () => void;
}) {
    const router = useRouter();
    const [opened, setOpened] = useState(false);
    const theme = useMantineTheme();

    const collection = useCollectionsStore((s) => s.collections[node.id] || node);
    const pathname = usePathname();
    const isActive = pathname === `/collections/${collection.id}`;

    const count = collection._count
        ? (collection._count.links ?? 0) + (collection._count.children ?? 0)
        : (collection.links?.length ?? 0) + (collection.children?.length ?? 0);

    // droppable
    const { setNodeRef: setDropRef, isOver } = useDroppable({
        id: `collection-${node.id}`,
        data: { type: "collection", node: collection },
    });

    // draggable
    const {
        attributes,
        listeners,
        setNodeRef: setDragRef,
        transform,
        isDragging,
    } = useDraggable({
        id: `drag-${node.id}`,
        data: { type: "collection", node: collection },
    });

    const goToCollection = () => {
        closeBurger?.();
        router.push(`/collections/${collection.id}`);
    };

    const toggleChildren = (e: React.MouseEvent) => {
        e.stopPropagation();
        setOpened((o) => !o);
    };

    return (
        <NavLink
            key={collection.id}
            ref={(el) => {
                setDropRef(el);
                setDragRef(el);
            }}
            label={
                <Group align="center" gap="xs">
                    <span {...listeners} {...attributes}>
                        <FaFolder
                            style={{ cursor: "grab" }}
                            size={18}
                            color={collection.color || "inherit"}
                        />
                    </span>

                    <Text fw={isActive ? 500 : 400}>{collection.name}</Text>
                    <Text size="xs" c="dimmed">
                        {count}
                    </Text>
                </Group>
            }
            onClick={goToCollection}
            childrenOffset={35}
            opened={opened}
            style={{
                transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
                opacity: isDragging ? 0.5 : 1,
                backgroundColor: isActive
                    ? hexToRgba(theme.colors.teal[6], 0.15) // active background
                    : isOver
                      ? hexToRgba(theme.colors.teal[2], 0.12) // drag over background
                      : "transparent",
                border: isOver ? `1px dashed ${theme.colors.teal[4]}` : "1px solid transparent",
                borderRadius: 6,
                transition: "background-color 150ms ease, border 150ms ease",
            }}
            rightSection={
                collection.children && collection.children.length > 0 ? (
                    <ActionIcon
                        variant="transparent"
                        size="sm"
                        radius="xl"
                        onClick={toggleChildren}
                    >
                        <FaChevronRight size={12} />
                    </ActionIcon>
                ) : null
            }
        >
            {opened &&
                collection.children?.map((child) => (
                    <TreeNode key={child.id} node={child} closeBurger={closeBurger} />
                ))}
        </NavLink>
    );
}
