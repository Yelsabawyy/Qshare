"use client"
import { useHomeState } from "@/store/store.homeStates"
import HomeComponent from "./homeComponent"
import OTPComponent from "./otpComponent"


export default function StatesComponent() {
  const {states} =useHomeState()
  return (
    <div>
        {states==='HOME' && <HomeComponent/>}
        {states==='OTP' && <OTPComponent/>}
    </div>
  )
}
