import { Container, Title, Text } from "@mantine/core";

export default function Page() {
    return (
        <Container size="lg" my="md">
            <Title order={2}>Favorites</Title>
            <Text c="dimmed" mb="md">
                Manage your favorite links here.
            </Text>
            {/* Future implementation: List of favorite links */}
        </Container>
    );
}
