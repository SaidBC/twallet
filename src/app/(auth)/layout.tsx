import Header from "@/ui/(auth)/Header";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body
      className={`bg-gradient-to-b from-green-700 to-green-900 min-h-dvh text-slate-900`}
    >
      <Header />
      {children}
    </body>
  );
}
