import Homepage from "@/components/Homepage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Home - Link Manager",
    description: "Welcome to the Link Manager homepage.",
};

export default function HomePage() {
    return <Homepage />;
}
