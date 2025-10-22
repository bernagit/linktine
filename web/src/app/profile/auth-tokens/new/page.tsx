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
} from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useState } from "react";
import api from "@/utils/ky";
import { QRCodeSVG } from "qrcode.react";
import { AuthToken } from "@/models/token";

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
                values.expiresAt != null || values.expiresAt !== "" ? values.expiresAt : null;

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
                <Title order={2}>Add new API token</Title>
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
                            key={newTokenForm.key("expiresAt")}
                            {...newTokenForm.getInputProps("expiresAt")}
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

                    <Alert title="Security Notice">
                        <Text fw="bold">
                            This API token is generated once and will not be retrievable after you
                            close this window. Store it securely. If you lose it, you'll need to
                            generate a new token.
                        </Text>
                    </Alert>

                    <QRCodeSVG size={200} value={newToken} />
                </Flex>
            )}
        </Flex>
    );
}
