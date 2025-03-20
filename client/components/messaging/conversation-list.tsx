"use client";

import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Search } from "lucide-react";

// Mock data - replace with actual API call
async function fetchConversations() {
  // Example fetch that would be implemented for production
  // return await fetch('/api/messages/conversations').then(res => res.json());

  // Mock data for development
  return [
    {
      id: "1",
      userId: "user1",
      name: "Jane Cooper",
      role: "Investor",
      avatar: "/avatars/jane-cooper.png",
      lastMessage: "I'm interested in your startup's latest funding round.",
      timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
      unread: 2,
    },
    {
      id: "2",
      userId: "user2",
      name: "Alex Thompson",
      role: "Startup",
      avatar: "/avatars/alex-thompson.png",
      lastMessage:
        "Thanks for your interest! When would you like to schedule a call?",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
      unread: 0,
    },
    {
      id: "3",
      userId: "user3",
      name: "Sarah Chen",
      role: "CFA",
      avatar: "/avatars/sarah-chen.png",
      lastMessage:
        "I've reviewed your financial statements and have some recommendations.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      unread: 1,
    },
  ];
}

export default function ConversationList() {
  const pathname = usePathname();
  const basePath = `/${pathname.split("/")[1]}/messages`;

  const {
    data: conversations,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["conversations"],
    queryFn: fetchConversations,
  });

  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[300px]" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="p-4 text-red-500">Failed to load conversations</div>;
  }

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          />
        </div>
      </div>

      {conversations?.length === 0 ? (
        <div className="p-8 text-center text-gray-500">
          <p>No conversations yet</p>
        </div>
      ) : (
        <div>
          {conversations?.map((conversation) => (
            <Link
              key={conversation.id}
              href={`${basePath}/${conversation.userId}`}
              className="block p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            >
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={conversation.avatar} />
                  <AvatarFallback>
                    {conversation.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900 dark:text-white truncate">
                      {conversation.name}
                    </h3>
                    <span className="text-xs text-gray-500">
                      {formatDistanceToNow(new Date(conversation.timestamp), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>

                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                    {conversation.lastMessage}
                  </p>

                  <div className="mt-1 flex items-center gap-2">
                    <Badge
                      variant={
                        conversation.role === "Investor"
                          ? "default"
                          : conversation.role === "Startup"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {conversation.role}
                    </Badge>

                    {conversation.unread > 0 && (
                      <Badge
                        variant="destructive"
                        className="rounded-full px-2 py-1 text-xs"
                      >
                        {conversation.unread}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
