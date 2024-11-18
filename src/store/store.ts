import { create } from "zustand";

const useStore = create((set) => ({
  user: 0,
  updateBears: (user: number) => set({ user: user }),
}));
