import { create } from "zustand";

interface HomeState {
  states: "HOME"|"TESTER_DATA" | "OTP" | "QUESTIONS";
  setState: (state: "HOME"|"TESTER_DATA" | "OTP" | "QUESTIONS") => void;
}

export const useHomeState = create<HomeState>((set) => ({
  states: "HOME",
  setState: (state) => set({ states: state }),
}));
