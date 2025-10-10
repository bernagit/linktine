import { DashboardData, SearchData } from "@/models/shared";
import api from "@/utils/ky";

async function login(identifier: string, password: string): Promise<{ token: string }> {
    return await api
        .post<{ token: string }>("auth/login", { json: { identifier, password } })
        .json();
}

async function register(name: string, email: string, password: string): Promise<{ token: string }> {
    return await api
        .post<{ token: string }>("auth/register", { json: { name, email, password } })
        .json();
}

async function logout(): Promise<void> {
    await api.post("auth/logout").json();
}

async function getDashboard(): Promise<DashboardData> {
    return await api.get("base/dashboard").json();
}

async function globalSearch(query: string): Promise<SearchData> {
    return await api.get("base/search", { searchParams: { q: query } }).json();
}

export const authService = {
    login,
    register,
    logout,
};

export const baseService = {
    getDashboard,
    globalSearch,
};
