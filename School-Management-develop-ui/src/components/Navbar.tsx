"use client";

import { useGlobally } from "@/context/protected.context";
import Image from "next/image";
import React from "react";
import AppLoader from "./AppLoader";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { logout, loading, handleLoadingTrue, handleLoadingFalse } = useGlobally();
  const redirect = useRouter();

  const signOut = () => {
    handleLoadingTrue && handleLoadingTrue();
    setTimeout(() => {
      handleLoadingFalse && handleLoadingFalse();
      logout && logout();
      redirect.replace("/");
    }, 2000);
  };

  return (
    <div className="flex justify-between items-center p-4">
      {loading && <AppLoader />}
      {/* SEARCH BAR */}
      <div className="hidden md:flex items-center gap-2 text-xs rounded-full  ring-[1.5px] ring-gray-300 px-2">
        <Image src={"/search.png"} alt="" width={14} height={14} />
        <input
          type="text"
          placeholder="Search here..."
          className="w-[200px] p-2 bg-transparent outline-none"
        />
      </div>
      {/* INCONS & USERS */}
      <div className="flex gap-6 items-center gap-6 justify-end w-full">
        <div className="bg-white rounded-full w-7 h-7 flex justify-center items-center cursor-pointer">
          <Image src={"/message.png"} alt="" width={20} height={20} />
        </div>
        <div className="bg-white rounded-full w-7 h-7 flex justify-center items-center cursor-pointer relative">
          <Image src={"/announcement.png"} alt="" width={20} height={20} />
          <div className="absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center bg-purple-500 text-white rounded-full text-xs">
            1
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-sx leading-3 font-medium">John Doe</span>
          <span className="text-[10px] text-gray-500 text-right">Admin</span>
        </div>
        <Image
          src={"/avatar.png"}
          alt=""
          width={36}
          height={36}
          className="rounded-full cursor-pointer"
          onClick={() => signOut()}
        />
      </div>
    </div>
  );
};

export default Navbar;
