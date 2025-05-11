"use client";

import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  TextField,
  Button,
  Box,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { formSchemas, FormField } from "@/schema/FormSchema";
import { cn } from "@/lib/utils";
import FileUploadField from "./FileUploadField";
import MultiSelectDropdown from "./MultiSelect";
import CloseIcon from "@mui/icons-material/Close";
import { PICTURE_URL } from "@/config/config";
import { useGetAllStudentListsQuery } from "@/redux/features/students/students.api";

const options = [
  { key: "Option 1", value: "option1" },
  { key: "Option 2", value: "option2" },
  { key: "Option 3", value: "option3" },
];

interface ExtendedFormField extends FormField {
  isFileUpload?: boolean;
  accept?: string;
}

interface ReusableFormProps {
  entity: keyof typeof formSchemas;
  onSubmit: SubmitHandler<Record<string, any>>;
  handleClose: (shouldClose: boolean) => void;
  defaultValues?: Record<string, any>;
  id?: string;
  hideElement?: boolean;
}

const ReusableForm: React.FC<ReusableFormProps> = ({
  entity,
  onSubmit,
  handleClose,
  defaultValues = {},
  id = "",
  hideElement = false,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<File | null>(null);

  // Student List
  const { data: studentDetails, isLoading: getStudentsDataLoading } =
    useGetAllStudentListsQuery?.(undefined);

  const studentDetailsList = Array.isArray(studentDetails?.body)
    ? studentDetails?.body?.map((student) => {
        return {
          key: student?.studentName,
          value: student?.id,
        };
      })
    : options;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    control,
  } = useForm<Record<string, any>>({
    defaultValues: defaultValues,
  });

  useEffect(() => {
    if (defaultValues) {
      for (const key in defaultValues) {
        setValue(key, defaultValues[key]);
      }
    }
  }, [defaultValues, setValue]);

  // File Change Handler to handle file preview and store the file name
  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => {
    const file = event.target.files?.[0] ?? null;
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setFileName(file);
      setValue(fieldName, file);
    } else {
      setPreviewUrl(
        defaultValues.profileUrl
          ? `${PICTURE_URL}${entity}/${defaultValues.profileUrl}`
          : null
      );
    }
  };

  const handleFormSubmit: SubmitHandler<Record<string, any>> = async (data) => {
    try {
      setIsSubmitting(true);
      const processedData = { ...data };
      for (const [key, value] of Object.entries(data)) {
        if (value instanceof File) {
          processedData[key] = fileName;
        }
      }
      await onSubmit(processedData);
    } finally {
      setTimeout(() => {
        setIsSubmitting(false);
      }, 1000);
    }
  };

  const schema = formSchemas[entity] as ExtendedFormField[];

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handleFormSubmit)}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <div className="flex justify-between items-center w-full">
        <h1>{entity}</h1>
        <IconButton onClick={() => handleClose(false)}>
          <CloseIcon />
        </IconButton>
      </div>
      {schema.map(
        ({
          name,
          label,
          type = "",
          isFileUpload,
          accept,
          iSMultiPleSelectDropdown,
          multiple = false,
        }) => {
          const value = watch(name);
          const isEmpty = !value;

          if (isFileUpload) {
            return (
              <FileUploadField
                key={name}
                name={name}
                label={label}
                accept={accept}
                error={errors[name]?.message?.toString()}
                disabled={isSubmitting}
                previewUrl={
                  value ? `${PICTURE_URL}${entity}/${value}` : previewUrl
                }
                onChange={(e) => handleFileChange(e, name)}
              />
            );
          }

          if (iSMultiPleSelectDropdown) {
            return (
              // eslint-disable-next-line react/jsx-key
              <MultiSelectDropdown
                key={name}
                label={label}
                name={name}
                options={
                  entity === "Parent" && name === "studentId"
                    ? studentDetailsList
                    : options
                }
                control={control}
                isSubmitting={isSubmitting}
                errors={errors}
                isEmpty={isEmpty}
                multiple={multiple}
              />
            );
          }

          if (type) {
            return (
              <div key={name}>
                <TextField
                  {...register(name, { required: `${label} is required` })}
                  label={type === "date" ? "" : label}
                  type={type}
                  variant="outlined"
                  fullWidth
                  disabled={isSubmitting}
                  error={!!errors[name]}
                  helperText={errors[name]?.message?.toString()}
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
                      transform: isEmpty
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
                    "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "primary.main",
                      borderWidth: "2px",
                    },
                  }}
                />
              </div>
            );
          }
        }
      )}
      <div className={cn("flex w-full justify-between items-center")}>
        <Button
          onClick={() => handleClose(false)}
          disabled={isSubmitting}
          className="hover:bg-gray-100"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isSubmitting}
          sx={{
            minWidth: "100px",
          }}
        >
          {isSubmitting ? (
            <CircularProgress
              size={20}
              color="inherit"
              sx={{ color: "white" }}
            />
          ) : (
            "Submit"
          )}
        </Button>
      </div>
    </Box>
  );
};

export default ReusableForm;
