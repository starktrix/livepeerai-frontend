import { Fragment } from "react";

export default function StoryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children} </>;
}
