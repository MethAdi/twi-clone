"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleContinue = async () => {
    if (!email.trim()) {
      setError("Please enter an email or username");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Set cookie for server-side auth and localStorage for client-side persistence
      document.cookie = `userEmail=${encodeURIComponent(email)}; path=/; max-age=${60 * 60 * 24 * 7}`; // 7 days
      localStorage.setItem("userEmail", email);
      router.push("/home");
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(
      "Google Sign-in requires Supabase setup. Use the email field for now.",
    );
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-background max-w-[300px] w-[95%] py-12 rounded-lg px-6">
        <h2 className="font-bold text-3xl text-primary-text">Sign in to X</h2>
        <button
          onClick={handleGoogleSignIn}
          className="bg-white w-full mt-8 h-10 flex justify-center items-center gap-2 cursor-pointer rounded-full hover:bg-gray-200"
        >
          <Image
            src="/images/google-icon.png"
            alt="google icon"
            width={470}
            height={470}
            className="w-6 h-6 object-cover"
          />
          <span>Sign in with Google</span>
        </button>
        <div className="flex items-center my-6">
          <span className="mx-4 text-md text-primary-text">or</span>
          <div className="flex-grow h-px bg-border"></div>
        </div>
        <input
          type="email"
          placeholder="Phone, Email address or Username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleContinue()}
          className="w-full bg-background outline-none rounded-md p-4 placeholder-secondary-text border border-border text-white"
        />
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <button
          onClick={handleContinue}
          disabled={loading}
          className="text-white w-full mt-8 rounded-full h-10 flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-200 font-semibold border border-border hover:text-black disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Loading..." : "Continue"}
        </button>
        <button className="text-white w-full mt-8 rounded-full h-10 flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-200 font-semibold border border-border hover:text-black">
          Forgot Password?
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
