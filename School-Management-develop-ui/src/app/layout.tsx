import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/protected.context";
import ReduxProvider from "@/redux/providers/ReduxProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Omkar Ingawale School Management Dashboard",
  description: "Next.js School Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppProvider>
      <ReduxProvider>
        <html lang="en">
          <body className={inter.className}>{children}</body>
        </html>
      </ReduxProvider>
    </AppProvider>
  );
}
