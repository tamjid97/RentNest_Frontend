// app/(DashboardGroup)/_config/sidebarMenuItems.ts
import type { ISidebarItem } from "@/lib/type";
import {
  Building2,
  LayoutDashboard,
  Users,
  MessageSquare,
  ReceiptText,
  UserStar,
  SavePlus,
  GitPullRequestClosed,
} from "lucide-react";

export const TENANT_SIDEBAR_ITEMS : ISidebarItem[] = [
  { label: "Overview", href: "/tenant", icon: LayoutDashboard },
  { label: "My Rental Requests", href: "/tenant/get-my-rental-requests", icon: Building2 },
  { label: "Rental Request Details", href: "/tenant/Get-rental-request-details/id", icon:ReceiptText },
  { label: "Create Review", href: "/tenant/create-review", icon: UserStar },
];

export const LANDLORD_SIDEBAR_ITEMS : ISidebarItem[] = [
  { label: "Overview", href: "/landlord", icon: LayoutDashboard },
  { label: "Property Manage", href: "/landlord/property-manage", icon: Building2 },
  { label: "Rental Requests", href: "/landlord/rental-requests", icon: MessageSquare },
  
];

export const ADMIN_SIDEBAR_ITEMS : ISidebarItem[] = [
  { label: "Admin Overview", href: "/admin", icon: LayoutDashboard },
  { label: "All Properties", href: "/admin/propertieManage", icon: Building2 },
  { label: "Create Category", href: "/admin/creat-catagory", icon: SavePlus },
  { label: "Manage Users", href: "/admin/userControl", icon: Users },
  { label: "Rental Requests", href: "/admin/rental-requests-get", icon: GitPullRequestClosed },
  
];






export const sidebarMenuItems = {
  TENANT: TENANT_SIDEBAR_ITEMS,
  LANDLORD: LANDLORD_SIDEBAR_ITEMS,
  ADMIN: ADMIN_SIDEBAR_ITEMS,
};