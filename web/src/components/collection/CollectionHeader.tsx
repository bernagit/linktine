"use client";

import { Group, Title, Text, Popover, ColorPicker, Button, Stack, ActionIcon } from "@mantine/core";
import { FaFolder } from "react-icons/fa6";
import { useCallback, useState } from "react";
import { Collection } from "@/models/collection";
import dayjs from "dayjs";

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
                    <Popover
                        position="bottom-start"
                        shadow="md"
                        opened={opened}
                        onChange={setOpened}
                    >
                        <Popover.Target>
                            <ActionIcon
                                variant="subtle"
                                size="xl"
                                radius="xl"
                                onClick={() => setOpened((o) => !o)}
                            >
                                <FaFolder
                                    size={28}
                                    color={collection.color || "inherit"}
                                    style={{ cursor: "pointer" }}
                                />
                            </ActionIcon>
                        </Popover.Target>
                        <Popover.Dropdown>
                            <ColorPicker
                                color={collection.color || "inherit"}
                                onChange={handleColorChange}
                                swatches={[
                                    "#2e2e2e",
                                    "#868e96",
                                    "#fa5252",
                                    "#e64980",
                                    "#be4bdb",
                                    "#7950f2",
                                    "#4c6ef5",
                                    "#228be6",
                                    "#15aabf",
                                    "#12b886",
                                    "#40c057",
                                    "#82c91e",
                                    "#fab005",
                                    "#fd7e14",
                                ]}
                            />
                            <Group mt="sm" justify="space-between">
                                <Button color="red" variant="light" size="xs" onClick={handleReset}>
                                    Reset
                                </Button>
                                <Button variant="light" size="xs" onClick={handleSave}>
                                    Save
                                </Button>
                            </Group>
                        </Popover.Dropdown>
                    </Popover>

                    <Title mt={"xs"} order={2}>
                        {collection.name}
                    </Title>
                </Group>
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
