import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign up - Twallet",
  description: "Welcome to sign up page",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
