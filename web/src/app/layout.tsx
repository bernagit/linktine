import type { Metadata } from "next";

import { ColorSchemeScript, MantineProvider, createTheme, mantineHtmlProps } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import AppLayout from "@/components/layouts/AppLayout";
import { ContextMenuProvider } from "mantine-contextmenu";
import "@mantine/notifications/styles.css";
import "@mantine/core/styles.layer.css";
import "mantine-contextmenu/styles.layer.css";
import "./layout.css";

export const metadata: Metadata = {
    title: "Link manager",
    description: "Manage your links with ease.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const theme = createTheme({
        primaryColor: "teal",
        defaultRadius: "md",
    });

    return (
        <html lang="en" {...mantineHtmlProps}>
            <head>
                <ColorSchemeScript />
            </head>
            <body>
                <MantineProvider defaultColorScheme="auto" theme={theme}>
                    <Notifications />
                    <AppLayout>
                        <ContextMenuProvider>{children}</ContextMenuProvider>
                    </AppLayout>
                </MantineProvider>
            </body>
        </html>
    );
}
