import { ActionIcon, Button, ColorPicker, Group, Popover } from "@mantine/core";
import { SetStateAction } from "react";
import { FaFolder } from "react-icons/fa6";

type Props = {
    opened: boolean;
    setOpened: (value: SetStateAction<boolean>) => void;
    collectionColor: string;
    handleReset: () => void;
    handleSave: () => void;
    handleColorChange: (color: string) => void;
    iconSize?: number;
};

export default function CollectionIconPopover({
    opened,
    setOpened,
    collectionColor,
    handleReset,
    handleSave,
    handleColorChange,
    iconSize = 28,
}: Props) {
    return (
        <Popover position="bottom-start" shadow="md" opened={opened} onChange={setOpened}>
            <Popover.Target>
                <ActionIcon
                    variant="subtle"
                    size={iconSize + 10}
                    radius="md"
                    onClick={() => setOpened((o) => !o)}
                >
                    <FaFolder
                        size={iconSize}
                        color={collectionColor || "inherit"}
                        style={{ cursor: "pointer" }}
                    />
                </ActionIcon>
            </Popover.Target>
            <Popover.Dropdown>
                <ColorPicker
                    color={collectionColor || "inherit"}
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
    );
}
