import { create } from "zustand";

interface HomeState {
  states: "HOME"| "OTP";
  setState: (state: "HOME"| "OTP") => void;
}

export const useHomeState = create<HomeState>((set) => ({
  states: "HOME",
  setState: (state) => set({ states: state }),
}));
