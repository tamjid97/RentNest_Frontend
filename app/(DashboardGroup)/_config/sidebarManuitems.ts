// app/(DashboardGroup)/_config/sidebarManuitems.ts
import {
  Building2,
  Heart,
  LayoutDashboard,
  PlusCircle,
  Users,
  FileText,
  Settings,
  MessageSquare,
  Shield,
} from "lucide-react";
import type { ISidebarItem } from "@/lib/type";

export const sidebarMenuItems: Record<string, ISidebarItem[]> = {
  USER: [
    { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { label: "Saved Properties", href: "/dashboard/saved", icon: Heart },
    { label: "My Inquiries", href: "/dashboard/inquiries", icon: MessageSquare },
    { label: "Account Settings", href: "/dashboard/settings", icon: Settings },
  ],
  MODERATOR: [
    { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { label: "My Listings", href: "/dashboard/properties", icon: Building2 },
    { label: "Add Property", href: "/dashboard/add-property", icon: PlusCircle },
    { label: "Inquiries", href: "/dashboard/inquiries", icon: MessageSquare },
    { label: "Settings", href: "/dashboard/settings", icon: Settings },
  ],
  ADMIN: [
    { label: "Admin Overview", href: "/dashboard", icon: LayoutDashboard },
    { label: "All Properties", href: "/dashboard/all-properties", icon: Building2 },
    { label: "Manage Users", href: "/dashboard/users", icon: Users },
    { label: "Approvals", href: "/dashboard/approvals", icon: Shield },
    { label: "Reports & Logs", href: "/dashboard/reports", icon: FileText },
    { label: "System Settings", href: "/dashboard/settings", icon: Settings },
  ],
};