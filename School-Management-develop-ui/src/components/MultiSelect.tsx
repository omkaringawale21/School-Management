"use client";

import React from "react";
import {
  Checkbox,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Control, Controller } from "react-hook-form";

interface Option<T> {
  key: string;
  value: T;
}

interface MultiSelectDropdownProps<T> {
  label: string;
  name: string;
  options: Option<T>[];
  control: Control<any>;
  defaultValue?: T[];
  isSubmitting?: boolean;
  errors?: any;
  isEmpty?: boolean;
  isRequired?: boolean;
}

const MultiSelectDropdown = <T,>({
  label,
  name,
  options,
  control,
  defaultValue = [],
  isSubmitting,
  errors,
  isEmpty,
  isRequired = false,
}: MultiSelectDropdownProps<T>) => {
  return (
    <div>
      <label style={{ fontSize: "0.875rem" }}>
        {label}
        {isRequired && <span style={{ color: "red" }}>*</span>}
      </label>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={{
          required: isRequired ? "This field is required" : false,
        }}
        render={({ field: { onChange, value } }) => {
          const handleChange = (event: SelectChangeEvent<string[]>) => {
            const values = event.target.value as string[];
            const selectedValues = options
              .filter((option) => values.includes(option.key))
              .map((option) => option.value);
            onChange(selectedValues);
          };

          return (
            <>
              <Select
                multiple
                value={options
                  .filter((option) => value?.includes(option.value))
                  .map((option) => option.key)}
                onChange={handleChange}
                renderValue={(selected) => selected.join(", ")}
                disabled={isSubmitting}
                placeholder={label}
                error={!!errors[name]}
                sx={{
                  "&.MuiInputBase-root": {
                    height: "2rem",
                    width: "100%",
                    fontSize: "0.875rem",
                  },
                  "&.MuiOutlinedInput-input": {
                    padding: "0.5rem 0.75rem",
                  },
                  "&.MuiInputLabel-root": {
                    fontSize: "0.85rem",
                    transform: isEmpty
                      ? "translate(12px, 8px) scale(1)"
                      : "translate(12px, -9px) scale(0.75)",
                    "&.Mui-focused": {
                      transform: "translate(12px, -9px) scale(0.75)",
                    },
                  },
                  "&.MuiOutlinedInput-notchedOutline": {
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
              >
                {options.map((option) => (
                  <MenuItem key={option.key} value={option.key}>
                    <Checkbox checked={value?.includes(option.value)} />
                    <ListItemText primary={option.key} />
                  </MenuItem>
                ))}
              </Select>
            </>
          );
        }}
      />
    </div>
  );
};

export default MultiSelectDropdown;