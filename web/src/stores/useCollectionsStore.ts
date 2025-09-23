"use client";

import { create } from "zustand";
import { Collection } from "@/models/collection";

type CollectionsState = {
    collections: Record<string, Collection>;
    setCollection: (collection: Collection) => void;
    setCollections: (collections: Collection[]) => void;
    updateCollection: (id: string, data: Partial<Collection>) => void;
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
}));
