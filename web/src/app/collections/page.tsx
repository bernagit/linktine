import { Title, Text, Container } from "@mantine/core";

export default function Page() {
    return (
        <Container size="lg" my="md">
            <Title order={2}>Collections</Title>
            <Text c="dimmed" mb="md">
                Manage your collections here.
            </Text>
            {/* Future implementation: List of collections */}
        </Container>
    );
}
