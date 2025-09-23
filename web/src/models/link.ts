export interface Link {
    id: string;
    url: string;
    title?: string | null;
    description?: string | null;
    thumbnail?: string | null;
    domain?: string | null;
    read: boolean;
    archived: boolean;
    favorite: boolean;
    note?: string | null;
    userId: string;
    collectionId?: string | null;
    createdAt: string;
    updatedAt: string;
}
