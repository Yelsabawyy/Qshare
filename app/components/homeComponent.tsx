"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useHomeState } from "@/store/store.homeStates";
import React, { useState } from "react";
import { z } from "zod"; // import correctly

// email schema
const emailValidator = z.object({
  email: z.email({
    error: "Invalid email address",
  }),
});

export default function HomeComponent() {
  const [emailValue, setEmailValue] = useState<string>("");
  const [errorEmail, setErrorEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {setOtp,setState,setStoredEmail} = useHomeState()
  async function handleGetStart() {
    const result = emailValidator.safeParse({ email: emailValue });

    if (result.success) {
      try {
        setIsLoading(true);
        const res = await fetch("/api/send-otp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: emailValue,
          }),
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message);
        }
        setOtp(data.otp)
        setStoredEmail(emailValue)
        setState('OTP')
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Error occurred, please try again!";
        setErrorEmail(errorMessage);
      } finally {
        setIsLoading(false);
      }
    } else {
      setErrorEmail(result.error.issues[0].message || "Invalid email");
    }
  }

  return (
    <div className="bg-[#F2F7F6] min-h-[80vh] p-10 flex justify-center items-center">
      <div className="max-w-xl space-y-3">
        <div className="text-4xl md:text-6xl text-[#002F25] font-bold text-center leading-[3.5rem] md:leading-[5rem]">
          Create & Share <span className="px-2 bg-[#CCFB87] ">Quizzes</span> in
          Seconds
        </div>

        <div className="text-md text-[#002F25] font-medium text-center">
          Create quizzes in seconds, share with anyone, anywhere. Fun, fast, and
          simple – no sign-up or coding needed. Engage your friends, students,
          or team with instant results.
        </div>

        <div className="flex flex-row justify-center w-full">
          <div className="flex flex-row max-w-md w-full">
            <Input
              placeholder="Enter Your Email Address"
              className="bg-white rounded-l-3xl rounded-r-none pl-3"
              value={emailValue}
              onChange={(e) => setEmailValue(e.target.value)}
            />
            <Button
              onClick={handleGetStart}
              disabled={isLoading}
              className="hover:bg-[#bbf56d] cursor-pointer hover:text-[#002F25] bg-[#CCFB87] text-[#002F25] rounded-r-3xl rounded-l-none"
            >
              {isLoading?"Loading...":"Get Started"}
            </Button>
          </div>
        </div>

        {/* show error if exists */}
        {errorEmail && (
          <p className="text-red-600 text-sm text-center">{errorEmail}</p>
        )}
      </div>
    </div>
  );
}
