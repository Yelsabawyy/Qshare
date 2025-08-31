"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Header() {
  const pathName = usePathname();
  return (
    <div>
      <div className="bg-[#002F25] px-5 py-2 text-white">
        QuizLink – the fastest way to build and share your quiz
      </div>
      <div className="bg-[#FFFFFF] flex flex-row items-center justify-between p-5">
        <Link href={"/"}>
          <div className="text-4xl font-semibold text-[#002F25]">Qshare</div>
        </Link>
        {pathName === "/how-it-works" ? (
          <Link href={"/"}>
            <div className="bg-[#002F25] px-5 py-2 rounded-sm text-white cursor-pointer">
              Get Start
            </div>
          </Link>
        ) : (
          <Link href={"/how-it-works"}>
            <div className="bg-[#002F25] px-5 py-2 rounded-sm text-white cursor-pointer">
              How It Works?
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
