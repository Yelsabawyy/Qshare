import { create } from "zustand";

interface HomeState {
  states: "HOME" | "OTP";
  setState: (state: "HOME" | "OTP") => void;
  otp: string | undefined;
  setOtp: (state: string) => void;
}

export const useHomeState = create<HomeState>((set) => ({
  states: "HOME",
  setState: (state) => set({ states: state }),
  otp: undefined,
  setOtp: (state) => set({ otp: state }),
}));
