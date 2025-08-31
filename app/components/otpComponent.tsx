"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useHomeState } from "@/store/store.homeStates";

export default function OTPComponent() {
  const router = useRouter();
  const {otp:storeOtp} =useHomeState()
  const [otp, setOtp] = useState(Array(6).fill(""));

  const handleChange = (value: string, index: number) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
    }
  };

  const handleVerify = () => {
    const enteredOtp = otp.join("");
    if (storeOtp?.toString() === enteredOtp) {
      router.push("/questions");
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center text-center">
      <div className="bg-[#F2F7F6] p-6 rounded-none max-w-md mx-auto text-center space-y-6">
        <h2 className="text-2xl font-bold text-[#002F25]">Enter OTP</h2>
        <p className="text-sm text-[#002F25]">We sent a code to your email</p>

        <div className="flex justify-center gap-2">
          {otp.map((digit, index) => (
            <Input
              key={index}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              className="w-12 h-12 text-center text-xl font-bold rounded-none border border-[#002F25] "
            />
          ))}
        </div>

        <div className="space-y-3">
          <Button
            onClick={handleVerify}
            className="bg-[#002F25] hover:bg-[#002F25] cursor-pointer text-white w-full rounded-3xl hover:brightness-95"
          >
            Verify
          </Button>
        </div>
      </div>
    </div>
  );
}
