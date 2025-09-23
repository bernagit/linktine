export interface ApiError {
    message: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    role?: string;
}

export interface LoginSuccess {
    user: User;
    token: string;
}


export interface DashboardStats {
    totalLinks: number;
    readLinks: number;
    favoriteLinks: number;
    archivedLinks: number;
    totalCollections: number;
    totalTags: number;
    sharedLinks: number;
    sharedCollections: number;
}

export interface RecentLink {
    id: string;
    title: string;
    url: string;
    createdAt: string;
}

export interface RecentCollection {
    id: string;
    name: string;
    color?: string;
}

export interface TopTag {
    id: string;
    name: string;
    color?: string;
    count: number;
}

export interface DashboardData {
    stats: DashboardStats;
    recentLinks: RecentLink[];
    recentCollections: RecentCollection[];
    topTags: TopTag[];
}