import { create } from "zustand";

interface HomeState {
  states: "HOME"| "OTP" | "QUESTIONS";
  setState: (state: "HOME"| "OTP" | "QUESTIONS") => void;
}

export const useHomeState = create<HomeState>((set) => ({
  states: "HOME",
  setState: (state) => set({ states: state }),
}));
