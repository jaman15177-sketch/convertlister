import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/lib/init"; // 🚀 CRITICAL: boots alert engine ONCE globally

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ConvertLister",
  description: "Alert system v3",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
