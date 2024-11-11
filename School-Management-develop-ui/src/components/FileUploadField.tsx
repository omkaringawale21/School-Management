"use client";

import React, { useRef, useState } from 'react';
import { Upload } from 'lucide-react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface FileUploadFieldProps {
  name: string;
  label: string;
  accept?: string;
  error?: string;
  disabled?: boolean;
  previewUrl?: string | null;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileUploadField = ({
  name,
  label,
  accept = "image/*",
  error,
  disabled = false,
  previewUrl,
  onChange,
}: FileUploadFieldProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(previewUrl || null);

  const handleUploadClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      onChange(event);
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <input
        type="file"
        id={name}
        accept={accept}
        disabled={disabled}
        onChange={handleFileChange}
        ref={inputRef}
        style={{ display: 'none' }}
      />
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        width="100%"
        height="160px"
        border="2px dashed"
        borderColor={error ? 'red' : 'grey.300'}
        borderRadius={2}
        p={2}
        sx={{
          cursor: disabled ? 'not-allowed' : 'pointer',
          '&:hover': { backgroundColor: 'action.hover' },
          transition: 'background-color 0.2s ease',
        }}
        onClick={!disabled ? handleUploadClick : undefined}
      >
        {preview ? (
          <Avatar
            src={preview}
            alt="Preview"
            variant="rounded"
            sx={{
              width: '100%',
              height: '100%',
              transition: 'transform 0.2s ease',
              '&:hover': {
                transform: 'scale(1.05)',
              }
            }}
          />
        ) : (
          <Box display="flex" flexDirection="column" alignItems="center">
            <Upload className="w-10 h-10 text-gray-400 transition-transform transform hover:scale-110" />
            <Typography variant="body2" color="textSecondary">
              Click to upload {label}
            </Typography>
          </Box>
        )}
      </Box>
      {error && (
        <Typography variant="caption" color="error">
          {error}
        </Typography>
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={handleUploadClick}
        disabled={disabled}
        startIcon={<Upload />}
      >
        Select {label}
      </Button>
    </Box>
  );
};

export default FileUploadField;
