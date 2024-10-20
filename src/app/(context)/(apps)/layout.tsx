import Sidebar from "@/components/SideBar";
import { Fragment } from "react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log("Layout component rendered");
  return (
    <Fragment>
      <main className="min-h-screen bg-[#1a1a2e]">
        <Sidebar />
        <div className="ml-52 w-[calc(100%-13rem)] h-full">{children}</div>
      </main>
    </Fragment>
  );
}
