"use client";

import ListNavbar from "@/components/ListNavbar";
import ProtectedRoute from "@/protected.routes/protected.routes";
import { IconButton, Paper, TextField } from "@mui/material";
import React, { useState } from "react";
import { RoleTitle } from "@/enums/RoleTitle";
import MessageBubble from "@/components/MessageBubble";
import { cn } from "@/lib/utils";
import InputField from "@/components/InputField";
import { useForm } from "react-hook-form";
import SendIcon from "@mui/icons-material/Send";

const MessagesLists = () => {
  const [search, setSearch] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createDetails = () => {
    setOpen(true);
  };

  const handleFormSubmit = (data: any) => {
    console.log(data);
    for (let [key, value] of data.entries()) {
      console.log(key, value);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<Record<string, any>>({
    defaultValues: {},
  });

  const messages = [
    {
      message: "Hello Sir",
      role: "Student",
      photo:
        "https://images.unsplash.com/photo-1678286742832-26543bb49959?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
      date: new Date().toLocaleDateString(),
      alignment: "left",
    },
    {
      message: "Hello Sir",
      role: "Teacher",
      photo:
        "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: new Date().toLocaleDateString(),
      alignment: "right",
    },
    {
      message: "Hello Sir",
      role: "Student",
      photo:
        "https://images.unsplash.com/photo-1678286742832-26543bb49959?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
      date: new Date().toLocaleDateString(),
      alignment: "left",
    },
    {
      message: "Hello Sir",
      role: "Teacher",
      photo:
        "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: new Date().toLocaleDateString(),
      alignment: "right",
    },
    {
      message: "Hello Sir",
      role: "Student",
      photo:
        "https://images.unsplash.com/photo-1678286742832-26543bb49959?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
      date: new Date().toLocaleDateString(),
      alignment: "left",
    },
    {
      message: "Hello Sir",
      role: "Teacher",
      photo:
        "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: new Date().toLocaleDateString(),
      alignment: "right",
    },
    {
      message: "Hello Sir",
      role: "Student",
      photo:
        "https://images.unsplash.com/photo-1678286742832-26543bb49959?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
      date: new Date().toLocaleDateString(),
      alignment: "left",
    },
    {
      message: "Hello Sir",
      role: "Teacher",
      photo:
        "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: new Date().toLocaleDateString(),
      alignment: "right",
    },
    {
      message: "Hello Sir",
      role: "Student",
      photo:
        "https://images.unsplash.com/photo-1678286742832-26543bb49959?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
      date: new Date().toLocaleDateString(),
      alignment: "left",
    },
    {
      message: "Hello Sir",
      role: "Teacher",
      photo:
        "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: new Date().toLocaleDateString(),
      alignment: "left",
    },
  ];

  return (
    <ProtectedRoute
      allowedRoles={[
        `${RoleTitle.ADMIN}`,
        `${RoleTitle.STUDENT}`,
        `${RoleTitle.TEACHER}`,
        `${RoleTitle.PARENT}`,
      ]}
      validRoutes={["/list/messages"]}
    >
      <div className="bg-white p-4 rounded-md m-2 min-h-[100vh]">
        <ListNavbar
          title="All Messages"
          createDetails={createDetails}
          searchText={search}
          setSearch={setSearch}
        />
        <Paper
          className={cn("max-h-[90vh] relative overflow-y-scroll bg-slate-300 pb-11")}
        >
          {messages.map((msg: any, index) => (
            <MessageBubble
              key={index}
              message={msg.message}
              role={msg.role}
              photo={msg.photo}
              date={msg.date}
              alignment={msg.alignment}
            />
          ))}
        </Paper>
        <div className="fixed bottom-0 p-4 bg-white border-t flex w-screen gap-2 justify-between items-center">
          <div className="w-[100%]">
            <InputField
              id="messageSend"
              label={""}
              type={"text"}
              register={register}
              disabled={isSubmitting}
              placeholder="Message"
              error={!!errors["message"]}
            />
          </div>
          <div className="w-[100%]">
            <IconButton color="primary">
              <SendIcon />
            </IconButton>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default MessagesLists;
