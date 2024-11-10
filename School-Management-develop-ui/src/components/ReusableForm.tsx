"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { TextField, Button, Box, CircularProgress } from "@mui/material";
import { formSchemas, FormField } from "@/schema/FormSchema";
import { cn } from "@/lib/utils";
import FileUploadField from "./FileUploadField";

interface ExtendedFormField extends FormField {
    isFileUpload?: boolean;
    accept?: string;
}

interface ReusableFormProps {
    entity: keyof typeof formSchemas;
    onSubmit: SubmitHandler<Record<string, any>>;
    handleClose: (shouldClose: boolean) => void;
    defaultValues?: Record<string, any>;
}

const ReusableForm: React.FC<ReusableFormProps> = ({
    entity,
    onSubmit,
    handleClose,
    defaultValues = {}
}) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue
    } = useForm<Record<string, any>>({
        defaultValues,
    });

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
        const file = event.target.files?.[0];
        console.log("file ==>> ", file)
        if (file) {
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
            setValue(fieldName, file);
        }
    };

    const handleFormSubmit: SubmitHandler<Record<string, any>> = async (data) => {
        try {
            setIsSubmitting(true);

            const formData = new FormData();
            Object.entries(data).forEach(([key, value]) => {
                if (value instanceof File) {
                    formData.append(key, value);
                } else {
                    formData.append(key, String(value));
                }
                console.log(key, value);
            });
            await onSubmit(formData);
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
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
            {schema.map(({ name, label, type, isFileUpload, accept }) => {
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
                            previewUrl={previewUrl}
                            onChange={(e) => handleFileChange(e, name)}
                            register={register}
                        />
                    );
                }

                return (
                    <div key={name}>
                        <TextField
                            {...register(name, { required: `${label} is required` })}
                            label={label}
                            type={type}
                            variant="outlined"
                            fullWidth
                            disabled={isSubmitting}
                            error={!!errors[name]}
                            helperText={errors[name]?.message?.toString()}
                            sx={{
                                '& .MuiInputBase-root': {
                                    height: '2rem',
                                    fontSize: '0.875rem',
                                },
                                '& .MuiOutlinedInput-input': {
                                    padding: '0.5rem 0.75rem',
                                },
                                '& .MuiInputLabel-root': {
                                    fontSize: '0.85rem',
                                    transform: isEmpty
                                        ? 'translate(12px, 8px) scale(1)'
                                        : 'translate(12px, -9px) scale(0.75)',
                                    '&.Mui-focused': {
                                        transform: 'translate(12px, -9px) scale(0.75)',
                                    },
                                },
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'gray.300',
                                    borderWidth: '1px',
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'primary.main',
                                },
                                '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'primary.main',
                                    borderWidth: '2px',
                                },
                            }}
                        />
                    </div>
                );
            })}
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
                        minWidth: '100px',
                    }}
                >
                    {isSubmitting ? (
                        <CircularProgress
                            size={20}
                            color="inherit"
                            sx={{ color: 'white' }}
                        />
                    ) : (
                        'Submit'
                    )}
                </Button>
            </div>
        </Box>
    );
};

export default ReusableForm;