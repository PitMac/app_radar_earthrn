import { create } from "zustand";

export const useUserStore = create((set) => ({
  user: null,
  expoPushToken: null,
  setUser: (user) => set({ user }),
  setExpoPushToken: (token) => set({ expoPushToken: token }),
}));
