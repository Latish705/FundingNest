import { Metadata } from "next";
import { Suspense } from "react";
import ConversationList from "@/components/messaging/conversation-list";
import { MessagePageSkeleton } from "@/components/skeletons/message-skeletons";

export const metadata: Metadata = {
  title: "Messages | Startup Dashboard",
  description: "View and manage your conversations with investors",
};

export default function StartupMessagesPage() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Messages</h2>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <Suspense fallback={<MessagePageSkeleton />}>
            <ConversationList />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
