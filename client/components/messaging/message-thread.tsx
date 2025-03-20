"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { formatRelative } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Paperclip, Download } from "lucide-react";
import { useInView } from "react-intersection-observer";

// Mock data - replace with actual API call
async function fetchMessages(userId: string) {
  // Example fetch
  // return await fetch(`/api/messages/${userId}`).then(res => res.json());

  // Mock data
  const otherUser = {
    id: userId,
    name:
      userId === "user1"
        ? "Jane Cooper"
        : userId === "user2"
        ? "Alex Thompson"
        : "Sarah Chen",
    role:
      userId === "user1" ? "Investor" : userId === "user2" ? "Startup" : "CFA",
    avatar: `/avatars/${
      userId === "user1"
        ? "jane-cooper"
        : userId === "user2"
        ? "alex-thompson"
        : "sarah-chen"
    }.png`,
  };

  const messages = [
    {
      id: "1",
      senderId: "currentUser",
      receiverId: userId,
      content: "Hello! I'm interested in learning more about your startup.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      read: true,
      attachment: null,
    },
    {
      id: "2",
      senderId: userId,
      receiverId: "currentUser",
      content:
        "Hi there! Thanks for reaching out. What specific aspects are you interested in?",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1.5).toISOString(),
      read: true,
      attachment: null,
    },
    {
      id: "3",
      senderId: "currentUser",
      receiverId: userId,
      content:
        "I'm particularly interested in your growth metrics and revenue model.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1).toISOString(),
      read: true,
      attachment: null,
    },
    {
      id: "4",
      senderId: userId,
      receiverId: "currentUser",
      content:
        "Perfect! I've attached our latest pitch deck with detailed growth metrics.",
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      read: true,
      attachment: {
        name: "GrowthMetrics_Q1_2025.pdf",
        url: "/files/sample-pitch-deck.pdf",
        size: "2.4 MB",
      },
    },
    {
      id: "5",
      senderId: "currentUser",
      receiverId: userId,
      content:
        "This looks promising. Can we schedule a call to discuss potential investment?",
      timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
      read: true,
      attachment: null,
    },
  ];

  return { otherUser, messages };
}

export default function MessageThread({ userId }: { userId: string }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["messages", userId],
    queryFn: () => fetchMessages(userId),
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { ref: observerRef, inView } = useInView();

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [data?.messages]);

  if (isLoading) {
    return <div className="p-4">Loading messages...</div>;
  }

  if (error || !data) {
    return <div className="p-4 text-red-500">Failed to load messages</div>;
  }

  const { otherUser, messages } = data;

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={otherUser.avatar} />
            <AvatarFallback>
              {otherUser.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-medium text-gray-900 dark:text-white">
              {otherUser.name}
            </h2>
            <Badge
              variant={
                otherUser.role === "Investor"
                  ? "default"
                  : otherUser.role === "Startup"
                  ? "secondary"
                  : "outline"
              }
            >
              {otherUser.role}
            </Badge>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div ref={observerRef}>
          {/* Mark as read when scrolled into view */}
        </div>

        {messages.map((message) => {
          const isOwnMessage = message.senderId === "currentUser";

          return (
            <div
              key={message.id}
              className={`flex ${
                isOwnMessage ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[75%] ${
                  isOwnMessage ? "order-2" : "order-1"
                }`}
              >
                {!isOwnMessage && (
                  <Avatar className="h-8 w-8 mb-1">
                    <AvatarImage src={otherUser.avatar} />
                    <AvatarFallback>
                      {otherUser.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                )}

                <div
                  className={`rounded-lg p-3 ${
                    isOwnMessage
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 dark:bg-gray-700 dark:text-white"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>

                  {message.attachment && (
                    <div
                      className={`mt-2 rounded p-2 flex items-center gap-2 ${
                        isOwnMessage
                          ? "bg-blue-700"
                          : "bg-gray-200 dark:bg-gray-600"
                      }`}
                    >
                      <Paperclip className="h-4 w-4" />
                      <span className="text-sm flex-1 truncate">
                        {message.attachment.name}
                      </span>
                      <span className="text-xs">{message.attachment.size}</span>
                      <button className="hover:text-blue-500">
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>

                <div
                  className={`text-xs text-gray-500 mt-1 ${
                    isOwnMessage ? "text-right" : "text-left"
                  }`}
                >
                  {formatRelative(new Date(message.timestamp), new Date())}
                  {isOwnMessage && message.read && (
                    <span className="ml-2">Read</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
