import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Omkar Ingawale School Management Dashboard",
  description: "Next.js School Management System",
};

export default function OtherLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex">
      {/* LEFT */}
      <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] overflow-y-scroll">
        <Link href={"/"} className="flex items-center justify-center">
          <Image src={"/applogon.svg"} alt="logo" width={150} height={150} />
        </Link>
        <Menu />
      </div>
      {/* RIGHT */}
      <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#f7f8fa] overflow-y-scroll">
        <Navbar />
        {children}
      </div>
    </div>
  );
}
