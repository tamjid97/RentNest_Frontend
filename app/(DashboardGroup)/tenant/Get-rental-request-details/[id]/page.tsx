import React from "react";
import Link from "next/link";
import {
  FileText,
  Sparkles,
  ArrowLeft,
  Calendar,
  MapPin,
  Mail,
  Phone,
  CheckCircle2,
  XCircle,
  Clock,
  Home,
  ShieldCheck,
  User,
  CreditCard,
  Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// 🌟 Dummy Single Rental Request Details Data
const REQUEST_DETAILS = {
  id: "REQ-9001",
  status: "PENDING",
  createdAt: "2026-07-09T06:03:23.661Z",
  rentStartDate: "2026-07-15T10:00:00.000Z",
  rentEndDate: "2026-08-15T10:00:00.000Z",
  tenant: {
    id: "USR-TENANT-01",
    name: "Anik Rahman",
    email: "anik.rahman@gmail.com",
    phone: "+880 1712-345678",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop",
    role: "TENANT",
  },
  property: {
    id: "aff955e7-32dc-4daf-9c07-db9ca6d9abb4",
    title: "Modern Apartment with City View",
    description: "A beautiful and spacious apartment in the heart of the city with great natural light.",
    location: "Borishal, Bangladesh",
    price: 10000,
    category: "Apartment",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop",
  },
};

export default function RentalRequestDetailsPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-5xl mx-auto">
      
      {/* 🌟 Top Navigation & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="flex items-center gap-3.5">
          <Link href="/dashboard/landlord/rental-requests">
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
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                {REQUEST_DETAILS.id}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
              Detailed breakdown of the rental application submitted by the tenant
            </p>
          </div>
        </div>

        {/* Status Badge */}
        <div>
          {REQUEST_DETAILS.status === "PENDING" && (
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs font-extrabold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              <Clock className="w-4 h-4" /> Status: Pending Review
            </span>
          )}
          {REQUEST_DETAILS.status === "APPROVED" && (
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs font-extrabold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <CheckCircle2 className="w-4 h-4" /> Status: Approved
            </span>
          )}
          {REQUEST_DETAILS.status === "REJECTED" && (
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs font-extrabold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
              <XCircle className="w-4 h-4" /> Status: Rejected
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* 🌟 Tenant Information Card */}
        <div className="bg-white dark:bg-[#07090e] border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 shadow-xl shadow-slate-200/40 dark:shadow-none flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <User className="w-4 h-4 text-amber-500" /> Tenant Profile
            </h3>

            <div className="flex items-center gap-4 pb-5 border-b border-slate-200/80 dark:border-slate-800/80">
              <img
                src={REQUEST_DETAILS.tenant.avatar}
                alt={REQUEST_DETAILS.tenant.name}
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-amber-500/40"
              />
              <div className="flex flex-col">
                <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  {REQUEST_DETAILS.tenant.name}
                </h2>
                <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 mt-0.5">
                  Verified Tenant Account
                </span>
              </div>
            </div>

            <div className="space-y-3.5 mt-5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-amber-500" /> Email Address
                </span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {REQUEST_DETAILS.tenant.email}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-amber-500" /> Phone Number
                </span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {REQUEST_DETAILS.tenant.phone}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200/80 dark:border-slate-800/80">
            <span className="text-[11px] text-slate-400 font-medium">
              Requested on: {new Date(REQUEST_DETAILS.createdAt).toLocaleString()}
            </span>
          </div>
        </div>

        {/* 🌟 Property Information Card */}
        <div className="bg-white dark:bg-[#07090e] border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 shadow-xl shadow-slate-200/40 dark:shadow-none flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-amber-500" /> Requested Property
            </h3>

            <div className="flex gap-4 pb-5 border-b border-slate-200/80 dark:border-slate-800/80">
              <img
                src={REQUEST_DETAILS.property.image}
                alt={REQUEST_DETAILS.property.title}
                className="w-20 h-20 rounded-2xl object-cover shrink-0"
              />
              <div className="flex flex-col justify-center">
                <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 line-clamp-1">
                  {REQUEST_DETAILS.property.title}
                </h2>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  {REQUEST_DETAILS.property.location}
                </p>
                <span className="text-sm font-extrabold text-amber-600 dark:text-amber-400 mt-1">
                  ৳{REQUEST_DETAILS.property.price.toLocaleString()} /mo
                </span>
              </div>
            </div>

            {/* Rental Duration */}
            <div className="space-y-3 mt-5">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800/60 text-xs">
                <span className="text-slate-500 font-semibold flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-amber-500" /> Rent Start Date:
                </span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {new Date(REQUEST_DETAILS.rentStartDate).toLocaleDateString()}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800/60 text-xs">
                <span className="text-slate-500 font-semibold flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-amber-500" /> Rent End Date:
                </span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {new Date(REQUEST_DETAILS.rentEndDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* 🌟 Action Buttons Footer */}
      {REQUEST_DETAILS.status === "PENDING" && (
        <div className="p-6 bg-white dark:bg-[#07090e] border border-slate-200/80 dark:border-slate-800/80 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-amber-500 shrink-0" />
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Approving this request will notify the tenant to proceed with the rental agreement.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
          
            
          </div>
        </div>
      )}

    </div>
  );
}