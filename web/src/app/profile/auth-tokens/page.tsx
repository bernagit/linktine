"use client";

import TokenCard from "@/components/token/TokenCard";
import { AuthToken } from "@/models/token";
import api from "@/utils/ky";
import { Box, Button, Card, Divider, Flex, Loader, Title } from "@mantine/core";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { CgSmileNone } from "react-icons/cg";

export default function AuthTokensPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [tokens, setTokens] = useState<AuthToken[]>([]);

    const getTokens = useCallback(async () => {
        setIsLoading(true);
        try {
            const tokensResponse = await api.get("tokens").json<AuthToken[]>();
            setTokens(tokensResponse);
        } catch (error) {
            console.log(error);
        }

        setIsLoading(false);
    }, []);

    useEffect(() => {
        getTokens();
    }, [getTokens]);

    return (
        <Flex direction="column" gap="xs" w="100%">
            <Flex justify="space-between">
                <Title order={2}>API Tokens</Title>

                <Button component={Link} href="/profile/auth-tokens/new">
                    New API token
                </Button>
            </Flex>

            <Divider />

            <Card withBorder>
                {isLoading ? (
                    <Flex justify="center">
                        <Loader />
                    </Flex>
                ) : tokens.length === 0 ? (
                    <Flex c="dimmed" justify="center" align="center" gap="xs" direction="column">
                        <Title order={3}>No API tokens found</Title>
                        <Title>
                            <CgSmileNone />
                        </Title>
                    </Flex>
                ) : (
                    <>
                        {tokens.map((token, i) => {
                            return (
                                <Box key={i}>
                                    <TokenCard authToken={token} onTokenDelete={getTokens} />

                                    {i !== tokens.length - 1 && <Divider my="xs" />}
                                </Box>
                            );
                        })}
                    </>
                )}
            </Card>
        </Flex>
    );
}
