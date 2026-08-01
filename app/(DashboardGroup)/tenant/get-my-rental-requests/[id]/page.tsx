"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  FileText,
  ArrowLeft,
  Calendar,
  MapPin,
  Mail,
  Phone,
  CheckCircle2,
  XCircle,
  Clock,
  User,
  Building2,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getRentalRequestDetails } from "../../_action/detal";



export interface RentalRequestDetails {
  id: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
  rentStartDate?: string;
  rentEndDate?: string;
  moveInDate?: string;
  client?: {
    id?: string;
    name?: string;
    email?: string;
    phone?: string;
    profilePhoto?: string;
    role?: string;
    activeStatus?: string;
  };
  property?: {
    id?: string;
    title?: string;
    description?: string;
    location?: string;
    address?: string;
    price?: number | string;
    rent?: number | string;
    image?: string;
    images?: string[];
  };
}

export default function RentalRequestDetailsPage() {
  const params = useParams();
  const requestId = params.id as string;

  const [details, setDetails] = useState<RentalRequestDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDetails = async () => {
      if (!requestId || requestId === "id") {
        setError("Invalid or missing Request ID");
        setIsLoading(false);
        return;
      }
      
      setIsLoading(true);
      try {
        const result = await getRentalRequestDetails(requestId);
        console.log("API Response:", result);

        if (result?.success) {
          const responseData = result.data || result;
          setDetails(responseData as RentalRequestDetails);
        } else {
          setError(result?.message || "Rental request not found!");
        }
      } catch (err) {
        console.error("Error fetching details:", err);
        setError("An error occurred while loading details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [requestId]);

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <RefreshCw className="w-10 h-10 animate-spin text-amber-500" />
        <p className="text-slate-500 font-medium">Loading request details...</p>
      </div>
    );
  }

  if (error || !details) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500">
          <XCircle className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
          {error || "Rental request not found!"}
        </h2>
        <p className="text-xs text-slate-500 max-w-sm">
          The request you are looking for might have been deleted, or the ID ({requestId}) is invalid.
        </p>
        <Link href="/tenant/rental-requests">
          <Button className="mt-2 rounded-xl bg-amber-500 text-slate-950 font-bold hover:bg-amber-600">
            Go Back
          </Button>
        </Link>
      </div>
    );
  }

 
  const clientImage = details.client?.profilePhoto || `https://ui-avatars.com/api/?name=${encodeURIComponent(details.client?.name || "User")}`;
  const propImage = details.property?.image || details.property?.images?.[0];
  const price = details.property?.price || details.property?.rent;

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-5xl mx-auto">
      
      {/* Top Navigation & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="flex items-center gap-3.5">
          <Link href="/tenant/rental-requests">
            <Button variant="outline" size="icon" className="h-11 w-11 rounded-2xl border-slate-200 dark:border-slate-800 hover:bg-amber-500 hover:text-slate-950 transition-all">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/20">
            <FileText className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
                Request Details
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 line-clamp-1 max-w-[120px]">
                {details.id}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
              Detailed breakdown of the rental application submitted
            </p>
          </div>
        </div>

        {/* Status Badge */}
        <div>
          {details.status === "PENDING" && (
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs font-extrabold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              <Clock className="w-4 h-4" /> Status: Pending Review
            </span>
          )}
          {details.status === "APPROVED" && (
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs font-extrabold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <CheckCircle2 className="w-4 h-4" /> Status: Approved
            </span>
          )}
          {details.status === "REJECTED" && (
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs font-extrabold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
              <XCircle className="w-4 h-4" /> Status: Rejected
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Tenant/Client Information Card */}
        <div className="bg-white dark:bg-[#07090e] border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 shadow-xl shadow-slate-200/40 dark:shadow-none flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <User className="w-4 h-4 text-amber-500" /> Tenant Profile
            </h3>

            <div className="flex items-center gap-4 pb-5 border-b border-slate-200/80 dark:border-slate-800/80">
              <img
                src={clientImage}
                alt={details.client?.name || "Client"}
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-amber-500/40"
              />
              <div className="flex flex-col">
                <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  {details.client?.name || "N/A"}
                </h2>
                <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 mt-0.5">
                  {details.client?.role || "TENANT"}
                </span>
              </div>
            </div>

            <div className="space-y-3.5 mt-5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-amber-500" /> Email Address
                </span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {details.client?.email || "N/A"}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-amber-500" /> Phone Number
                </span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {details.client?.phone || "N/A"}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200/80 dark:border-slate-800/80">
            <span className="text-[11px] text-slate-400 font-medium">
              Requested on: {formatDate(details.createdAt)}
            </span>
          </div>
        </div>

        {/* Property Information Card */}
        <div className="bg-white dark:bg-[#07090e] border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 shadow-xl shadow-slate-200/40 dark:shadow-none flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-amber-500" /> Requested Property
            </h3>

            <div className="flex gap-4 pb-5 border-b border-slate-200/80 dark:border-slate-800/80">
              {propImage ? (
                <img
                  src={propImage}
                  alt={details.property?.title || "Property"}
                  className="w-20 h-20 rounded-2xl object-cover shrink-0"
                />
              ) : (
                <div className="w-20 h-20 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                  <Building2 className="w-8 h-8 text-slate-400" />
                </div>
              )}
              <div className="flex flex-col justify-center">
                <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 line-clamp-1">
                  {details.property?.title || "N/A Property"}
                </h2>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  {details.property?.location || details.property?.address || "No location provided"}
                </p>
                {price && (
                  <span className="text-sm font-extrabold text-amber-600 dark:text-amber-400 mt-1">
                    ৳{Number(price).toLocaleString()} /mo
                  </span>
                )}
              </div>
            </div>

            {/* Rental Duration */}
            <div className="space-y-3 mt-5">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800/60 text-xs">
                <span className="text-slate-500 font-semibold flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-amber-500" /> Start Date:
                </span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {formatDate(details.rentStartDate)}
                </span>
              </div>

              {details.rentEndDate && (
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800/60 text-xs">
                  <span className="text-slate-500 font-semibold flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-amber-500" /> End Date:
                  </span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {formatDate(details.rentEndDate)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}