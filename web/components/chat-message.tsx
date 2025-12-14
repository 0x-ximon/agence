"use client";

import { cn } from "@/lib/utils";

export interface ChatMessage {
  id: string;
  username: string;
  message: string;
  timestamp: Date;
  isSystem?: boolean;
}

interface ChatMessageProps {
  message: ChatMessage;
  isOwnMessage?: boolean;
}

export function ChatMessageComponent({
  message,
  isOwnMessage,
}: ChatMessageProps) {
  const formattedTime = message.timestamp.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (message.isSystem) {
    return (
      <div className="text-center text-xs text-slate-500 py-2">
        {message.message}
      </div>
    );
  }

  return (
    <div className={cn("flex gap-2 mb-3", isOwnMessage && "flex-row-reverse")}>
      <div className="w-6 h-6 rounded-full bg-primary shrink-0 flex items-center justify-center">
        <span className="text-xs text-slate-900 font-bold">
          {message.username.charAt(0).toUpperCase()}
        </span>
      </div>
      <div className={cn("flex-1", isOwnMessage && "text-right")}>
        <div
          className={cn(
            "flex gap-2 items-center",
            isOwnMessage && "flex-row-reverse justify-end",
          )}
        >
          <span className="text-xs font-semibold text-slate-100">
            {message.username}
          </span>
          <span className="text-xs text-slate-500">{formattedTime}</span>
        </div>
        <p className="text-sm text-slate-200 mt-1 break-words">
          {message.message}
        </p>
      </div>
    </div>
  );
}
