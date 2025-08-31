"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

export default function HomeComponent() {
  const [emailValue, setEmailValue] = useState<string>("");
  return (
    <div className="bg-[#F2F7F6] min-h-[80vh] p-10 flex justify-center items-center">
      <div className="max-w-xl space-y-3">
        <div className="text-4xl md:text-6xl text-[#002F25] font-bold text-center leading-[3.5rem] md:leading-[5rem]">
          Create & Share <span className="px-2 bg-[#CCFB87] ">Quizzes</span> in
          Seconds
        </div>
        <div className="text-md text-[#002F25] font-medium text-center ">
          Create quizzes in seconds, share with anyone, anywhere. Fun, fast, and
          simple – no sign-up or coding needed. Engage your friends, students,
          or team with instant results.
        </div>
        <div className="flex flex-row justify-center w-full">
          <div className="flex flex-row min-w-sm">
            <Input
              placeholder="Enter Your Mail Address"
              className="bg-[#FFFFFF] rounded-l-3xl rounded-r-none pb-1 pl-3"
              value={emailValue}
              onChange={(e) => setEmailValue(e.target.value)}
            />
            <Button className="hover:bg-[#CCFB87] cursor-pointer hover:text-[#002F25] bg-[#CCFB87] text-[#002F25] rounded-r-3xl rounded-l-none">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
