import { Metadata } from "next";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Bell,
  CreditCard,
  Key,
  Lock,
  User as UserIcon,
  UserX,
} from "lucide-react";
import { SettingsForm } from "@/components/settings/settings-form";

export const metadata: Metadata = {
  title: "Settings | FludingNext",
  description: "Manage your account settings and preferences",
};

export default function SettingsPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your account settings and preferences
          </p>
        </div>

        <Separator />

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <UserIcon className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              Security
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="flex items-center gap-2"
            >
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="payment" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Payment Methods
            </TabsTrigger>
            <TabsTrigger value="api" className="flex items-center gap-2">
              <Key className="h-4 w-4" />
              API Keys
            </TabsTrigger>
            <TabsTrigger value="delete" className="flex items-center gap-2">
              <UserX className="h-4 w-4" />
              Delete Account
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <SettingsForm type="profile" />
          </TabsContent>

          <TabsContent value="security">
            <SettingsForm type="security" />
          </TabsContent>

          <TabsContent value="notifications">
            <SettingsForm type="notifications" />
          </TabsContent>

          <TabsContent value="payment">
            <SettingsForm type="payment" />
          </TabsContent>

          <TabsContent value="api">
            <SettingsForm type="api" />
          </TabsContent>

          <TabsContent value="delete">
            <SettingsForm type="delete" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
