"use client";

import React, { ReactNode } from "react";
import { Card, CardHeader, CardContent, IconButton, Button } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

type ModalProps = {
    isOpen: boolean;
    closeModal: (shouldClose: boolean) => void;
    children: ReactNode;
    title?: string;
    maxWidth?: string;
};

const Modal: React.FC<ModalProps> = ({ isOpen, closeModal, children, title, maxWidth = "max-w-lg" }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <Card className={`w-full ${maxWidth} mx-4 relative`}>
                <CardHeader className="absolute top-2 right-2 flex items-center">
                    {title && <h2 className="text-xl font-semibold mx-auto">{title}</h2>}
                    <IconButton onClick={() => closeModal(true)} className="h-8 w-8 p-0 rounded-md overflow-hidden">
                        <CloseIcon />
                    </IconButton>
                </CardHeader>
                <CardContent>{children}</CardContent>
            </Card>
        </div>
    );
};

export default Modal;
