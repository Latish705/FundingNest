import { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import MessageThread from "@/components/messaging/message-thread";
import MessageComposer from "@/components/messaging/message-composer";
import { MessageThreadSkeleton } from "@/components/skeletons/message-skeletons";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Conversation | Startup Dashboard",
  description: "Chat with investors and advisors",
};

export default function StartupConversationPage({
  params,
}: {
  params: { userId: string };
}) {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center">
          <Link
            href="/startup/messages"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to all messages
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md h-[calc(100vh-220px)] flex flex-col">
          <Suspense fallback={<MessageThreadSkeleton />}>
            <MessageThread userId={params.userId} />
          </Suspense>
          <MessageComposer receiverId={params.userId} />
        </div>
      </div>
    </div>
  );
}
