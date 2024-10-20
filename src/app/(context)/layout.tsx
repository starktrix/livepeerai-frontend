'use client'

import { TokenProvider } from "@/libs/token-context";

export default function ContextLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <TokenProvider>{children} </TokenProvider>;
}
