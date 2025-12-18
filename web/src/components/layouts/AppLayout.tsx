"use client";

import { AppShell } from "@mantine/core";
import { useDebouncedValue, useDisclosure } from "@mantine/hooks";
import CollectionsNavbar from "./CollectionsNavbar";
import { usePathname } from "next/navigation";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import CardNavbar from "./CardNavbar";
import AppHeader from "./AppHeader";
import { useCollectionsStore } from "@/stores/useCollectionsStore";
import { Spotlight, SpotlightActionData } from "@mantine/spotlight";
import { useEffect, useState } from "react";
import { baseService } from "@/services/base";
import { FaFolder, FaLink, FaTag } from "react-icons/fa";
import { ModalsProvider } from "@mantine/modals";
import AddLinkModal from "@/components/modals/AddLink";
import AddCollectionModal from "@/components/modals/AddCollection";
import ShortcutHelp from "../modals/ShortcutHelp";
import { HotkeyProvider } from "./HotKeysProvider";
import { useUserStore } from "@/stores/useUserStore";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const [opened, { toggle, close }] = useDisclosure();
    const [query, setQuery] = useState<string>("");
    const [debouncedQuery] = useDebouncedValue(query, 200);
    const [actions, setActions] = useState<SpotlightActionData[]>([]);
    const { fetchUser } = useUserStore();

    const pathname = usePathname();

    const skipLayout = pathname.startsWith("/login") || pathname.startsWith("/profile");

    const { moveCollection } = useCollectionsStore();

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!active || !over) return;

        const activeData = active.data.current;
        const overData = over.data.current;

        if (!activeData || !overData) return;

        // 1. Links dropped into collections
        if (activeData.type === "link" && overData.type === "collection") {
            const link = activeData.link;
            const collection = overData.node;
            console.log(`Dropped link "${link.title}" into collection "${collection.name}"`);
        }

        if (activeData.type === "collection" && overData.type === "collection") {
            const dragged = activeData.node;
            const target = overData.node;

            if (dragged.id !== target.id) {
                moveCollection(dragged.id, target.id);
            }
        }

        // collections dropped into root
        if (activeData.type === "collection" && over.id === "collection-root") {
            const dragged = activeData.node;
            moveCollection(dragged.id, null);
        }
    };

    useEffect(() => {
        (async () => {
            if (debouncedQuery !== "") {
                const response = await baseService.globalSearch(debouncedQuery);
                const links: SpotlightActionData[] =
                    response.links?.map((link) => ({
                        id: link.id,
                        label: link.title,
                        description: link.url,
                        onClick: () => {
                            console.log("Go to link", link.id);
                        },
                        leftSection: <FaLink />,
                    })) ?? [];
                const collections: SpotlightActionData[] =
                    response.collections?.map((collection) => ({
                        id: collection.id,
                        label: collection.name,
                        onClick: () => {
                            console.log("Go to collection", collection.id);
                        },
                        leftSection: <FaFolder color={collection.color} />,
                    })) ?? [];
                const tags: SpotlightActionData[] =
                    response.tags?.map((tag) => ({
                        id: tag.id,
                        label: `#${tag.name}`,
                        onClick: () => {
                            console.log("Go to tag", tag.id);
                        },
                        leftSection: <FaTag color={tag.color} />,
                    })) ?? [];

                setActions([...links, ...collections, ...tags]);
            }
        })();
    }, [debouncedQuery]);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    if (skipLayout) return <>{children}</>;
    return (
        <HotkeyProvider>
            <ModalsProvider
                modals={{
                    addLink: AddLinkModal,
                    addCollection: AddCollectionModal,
                    showHelp: ShortcutHelp,
                }}
            >
                <Spotlight
                    actions={actions}
                    onQueryChange={setQuery}
                    onSpotlightClose={() => setActions([])}
                ></Spotlight>
                <DndContext onDragEnd={handleDragEnd}>
                    <AppShell
                        navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
                        header={{ height: 60 }}
                    >
                        <AppShell.Header>
                            <AppHeader opened={opened} toggle={toggle} closeBurger={close} />
                        </AppShell.Header>

                        <AppShell.Navbar>
                            <CardNavbar />
                            <CollectionsNavbar closeBurger={close} />
                        </AppShell.Navbar>

                        <AppShell.Main>{children}</AppShell.Main>
                    </AppShell>
                </DndContext>
            </ModalsProvider>
        </HotkeyProvider>
    );
}
