import { Container, Title, Text } from "@mantine/core";

export default function Page() {
    return (
        <Container size="lg" my="md">
            <Title order={2}>Tags</Title>
            <Text c="dimmed" mb="md">
                Manage your tags here.
            </Text>
            {/* Future implementation: List of tags */}
        </Container>
    );
}