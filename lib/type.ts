import type { LucideProps } from "lucide-react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";

export type ISidebarItem = {
    label: string,
    href: string,
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
}

export type IUser = {
  success: boolean;
  statusCode?: number;
  message: string;
  data: {
    profile: {
      id: string;
      name: string;
      email: string;
      role: string;
      profilePhoto?: string | null;
      activeStatus?: string;
      createdAt?: string;
      updatedAt?: string;
    };
  };
};

export interface NavbarProps {
  user?: IUser;
}