"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useToken } from "@/libs/token-context";
import useAxiosInstance from "@/libs/axiosHook";
import { useRouter } from "next/navigation";

const SignupPage = () => {
  // State for form fields
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { token, setToken, store } = useToken();
  const axiosInstance = useAxiosInstance()
  const router = useRouter()

  console.log("Token: ", token)

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior
    setIsLoading(true);
    setError(null); // Reset any previous errors

    try {
      const response = await axiosInstance.post("/auth/signup", {
        username,
        email,
        password,
      });

      if (response.data.success) {
        // Handle successful signup, e.g., redirect to login or home page
        setToken(response.data.token);
        store({token: response.data.token})
        console.log("Signup successful", response.data);
      setIsLoading(false);
        router.push('/')
      } else {
        setError("Signup failed. Please check your details.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1a2e] text-white">
      <header className="bg-[#16213e] p-4">
        <h1 className="text-2xl text-[#e94560] font-bold">StoryVerse</h1>
      </header>
      <main className="flex justify-center items-center h-[calc(100vh-4rem)]">
        <div className="bg-[#16213e] p-8 rounded-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium mb-1"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username} // Bind state value
                onChange={(e) => setUsername(e.target.value)} // Update state on change
                className="w-full p-2 rounded bg-[#1a1a2e] text-white"
                placeholder="Enter your preferred username"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email} // Bind state value
                onChange={(e) => setEmail(e.target.value)} // Update state on change
                className="w-full p-2 rounded bg-[#1a1a2e] text-white focus:outline-none focus:bg-[#1a1a2e]"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password} // Bind state value
                onChange={(e) => setPassword(e.target.value)} // Update state on change
                className="w-full p-2 rounded bg-[#1a1a2e] text-white"
                placeholder="Enter your password"
                required
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}{" "}
            {/* Display error */}
            <button
              type="submit"
              className={`w-full bg-[#e94560] text-white py-2 px-4 rounded-full hover:bg-[#d83a55] transition duration-300 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isLoading} // Disable button while loading
            >
              {isLoading ? "Signing up..." : "Sign Up"}
            </button>
          </form>
          <p className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-[#e94560] hover:underline">
              Login
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default SignupPage;
