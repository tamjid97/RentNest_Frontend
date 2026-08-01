
import type { ISidebarItem } from "@/lib/type";
import {
  Building2,
  LayoutDashboard,
  Users,
  MessageSquare,
  SavePlus,
  GitPullRequestClosed,
  Receipt,
} from "lucide-react";

export const TENANT_SIDEBAR_ITEMS : ISidebarItem[] = [
  { label: "Overview", href: "/tenant", icon: LayoutDashboard },
  { label: "My Rental Requests", href: "/tenant/get-my-rental-requests", icon: Building2 },
  { label: "Payment History", href: "/tenant/payments", icon: Receipt },

];

export const LANDLORD_SIDEBAR_ITEMS : ISidebarItem[] = [
  { label: "Overview", href: "/landlord", icon: LayoutDashboard },
  { label: "Property Manage", href: "/landlord/property-manage", icon: Building2 },
  { label: "Rental Requests", href: "/landlord/rental-requests", icon: MessageSquare },
  
];

export const ADMIN_SIDEBAR_ITEMS : ISidebarItem[] = [
  { label: "Admin Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Create Category", href: "/admin/creat-catagory", icon: SavePlus },
  { label: "All Properties", href: "/admin/propertieManage", icon: Building2 },
  { label: "Manage Users", href: "/admin/userControl", icon: Users },
  { label: "Rental Requests", href: "/admin/rental-requests-get", icon: GitPullRequestClosed },
  
];






export const sidebarMenuItems = {
  TENANT: TENANT_SIDEBAR_ITEMS,
  LANDLORD: LANDLORD_SIDEBAR_ITEMS,
  ADMIN: ADMIN_SIDEBAR_ITEMS,
};