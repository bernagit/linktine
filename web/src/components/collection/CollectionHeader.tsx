"use client";

import { Group, Title, Text, Stack, Button, Popover } from "@mantine/core";
import { useCallback, useState } from "react";
import { Collection } from "@/models/collection";
import dayjs from "dayjs";
import CollectionIconPopover from "./CollectionIconPopover";
import { FaPlus } from "react-icons/fa6";
import { RxDotsHorizontal } from "react-icons/rx";

interface Props {
    collection: Collection;
    updateCollectionColor: (color: string) => void;
    saveColor: () => void;
}

export default function CollectionHeader({ collection, updateCollectionColor, saveColor }: Props) {
    const [opened, setOpened] = useState(false);
    const [oldColor, setOldColor] = useState(collection.color || "");

    const handleReset = useCallback(() => {
        updateCollectionColor(oldColor);
    }, [oldColor, updateCollectionColor]);

    const handleSave = useCallback(() => {
        setOpened(false);
        saveColor();
        setOldColor(collection.color || "");
    }, [collection.color, saveColor]);

    const handleColorChange = (color: string) => {
        if (!oldColor) setOldColor(color);
        updateCollectionColor(color);
    };

    return (
        <>
            <Group justify="space-between" align="center" mb="sm">
                <Group gap="sm" align="center">
                    <CollectionIconPopover
                        opened={opened}
                        setOpened={setOpened}
                        collectionColor={collection.color || ""}
                        handleReset={handleReset}
                        handleSave={handleSave}
                        handleColorChange={handleColorChange}
                    />

                    <Title mt={"xs"} order={2}>
                        {collection.name}
                    </Title>
                </Group>
                <Button.Group>
                    <Popover>
                        <Popover.Target>
                            <Button p={"xs"}>
                                <FaPlus />
                            </Button>
                        </Popover.Target>
                        <Popover.Dropdown>
                            <Text>Content</Text>
                        </Popover.Dropdown>
                    </Popover>
                    <Button p={"xs"}>
                        <RxDotsHorizontal />
                    </Button>
                </Button.Group>
            </Group>
            <Group justify="space-between" align="flex-start">
                {collection.description && (
                    <Text size="sm" c="dimmed" style={{ maxWidth: "70%" }}>
                        {collection.description}
                    </Text>
                )}

                <Stack align="end" gap={2}>
                    <Text size="xs" c="dimmed">
                        Last update
                    </Text>
                    <Text size="sm" fw={500}>
                        {dayjs(collection.updatedAt).format("MMMM D, YYYY HH:mm")}
                    </Text>
                </Stack>
            </Group>
        </>
    );
}
