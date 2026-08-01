"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Users,
  Sparkles,
  Search,
  Shield,
  UserCheck,
  UserX,
  Mail,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Lock,
  Unlock,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getAllUsers, updateUserStatus, type UserItem } from "../_action/userAction";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);


  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "ACTIVE" | "BANNED">("ALL");

  useEffect(() => {
    let isMounted = true;

    const fetchUsers = async () => {
      try {
        const res = await getAllUsers();
        if (isMounted && res.success && res.data) {
          let extractedData: UserItem[] = [];

          if (Array.isArray(res.data)) {
            extractedData = res.data;
          } else if (typeof res.data === "object" && res.data !== null && "data" in res.data) {
            const dataObj = res.data as { data: UserItem[] };
            if (Array.isArray(dataObj.data)) {
              extractedData = dataObj.data;
            }
          } else if (typeof res.data === "object" && res.data !== null && "id" in res.data) {
            extractedData = [res.data as UserItem];
          }

          setUsers(extractedData);
        }
      } catch (error) {
        console.error("Failed to load users:", error);
        if (isMounted) setUsers([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchUsers();

    return () => {
      isMounted = false;
    };
  }, []);


  const handleStatusToggle = async (userId: string, currentStatus: string) => {
    setActionLoadingId(userId);
    
    const isCurrentlyActive = currentStatus?.toUpperCase() === "ACTIVE";

    const nextStatus = isCurrentlyActive ? "BANNED" : "ACTIVE"; 

    try {
      const res = await updateUserStatus(userId, nextStatus);
      if (res.success) {
        setUsers((prevUsers) =>
          prevUsers.map((u) =>
            u.id === userId
              ? { ...u, activeStatus: nextStatus as "ACTIVE" | "BANNED" }
              : u
          )
        );
      } else {
        alert(res.message || "Failed to update user status.");
      }
    } catch (error) {
      console.error("Error updating user status:", error);
    } finally {
      setActionLoadingId(null);
    }
  };


  const totalUsers = users.length;
  const activeUsers = useMemo(
    () => users.filter((u) => u.activeStatus?.toUpperCase() === "ACTIVE").length,
    [users]
  );
  const bannedUsers = useMemo(
    () => users.filter((u) => u.activeStatus?.toUpperCase() === "BANNED").length,
    [users]
  );


  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase());

      const userStatus = (user.activeStatus || "").toUpperCase();
      const matchesFilter =
        statusFilter === "ALL" ||
        (statusFilter === "ACTIVE" && userStatus === "ACTIVE") ||
        (statusFilter === "BANNED" && userStatus === "BANNED");

      return matchesSearch && matchesFilter;
    });
  }, [users, searchTerm, statusFilter]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* 🌟 Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/20">
            <Users className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-2">
              User Management
              <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
              Monitor system users, manage roles, and update account statuses
            </p>
          </div>
        </div>

        {/* Quick Stats Chips */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-2 sm:pb-0">
          <div className="px-3.5 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-bold flex items-center gap-2 shrink-0">
            <Users className="w-4 h-4" /> Total: {totalUsers}
          </div>
          <div className="px-3.5 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-2 shrink-0">
            <UserCheck className="w-4 h-4" /> Active: {activeUsers}
          </div>
          <div className="px-3.5 py-2 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-bold flex items-center gap-2 shrink-0">
            <UserX className="w-4 h-4" /> Banned: {bannedUsers}
          </div>
        </div>
      </div>

      {/* 🌟 Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-11 pl-10 pr-4 rounded-xl border-slate-200 dark:border-slate-800 bg-white dark:bg-[#07090e] text-sm font-medium focus-visible:ring-2 focus-visible:ring-amber-500"
          />
        </div>

        {/* Status Filter Buttons */}
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <Button
            onClick={() => setStatusFilter("ALL")}
            variant="outline"
            className={`h-10 rounded-xl font-bold transition-all ${
              statusFilter === "ALL"
                ? "bg-amber-500 text-slate-950 border-amber-500 hover:bg-amber-600"
                : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            All Users
          </Button>
          <Button
            onClick={() => setStatusFilter("ACTIVE")}
            variant="outline"
            className={`h-10 rounded-xl font-semibold transition-all ${
              statusFilter === "ACTIVE"
                ? "bg-amber-500 text-slate-950 border-amber-500 hover:bg-amber-600"
                : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            Active
          </Button>
          <Button
            onClick={() => setStatusFilter("BANNED")}
            variant="outline"
            className={`h-10 rounded-xl font-semibold transition-all ${
              statusFilter === "BANNED"
                ? "bg-amber-500 text-slate-950 border-amber-500 hover:bg-amber-600"
                : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            Banned
          </Button>
        </div>
      </div>

      {/* 🌟 Users Table Container */}
      <div className="bg-white dark:bg-[#07090e] border border-slate-200/80 dark:border-slate-800/80 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden">
        {loading ? (
          <div className="p-16 flex flex-col items-center justify-center text-slate-500 space-y-3">
            <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
            <p className="text-sm font-semibold">Loading users from API...</p>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="p-16 text-center text-slate-500 dark:text-slate-400">
            <Users className="w-10 h-10 mx-auto text-slate-300 dark:text-slate-700 mb-2" />
            <p className="text-base font-bold">No users found</p>
            <p className="text-xs text-slate-400 mt-1">Try searching with a different term or filter.</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                {/* Table Header */}
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    <th className="py-4 px-6">User Profile</th>
                    <th className="py-4 px-6">Role</th>
                    <th className="py-4 px-6">Joined Date</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6 text-right">Action (Ban / Unban)</th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody className="divide-y divide-slate-200/70 dark:divide-slate-800/70 text-sm">
                  {filteredUsers.map((user) => {
                    const currentStatus = user.activeStatus || "UNKNOWN";
                    const isActive = currentStatus.toUpperCase() === "ACTIVE";
                    const roleUpper = user.role ? user.role.toUpperCase() : "USER";

                    const joinedDate = user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                      : "N/A";

                    const initialLetter = user.name ? user.name.charAt(0).toUpperCase() : "U";

                    return (
                      <tr
                        key={user.id}
                        className="hover:bg-slate-50/60 dark:hover:bg-slate-900/30 transition-colors group"
                      >
                        {/* User Profile Info */}
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            {user.profilePhoto ? (
                              <img
                                src={user.profilePhoto}
                                alt={user.name}
                                className="w-10 h-10 rounded-full object-cover ring-2 ring-amber-500/30"
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 flex items-center justify-center font-bold text-sm ring-2 ring-amber-500/30 shrink-0">
                                {initialLetter}
                              </div>
                            )}

                            <div className="flex flex-col">
                              <span className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-amber-500 transition-colors">
                                {user.name || "Unnamed User"}
                              </span>
                              <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                                <Mail className="w-3 h-3 text-amber-500" /> {user.email}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Role Badge */}
                        <td className="py-4 px-6">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-extrabold tracking-wide ${
                              roleUpper === "ADMIN"
                                ? "bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20"
                                : roleUpper === "LANDLORD"
                                ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                                : "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20"
                            }`}
                          >
                            <Shield className="w-3 h-3" /> {roleUpper}
                          </span>
                        </td>

                        {/* Joined Date */}
                        <td className="py-4 px-6">
                          <span className="text-xs font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-amber-500" /> {joinedDate}
                          </span>
                        </td>

                        {/* Status Badge */}
                        <td className="py-4 px-6">
                          {isActive ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                              <UserCheck className="w-3.5 h-3.5" /> Active
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                              <UserX className="w-3.5 h-3.5" /> Banned
                            </span>
                          )}
                        </td>

                        {/* Ban / Unban Action Buttons */}
                        <td className="py-4 px-6 text-right">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleStatusToggle(user.id, currentStatus)}
                            disabled={actionLoadingId === user.id}
                            className={`h-9 px-3 rounded-xl font-bold text-xs transition-all duration-200 ${
                              isActive
                                ? "border-rose-500/30 text-rose-600 dark:text-rose-400 hover:bg-rose-500 hover:text-white"
                                : "border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500 hover:text-white"
                            }`}
                          >
                            {actionLoadingId === user.id ? (
                              <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                            ) : isActive ? (
                              <Lock className="w-3.5 h-3.5 mr-1.5" />
                            ) : (
                              <Unlock className="w-3.5 h-3.5 mr-1.5" />
                            )}
                            {isActive ? "Ban User" : "Unban User"}
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* 🌟 Pagination Footer */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>
                Showing 1 to {filteredUsers.length} of {totalUsers} users
              </span>
              <div className="flex items-center gap-2">
                <Button size="icon" variant="outline" disabled className="h-8 w-8 rounded-lg">
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="outline" disabled className="h-8 w-8 rounded-lg">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}