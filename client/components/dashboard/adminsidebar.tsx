"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  Building2,
  CircleDollarSign,
  Gavel,
  Home,
  MessageSquare,
  Settings,
  Users,
} from "lucide-react";

const investorRoutes = [
  {
    label: "Dashboard",
    icon: Home,
    href: "/user/dashboard",
  },
  {
    label: "Startups",
    icon: Building2,
    href: "/user/startups",
  },
  {
    label: "Portfolio",
    icon: BarChart3,
    href: "/user/portfolio",
  },
  {
    label: "Bids",
    icon: Gavel,
    href: "/user/bids",
  },
  {
    label: "Messages",
    icon: MessageSquare,
    href: "/user/messages",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/user/settings",
  },
];

const startupRoutes = [
  {
    label: "Dashboard",
    icon: Home,
    href: "/startup/dashboard",
  },
  {
    label: "Company Profile",
    icon: Building2,
    href: "/startup/manage",
  },
  {
    label: "Funding",
    icon: CircleDollarSign,
    href: "/startup/funding",
  },
  {
    label: "Investors",
    icon: Users,
    href: "/startup/investors",
  },
  {
    label: "Messages",
    icon: MessageSquare,
    href: "/startup/messages",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/startup/settings",
  },
];

const advisorRoutes = [
  {
    label: "Dashboard",
    icon: Home,
    href: "admin/dashboard",
  },
  {
    label: "Startups",
    icon: Building2,
    href: "admin/cfa/startups",
  },
  {
    label: "Certifications",
    icon: Users,
    href: "admin/cfa/certifications",
  },
  {
    label: "Messages",
    icon: MessageSquare,
    href: "admin/messages",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "admin/settings",
  },
];

interface SidebarProps {
  userRole?: "investor" | "startup" | "advisor";
}

export function AdminSidebar({ userRole = "investor" }: SidebarProps) {
  const pathname = usePathname();
  const routes =
    userRole === "startup"
      ? startupRoutes
      : userRole === "advisor"
      ? advisorRoutes
      : investorRoutes;

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-muted/50">
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold">Navigation</h2>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center gap-x-2 px-4 py-2 text-sm font-medium rounded-lg hover:bg-muted transition-colors",
                pathname === route.href ? "bg-muted" : "transparent"
              )}
            >
              <route.icon className="w-4 h-4" />
              {route.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
