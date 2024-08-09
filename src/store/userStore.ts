// src/store/userStore.ts

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { TUser } from "../types";

type UserStore = {
  isLoggedIn: boolean;
  login: (user: TUser) => void;
  logout: () => void;

  user: TUser | null;
  setUser: (user: TUser) => void;
};

const useUserStore = create<UserStore>(
  persist(
    (set) => ({
      isLoggedIn: false,
      login: (user: TUser) =>
        set({
          isLoggedIn: true,
          user: user,
        }),
      logout: () =>
        set({
          isLoggedIn: false,
          user: null,
        }),
      user: null,
      setUser: (user: TUser) => set({ user: user }),
    }),
    {
      name: "userStorage",
    }
  )
);

export default useUserStore;
