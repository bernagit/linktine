"use client";

import { Group, ActionIcon } from "@mantine/core";
import { CiGrid2H, CiGrid41 } from "react-icons/ci";

interface Props {
    viewMode: "list" | "grid";
    setViewMode: (mode: "list" | "grid") => void;
}

export default function CollectionViewToggle({ viewMode, setViewMode }: Props) {
    return (
        <Group mb="md">
            <ActionIcon
                size="lg"
                variant={viewMode === "list" ? "filled" : "subtle"}
                onClick={() => setViewMode("list")}
            >
                <CiGrid2H size={24} />
            </ActionIcon>
            <ActionIcon
                size="lg"
                variant={viewMode === "grid" ? "filled" : "subtle"}
                onClick={() => setViewMode("grid")}
            >
                <CiGrid41 size={24} />
            </ActionIcon>
        </Group>
    );
}
