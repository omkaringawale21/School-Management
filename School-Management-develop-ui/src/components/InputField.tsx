"use client";

import React from "react";
import { FieldError } from "react-hook-form";
import { TextField, SxProps } from "@mui/material";

interface InputFieldProps {
  id: string;
  label: string;
  type: "text" | "email" | "password" | "number" | "date";
  register: any;
  error?: FieldError | undefined | any;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  isSubmitting?: boolean;
  sx?: SxProps;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  type,
  register,
  error,
  placeholder = "",
  disabled = false,
  required = false,
  isSubmitting = false,
  sx = {},
}) => {
  return (
    <TextField
      {...register(id, { required: required ? `${label} is required` : false })}
      id={id}
      label={label}
      type={type}
      variant="outlined"
      fullWidth
      disabled={disabled || isSubmitting}
      placeholder={placeholder}
      error={!!error}
      helperText={error?.message?.toString()}
      sx={{
        "& .MuiInputBase-root": {
          height: "2rem",
          fontSize: "0.875rem",
        },
        "& .MuiOutlinedInput-input": {
          padding: "0.5rem 0.75rem",
        },
        "& .MuiInputLabel-root": {
          fontSize: "0.85rem",
          transform: placeholder
            ? "translate(12px, 8px) scale(1)"
            : "translate(12px, -9px) scale(0.75)",
          "&.Mui-focused": {
            transform: "translate(12px, -9px) scale(0.75)",
          },
        },
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "gray.300",
          borderWidth: "1px",
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: "primary.main",
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "primary.main",
          borderWidth: "2px",
        },
      }}
    />
  );
};

export default InputField;
