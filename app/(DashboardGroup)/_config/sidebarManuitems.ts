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

export const TENANT_SIDEBAR_ITEMS : ISidebarItem[] = [
  { label: "Overview", href: "/tenant", icon: LayoutDashboard },
  { label: "Saved Properties", href: "/tenant/saved", icon: Heart },
  { label: "My Inquiries", href: "/tenant/inquiries", icon: MessageSquare },
  { label: "Account Settings", href: "/tenant/settings", icon: Settings },
];

export const LANDLORD_SIDEBAR_ITEMS : ISidebarItem[] = [
  { label: "Overview", href: "/landlord", icon: LayoutDashboard },
  { label: "My Properties", href: "/landlord/properties", icon: Building2 },
  { label: "Add Property", href: "/landlord/add-property", icon: PlusCircle },
  { label: "Inquiries", href: "/landlord/inquiries", icon: MessageSquare },
  { label: "Settings", href: "/landlord/settings", icon: Settings },
];

export const ADMIN_SIDEBAR_ITEMS : ISidebarItem[] = [
  { label: "Admin Overview", href: "/admin", icon: LayoutDashboard },
  { label: "All Properties", href: "/admin/all-properties", icon: Building2 },
  { label: "Manage Users", href: "/admin/users", icon: Users },
  { label: "Approvals", href: "/admin/approvals", icon: Shield },
  { label: "Reports & Logs", href: "/admin/reports", icon: FileText },
  { label: "System Settings", href: "/admin/settings", icon: Settings },
];






export const sidebarMenuItems = {
  TENANT: TENANT_SIDEBAR_ITEMS,
  LANDLORD: LANDLORD_SIDEBAR_ITEMS,
  ADMIN: ADMIN_SIDEBAR_ITEMS,
};