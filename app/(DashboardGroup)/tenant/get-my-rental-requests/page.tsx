import React from "react";
import {
  ClipboardList,
  Sparkles,
  Search,
  Calendar,
  MapPin,
  CheckCircle2,
  XCircle,
  Clock,
  Building2,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// 🌟 Dummy Data for Tenant's Submitted Rental Requests (Get Only)
const TENANT_REQUESTS = [
  {
    id: "REQ-8001",
    property: {
      title: "Modern Apartment with City View",
      location: "Borishal, Bangladesh",
      price: "৳10,000/mo",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=400&auto=format&fit=crop",
      landlord: "Rahim Uddin",
    },
    rentStartDate: "15 Jul, 2026",
    rentEndDate: "15 Aug, 2026",
    status: "PENDING",
    submittedAt: "2 hours ago",
  },
  {
    id: "REQ-8002",
    property: {
      title: "Luxury Duplex Family Home",
      location: "Gulshan, Dhaka",
      price: "৳45,000/mo",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=400&auto=format&fit=crop",
      landlord: "Karim Ahmed",
    },
    rentStartDate: "01 Sep, 2026",
    rentEndDate: "01 Mar, 2027",
    status: "APPROVED",
    submittedAt: "3 days ago",
  },
  {
    id: "REQ-8003",
    property: {
      title: "Cozy Studio Apartment",
      location: "Banani, Dhaka",
      price: "৳18,000/mo",
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=400&auto=format&fit=crop",
      landlord: "Nasir Khan",
    },
    rentStartDate: "01 Jun, 2026",
    rentEndDate: "01 Jul, 2026",
    status: "REJECTED",
    submittedAt: "1 week ago",
  },
];

export default function TenantMyRequestsPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      
      {/* 🌟 Top Header with Read-Only Notice */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/20">
            <ClipboardList className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-2">
              My Rental Requests
              <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
              View the status of all rental applications you have submitted
            </p>
          </div>
        </div>

        {/* Read-Only Badge */}
        <div className="px-4 py-2 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-bold flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 shrink-0" />
          <span>View Only (Get Requests)</span>
        </div>
      </div>

      {/* 🌟 Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            type="text"
            placeholder="Search by property title or location..."
            className="h-11 pl-10 pr-4 rounded-xl border-slate-200 dark:border-slate-800 bg-white dark:bg-[#07090e] text-sm font-medium focus-visible:ring-2 focus-visible:ring-amber-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <Button variant="outline" className="h-10 rounded-xl bg-amber-500 text-slate-950 font-bold border-amber-500 hover:bg-amber-600">
            All (3)
          </Button>
          <Button variant="outline" className="h-10 rounded-xl border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800">
            Pending
          </Button>
          <Button variant="outline" className="h-10 rounded-xl border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800">
            Approved
          </Button>
          <Button variant="outline" className="h-10 rounded-xl border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800">
            Rejected
          </Button>
        </div>
      </div>

      {/* 🌟 Requests Table Container (Strictly Get / Read Only) */}
      <div className="bg-white dark:bg-[#07090e] border border-slate-200/80 dark:border-slate-800/80 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th className="py-4 px-6">Property Details</th>
                <th className="py-4 px-6">Landlord</th>
                <th className="py-4 px-6">Rental Duration</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Submitted Info</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200/70 dark:divide-slate-800/70 text-sm">
              {TENANT_REQUESTS.map((req) => (
                <tr key={req.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-900/30 transition-colors group">
                  
                  {/* Property Info */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img
                        src={req.property.image}
                        alt={req.property.title}
                        className="w-14 h-11 rounded-xl object-cover shrink-0"
                      />
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-amber-500 transition-colors line-clamp-1">
                          {req.property.title}
                        </span>
                        <span className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-amber-500" /> {req.property.location}
                        </span>
                        <span className="text-xs text-amber-600 dark:text-amber-400 font-extrabold mt-0.5">
                          {req.property.price}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Landlord Name */}
                  <td className="py-4 px-6">
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      {req.property.landlord}
                    </span>
                  </td>

                  {/* Dates */}
                  <td className="py-4 px-6">
                    <div className="flex flex-col text-xs space-y-1">
                      <span className="font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-amber-500" /> {req.rentStartDate} - {req.rentEndDate}
                      </span>
                    </div>
                  </td>

                  {/* Status Badge */}
                  <td className="py-4 px-6">
                    {req.status === "PENDING" && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                        <Clock className="w-3.5 h-3.5" /> Pending
                      </span>
                    )}
                    {req.status === "APPROVED" && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Approved
                      </span>
                    )}
                    {req.status === "REJECTED" && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                        <XCircle className="w-3.5 h-3.5" /> Rejected
                      </span>
                    )}
                  </td>

                  {/* Submission Time (Read Only Info) */}
                  <td className="py-4 px-6 text-right">
                    <span className="text-xs font-medium text-slate-400">
                      {req.submittedAt}
                    </span>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 font-medium">
          <span>Showing 1 to 3 of 3 requests</span>
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