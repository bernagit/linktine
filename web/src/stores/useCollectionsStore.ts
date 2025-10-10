"use client";

import { create } from "zustand";
import { Collection } from "@/models/collection";
import { collectionsService } from "@/services/collections";

type CollectionsState = {
    collections: Record<string, Collection>;
    setCollection: (collection: Collection) => void;
    setCollections: (collections: Collection[]) => void;
    updateCollection: (id: string, data: Partial<Collection>) => void;
    moveCollection: (id: string, parentId: string | null) => Promise<void>;
};

export const useCollectionsStore = create<CollectionsState>((set) => ({
    collections: {},
    setCollection: (collection: Collection) =>
        set((state) => ({
            collections: {
                ...state.collections,
                [collection.id]: collection,
            },
        })),
    setCollections: (collections) =>
        set(() => ({
            collections: Object.fromEntries(collections.map((c) => [c.id, c])),
        })),
    updateCollection: (id, data) =>
        set((state) => {
            const current = state.collections[id];
            if (!current) return state;
            return {
                collections: {
                    ...state.collections,
                    [id]: { ...current, ...data },
                },
            };
        }),
    moveCollection: async (id: string, parentId: string | null) => {
        try {
            await collectionsService.update(id, { parentId });
            const res = await collectionsService.getAll();
            set({ collections: Object.fromEntries(res.data.map((c) => [c.id, c])) });
        } catch (err) {
            console.error("Failed to move collection:", err);
        }
    },
}));
