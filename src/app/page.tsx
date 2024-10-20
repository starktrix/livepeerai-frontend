"use client";

import useAuth from "@/libs/auth";
import Link from "next/link";

export default function Home() {
  const isLoggedIn = false;
  useAuth()

  return (
    <div className="w-full min-h-screen h-full bg-[#1a1a2e]">
      {/* Header */}
      <div className="w-full h-20 bg-[#16213e] flex justify-between items-center px-12">
        <h1 className="text-[#e94560] text-2xl font-semibold">StoryVerse</h1>
        {isLoggedIn ? (
          <div className="flex items-center gap-4">
            <Link href={"/dashboard"}>
              <span
                className="text-2xl cursor-pointer"
                // onClick={handleLogout}
              >
                🧑‍💼
              </span>
            </Link>
            <button
              // onClick={handleLogout}
              className="text-white bg-[#e94560] px-4 py-1 rounded-full text-sm"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-4">
            <Link href={"/login"}>
              <button className="bg-[#e94560] text-white py-1 px-4 rounded-full text-sm">
                Login
              </button>
            </Link>
            <Link href={"/signup"}>
              <button className="border border-[#e94560] text-[#e94560] py-1 px-4 rounded-full text-sm">
                Sign Up
              </button>
            </Link>
          </div>
        )}
      </div>

      {/* Hero Section */}
      <div className="mt-12 ml-12">
        <h2 className="text-white text-4xl">Collaborate on</h2>
        <h2 className="text-[#e94560] text-4xl mt-2">AI-Powered Stories</h2>
        <p className="text-[#a4a4a4] text-lg mt-4 max-w-md">
          Create, collaborate, and monetize your storytelling with blockchain
          and AI technology.
        </p>
        <Link href="/dashboard">
          <button className="bg-[#e94560] text-white py-3 px-8 mt-8 rounded-full text-lg">
            Start Creating
          </button>
        </Link>
      </div>

      {/* Feature Cards */}
      <div className="mt-16 pb-16 ml-12 flex justify-center gap-8">
        {/* Card 1 */}
        <div className="bg-[#16213e] w-64 h-56 rounded-lg p-4 flex flex-col items-center justify-center">
          <h3 className="text-white text-xl">AI-Assisted Creation</h3>
          <p className="text-[#a4a4a4] text-sm mt-2">
            Generate stories with advanced AI
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-[#16213e] w-64 h-56 rounded-lg p-4 flex flex-col items-center justify-center">
          <h3 className="text-white text-xl">Blockchain-Powered</h3>
          <p className="text-[#a4a4a4] text-sm mt-2">
            <span>Secure ownership with NFTs</span>
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-[#16213e] w-64 h-56 rounded-lg p-4 flex flex-col items-center justify-center">
          <h3 className="text-white text-xl">Collaborative Stories</h3>
          <p className="text-[#a4a4a4] text-sm mt-2">
            Create branches, vote on plots
          </p>
        </div>
      </div>
    </div>
  );
}
