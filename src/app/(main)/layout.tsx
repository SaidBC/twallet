import Header from "@/ui/Header";
import Nav from "@/ui/Nav";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Twallet",
  description: "Welcome to Login page",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body className={`bg-gray-100`}>
      <div className="grid grid-cols-[4.5rem_1fr] min-h-dvh">
        <div className="relative">
          <Nav />
        </div>
        <div className="grid grid-rows-[5rem_1fr]">
          <Header />
          {children}
        </div>
      </div>
    </body>
  );
}
