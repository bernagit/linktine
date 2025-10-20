import { useCollectionsStore } from "@/stores/useCollectionsStore";
import {
    Button,
    Center,
    Grid,
    Select,
    Stack,
    Textarea,
    TextInput,
    useMantineTheme,
} from "@mantine/core";
import { ContextModalProps } from "@mantine/modals";
import { useCallback, useMemo, useState } from "react";
import CollectionIconPopover from "../collection/CollectionIconPopover";
import { collectionsService } from "@/services/collections";

export default function AddCollection({
    context,
    id,
    innerProps,
}: ContextModalProps<{ parentId?: string }>) {
    const theme = useMantineTheme();
    const defaultColor = theme.colors[theme.primaryColor][6];
    const [opened, setOpened] = useState(false);
    const { collections } = useCollectionsStore();
    const [name, setName] = useState<string>("");
    const [parentId, setParentId] = useState<string | null>(innerProps?.parentId || null);
    const [description, setDescription] = useState<string>("");
    const [color, setColor] = useState<string>(defaultColor);

    const availableCollections = useMemo(() => {
        if (!collections) return [];
        const resp = Object.values(collections).map((collection) => ({
            label: collection.name,
            value: collection.id,
        }));
        resp.unshift({ label: "[Root]", value: "root" });
        return resp;
    }, [collections]);

    const handleAddCollection = useCallback(async () => {
        const collectionData = {
            name,
            description,
            parentId,
            color,
        };
        try {
            await collectionsService.create(collectionData);
        } catch (error) {
            console.error("Failed to add collection:", error);
        }
        context.closeModal(id);
    }, [context, id, name, description, parentId, color]);

    return (
        <>
            <Stack>
                <Grid>
                    <Grid.Col span={2}>
                        <Center>
                            <CollectionIconPopover
                                opened={opened}
                                setOpened={setOpened}
                                collectionColor={color}
                                handleReset={() => setColor(defaultColor)}
                                handleSave={() => setOpened(false)}
                                handleColorChange={setColor}
                                iconSize={40}
                            />
                        </Center>
                    </Grid.Col>
                    <Grid.Col span={10}>
                        <TextInput
                            label="Collection Name"
                            placeholder="Enter collection name"
                            value={name}
                            onChange={(event) => setName(event.currentTarget.value)}
                            required
                        />
                    </Grid.Col>
                    <Grid.Col span={12}>
                        <Textarea
                            label="Description"
                            placeholder="Enter a description"
                            minRows={3}
                            value={description}
                            onChange={(e) => setDescription(e.currentTarget.value)}
                        />
                    </Grid.Col>
                    <Grid.Col span={12}>
                        <Select
                            label="Parent Collection"
                            placeholder="Select a collection"
                            value={parentId}
                            data={availableCollections}
                            onChange={setParentId}
                            defaultValue={innerProps?.parentId}
                        />
                    </Grid.Col>
                </Grid>
                <Button onClick={handleAddCollection}>Add Collection</Button>
            </Stack>
        </>
    );
}
