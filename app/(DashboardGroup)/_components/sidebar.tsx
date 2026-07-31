// app/(DashboardGroup)/_components/sidebar.tsx
"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { LogOut, Menu, Home } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import type { ISidebarItem, NavbarProps } from "@/lib/type"
import { sidebarMenuItems } from "../_config/sidebarManuitems"

import { toast } from "sonner"
import { logout } from "@/components/service/logout"

interface SidebarContentProps extends NavbarProps {
  pathname: string;
  setOpen?: (open: boolean) => void;
}

export default function SidebarContent({ user, pathname, setOpen }: SidebarContentProps) {
  const router = useRouter();
  let navItems: ISidebarItem[] = [];

  const role = user?.data?.profile?.role;
  
  if (role === "TENANT") {
    navItems = sidebarMenuItems.TENANT;
  } else if (role === "LANDLORD") {
    navItems = sidebarMenuItems.LANDLORD;
  } else if (role === "ADMIN") {
    navItems = sidebarMenuItems.ADMIN;
  }

  const handleLogout = async () => {
    await logout();
    toast.success("User Logged Out Successfully!");
    router.push("/login");
  };

  return (
    <div className="flex flex-col h-full w-full justify-between bg-white dark:bg-[#07090e] border-r border-slate-200 dark:border-slate-800/80">
      <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
        
        {/* 🌟 Brand Header */}
        <div className="p-5 border-b border-slate-200/80 dark:border-slate-800/80 shrink-0">
          <Link
            href="/"
            className="group flex items-center gap-3 transition-transform duration-300 hover:scale-[1.02]"
            onClick={() => setOpen?.(false)}
          >
            <div className="relative flex h-10 w-10 lg:h-11 lg:w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/40 transition-all duration-300 shrink-0">
              <Home className="h-5 w-5 lg:h-6 lg:w-6 text-slate-950 stroke-[2.5]" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-300 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-400"></span>
              </span>
            </div>
            <div className="flex flex-col justify-center min-w-0">
              <span className="text-xl lg:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-none mb-1 truncate">
                Rent<span className="text-amber-500 dark:text-amber-400">Nest</span>
              </span>
              <span className="text-[10px] sm:text-[11px] text-amber-600 dark:text-amber-400 font-medium flex items-center gap-1 group-hover:text-amber-500 transition-colors truncate">
                ← Back to Website
              </span>
            </div>
          </Link>
        </div>

        {/* 🌟 Dynamic Navigation Links */}
        <div className="py-5 px-3">
          <div className="px-3 mb-3 text-[10px] sm:text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            {role ? `${role} MENU` : "MENU"}
          </div>
          <nav className="grid gap-1.5">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link key={item.href} href={item.href} onClick={() => setOpen?.(false)}>
                  <span
                    className={cn(
                      "group flex items-center rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20"
                        : "text-slate-600 hover:bg-amber-500/10 hover:text-amber-600 dark:text-slate-400 dark:hover:bg-amber-500/10 dark:hover:text-amber-400"
                    )}
                  >
                    {Icon && (
                      <Icon 
                        className={cn(
                          "mr-3 h-5 w-5 shrink-0 transition-colors", 
                          isActive ? "text-slate-950" : "text-slate-400 group-hover:text-amber-500"
                        )} 
                      />
                    )}
                    <span className="truncate">{item.label}</span>
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* 🌟 Logout Button */}
      <div className="border-t border-slate-200/80 p-4 dark:border-slate-800/80 shrink-0">
        <Button 
          variant="ghost" 
          onClick={handleLogout}
          className="w-full justify-start rounded-xl text-rose-600 hover:bg-rose-50 hover:text-rose-700 dark:text-rose-400 dark:hover:bg-rose-950/30 dark:hover:text-rose-300 font-medium cursor-pointer"
        >
          <LogOut className="mr-3 h-5 w-5 shrink-0" />
          Logout
        </Button>
      </div>
    </div>
  );
}

export function Sidebar({ user }: NavbarProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* 📱 1. Mobile & Tablet Topbar Header (Visible up to lg) */}
      <div className="flex h-16 w-full items-center justify-between border-b border-slate-200/80 bg-white/80 px-4 dark:border-slate-800/80 dark:bg-[#07090e]/90 backdrop-blur-md lg:hidden sticky top-0 z-50 shadow-sm">
        <Link
          href="/"
          className="group flex items-center gap-2.5 transition-transform duration-300 hover:scale-[1.02]"
        >
          <div className="relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/40 transition-all duration-300 shrink-0">
            <Home className="h-4 w-4 sm:h-5 sm:w-5 text-slate-950 stroke-[2.5]" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5 sm:h-3 sm:w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-300 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-full w-full bg-amber-400"></span>
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-none">
              Rent<span className="text-amber-500 dark:text-amber-400">Nest</span>
            </span>
          </div>
        </Link>

        {/* Hamburger Menu Drawer */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-slate-700 dark:text-slate-200 hover:bg-amber-500/10 shrink-0">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-[280px] sm:w-72 bg-white dark:bg-[#07090e] border-r border-slate-200 dark:border-slate-800">
            <SheetHeader className="sr-only">
              <SheetTitle>Navigation Menu</SheetTitle>
            </SheetHeader>
            <SidebarContent pathname={pathname} user={user} setOpen={setOpen} />
          </SheetContent>
        </Sheet>
      </div>

      {/* 💻 2. Desktop Fixed Sidebar (Visible from lg and up) */}
      <aside className="hidden h-screen w-64 lg:flex flex-col fixed left-0 top-0 z-40 bg-white dark:bg-[#07090e] shadow-[1px_0_15px_rgba(0,0,0,0.03)] dark:shadow-none">
        <SidebarContent pathname={pathname} user={user} />
      </aside>
    </>
  );
}