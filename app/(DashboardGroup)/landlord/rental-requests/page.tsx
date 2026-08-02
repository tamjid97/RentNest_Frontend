"use client";

import React, { useState, useEffect, useTransition } from "react";
import {
  ClipboardList,
  Sparkles,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  Calendar,
  Mail,
  Phone,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  getLandlordRentalRequestsAction, 
  updateRentalRequestStatusAction 
} from "../_action/rentalAction";
import { toast } from "sonner";

// 🌟 ব্যাকএন্ডের জেসন স্ট্রাকচার অনুযায়ী সঠিক টাইপ ডিফিনিশন
export interface Client {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  profilePhoto?: string | null;
}

export interface Property {
  id: string;
  title?: string;
  description?: string;
  location?: string;
  price?: number;
  image?: string;
}

export interface RentalRequest {
  id: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  rentStartDate?: string;
  rentEndDate?: string;
  client?: Client;
  property?: Property;
}

export default function LandlordRentalRequestsPage() {
  const [requests, setRequests] = useState<RentalRequest[]>([]);
  const [isLoadingList, setIsLoadingList] = useState(true);
  const [activeTab, setActiveTab] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [isPending, startTransition] = useTransition();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  // পেজ লোড হওয়ার সাথে সাথে ব্যাকএন্ড থেকে রিয়েল ডেটা ফেচ করা
  useEffect(() => {
    async function fetchRequests() {
      setIsLoadingList(true);
      try {
        const result = await getLandlordRentalRequestsAction();
        if (result?.success && result?.data) {
          setRequests(Array.isArray(result.data) ? (result.data as RentalRequest[]) : []);
        } else {
          setRequests([]);
        }
      } catch {
        setRequests([]);
        toast.error("Failed to load rental requests.");
      } finally {
        setIsLoadingList(false);
      }
    }
    fetchRequests();
  }, []);

  // রিকোয়েস্ট স্ট্যাটাস আপডেট হ্যান্ডলার (Approve / Reject) with Toast
  const handleStatusUpdate = (id: string, newStatus: "APPROVED" | "REJECTED") => {
    setLoadingId(id);
    startTransition(async () => {
      try {
        const result = await updateRentalRequestStatusAction(id, newStatus);
        
        if (result?.success) {
          setRequests((prev) =>
            prev.map((req) => (req.id === id ? { ...req, status: newStatus } : req))
          );
          toast.success(result.message || `Rental request successfully ${newStatus.toLowerCase()}!`);
        } else {
          toast.error(result?.message || "Failed to update request status.");
        }
      } catch {
        toast.error("Something went wrong. Please try again.");
      } finally {
        setLoadingId(null);
      }
    });
  };

  // ফিল্টারিং লজিক (Search & Tabs)
  const filteredRequests = requests.filter((item) => {
    const tenantName = item.client?.name || "";
    const propertyTitle = item.property?.title || "";

    const matchesSearch =
      tenantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      propertyTitle.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === "PENDING") return matchesSearch && item.status === "PENDING";
    if (activeTab === "APPROVED") return matchesSearch && item.status === "APPROVED";
    if (activeTab === "REJECTED") return matchesSearch && item.status === "REJECTED";
    return matchesSearch;
  });

  // কাউন্টার ক্যালকুলেশন
  const pendingCount = requests.filter((r) => r.status === "PENDING").length;
  const approvedCount = requests.filter((r) => r.status === "APPROVED").length;
  const rejectedCount = requests.filter((r) => r.status === "REJECTED").length;

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto font-sans">
      
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
              Review incoming tenant requests and approve or reject applications
            </p>
          </div>
        </div>

        {/* Status Counter Chips */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-2 sm:pb-0">
          <div className="px-3.5 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-bold flex items-center gap-2 shrink-0">
            <Clock className="w-4 h-4" /> Pending: {pendingCount}
          </div>
          <div className="px-3.5 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-2 shrink-0">
            <CheckCircle2 className="w-4 h-4" /> Approved: {approvedCount}
          </div>
          <div className="px-3.5 py-2 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-bold flex items-center gap-2 shrink-0">
            <XCircle className="w-4 h-4" /> Rejected: {rejectedCount}
          </div>
        </div>
      </div>

      {/* 🌟 Search & Filter Section */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
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

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <Button
            variant="outline"
            onClick={() => setActiveTab("ALL")}
            className={`h-10 rounded-xl font-bold ${
              activeTab === "ALL"
                ? "bg-amber-500 text-slate-950 border-amber-500 hover:bg-amber-600"
                : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300"
            }`}
          >
            All ({requests.length})
          </Button>
          <Button
            variant="outline"
            onClick={() => setActiveTab("PENDING")}
            className={`h-10 rounded-xl font-semibold ${
              activeTab === "PENDING"
                ? "bg-amber-500 text-slate-950 border-amber-500 hover:bg-amber-600"
                : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            Pending
          </Button>
          <Button
            variant="outline"
            onClick={() => setActiveTab("APPROVED")}
            className={`h-10 rounded-xl font-semibold ${
              activeTab === "APPROVED"
                ? "bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700"
                : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            Approved
          </Button>
          <Button
            variant="outline"
            onClick={() => setActiveTab("REJECTED")}
            className={`h-10 rounded-xl font-semibold ${
              activeTab === "REJECTED"
                ? "bg-rose-600 text-white border-rose-600 hover:bg-rose-700"
                : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            Rejected
          </Button>
        </div>
      </div>

      {/* 🌟 Requests Table Container */}
      <div className="bg-white dark:bg-[#07090e] border border-slate-200/80 dark:border-slate-800/80 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th className="py-4 px-6">Tenant Information</th>
                <th className="py-4 px-6">Property Details</th>
                <th className="py-4 px-6">Move-in Plan</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions (Approve / Reject)</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200/70 dark:divide-slate-800/70 text-sm">
              {isLoadingList ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400 font-medium">
                    Loading rental requests...
                  </td>
                </tr>
              ) : filteredRequests.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400 font-medium">
                    No rental requests found.
                  </td>
                </tr>
              ) : (
                filteredRequests.map((item) => {
                  const isLoadingThis = isPending && loadingId === item.id;
                  
                  // Safe extraction matching backend JSON keys (`client` instead of `tenant`)
                  const tenantName = item.client?.name || "Unknown Tenant";
                  const tenantEmail = item.client?.email || "No email provided";
                  const tenantPhone = item.client?.phone || "No phone provided";
                  const tenantAvatar = item.client?.profilePhoto || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop";

                  const propertyTitle = item.property?.title || "Property Details";
                  const propertyLocation = item.property?.location || "Location not specified";
                  const propertyRent = item.property?.price ? `৳${item.property.price}` : "N/A";
                  const propertyImage = item.property?.image || "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop";

                  const moveInDate = item.rentStartDate ? new Date(item.rentStartDate).toLocaleDateString() : "N/A";
                  const endDate = item.rentEndDate ? new Date(item.rentEndDate).toLocaleDateString() : "N/A";

                  return (
                    <tr key={item.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-900/30 transition-colors group">
                      
                      {/* Tenant Profile */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <img
                            src={tenantAvatar}
                            alt={tenantName}
                            className="w-10 h-10 rounded-full object-cover ring-2 ring-amber-500/30 shrink-0"
                          />
                          <div className="flex flex-col overflow-hidden">
                            <span className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-amber-500 transition-colors truncate">
                              {tenantName}
                            </span>
                            <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 truncate mt-0.5">
                              <Mail className="w-3 h-3 text-amber-500 shrink-0" /> {tenantEmail}
                            </span>
                            <span className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                              <Phone className="w-3 h-3 text-amber-500 shrink-0" /> {tenantPhone}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Property Info */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <img
                            src={propertyImage}
                            alt={propertyTitle}
                            className="w-12 h-10 rounded-xl object-cover shrink-0 border border-slate-200 dark:border-slate-800"
                          />
                          <div className="flex flex-col overflow-hidden">
                            <span className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                              {propertyTitle}
                            </span>
                            <span className="text-xs text-slate-400 truncate">
                              {propertyLocation}
                            </span>
                            <span className="text-xs text-amber-600 dark:text-amber-400 font-bold mt-0.5">
                              {propertyRent}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Move-in Date & Duration */}
                      <td className="py-4 px-6">
                        <div className="flex flex-col text-xs space-y-1">
                          <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-amber-500 shrink-0" /> Start: {moveInDate}
                          </span>
                          <span className="text-slate-400 font-medium">
                            End: <span className="text-slate-600 dark:text-slate-300 font-semibold">{endDate}</span>
                          </span>
                        </div>
                      </td>

                      {/* Status Badge */}
                      <td className="py-4 px-6">
                        {item.status === "PENDING" && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                            <Clock className="w-3.5 h-3.5" /> Pending
                          </span>
                        )}
                        {item.status === "APPROVED" && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Approved
                          </span>
                        )}
                        {item.status === "REJECTED" && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                            <XCircle className="w-3.5 h-3.5" /> Rejected
                          </span>
                        )}
                      </td>

                      {/* Approve / Reject Actions */}
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleStatusUpdate(item.id, "APPROVED")}
                            disabled={isLoadingThis || item.status === "APPROVED"}
                            className="h-9 px-3 rounded-xl border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500 hover:text-white font-bold text-xs transition-all duration-200 disabled:opacity-50"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleStatusUpdate(item.id, "REJECTED")}
                            disabled={isLoadingThis || item.status === "REJECTED"}
                            className="h-9 px-3 rounded-xl border-rose-500/30 text-rose-600 dark:text-rose-400 hover:bg-rose-500 hover:text-white font-bold text-xs transition-all duration-200 disabled:opacity-50"
                          >
                            <XCircle className="w-3.5 h-3.5 mr-1" /> Reject
                          </Button>
                        </div>
                      </td>

                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 font-medium">
          <span>Showing {filteredRequests.length} of {requests.length} rental requests</span>
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