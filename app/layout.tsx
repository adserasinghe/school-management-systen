import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lumen | School Management",
  description: "A clear, modern workspace for running your school.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
