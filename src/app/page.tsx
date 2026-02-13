"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "./actions/auth";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleContinue = async () => {
    if (!email.trim() || !password.trim()) {
      setError("Please enter username and password");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await loginUser(email, password);
      if (response.success && response.userId) {
        localStorage.setItem("userUsername", email);
        localStorage.setItem("userId", response.userId.toString());
        router.push("/home");
      } else {
        setError(response.message || "Login failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-background max-w-[300px] w-[95%] py-12 rounded-lg px-6">
        <h2 className="font-bold text-3xl text-primary-text">Sign in to X</h2>
        <button
          onClick={() => {}}
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
          type="text"
          placeholder="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleContinue()}
          className="w-full bg-background outline-none rounded-md p-4 placeholder-secondary-text border border-border text-white"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
          Forgot password?
        </button>
        <div className="text-secondary-text mt-8">
          <span className="mr-1">Don't have an account?</span>
          <Link href="/signup" className="text-primary">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
