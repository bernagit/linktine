import { AuthToken } from "@/models/token";
import { Button, Flex, ThemeIcon, useMantineColorScheme, Text } from "@mantine/core";
import dayjs from "dayjs";
import { IoKeyOutline } from "react-icons/io5";

export default function TokenCard({ authToken }: { authToken: AuthToken }) {
    const colorScheme = useMantineColorScheme();

    const now = dayjs();
    const oneWeekAgo = now.subtract(7, "day");
    const dateToCheck = dayjs(authToken.lastUsedAt);
    const isWithinLastWeek =
        authToken.lastUsedAt == null
            ? false
            : dateToCheck.isAfter(oneWeekAgo) && dateToCheck.isBefore(now);

    return (
        <Flex w="100%" justify="space-between" align="center">
            <Flex align="center" gap="xs">
                <ThemeIcon
                    size="xl"
                    variant="default"
                    c={
                        isWithinLastWeek
                            ? "green"
                            : colorScheme.colorScheme === "dark"
                              ? "white"
                              : "black"
                    }
                    styles={{ root: { border: 0 } }}
                >
                    <IoKeyOutline size="1.5em" />
                </ThemeIcon>

                <Flex direction="column">
                    <Text fw="bold">{authToken.name}</Text>
                    <Text c="dimmed" size="sm">
                        Added on {dayjs(authToken.createdAt).format("MMM D, YYYY")}
                    </Text>
                    <Text c={isWithinLastWeek ? "green" : "dimmed"} size="sm">
                        Last used:{" "}
                        {authToken.lastUsedAt == null
                            ? "Not used"
                            : dayjs(authToken.lastUsedAt).format("MMM D, YYYY")}
                    </Text>
                </Flex>
            </Flex>

            <Flex direction="column" gap="xs">
                <Button color="red" variant="light" size="compact-sm" radius="sm">
                    Delete
                </Button>
            </Flex>
        </Flex>
    );
}
