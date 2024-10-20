"use client";

import useAuth from "@/libs/auth";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  // useAuth()
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/story", label: "My Stories" },
    // { href: "/branches", label: "Branches" },
  ];

  return (
    <div className="w-52 min-h-screen h-full fixed bg-[#16213e] p-4 z-50">
      <Link href="/">
        <h1 className="text-[#e94560] text-2xl font-semibold mb-8">
          StoryVerse
        </h1>
      </Link>
      <ul className="space-y-6">
        {navItems.map((item) => (
          <li
            key={item.href}
            className={`text-lg ${
              pathname === item.href
                ? "text-[#e94560] font-semibold"
                : "text-[#a4a4a4] hover:text-white transition-colors duration-200"
            }`}
          >
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;