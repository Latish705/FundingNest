"use client";

import { useState, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Paperclip, Send, X } from "lucide-react";

async function sendMessage(data: {
  receiverId: string;
  content: string;
  attachment?: File;
}) {
  // Example fetch - replace with actual API call
  // return await fetch('/api/messages', {
  //   method: 'POST',
  //   body: JSON.stringify(data),
  // }).then(res => res.json());

  // Mock implementation
  return {
    id: Date.now().toString(),
    senderId: "currentUser",
    receiverId: data.receiverId,
    content: data.content,
    timestamp: new Date().toISOString(),
    read: false,
    attachment: data.attachment
      ? {
          name: data.attachment.name,
          url: URL.createObjectURL(data.attachment),
          size: `${(data.attachment.size / (1024 * 1024)).toFixed(1)} MB`,
        }
      : null,
  };
}

export default function MessageComposer({
  receiverId,
}: {
  receiverId: string;
}) {
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: sendMessage,
    onSuccess: (newMessage) => {
      // Update messages in the cache
      queryClient.setQueryData(["messages", receiverId], (oldData: any) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          messages: [...oldData.messages, newMessage],
        };
      });

      // Reset form
      setMessage("");
      setAttachment(null);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim() && !attachment) return;

    mutation.mutate({
      receiverId,
      content: message,
      attachment: attachment || undefined,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAttachment(e.target.files[0]);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border-t p-3 bg-white dark:bg-gray-800"
    >
      {attachment && (
        <div className="mb-2 bg-gray-100 dark:bg-gray-700 p-2 rounded flex items-center justify-between">
          <div className="flex items-center">
            <Paperclip className="h-4 w-4 mr-2" />
            <span className="text-sm truncate max-w-[200px]">
              {attachment.name}
            </span>
            <span className="text-xs text-gray-500 ml-2">
              {(attachment.size / (1024 * 1024)).toFixed(1)} MB
            </span>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setAttachment(null)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      <div className="flex items-end gap-2">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="rounded-full"
          onClick={() => fileInputRef.current?.click()}
        >
          <Paperclip className="h-5 w-5" />
          <span className="sr-only">Attach file</span>
        </Button>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />

        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 resize-none min-h-[60px]"
          rows={1}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
        />

        <Button
          type="submit"
          className="rounded-full h-10 w-10 p-0"
          disabled={(!message.trim() && !attachment) || mutation.isPending}
        >
          <Send className="h-5 w-5" />
          <span className="sr-only">Send</span>
        </Button>
      </div>
    </form>
  );
}
