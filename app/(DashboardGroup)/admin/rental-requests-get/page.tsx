"use client";

import React, { useEffect, useState } from "react";
import {
  ClipboardList,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  Calendar,
  Eye,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { toast } from "sonner";
import { getAllRentalRequest } from "../_action/rentalrequest";


interface Client {
  name?: string;
  email?: string;
}

interface Property {
  title?: string;
  location?: string;
}

interface RentalRequest {
  id: string;
  status: "ACTIVE" | "PENDING" | "REJECTED" | string;
  rentStartDate?: string;
  rentEndDate?: string;
  client?: Client;
  property?: Property;
}

export default function RentalRequestsPage() {
  const [requests, setRequests] = useState<RentalRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        const res = await getAllRentalRequest();
        if (res.success) {
          setRequests(Array.isArray(res.data) ? res.data : []);
        } else {
          toast.error(res.message || "Failed to fetch rental requests.");
        }
      } catch (error) {
        console.error("Error fetching rental requests:", error);
        toast.error("Something went wrong!");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const activeCount = requests.filter((item) => item.status === "ACTIVE").length;
  const pendingCount = requests.filter((item) => item.status === "PENDING").length;
  const rejectedCount = requests.filter((item) => item.status === "REJECTED").length;

  const filteredRequests = requests.filter((item) => {
    const matchesSearch =
      item.client?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.client?.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.property?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.property?.location?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      
      {/* 🌟 Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/20">
            <ClipboardList className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-2">
              Rental Requests
              <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
              Manage and review all property tenant applications
            </p>
          </div>
        </div>

        {/* Quick Stats Chips */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-2 sm:pb-0">
          <div className="px-3.5 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-2 shrink-0">
            <CheckCircle2 className="w-4 h-4" /> {activeCount} Active
          </div>
          <div className="px-3.5 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-bold flex items-center gap-2 shrink-0">
            <Clock className="w-4 h-4" /> {pendingCount} Pending
          </div>
          <div className="px-3.5 py-2 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-bold flex items-center gap-2 shrink-0">
            <XCircle className="w-4 h-4" /> {rejectedCount} Rejected
          </div>
        </div>
      </div>

      {/* 🌟 Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tenant or property..."
            className="h-11 pl-10 pr-4 rounded-xl border-slate-200 dark:border-slate-800 bg-white dark:bg-[#07090e] text-sm font-medium focus-visible:ring-2 focus-visible:ring-amber-500"
          />
        </div>

        {/* Status Filter Buttons */}
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {["ALL", "ACTIVE", "PENDING", "REJECTED"].map((status) => (
            <Button
              key={status}
              variant="outline"
              onClick={() => setStatusFilter(status)}
              className={`h-10 rounded-xl font-semibold capitalize ${
                statusFilter === status
                  ? "bg-amber-500 text-slate-950 font-bold border-amber-500 hover:bg-amber-600"
                  : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              {status.toLowerCase()}
            </Button>
          ))}
        </div>
      </div>

      {/* 🌟 Rental Requests Table Container */}
      <div className="bg-white dark:bg-[#07090e] border border-slate-200/80 dark:border-slate-800/80 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            {/* Table Header */}
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th className="py-4 px-6">Tenant Info</th>
                <th className="py-4 px-6">Requested Property</th>
                <th className="py-4 px-6">Rent Period</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-slate-200/70 dark:divide-slate-800/70 text-sm">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Loader2 className="w-6 h-6 animate-spin text-amber-500" />
                      <p className="text-xs font-medium">Loading rental requests...</p>
                    </div>
                  </td>
                </tr>
              ) : filteredRequests.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-500">
                    No rental requests found.
                  </td>
                </tr>
              ) : (
                filteredRequests.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-900/30 transition-colors group">
                    
                    {/* Tenant Info */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-amber-500/10 text-amber-600 font-bold flex items-center justify-center ring-2 ring-amber-500/30 shrink-0">
                          {item.client?.name ? item.client.name.charAt(0).toUpperCase() : "T"}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-amber-500 transition-colors">
                            {item.client?.name || "Unknown Tenant"}
                          </span>
                          <span className="text-xs text-slate-500 dark:text-slate-400">
                            {item.client?.email || "No email"}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Property Info */}
                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-800 dark:text-slate-200 line-clamp-1">
                          {item.property?.title || "Property Title"}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          {item.property?.location || "Location not specified"}
                        </span>
                      </div>
                    </td>

                    {/* Rent Period */}
                    <td className="py-4 px-6">
                      <div className="flex flex-col text-xs space-y-1">
                        <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-amber-500" /> 
                          {item.rentStartDate ? new Date(item.rentStartDate).toLocaleDateString() : "N/A"}
                        </span>
                        <span className="text-slate-400 font-medium">
                          To: {item.rentEndDate ? new Date(item.rentEndDate).toLocaleDateString() : "N/A"}
                        </span>
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-6">
                      {item.status === "ACTIVE" && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Active
                        </span>
                      )}
                      {item.status === "PENDING" && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                          <Clock className="w-3.5 h-3.5" /> Pending
                        </span>
                      )}
                      {item.status === "REJECTED" && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                          <XCircle className="w-3.5 h-3.5" /> Rejected
                        </span>
                      )}
                    </td>

                    {/* Action Buttons */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-9 w-9 rounded-xl hover:bg-amber-500/10 hover:text-amber-500 text-slate-500 cursor-pointer"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-9 w-9 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 cursor-pointer"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* 🌟 Table Pagination Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 font-medium">
          <span>Showing {filteredRequests.length} of {requests.length} requests</span>
          <div className="flex items-center gap-2">
            <Button size="icon" variant="outline" disabled className="h-8 w-8 rounded-lg">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button size="icon" variant="outline" disabled className="h-8 w-8 rounded-lg">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

    </div>
  );
}