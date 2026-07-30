"use client";

import Link from "next/link";
import { useState } from "react";
import { useTheme } from "next-themes";
import {
  Home,
  Building2,
  HelpCircle,
  LogOut,
  Settings,
  LayoutDashboard,
  Menu,
  X,
  Sun,
  Moon,
  ChartBarStacked,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import type { NavbarProps } from "@/lib/type";
import { logout } from "../service/logout";
import { toast } from "sonner";
import { useRouter } from "next/navigation"; // 'next/router' এর বদলে 'next/navigation' হবে
import { Button } from "../ui/button";

// UserDropdown কম্পোনেন্ট Navbar-এর বাইরে রাখা হয়েছে
function UserDropdown({ user }: NavbarProps) {
  const userRole = user?.data?.profile?.role;

  let dashboardUrl = "/";
  if (userRole === "TENANT") {
    dashboardUrl = "/tenant";
  } else if (userRole === "LANDLORD") {
    dashboardUrl = "/landlord";
  } else if (userRole === "ADMIN") {
    dashboardUrl = "/admin";
  }

  const router = useRouter();
  const handleUserMenuAction = async (action: string) => {
    if (action === "logout") {
      await logout();
      toast.success("User Logged Out Successfully!");
      router.push("/login");
    }
  };

  // return এর ভেতরের সিনট্যাক্স এরর ঠিক করা হয়েছে এবং user?.success দেওয়া হয়েছে
  return user?.success ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="group flex items-center gap-2 md:gap-3 rounded-full border border-amber-500/30 bg-gradient-to-r from-amber-500/10 to-transparent dark:to-slate-900 p-1 md:pr-3 transition-all duration-300 hover:border-amber-400 focus:outline-none"
          aria-label="User menu"
        >
          <div className="flex h-8 w-8 md:h-9 md:w-9 items-center justify-center rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 font-extrabold shadow-md">
            R
          </div>
          <div className="hidden md:flex flex-col items-start text-left">
            <span className="text-xs font-semibold text-slate-900 dark:text-white group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors">
              Account
            </span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 capitalize">
              {user?.data?.profile?.role}
            </span>
          </div>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-56 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 p-2 text-slate-800 dark:text-slate-200 shadow-2xl backdrop-blur-xl"
      >
        <DropdownMenuLabel className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          My Portal
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-slate-100 dark:bg-slate-800" />

        <DropdownMenuItem asChild>
          <Link
            href={dashboardUrl}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium cursor-pointer transition-colors hover:bg-amber-500/10 hover:text-amber-600 dark:hover:text-amber-400 focus:bg-amber-500/10"
          >
            <LayoutDashboard className="h-4 w-4 text-amber-500 dark:text-amber-400" />
            <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium cursor-pointer transition-colors hover:bg-amber-500/10 hover:text-amber-600 dark:hover:text-amber-400 focus:bg-amber-500/10">
          <Settings className="h-4 w-4 text-amber-500 dark:text-amber-400" />
          <span>Settings</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-slate-100 dark:bg-slate-800" />

        <DropdownMenuItem
          onClick={async () => {
            await handleUserMenuAction("logout");
          }}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-rose-500 dark:text-rose-400 cursor-pointer transition-colors hover:bg-rose-50 dark:hover:bg-rose-500/10"
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <Link href="/login">
      <Button>login</Button>
    </Link>
  );
}

export function Navbar({ user }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const navLinks = [
    { label: "Home", href: "/", icon: Home },
    { label: "Properties", href: "/properties", icon: Building2 },
    { label: "Categories", href: "/categories", icon: ChartBarStacked },
    { label: "How it Works", href: "/how-it-works", icon: HelpCircle },
    
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800/80 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* --- Premium Logo Section --- */}
          <Link
            href="/"
            className="group flex items-center gap-3 transition-transform duration-300 hover:scale-[1.02]"
          >
            <div className="relative flex h-10 w-10 md:h-11 md:w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/40 transition-all duration-300">
              <Home className="h-5 w-5 md:h-6 md:w-6 text-slate-950 stroke-[2.5]" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-300 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-400"></span>
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-none">
                Rent
                <span className="text-amber-500 dark:text-amber-400">Nest</span>
              </span>
              <span className="text-[9px] md:text-[10px] font-medium tracking-widest text-slate-500 dark:text-slate-400 uppercase mt-0.5">
                Marketplace
              </span>
            </div>
          </Link>

          {/* --- Navigation Links (Desktop) --- */}
          <nav className="hidden md:flex items-center gap-1 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950/50 p-1.5 shadow-inner">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 transition-all duration-200 hover:bg-white dark:hover:bg-slate-800 hover:text-amber-600 dark:hover:text-amber-400"
                >
                  <Icon className="h-4 w-4" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* --- Right Actions (Desktop) --- */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950/60 text-amber-500 dark:text-amber-400 transition-all duration-300 hover:border-amber-400 hover:scale-105 shadow-sm"
              title="Toggle Theme"
            >
              <Sun className="h-5 w-5 hidden dark:block text-amber-400" />
              <Moon className="h-5 w-5 block dark:hidden text-slate-700" />
            </button>

            {/* Profile Dropdown with user prop */}
            <UserDropdown user={user} />
          </div>

          {/* --- Mobile Actions (Toggle, Profile, Menu) --- */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950/60 text-amber-500 dark:text-amber-400"
            >
              <Sun className="h-4 w-4 hidden dark:block text-amber-400" />
              <Moon className="h-4 w-4 block dark:hidden text-slate-700" />
            </button>

            {/* Mobile Profile Avatar with user prop */}
            <UserDropdown user={user} />

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950/60 p-2 text-slate-700 dark:text-slate-300 transition-colors hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-amber-600 dark:hover:text-amber-400"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* --- Mobile Drawer Menu --- */}
      {isMobileMenuOpen && (
        <div className="border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 px-4 pt-2 pb-6 md:hidden">
          <div className="space-y-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium text-slate-700 dark:text-slate-300 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-amber-600 dark:hover:text-amber-400"
                >
                  <Icon className="h-5 w-5 text-amber-500 dark:text-amber-400" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
