import { TagSearch } from "@/models/tag";
import { linksService } from "@/services/links";
import { tagService } from "@/services/tag";
import { useCollectionsStore } from "@/stores/useCollectionsStore";
import { Button, Grid, Select, Stack, TagsInput, Textarea, TextInput } from "@mantine/core";
import { ContextModalProps } from "@mantine/modals";
import { useCallback, useMemo, useState } from "react";

export default function AddLink({
    context,
    id,
    innerProps,
}: ContextModalProps<{ collectionId?: string }>) {
    const { collections } = useCollectionsStore();
    const [tags, setTags] = useState<TagSearch[]>([]);
    const [url, setUrl] = useState<string>("");
    const [collectionId, setCollectionId] = useState<string | null>(
        innerProps?.collectionId || null
    );
    const [tagValues, setTagValues] = useState<string[]>([]);
    const [name, setName] = useState<string>("");
    const [note, setNote] = useState<string>("");

    const handleAddLink = useCallback(async () => {
        const linkData = {
            url,
            collectionId: collectionId === "root" ? null : collectionId,
            tags: tagValues,
            name,
            note,
        };
        try {
            await linksService.create(linkData);
        } catch (error) {
            console.error("Failed to add link:", error);
        }
        context.closeModal(id);
    }, [context, id, url, collectionId, tagValues, name, note]);

    const availableCollections = useMemo(() => {
        if (!collections) return [];
        const resp = Object.values(collections).map((collection) => ({
            label: collection.name,
            value: collection.id,
        }));
        resp.unshift({ label: "[No Collection]", value: "root" });
        return resp;
    }, [collections]);

    const updateSuggestions = useCallback((value: string) => {
        tagService.get_suggestions(value).then(setTags);
    }, []);

    const suggestion = useMemo(() => {
        if (!tags || tags.length === 0) return [];
        const resp = tags.map((tag) => tag.name);
        return resp;
    }, [tags]);

    return (
        <>
            <Stack>
                <Grid>
                    <Grid.Col span={7}>
                        <TextInput
                            label="Link URL"
                            required
                            placeholder="Enter link URL"
                            value={url}
                            onChange={(event) => setUrl(event.currentTarget.value)}
                        />
                    </Grid.Col>
                    <Grid.Col span={5}>
                        <Select
                            label="Collection"
                            placeholder="Select a collection"
                            value={collectionId}
                            data={availableCollections}
                            onChange={setCollectionId}
                            defaultValue={innerProps?.collectionId}
                        />
                    </Grid.Col>
                    <Grid.Col span={12}>
                        <TagsInput
                            label="Tags"
                            placeholder="Add tags"
                            data={suggestion}
                            onSearchChange={updateSuggestions}
                            value={tagValues}
                            onChange={setTagValues}
                        />
                    </Grid.Col>
                    <Grid.Col span={12}>
                        <TextInput
                            label="Name"
                            placeholder="Enter link name"
                            value={name}
                            onChange={(event) => setName(event.currentTarget.value)}
                        />
                    </Grid.Col>
                    <Grid.Col span={12}>
                        <Textarea
                            label="Note"
                            placeholder="Enter link note"
                            minRows={3}
                            value={note}
                            onChange={(event) => setNote(event.currentTarget.value)}
                        />
                    </Grid.Col>
                </Grid>
                <Button onClick={handleAddLink}>Add Link</Button>
            </Stack>
        </>
    );
}
