import React from "react";

export default function Header() {
  return (
    <div>
      <div className="bg-[#002F25] px-5 py-2 text-white">
        QuizLink – the fastest way to build and share your quiz
      </div>
      <div className="bg-[#FFFFFF] flex flex-row items-center justify-between p-5">
        <div className="text-4xl font-semibold text-[#002F25]">Qshare</div>
        <div className="bg-[#002F25] px-5 py-2 rounded-sm text-white cursor-pointer">Get Start</div>
      </div>
    </div>
  );
}
