import Header from "@/ui/(auth)/Header";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`bg-gradient-to-b from-blue-700 to-blue-900 min-h-dvh text-slate-900`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
