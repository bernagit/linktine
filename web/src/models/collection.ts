import { Link } from "./link";
import { User } from "./shared";

export interface Collection {
    id: string;
    name: string;
    description?: string | null;
    color?: string | null;
    parentId?: string | null;
    userId: string;
    createdAt: string;
    updatedAt: string;
    _count?: {
        links: number;
        children: number;
    };
    children?: Collection[];
    links?: Link[];
    user?: User;
}
