// app/(DashboardGroup)/_config/sidebarMenuItems.ts
import type { ISidebarItem } from "@/lib/type";
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

export const TENANT_SIDEBAR_ITEMS: ISidebarItem[] = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Saved Properties", href: "/dashboard/saved", icon: Heart },
  { label: "My Inquiries", href: "/dashboard/inquiries", icon: MessageSquare },
  { label: "Account Settings", href: "/dashboard/settings", icon: Settings },
];

export const LANDLORD_SIDEBAR_ITEMS: ISidebarItem[] = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "My Properties", href: "/dashboard/properties", icon: Building2 },
  { label: "Add Property", href: "/dashboard/add-property", icon: PlusCircle },
  { label: "Inquiries", href: "/dashboard/inquiries", icon: MessageSquare },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export const ADMIN_SIDEBAR_ITEMS: ISidebarItem[] = [
  { label: "Admin Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "All Properties", href: "/dashboard/all-properties", icon: Building2 },
  { label: "Manage Users", href: "/dashboard/users", icon: Users },
  { label: "Approvals", href: "/dashboard/approvals", icon: Shield },
  { label: "Reports & Logs", href: "/dashboard/reports", icon: FileText },
  { label: "System Settings", href: "/dashboard/settings", icon: Settings },
];

export const sidebarMenuItems = {
  TENANT: TENANT_SIDEBAR_ITEMS,
  LANDLORD: LANDLORD_SIDEBAR_ITEMS,
  ADMIN: ADMIN_SIDEBAR_ITEMS,
};