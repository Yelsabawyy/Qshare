"use client";
import { CheckCircle } from "lucide-react";

export default function page() {
  const steps = [
    {
      title: "1. Create Your Quiz",
      description:
        "Type your questions, add multiple choices, set a timer if you want – all in just a few clicks.",
    },
    {
      title: "2. Share Instantly",
      description:
        "Once your quiz is ready, generate a unique link and share it with your friends, students, or team.",
    },
    {
      title: "3. Get Results",
      description:
        "Track answers in real-time, see who joined, how they scored, and even receive all results directly in your email for easy review.",
    },
  ];

  return (
    <div className="bg-[#F2F7F6] min-h-screen py-16 px-6 flex justify-center items-center">
      <div className="max-w-4xl w-full space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-[#002F25] leading-tight">
            How It <span className="bg-[#CCFB87] px-2">Works</span>
          </h1>
          <p className="text-lg md:text-xl text-[#002F25] font-medium max-w-2xl mx-auto">
            Creating and sharing quizzes has never been easier. In just three
            simple steps, you can design engaging quizzes, share them instantly,
            and track real-time results.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="rounded-none border-none bg-white ">
              <div className="p-6 space-y-4">
                <CheckCircle className="text-[#002F25] w-10 h-10" />
                <h2 className="text-2xl font-semibold text-[#002F25]">
                  {step.title}
                </h2>
                <p className="text-md text-[#002F25] font-normal">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
