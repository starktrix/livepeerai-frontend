'use client'

import useAuth from "@/libs/auth";

export default function StoryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    useAuth()
  return <>{children} </>;
}
