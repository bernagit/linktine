"use client";

import { useCollections } from "@/hooks/useCollections";
import TreeNode from "./TreeNode";
import { useDroppable, useDndContext } from "@dnd-kit/core";
import { useMantineTheme, Paper, Text } from "@mantine/core";
import { hexToRgba } from "@/utils/color";

type CollectionsNavbarProps = {
    closeBurger?: () => void;
};

export default function CollectionsNavbar({ closeBurger }: CollectionsNavbarProps) {
    const tree = useCollections();
    const theme = useMantineTheme();

    const { active } = useDndContext();

    const { setNodeRef, isOver } = useDroppable({
        id: "collection-root",
        data: { type: "collection-root" },
    });

    const isDraggingCollection = active?.data?.current?.type === "collection";

    return (
        <div>
            <div ref={setNodeRef} style={{ marginBottom: "0.5rem" }}>
                <Paper
                    withBorder
                    radius="md"
                    p="sm"
                    style={{
                        textAlign: "center",
                        opacity: isDraggingCollection ? 1 : 0,
                        height: isDraggingCollection ? "auto" : 0, // collapse when not dragging
                        overflow: "hidden",
                        backgroundColor: isOver
                            ? hexToRgba(theme.colors.teal[2], 0.12)
                            : "transparent",
                        border: isOver
                            ? `1px dashed ${theme.colors.teal[4]}`
                            : "1px dashed transparent",
                        transition: "all 150ms ease",
                    }}
                >
                    <Text size="sm" c="dimmed">
                        Drop here to move to root
                    </Text>
                </Paper>
            </div>

            {tree.map((node) => (
                <TreeNode key={node.id} node={node} closeBurger={closeBurger} />
            ))}
        </div>
    );
}
