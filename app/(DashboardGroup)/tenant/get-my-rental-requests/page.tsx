"use client";

import React, { useState, useEffect } from "react";
import {
  ClipboardList,
  Sparkles,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  Calendar,
  MapPin,
  Building2,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getMyRentalRequest } from "../../tenant/_action/rentalAction";

// 🌟 ব্যাকএন্ড রেসপন্স অনুযায়ী টাইপ ডিফিনিশন
export interface Property {
  id?: string;
  title?: string;
  location?: string;
  address?: string;
  price?: number | string;
  rent?: number | string;
  images?: string[];
  image?: string;
  landlord?: {
    name?: string;
    email?: string;
    phone?: string;
  };
}

export interface MyRentalRequest {
  id: string;
  property?: Property;
  rentStartDate?: string;
  rentEndDate?: string;
  moveInDate?: string;
  duration?: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt?: string;
}

export default function TenantRentalRequestsPage() {
  // 🌟 ১. ইনিশিয়াল স্টেটসমূহ
  const [requests, setRequests] = useState<MyRentalRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  // 🌟 ২. fetchRequests ফাংশন (কোনো সিঙ্ক্রোনাস setState ছাড়া)
  const fetchRequests = async () => {
    try {
      const result = await getMyRentalRequest(); // Tenant-এর সঠিক API Action
      if (result?.success && Array.isArray(result.data)) {
        setRequests(result.data as MyRentalRequest[]);
      } else {
        setRequests([]);
      }
    } catch (error) {
      console.error("Failed to fetch requests:", error);
      setRequests([]);
    } finally {
      setIsLoading(false); // async শেষ হওয়ার পর স্টেট আপডেট
    }
  };

  // 🌟 ৩. ম্যানুয়াল রিফ্রেশের জন্য আলাদা হ্যান্ডলার
  const handleRefresh = () => {
    setIsLoading(true);
    fetchRequests();
  };

  // 🌟 ৪. Clean useEffect
  useEffect(() => {
    fetchRequests();
  }, []);

  // 🌟 তারিখ ফরম্যাট করার ফাংশন
  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // 🌟 ফিল্টারিং লজিক (Search & Tabs)
  const filteredRequests = requests.filter((item) => {
    const propertyTitle = item.property?.title || "";
    const propertyLocation = item.property?.location || item.property?.address || "";

    const matchesSearch =
      propertyTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      propertyLocation.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === "PENDING") return matchesSearch && item.status === "PENDING";
    if (activeTab === "APPROVED") return matchesSearch && item.status === "APPROVED";
    if (activeTab === "REJECTED") return matchesSearch && item.status === "REJECTED";
    return matchesSearch;
  });

  // 🌟 কাউন্টার হিসেব
  const pendingCount = requests.filter((r) => r.status === "PENDING").length;
  const approvedCount = requests.filter((r) => r.status === "APPROVED").length;
  const rejectedCount = requests.filter((r) => r.status === "REJECTED").length;

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
              My Rental Applications
              <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
              Track the live status of all your submitted rental requests
            </p>
          </div>
        </div>

        {/* Status Counter Chips & Refresh Button */}
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
          <Button
            variant="outline"
            size="icon"
            onClick={handleRefresh}
            title="Refresh Data"
            className="h-9 w-9 rounded-xl border-slate-200 dark:border-slate-800 shrink-0"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
          </Button>
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
            placeholder="Search by property or location..."
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
                <th className="py-4 px-6">Property Details</th>
                <th className="py-4 px-6">Landlord</th>
                <th className="py-4 px-6">Rental Plan</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Applied Date</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200/70 dark:divide-slate-800/70 text-sm">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400 font-medium">
                    <div className="flex items-center justify-center gap-2">
                      <RefreshCw className="w-5 h-5 animate-spin text-amber-500" />
                      Loading your requests...
                    </div>
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
                  const propImage = item.property?.images?.[0] || item.property?.image;
                  const price = item.property?.price || item.property?.rent;

                  return (
                    <tr key={item.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-900/30 transition-colors group">
                      
                      {/* Property Info */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          {propImage ? (
                            <img
                              src={propImage}
                              alt={item.property?.title || "Property"}
                              className="w-14 h-11 rounded-xl object-cover shrink-0 border border-slate-200/60 dark:border-slate-800"
                            />
                          ) : (
                            <div className="w-14 h-11 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                              <Building2 className="w-5 h-5 text-slate-400" />
                            </div>
                          )}
                          <div className="flex flex-col">
                            <span className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-amber-500 transition-colors line-clamp-1">
                              {item.property?.title || "N/A Property"}
                            </span>
                            <span className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                              <MapPin className="w-3 h-3 text-amber-500 shrink-0" /> 
                              {item.property?.location || item.property?.address || "No location provided"}
                            </span>
                            {price && (
                              <span className="text-xs text-amber-600 dark:text-amber-400 font-extrabold mt-0.5">
                                ৳{Number(price).toLocaleString()}/mo
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Landlord Info */}
                      <td className="py-4 px-6">
                        <div className="flex flex-col">
                          <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                            {item.property?.landlord?.name || "N/A"}
                          </span>
                          {item.property?.landlord?.phone && (
                            <span className="text-[11px] text-slate-400 mt-0.5">
                              {item.property.landlord.phone}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Move-in Date / Duration */}
                      <td className="py-4 px-6">
                        <div className="flex flex-col text-xs space-y-1">
                          <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-amber-500" /> 
                            {item.rentStartDate ? `${formatDate(item.rentStartDate)}` : formatDate(item.moveInDate)}
                          </span>
                          {(item.rentEndDate || item.duration) && (
                            <span className="text-slate-400 font-medium">
                              End / Duration: {item.rentEndDate ? formatDate(item.rentEndDate) : item.duration}
                            </span>
                          )}
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

                      {/* Created Date */}
                      <td className="py-4 px-6 text-right">
                        <span className="text-xs font-medium text-slate-400">
                          {formatDate(item.createdAt)}
                        </span>
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