import { Card, SimpleGrid, Text, useMantineTheme } from "@mantine/core";
import { FaLink, FaFolder, FaStar, FaTags } from "react-icons/fa";
import styles from "./CardNavbar.module.css";
import { usePathname, useRouter } from "next/navigation";

function CardItem({
    icon: Icon,
    label,
    color,
    path,
}: {
    icon: React.ElementType;
    label: string;
    color: string;
    path: string;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const isActive = pathname === path;

    const handleClick = () => {
        router.push(path);
    };

    return (
        <Card
            p="sm"
            withBorder
            radius="sm"
            onClick={handleClick}
            className={styles.cardItem}
            shadow={isActive ? "md" : "sm"}
            style={{ 
                borderColor: isActive ? color : undefined, 
                backgroundColor: isActive ? `${color}20` : undefined
            }}
        >
            <Icon size={24} color={color} />
            <Text mt={5}>{label}</Text>
        </Card>
    );
}

export default function CardNavbar() {
    const theme = useMantineTheme();
    return (
        <SimpleGrid cols={2} m="sm" spacing="sm">
            <CardItem icon={FaStar} label="Favorites" color={theme.colors.yellow[6]} path="/favorites" />
            <CardItem icon={FaFolder} label="Collections" color={theme.colors.gray[6]} path="/collections" />
            <CardItem icon={FaLink} label="Links" color={theme.colors.green[6]} path="/links" />
            <CardItem icon={FaTags} label="Tags" color={theme.colors.red[6]} path="/tags" />
        </SimpleGrid>
    );
}
