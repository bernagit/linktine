"use client";

import { Collection } from "@/models/collection";
import { useEffect } from "react";
import { useCollectionsStore } from "@/stores/useCollectionsStore";
import { collectionsService } from "@/services/collections";

function buildTree(collections: Collection[]): Collection[] {
    const map = new Map<string, Collection>();
    const roots: Collection[] = [];

    collections.forEach((c) => map.set(c.id, { ...c, children: [] }));

    map.forEach((col) => {
        if (col.parentId && map.has(col.parentId)) {
            map.get(col.parentId)!.children!.push(col);
        } else {
            roots.push(col);
        }
    });

    return roots;
}

export function useCollections() {
    const { collections, setCollections } = useCollectionsStore();

    useEffect(() => {
        collectionsService
            .getAll()
            .then((res) => {
                if (Array.isArray(res.data)) {
                    setCollections(res.data);
                } else {
                    console.error("Collections API returned invalid data", res);
                }
            })
            .catch((err) => {
                console.error("Failed to fetch collections:", err);
            });
    }, [setCollections]);

    // return as tree
    return buildTree(Object.values(collections));
}
