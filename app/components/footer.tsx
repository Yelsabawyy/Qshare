import Link from "next/link";

export default function Footer() {
  return (
    <div className="bg-white text-[#002F25] py-6 shadow-inner">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Left side */}
        <div className="text-sm font-medium">
          © {new Date().getFullYear()} QuizLink. All rights reserved.
        </div>

        {/* Right side */}
        <div className="flex gap-6 text-sm">
          Developed By
          <span className="-ml-4 font-semibold">
            <Link href="https://www.linkedin.com/in/yelsabawyy" target="_blank">
              Youssef Elsabawy
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
