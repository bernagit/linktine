"use client";

import {
    Alert,
    Button,
    CopyButton,
    Divider,
    Flex,
    Textarea,
    TextInput,
    Title,
    Tooltip,
    Text,
    ActionIcon,
} from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useState } from "react";
import api from "@/utils/ky";
import { QRCodeSVG } from "qrcode.react";
import { AuthToken } from "@/models/token";
import dayjs from "dayjs";
import { BiLeftArrow } from "react-icons/bi";
import Link from "next/link";

export default function NewAuthTokenPage() {
    const newTokenForm = useForm({
        mode: "uncontrolled",

        initialValues: {
            name: "",
            description: "",
            expiresAt: null,
        },

        validate: {
            name: (value) => (value.length === 0 ? "A name must be specified" : null),
        },
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [newToken, setNewToken] = useState<string | null>(null);

    const submitToken = async (values: typeof newTokenForm.values) => {
        setIsSubmitting(true);
        try {
            const expiresAt =
                values.expiresAt != null && values.expiresAt !== ""
                    ? dayjs(values.expiresAt).toISOString()
                    : null;

            const createdToken = await api
                .post("tokens", {
                    json: {
                        name: values.name,
                        description: values.description,
                        expiresAt,
                    },
                })
                .json<{ token: AuthToken }>();

            console.log(createdToken);

            setNewToken(createdToken.token.hexToken ?? "");
        } catch (error) {
            console.log(error);
        }

        setIsSubmitting(false);
    };

    return (
        <Flex direction="column" gap="xs" w="100%">
            <Flex justify="space-between">
                <Flex gap="xs">
                    <ActionIcon variant="subtle" component={Link} href="/profile/auth-tokens">
                        <BiLeftArrow />
                    </ActionIcon>
                    <Title order={2}>Add new API token</Title>
                </Flex>
            </Flex>

            <Divider />

            {newToken == null ? (
                <form onSubmit={newTokenForm.onSubmit(submitToken)}>
                    <Flex direction="column" gap="xs">
                        <TextInput
                            label="Name"
                            withAsterisk
                            key={newTokenForm.key("name")}
                            {...newTokenForm.getInputProps("name")}
                        />

                        <Textarea
                            label="Description"
                            minRows={3}
                            key={newTokenForm.key("description")}
                            {...newTokenForm.getInputProps("description")}
                        ></Textarea>

                        <DateTimePicker
                            label="Expires at"
                            highlightToday
                            key={newTokenForm.key("expiresAt")}
                            {...newTokenForm.getInputProps("expiresAt")}
                            clearable
                        />

                        <Flex>
                            <Button type="submit" loading={isSubmitting}>
                                Add API Token
                            </Button>
                        </Flex>
                    </Flex>
                </form>
            ) : (
                <Flex direction="column" align="center" gap="xs">
                    <Flex gap="xs" align="center">
                        <Title order={4}>Your new token is</Title>
                        <CopyButton value={newToken} timeout={2000}>
                            {({ copied, copy }) => (
                                <Tooltip
                                    label={copied ? "Copied" : "Copy"}
                                    withArrow
                                    position="right"
                                >
                                    <Button variant="subtle" size="compact-lg" onClick={copy}>
                                        {newToken}
                                    </Button>
                                </Tooltip>
                            )}
                        </CopyButton>
                    </Flex>

                    <Alert title="Security Notice" color="red">
                        <Text>
                            This API token is generated once and will not be retrievable after you
                            close this window. Store it securely. If you lose it, you&apos;ll need
                            to generate a new one.
                        </Text>
                    </Alert>

                    <Divider my="xs" w="100%" />

                    <QRCodeSVG
                        size={200}
                        value={`${process.env.NEXT_PUBLIC_API_URL}|${newToken}`}
                    />
                    <Text size="sm" c="dimmed" ta="center">
                        Use your mobile app to scan this QR code and log in instantly.
                    </Text>
                </Flex>
            )}
        </Flex>
    );
}
