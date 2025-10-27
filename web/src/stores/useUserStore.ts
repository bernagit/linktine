"use client";

import { User } from "@/models/shared";
import api from "@/utils/ky";
import { create } from "zustand";

type UserState = {
    user: User | null;
    loading: boolean;
    fetchUser: () => Promise<void>;
    setUser: (user: User | null) => void;
    clearUser: () => void;
};

export const useUserStore = create<UserState>((set, get) => ({
    user: null,
    loading: false,

    fetchUser: async () => {
        if (get().user) return;

        set({ loading: true });
        try {
            const user = await api.get("auth/me").json<User>();
            set({ user });
        } catch (err) {
            console.error(err);
            set({ user: null });
        } finally {
            set({ loading: false });
        }
    },

    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null }),
}));
