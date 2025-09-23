"use client";

import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import CollectionsNavbar from "./CollectionsNavbar";
import { usePathname } from "next/navigation";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import CardNavbar from "./CardNavbar";
import AppHeader from "./AppHeader";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const [opened, { toggle, close }] = useDisclosure();

    const pathname = usePathname();

    const skipLayout = pathname.startsWith("/login");

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

        // 2. Collections dropped into collections
        if (activeData.type === "collection" && overData.type === "collection") {
            const dragged = activeData.node;
            const target = overData.node;

            if (dragged.id !== target.id) {
                console.log(`Move collection "${dragged.name}" into "${target.name}"`);
            }
        }

        if (activeData.type === "collection" && over.id === "collection-root") {
            const dragged = activeData.node;
            console.log(`Move collection "${dragged.name}" to ROOT`);
        }
    };
    if (skipLayout) return <>{children}</>;

    return (
        <>
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
        </>
    );
}
