"use client";

import { Flex, NavLink } from "@mantine/core";
import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";
import { SiBruno } from "react-icons/si";

export default function ProfileSidebar() {
    const segments = useSelectedLayoutSegments();

    return (
        <Flex w="250px" direction="column">
            <NavLink
                styles={{ root: { borderRadius: "4px" } }}
                component={Link}
                href="/profile/auth-tokens"
                active={segments[0] === "auth-tokens"}
                leftSection={<SiBruno />}
                label="API tokens"
            ></NavLink>
        </Flex>
    );
}
