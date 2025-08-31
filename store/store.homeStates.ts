import { create } from "zustand";

interface HomeState {
  states: "TESTER_DATA" | "OTP" | "QUESTIONS";
  setState: (state: "TESTER_DATA" | "OTP" | "QUESTIONS") => void;
}

export const useHomeState = create<HomeState>((set) => ({
  states: "TESTER_DATA",
  setState: (state) => set({ states: state }),
}));
