"use client";

import { HOTKEYS } from "@/utils/hotkeys";
import {
    Button,
    Code,
    Divider,
    Group,
    Paper,
    ScrollArea,
    Stack,
    Table,
    Text,
    useMantineColorScheme,
    useMantineTheme,
} from "@mantine/core";
import { ContextModalProps } from "@mantine/modals";
import { FaX } from "react-icons/fa6";

export default function ShortcutHelp({ context, id }: ContextModalProps) {
    const theme = useMantineTheme();
    const { colorScheme } = useMantineColorScheme();
    const isDark = colorScheme === "dark";

    const rows = Object.entries(HOTKEYS).map(([key, { keys, description }]) => (
        <Table.Tr key={key}>
            <Table.Td>
                <Text size="sm">{description}</Text>
            </Table.Td>
            <Table.Td ta="right">
                <Code
                    fw={500}
                    fz="md"
                    color={theme.primaryColor}
                    bg={isDark ? theme.colors.dark[7] : theme.colors.gray[2]}
                >
                    {keys}
                </Code>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <Paper p="md" radius="md" withBorder shadow="xs">
            <Stack gap="sm">
                <Text size="sm">
                    Use these shortcuts to navigate and perform quick actions in LinkTine.
                </Text>

                <Divider />

                <ScrollArea h={300} type="auto">
                    <Table verticalSpacing="xs" highlightOnHover>
                        <Table.Tbody>{rows}</Table.Tbody>
                    </Table>
                </ScrollArea>

                <Divider />

                <Group justify="flex-end">
                    <Button
                        variant="light"
                        color="teal"
                        leftSection={<FaX size={16} />}
                        onClick={() => context.closeModal(id)}
                    >
                        Close
                    </Button>
                </Group>
            </Stack>
        </Paper>
    );
}
