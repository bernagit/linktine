export interface AuthToken {
    id: string;
    name: string;
    description: string;
    createdAt: string;
    tokenHash: string;
    userId: string;
    hexToken?: string | null;
    lastUsedAt?: string | null;
    expiresAt?: string | null;
    revokedAt?: string | null;
}
