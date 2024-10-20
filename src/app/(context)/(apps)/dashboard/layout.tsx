'use client'

import useAuth from "@/libs/auth";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useAuth()
  return <>{children} </>;
}
