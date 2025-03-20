"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Send } from "lucide-react";

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState<string | null>("1");

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Contacts Sidebar */}
      <Card className="w-80 border-r">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search messages..." className="pl-8" />
          </div>
        </div>
        <ScrollArea className="h-[calc(100vh-8rem)]">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className={`p-4 cursor-pointer hover:bg-accent ${
                selectedChat === contact.id ? "bg-accent" : ""
              }`}
              onClick={() => setSelectedChat(contact.id)}
            >
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={contact.avatar} />
                  <AvatarFallback>{contact.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">{contact.name}</p>
                  <p className="text-sm text-muted-foreground">{contact.lastMessage}</p>
                </div>
                <div className="text-xs text-muted-foreground">{contact.time}</div>
              </div>
            </div>
          ))}
        </ScrollArea>
      </Card>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={contacts.find(c => c.id === selectedChat)?.avatar} />
                  <AvatarFallback>
                    {contacts.find(c => c.id === selectedChat)?.name[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">
                    {contacts.find(c => c.id === selectedChat)?.name}
                  </p>
                  <p className="text-sm text-muted-foreground">Active now</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === "me" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        message.sender === "me"
                          ? "bg-primary text-primary-foreground"
                          : "bg-accent"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs mt-1 opacity-70">{message.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <Input placeholder="Type a message..." />
                <Button size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-muted-foreground">Select a conversation to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
}

const contacts = [
  {
    id: "1",
    name: "Sarah Thompson",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    lastMessage: "Looking forward to discussing the investment opportunity",
    time: "2m ago",
  },
  {
    id: "2",
    name: "Michael Chen",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    lastMessage: "The pitch deck looks promising",
    time: "1h ago",
  },
  {
    id: "3",
    name: "Emma Williams",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    lastMessage: "Can we schedule a call tomorrow?",
    time: "2h ago",
  },
];

const messages = [
  {
    id: "1",
    content: "Hi Sarah, I reviewed your startup's financial projections",
    sender: "me",
    time: "10:30 AM",
  },
  {
    id: "2",
    content: "Thanks for the quick review! What are your thoughts?",
    sender: "other",
    time: "10:32 AM",
  },
  {
    id: "3",
    content: "The growth metrics look solid. I'd like to discuss the market expansion strategy in more detail.",
    sender: "me",
    time: "10:33 AM",
  },
  {
    id: "4",
    content: "Perfect! Would you be available for a call tomorrow at 2 PM?",
    sender: "other",
    time: "10:35 AM",
  },
];