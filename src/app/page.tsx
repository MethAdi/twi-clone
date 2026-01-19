"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [value, setValue] = useState("");

  const handleContinue = () => {
    if (!value.trim()) return; // prevent empty submit
    router.push("/home");
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-background max-w-[300px] w-[95%] py-12 rounded-lg">

        <div className="flex items-center my-6">
          <span className="mx-4 text-md text-primary-text">Login to X</span>
          <div className="flex-grow h-px bg-border"></div>
        </div>

        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleContinue()}
          placeholder="Phone, Email address or Username"
          className="w-full bg-background outline-none rounded-md p-4 
                     placeholder-secondary-text border border-border text-white"
        />

        <button
          onClick={handleContinue}
          disabled={!value.trim()}
          className={`w-full mt-8 rounded-full h-10 flex items-center justify-center 
            gap-2 cursor-pointer font-semibold border border-border
            ${value.trim()
              ? "text-white hover:bg-gray-200 hover:text-black"
              : "text-gray-400 cursor-not-allowed"}`}
        >
          Continue
        </button>

        <div className="text-secondary-text mt-8">
          <span className="mr-1">Already have an account?</span>
          <Link href="#" className="text-primary">
            Sign up
          </Link>
        </div>

      </div>
    </div>
  );
}
  