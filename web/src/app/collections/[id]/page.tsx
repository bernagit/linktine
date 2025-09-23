"use client";

import { Stack, Group, Loader, Text } from "@mantine/core";
import { use, useCallback, useEffect, useState } from "react";
import { useCollectionsStore } from "@/stores/useCollectionsStore";
import api from "@/utils/ky";
import { Collection } from "@/models/collection";

import CollectionHeader from "@/components/collection/CollectionHeader";
import CollectionLinks from "@/components/collection/CollectionLinks";
import CollectionChildren from "@/components/collection/CollectionChildren";
import CollectionViewToggle from "@/components/collection/CollectionViewToggle";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const collection = useCollectionsStore((s) => s.collections[id]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState<"list" | "grid">("list");
    const { updateCollection, setCollection } = useCollectionsStore();

    useEffect(() => {
        async function fetchCollection() {
            if (!id) return;
            try {
                const response = await api.get(`collections/${id}`).json<Collection>();
                setCollection(response);
            } finally {
                setLoading(false);
            }
        }
        fetchCollection();
    }, [id, setCollection]);

    const saveCollectionColor = useCallback(async () => {
        if (!collection) return;
        try {
            const response = await api
                .put<Collection>(`collections/${collection.id}`, {
                    json: { color: collection.color },
                })
                .json();
            updateCollection(collection.id, response);
        } catch (error) {
            console.error("Failed to save collection color:", error);
        }
    }, [collection, updateCollection]);

    const updateColor = (color: string) => {
        if (!collection) return;
        updateCollection(collection.id, { color });
    };

    if (loading)
        return (
            <Group justify="center" mt="xl">
                <Loader size="lg" />
            </Group>
        );
    if (!collection)
        return (
            <Text ta="center" mt="xl" c="dimmed">
                Collection not found
            </Text>
        );

    return (
        <Stack gap="lg" p="sm" m={0}>
            <CollectionHeader
                collection={collection}
                updateCollectionColor={updateColor}
                saveColor={saveCollectionColor}
            />
            <CollectionChildren childrenCollections={collection.children} />
            <CollectionViewToggle viewMode={viewMode} setViewMode={setViewMode} />
            <CollectionLinks collection={collection} viewMode={viewMode} />
        </Stack>
    );
}
