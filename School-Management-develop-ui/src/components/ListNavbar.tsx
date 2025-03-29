"use client";

import Image from "next/image";
import React from "react";
import AddIcon from "@mui/icons-material/Add";

interface ListNavBarProps {
  title: string | undefined;
  searchText: string | undefined;
  createDetails: () => void;
  setSearch: (search: string) => void;
  setId: React.Dispatch<React.SetStateAction<string>> | undefined;
}

const ListNavbar = ({ title, searchText, createDetails, setSearch, setId }: ListNavBarProps) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <div>
        <h1>{title}</h1>
      </div>
      <div className="flex items-center gap-2">
        {/* SEARCH BAR */}
        <div className="hidden md:flex items-center gap-2 text-xs rounded-full  ring-[1.5px] ring-gray-300 px-2">
          <Image src={"/search.png"} alt="" width={14} height={14} />
          <input
            type="text"
            placeholder="Search here..."
            value={searchText}
            className="w-[200px] p-2 bg-transparent outline-none"
            onChange={(e) => setSearch(e.target.value as string)}
          />
        </div>
        <div
          onClick={() => {
            createDetails(); 
            setId?.("");
          }}
          className="w-[36px] h-[36px] bg-yellow-200 rounded-full flex justify-center items-center hover:bg-yellow-500 cursor-pointer"
        >
          <AddIcon className="text-gray-500" />
        </div>
      </div>
    </div>
  );
};

export default ListNavbar;
