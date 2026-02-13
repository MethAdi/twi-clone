"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "../actions/auth";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    if (!username.trim() || !password.trim()) {
      setError("Please enter username and password");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await registerUser(
        email,
        username,
        firstName,
        lastName,
        password,
      );
      if (result.success) {
        localStorage.setItem("userUsername", username);
        localStorage.setItem("userId", result.userId.toString());
        router.push("/home");
      } else {
        setError(result.message || "Sign up failed");
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
        <h2 className="font-bold text-3xl text-primary-text">
          Create your account
        </h2>
        <input
          type="text"
          placeholder="Enter First name (Not Compulsory)"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full bg-background outline-none rounded-md p-4 placeholder-secondary-text border border-border text-white mt-4"
        />
        <input
          type="text"
          placeholder="Enter Last name (Not Compulsory)"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full bg-background outline-none rounded-md p-4 placeholder-secondary-text border border-border text-white mt-4"
        />
        <input
          type="email"
          placeholder="Enter email (Not Compulsory) "
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-background outline-none rounded-md p-4 placeholder-secondary-text border border-border text-white mt-4"
        />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-background outline-none rounded-md p-4 placeholder-secondary-text border border-border text-white mt-4"
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSignUp()}
          className="w-full bg-background outline-none rounded-md p-4 placeholder-secondary-text border border-border text-white mt-8"
        />
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <button
          onClick={handleSignUp}
          disabled={loading}
          className="text-white w-full mt-8 rounded-full h-10 flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-200 font-semibold border border-border hover:text-black disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Creating..." : "Sign Up"}
        </button>
        <div className="text-secondary-text mt-8">
          <span className="mr-1">Already have an account?</span>
          <Link href="/" className="text-primary">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
