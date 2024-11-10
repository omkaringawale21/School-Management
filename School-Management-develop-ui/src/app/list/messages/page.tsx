"use client";

import ListNavbar from "@/components/ListNavbar";
import ProtectedRoute from "@/protected.routes/protected.routes";
import { Paper } from "@mui/material";
import React, { useState } from "react";
import { RoleTitle } from "@/enums/RoleTitle";
import MessageBubble from "@/components/MessageBubble";
import { cn } from "@/lib/utils";

const MessagesLists = () => {
  const [search, setSearch] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const createDetails = () => {
    setOpen(true);
  };

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
        <Paper className={cn("max-h-[90vh] overflow-y-scroll bg-slate-300")}>
          <MessageBubble
            message="Hello Sir"
            role="Student"
            photo="https://images.unsplash.com/photo-1678286742832-26543bb49959?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
            date={new Date().toLocaleDateString()}
            alignment="left"
          />
          <MessageBubble
            message="Hello Sir"
            role="Teacher"
            photo="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            date={new Date().toLocaleDateString()}
            alignment="right"
          />
          <MessageBubble
            message="Hello Sir"
            role="Student"
            photo="https://images.unsplash.com/photo-1678286742832-26543bb49959?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
            date={new Date().toLocaleDateString()}
            alignment="left"
          />
          <MessageBubble
            message="Hello Sir"
            role="Teacher"
            photo="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            date={new Date().toLocaleDateString()}
            alignment="right"
          />
          <MessageBubble
            message="Hello Sir"
            role="Student"
            photo="https://images.unsplash.com/photo-1678286742832-26543bb49959?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
            date={new Date().toLocaleDateString()}
            alignment="left"
          />
          <MessageBubble
            message="Hello Sir"
            role="Teacher"
            photo="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            date={new Date().toLocaleDateString()}
            alignment="right"
          />
          <MessageBubble
            message="Hello Sir"
            role="Student"
            photo="https://images.unsplash.com/photo-1678286742832-26543bb49959?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
            date={new Date().toLocaleDateString()}
            alignment="left"
          />
          <MessageBubble
            message="Hello Sir"
            role="Teacher"
            photo="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            date={new Date().toLocaleDateString()}
            alignment="right"
          />
          <MessageBubble
            message="Hello Sir"
            role="Student"
            photo="https://images.unsplash.com/photo-1678286742832-26543bb49959?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
            date={new Date().toLocaleDateString()}
            alignment="left"
          />
          <MessageBubble
            message="Hello Sir"
            role="Teacher"
            photo="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            date={new Date().toLocaleDateString()}
            alignment="right"
          />
          <MessageBubble
            message="Hello Sir"
            role="Student"
            photo="https://images.unsplash.com/photo-1678286742832-26543bb49959?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
            date={new Date().toLocaleDateString()}
            alignment="left"
          />
          <MessageBubble
            message="Hello Sir"
            role="Teacher"
            photo="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            date={new Date().toLocaleDateString()}
            alignment="right"
          />
          <MessageBubble
            message="Hello Sir"
            role="Student"
            photo="https://images.unsplash.com/photo-1678286742832-26543bb49959?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
            date={new Date().toLocaleDateString()}
            alignment="left"
          />
          <MessageBubble
            message="Hello Sir"
            role="Teacher"
            photo="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            date={new Date().toLocaleDateString()}
            alignment="right"
          />
          <MessageBubble
            message="Hello Sir"
            role="Student"
            photo="https://images.unsplash.com/photo-1678286742832-26543bb49959?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
            date={new Date().toLocaleDateString()}
            alignment="left"
          />
          <MessageBubble
            message="Hello Sir"
            role="Teacher"
            photo="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            date={new Date().toLocaleDateString()}
            alignment="right"
          />
          <MessageBubble
            message="Hello Sir"
            role="Student"
            photo="https://images.unsplash.com/photo-1678286742832-26543bb49959?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
            date={new Date().toLocaleDateString()}
            alignment="left"
          />
          <MessageBubble
            message="Hello Sir"
            role="Teacher"
            photo="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            date={new Date().toLocaleDateString()}
            alignment="right"
          />
          <MessageBubble
            message="Hello Sir"
            role="Student"
            photo="https://images.unsplash.com/photo-1678286742832-26543bb49959?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
            date={new Date().toLocaleDateString()}
            alignment="left"
          />
          <MessageBubble
            message="Hello Sir"
            role="Teacher"
            photo="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            date={new Date().toLocaleDateString()}
            alignment="right"
          />
          <MessageBubble
            message="Hello Sir"
            role="Student"
            photo="https://images.unsplash.com/photo-1678286742832-26543bb49959?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
            date={new Date().toLocaleDateString()}
            alignment="left"
          />
          <MessageBubble
            message="Hello Sir"
            role="Teacher"
            photo="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            date={new Date().toLocaleDateString()}
            alignment="right"
          />
          <MessageBubble
            message="Hello Sir"
            role="Student"
            photo="https://images.unsplash.com/photo-1678286742832-26543bb49959?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
            date={new Date().toLocaleDateString()}
            alignment="left"
          />
          <MessageBubble
            message="Hello Sir"
            role="Teacher"
            photo="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            date={new Date().toLocaleDateString()}
            alignment="right"
          />
          <MessageBubble
            message="Hello Sir"
            role="Student"
            photo="https://images.unsplash.com/photo-1678286742832-26543bb49959?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
            date={new Date().toLocaleDateString()}
            alignment="left"
          />
          <MessageBubble
            message="Hello Sir"
            role="Teacher"
            photo="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            date={new Date().toLocaleDateString()}
            alignment="right"
          />
          <MessageBubble
            message="Hello Sir"
            role="Student"
            photo="https://images.unsplash.com/photo-1678286742832-26543bb49959?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
            date={new Date().toLocaleDateString()}
            alignment="left"
          />
          <MessageBubble
            message="Hello Sir"
            role="Teacher"
            photo="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            date={new Date().toLocaleDateString()}
            alignment="right"
          />
          <MessageBubble
            message="Hello Sir"
            role="Student"
            photo="https://images.unsplash.com/photo-1678286742832-26543bb49959?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
            date={new Date().toLocaleDateString()}
            alignment="left"
          />
          <MessageBubble
            message="Hello Sir"
            role="Teacher"
            photo="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            date={new Date().toLocaleDateString()}
            alignment="right"
          />
          <MessageBubble
            message="Hello Sir"
            role="Student"
            photo="https://images.unsplash.com/photo-1678286742832-26543bb49959?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
            date={new Date().toLocaleDateString()}
            alignment="left"
          />
          <MessageBubble
            message="Hello Sir"
            role="Teacher"
            photo="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            date={new Date().toLocaleDateString()}
            alignment="right"
          />
          <MessageBubble
            message="Hello Sir"
            role="Student"
            photo="https://images.unsplash.com/photo-1678286742832-26543bb49959?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
            date={new Date().toLocaleDateString()}
            alignment="left"
          />
          <MessageBubble
            message="Hello Sir"
            role="Teacher"
            photo="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            date={new Date().toLocaleDateString()}
            alignment="right"
          />
          <MessageBubble
            message="Hello Sir"
            role="Student"
            photo="https://images.unsplash.com/photo-1678286742832-26543bb49959?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
            date={new Date().toLocaleDateString()}
            alignment="left"
          />
          <MessageBubble
            message="Hello Sir"
            role="Teacher"
            photo="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            date={new Date().toLocaleDateString()}
            alignment="right"
          />
        </Paper>
      </div>
    </ProtectedRoute>
  );
};

export default MessagesLists;
