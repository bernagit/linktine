import type { Metadata } from "next";

import { ColorSchemeScript, MantineProvider, createTheme, mantineHtmlProps } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { Notifications } from "@mantine/notifications";

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
    })

    return (
        <html lang="en" {...mantineHtmlProps}>
            <head>
                <ColorSchemeScript />
            </head>
            <body>
                <MantineProvider defaultColorScheme="auto" theme={theme}>
                    <Notifications />
                    {children}
                </MantineProvider>
            </body>
        </html>
    );
}
