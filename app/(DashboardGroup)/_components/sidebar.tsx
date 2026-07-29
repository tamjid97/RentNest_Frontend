// app/(DashboardGroup)/_components/sidebar.tsx
"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LogOut, Menu, Building2 } from "lucide-react"

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



interface SidebarContentProps extends NavbarProps {
  pathname: string;
  setOpen?: (open: boolean) => void;
}

export default function SidebarContent({ user, pathname, setOpen }: SidebarContentProps) {
  let navItems: ISidebarItem[] = [];

const role =user?.data?.profile?.role;
console.log("Current User Role:", role);
  if (role === "TENANT") {
    navItems = sidebarMenuItems.TENANT;
  } else if (role === "LANDLORD") {
    navItems = sidebarMenuItems.LANDLORD;
  } else if (role === "ADMIN") {
    navItems = sidebarMenuItems.ADMIN;
  }

  return (
    <div className="flex flex-col h-full justify-between bg-white dark:bg-[#07090e] border-r border-slate-200 dark:border-slate-800/80">
      <div className="flex flex-col flex-1 overflow-y-auto">
        
        {/* 🌟 Brand Header */}
        <div className="p-5 border-b border-slate-200/80 dark:border-slate-800/80">
          <Link 
            href="/" 
            className="flex items-center gap-3 group" 
            onClick={() => setOpen?.(false)}
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform duration-200">
              <Building2 className="w-5 h-5 font-bold" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-slate-900 dark:text-slate-100 text-base tracking-tight group-hover:text-amber-500 transition-colors">
                UrbanNest
              </span>
              <span className="text-[11px] text-amber-600 dark:text-amber-400 font-medium flex items-center gap-1">
                ← Back to Website
              </span>
            </div>
          </Link>
        </div>

        {/* 🌟 Dynamic Navigation Links */}
        <div className="py-5 px-3">
          <div className="px-3 mb-2 text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
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
                          "mr-3 h-5 w-5 transition-colors", 
                          isActive ? "text-slate-950" : "text-slate-400 group-hover:text-amber-500"
                        )} 
                      />
                    )}
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* 🌟 Logout Button */}
      <div className="border-t border-slate-200/80 p-4 dark:border-slate-800/80">
        <Button 
          variant="ghost" 
          className="w-full justify-start rounded-xl text-rose-600 hover:bg-rose-50 hover:text-rose-700 dark:text-rose-400 dark:hover:bg-rose-950/30 dark:hover:text-rose-300 font-medium"
        >
          <LogOut className="mr-3 h-5 w-5" />
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
      {/* 📱 1. Mobile Topbar Header */}
      <div className="flex h-16 w-full items-center justify-between border-b border-slate-200/80 bg-white/80 px-4 dark:border-slate-800/80 dark:bg-[#07090e]/90 backdrop-blur-md md:hidden sticky top-0 z-40">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20">
            <Building2 className="h-5 w-5" />
          </div>
          <span className="font-extrabold text-slate-900 dark:text-slate-100 text-base">
            UrbanNest
          </span>
        </Link>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-slate-700 dark:text-slate-200 hover:bg-amber-500/10">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-72 bg-white dark:bg-[#07090e] border-r border-slate-200 dark:border-slate-800">
            <SheetHeader className="sr-only">
              <SheetTitle>Navigation Menu</SheetTitle>
            </SheetHeader>
            <SidebarContent pathname={pathname} user={user} setOpen={setOpen} />
          </SheetContent>
        </Sheet>
      </div>

      {/* 💻 2. Desktop Fixed Sidebar */}
      <aside className="hidden h-screen w-64 md:flex flex-col fixed left-0 top-0 z-30">
        <SidebarContent pathname={pathname} user={user} />
      </aside>
    </>
  );
}