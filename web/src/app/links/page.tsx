import { Container, Title, Text } from "@mantine/core";

export default function Page() {
    return (
        <Container size="lg" my="md">
            <Title order={2}>Links</Title>
            <Text c="dimmed" mb="md">
                Manage your links here.
            </Text>
            {/* Future implementation: List of links */}
        </Container>
    );
}
