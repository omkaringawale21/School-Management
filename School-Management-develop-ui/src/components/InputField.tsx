"use client";

import { FieldError } from "react-hook-form";

interface InputFieldProps {
  id: string;
  label: string;
  type: "text" | "email" | "password" | "number" | "date";
  register: (name: string, options?: object) => any;
  error?: FieldError | undefined | any;
  placeholder?: string;
  className?: string;
  required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  type,
  register,
  error,
  placeholder = "",
  className = "",
  required = false,
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-bold mb-2">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        {...register(id, { required })} // Use the id for registration
        className={`w-full p-2 border rounded ${error ? 'border-red-600' : 'border-gray-300'} ${className}`}
      />
      {error && <span className="text-red-600 text-sm">{error.message || "This field is required"}</span>}
    </div>
  );
};

export default InputField;
