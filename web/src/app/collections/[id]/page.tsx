"use client";

import { Group, Loader, Text, Card } from "@mantine/core";
import { use, useCallback, useEffect, useState } from "react";
import { useCollectionsStore } from "@/stores/useCollectionsStore";
import CollectionHeader from "@/components/collection/CollectionHeader";
import CollectionLinks from "@/components/collection/CollectionLinks";
import CollectionChildren from "@/components/collection/CollectionChildren";
import { collectionsService } from "@/services/collections";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const collection = useCollectionsStore((s) => s.collections[id]);
    const [loading, setLoading] = useState(true);
    const { updateCollection, setCollection } = useCollectionsStore();

    useEffect(() => {
        async function fetchCollection() {
            if (!id) return;
            try {
                const response = await collectionsService.getById(id);
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
            const response = await collectionsService.update(collection.id, {
                color: collection.color,
            });
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
        <Card p={20} m={10}>
            <Card.Section withBorder inheritPadding py="xs" mb="md">
                <CollectionHeader
                    collection={collection}
                    updateCollectionColor={updateColor}
                    saveColor={saveCollectionColor}
                />
            </Card.Section>
            {collection.children && collection.children.length > 0 && (
                <Card.Section withBorder inheritPadding py="xs" mb="md">
                    <CollectionChildren childrenCollections={collection.children} />
                </Card.Section>
            )}
            {collection.links && collection.links.length > 0 && (
                <Card.Section withBorder inheritPadding py="xs" mb="md">
                    <CollectionLinks collection={collection} />
                </Card.Section>
            )}
        </Card>
    );
}
