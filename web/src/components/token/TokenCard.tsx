import { AuthToken } from "@/models/token";
import api from "@/utils/ky";
import { Button, Flex, ThemeIcon, useMantineColorScheme, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import dayjs from "dayjs";
import { IoKeyOutline } from "react-icons/io5";

type OnTokenDeletedCallback = () => Promise<void> | void;
export default function TokenCard({
    authToken,
    onTokenDelete,
}: {
    authToken: AuthToken;
    onTokenDelete?: OnTokenDeletedCallback;
}) {
    const colorScheme = useMantineColorScheme();

    const now = dayjs();
    const oneWeekAgo = now.subtract(7, "day");
    const dateToCheck = dayjs(authToken.lastUsedAt);
    const isWithinLastWeek =
        authToken.lastUsedAt == null
            ? false
            : dateToCheck.isAfter(oneWeekAgo) && dateToCheck.isBefore(now);

    const expirationDate = dayjs(authToken.expiresAt);
    const isExpired = expirationDate.isBefore(now);

    const lastUsedTextColor = isExpired ? "dimmed" : isWithinLastWeek ? "green" : "dimmed";
    const expirationTextColor = isExpired ? "red" : "dimmed";
    const lastUsedIconColor = isExpired
        ? "red"
        : isWithinLastWeek
          ? "green"
          : colorScheme.colorScheme === "dark"
            ? "white"
            : "black";

    const deleteToken = async () => {
        modals.openConfirmModal({
            title: <Text fw="bold">Are you sure?</Text>,
            children: <Text>The action cannot be reversed</Text>,
            labels: { confirm: "Confirm", cancel: "Cancel" },
            onConfirm: async () => {
                try {
                    await api.delete(`tokens/${authToken.id}`);

                    if (onTokenDelete) await onTokenDelete();
                    notifications.show({
                        title: "Action successful!",
                        message: "The auth token has been deleted correclty",
                    });
                } catch (error) {
                    console.log(error);
                    notifications.show({
                        title: "Error",
                        message: "There was an error deleting the token. Retry",
                        color: "red",
                    });
                }
            },
        });
    };

    return (
        <Flex w="100%" justify="space-between" align="center">
            <Flex align="center" gap="xs">
                <ThemeIcon
                    size="xl"
                    variant="default"
                    c={lastUsedIconColor}
                    styles={{ root: { border: 0 } }}
                >
                    <IoKeyOutline size="1.5em" />
                </ThemeIcon>

                <Flex direction="column">
                    <Text fw="bold">{authToken.name}</Text>
                    <Text c="dimmed" size="sm">
                        Added on {dayjs(authToken.createdAt).format("MMM D, YYYY")}
                    </Text>
                    <Text c={expirationTextColor} size="sm">
                        {expirationDate.isValid()
                            ? isExpired
                                ? `Expired on ${expirationDate.format("MMM D, YYYY")}`
                                : `Expires on ${expirationDate.format("MMM D, YYYY")}`
                            : "Not expiring"}
                    </Text>
                    <Text c={lastUsedTextColor} size="sm">
                        Last used:{" "}
                        {authToken.lastUsedAt == null
                            ? "Not used"
                            : dayjs(authToken.lastUsedAt).format("MMM D, YYYY")}
                    </Text>
                </Flex>
            </Flex>

            <Flex direction="column" gap="xs">
                <Button
                    color="red"
                    variant="light"
                    size="compact-sm"
                    radius="sm"
                    onClick={deleteToken}
                >
                    Delete
                </Button>
            </Flex>
        </Flex>
    );
}
