import "./globals.css";

export const metadata = {
  title: "Lumen | School Management",
  description: "A clear, modern workspace for running your school.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
