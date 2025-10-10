import Homepage from "@/components/Homepage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Home - LinkTine",
    description: "Welcome to the LinkTine homepage.",
};

export default function HomePage() {
    return <Homepage />;
}
