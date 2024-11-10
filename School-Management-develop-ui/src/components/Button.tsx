"use client";

import { CircularProgress } from "@mui/material";
import React from "react";

interface ButtonProps {
  loading?: boolean;
  text: string;
  onClick?: () => void;
  className?: string;
  type?: "submit" | "reset" | "button" | undefined;
}

const Button: React.FC<ButtonProps> = ({
  loading = false,
  text,
  onClick,
  className = "",
  type,
}) => {
  return (
    <button
      type={type}
      disabled={loading}
      onClick={onClick}
      className={`w-full flex justify-center items-center text-white font-bold py-2 px-4 rounded mt-4 bg-[#292ff0] hover:bg-[#656afc]`}
    >
      {loading ? <CircularProgress size="20px" color="inherit" /> : text}
    </button>
  );
};

export default Button;
