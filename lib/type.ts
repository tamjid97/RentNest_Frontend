// lib/type.ts
import { LucideIcon } from "lucide-react";

export interface ISidebarItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export interface NavbarProps {
  user?: {
    data?: {
      role?: string;
      name?: string;
    };
  };
}