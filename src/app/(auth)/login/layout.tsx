import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - Twallet",
  description: "Welcome to Login page",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
