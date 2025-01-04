"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface MessageBubbleProps {
  key?: any;
  message: string;
  role: "Student" | "Parent" | "Teacher" | "Headmaster";
  photo: string;
  date: string;
  alignment: "left" | "right";
}

const MessageBubble = ({
  key,
  message,
  role,
  photo,
  date,
  alignment,
}: MessageBubbleProps) => {
  const isLeftAligned = alignment === "left";

  return (
    <div className="m-2 w-auto">
      <div
        className={cn(
          "inline-flex w-full p-2 rounded-md items-center",
          isLeftAligned ? "justify-start" : "justify-end"
        )}
      >
        {isLeftAligned && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photo}
            alt={`${role}'s photo`}
            className="h-10 w-10 rounded-full mr-2 object-cover"
          />
        )}
        <div
          className={cn(
            "flex flex-col max-w-xs",
            isLeftAligned ? "" : "items-end"
          )}
        >
          <div className="flex items-center gap-2 text-sm text-gray-600">
            {isLeftAligned ? (
              <>
                <span>{role} </span>
                <span> {date} </span>
              </>
            ) : (
              <>
                <span>{date} </span>
                <span> {role} </span>
              </>
            )}
          </div>
          <span
            className={cn(
              "p-2 rounded-lg mt-1",
              isLeftAligned
                ? "bg-gray-200 text-gray-900"
                : "bg-blue-500 text-white"
            )}
          >
            {message}
          </span>
        </div>
        {!isLeftAligned && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photo}
            alt={`${role}'s photo`}
            className="h-10 w-10 rounded-full ml-2 object-cover"
          />
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
