"use client";

import { Send, Smile } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { type ChatMessage, ChatMessageComponent } from "./chat-message";

const EMOJI_REACTIONS = ["❤️", "👍", "😂", "🔥", "🎉", "😍", "🤔", "👏"];

interface LiveChatProps {
  onSendMessage?: (message: string) => void;
  onEmojiReaction?: (emoji: string) => void;
  className?: string;
  isHost?: boolean;
}

export function LiveChat({
  onSendMessage,
  onEmojiReaction,
  className,
  isHost = false,
}: LiveChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      username: "System",
      message: "Stream started",
      timestamp: new Date(),
      isSystem: true,
    },
  ]);
  const [input, setInput] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: WILL FIX
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      username: "You",
      message: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    onSendMessage?.(input);
    setInput("");
  };

  const handleEmojiClick = (emoji: string) => {
    const reactionMessage: ChatMessage = {
      id: Date.now().toString(),
      username: "You",
      message: emoji,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, reactionMessage]);
    onEmojiReaction?.(emoji);
    setShowEmojiPicker(false);
  };

  return (
    <Card
      className={cn(
        "bg-slate-800 border-slate-700 flex flex-col h-full",
        className,
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-slate-700">
        <h3 className="font-semibold text-slate-100">Live Chat</h3>
        <p className="text-xs text-slate-400 mt-1">
          {messages.length} messages
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-1">
        {messages.map((message) => (
          <ChatMessageComponent
            key={message.id}
            message={message}
            isOwnMessage={message.username === "You"}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-slate-700 space-y-2">
        {/* Emoji Picker */}
        {showEmojiPicker && (
          <div className="grid grid-cols-4 gap-2 p-3 bg-slate-700/50 rounded-lg mb-2">
            {EMOJI_REACTIONS.map((emoji) => (
              <button
                type="button"
                key={emoji}
                onClick={() => handleEmojiClick(emoji)}
                className="text-2xl hover:scale-125 transition-transform cursor-pointer"
              >
                {emoji}
              </button>
            ))}
          </div>
        )}

        {/* Message Input */}
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="bg-slate-700 border-slate-600 text-slate-100 placeholder:text-slate-400"
            maxLength={200}
            disabled={!isHost}
          />
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="text-slate-300 hover:text-slate-100"
          >
            <Smile className="w-5 h-5" />
          </Button>
          <Button
            type="submit"
            size="sm"
            className="bg-primary hover:bg-primary/90 text-slate-900"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </Card>
  );
}
