"use client"
import { useHomeState } from "@/store/store.homeStates"
import HomeComponent from "./homeComponent"


export default function StatesComponent() {
  const {setState,states} =useHomeState()
  return (
    <div>
        {states==='HOME' && <HomeComponent/>}
    </div>
  )
}
