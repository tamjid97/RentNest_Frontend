import React from "react";
import {
  Building2,
  Sparkles,
  Search,
  MapPin,
  Bed,
  Bath,
  Maximize2,
  CheckCircle2,
  Clock,
  Home,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// 🌟 Dummy Data for Properties (View Only)
const PROPERTIES = [
  {
    id: "PROP-101",
    title: "Skyline Glass Penthouse",
    location: "Gulshan 2, Dhaka",
    category: "Apartment",
    price: "$2,500",
    period: "/mo",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600&auto=format&fit=crop",
    beds: 3,
    baths: 3,
    sqft: "2,400",
    status: "AVAILABLE",
    landlord: "Rahim Uddin",
  },
  {
    id: "PROP-102",
    title: "Green Villa Residence",
    location: "Dhanmondi, Dhaka",
    category: "Villa",
    price: "$3,800",
    period: "/mo",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=600&auto=format&fit=crop",
    beds: 5,
    baths: 4,
    sqft: "4,200",
    status: "RENTED",
    landlord: "Karim Ahmed",
  },
  {
    id: "PROP-103",
    title: "Modern Minimalist Studio",
    location: "Banani, Dhaka",
    category: "Studio",
    price: "$950",
    period: "/mo",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=600&auto=format&fit=crop",
    beds: 1,
    baths: 1,
    sqft: "650",
    status: "AVAILABLE",
    landlord: "Nasir Khan",
  },
  {
    id: "PROP-104",
    title: "Luxury Duplex Haven",
    location: "Uttara Sector 3, Dhaka",
    category: "Duplex",
    price: "$1,800",
    period: "/mo",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop",
    beds: 4,
    baths: 3,
    sqft: "2,800",
    status: "PENDING",
    landlord: "Salma Hayek",
  },
];

export default function AdminPropertiesReadOnlyPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      
      {/* 🌟 Top Header with Read-Only Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/20">
            <Building2 className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-2">
              All Properties (Admin View)
              <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
              System-wide property overview and monitoring
            </p>
          </div>
        </div>

        {/* Read-Only Restriction Notice Badge */}
        <div className="px-4 py-2 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-bold flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 shrink-0" />
          <span>View Only Mode (No Actions Allowed)</span>
        </div>
      </div>

      {/* 🌟 Search & Filter Section */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            type="text"
            placeholder="Search properties or landlord..."
            className="h-11 pl-10 pr-4 rounded-xl border-slate-200 dark:border-slate-800 bg-white dark:bg-[#07090e] text-sm font-medium focus-visible:ring-2 focus-visible:ring-amber-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <Button variant="outline" className="h-10 rounded-xl bg-amber-500 text-slate-950 font-bold border-amber-500 hover:bg-amber-600">
            All (4)
          </Button>
          <Button variant="outline" className="h-10 rounded-xl border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800">
            Available
          </Button>
          <Button variant="outline" className="h-10 rounded-xl border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800">
            Rented
          </Button>
        </div>
      </div>

      {/* 🌟 Properties Grid (Strictly Read-Only) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {PROPERTIES.map((property) => (
          <div
            key={property.id}
            className="group relative bg-white dark:bg-[#07090e] border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-4 shadow-xl shadow-slate-200/40 dark:shadow-none flex flex-col sm:flex-row gap-5"
          >
            {/* Image Section */}
            <div className="relative w-full sm:w-48 h-48 sm:h-auto rounded-2xl overflow-hidden shrink-0">
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-extrabold bg-slate-950/80 backdrop-blur-md text-amber-400 border border-white/10">
                {property.category}
              </span>

              <div className="absolute bottom-3 left-3">
                {property.status === "AVAILABLE" && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/90 text-white backdrop-blur-md">
                    <CheckCircle2 className="w-3 h-3" /> Available
                  </span>
                )}
                {property.status === "RENTED" && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-900/90 text-slate-300 backdrop-blur-md border border-slate-700">
                    <Home className="w-3 h-3" /> Rented
                  </span>
                )}
                {property.status === "PENDING" && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/90 text-slate-950 backdrop-blur-md">
                    <Clock className="w-3 h-3" /> Pending
                  </span>
                )}
              </div>
            </div>

            {/* Details Section (No Edit/Delete buttons) */}
            <div className="flex flex-col justify-between flex-1 space-y-4 py-1">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    {property.id}
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-xl font-extrabold text-amber-600 dark:text-amber-400">
                      {property.price}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      {property.period}
                    </span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 line-clamp-1 mt-1">
                  {property.title}
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-1 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  {property.location}
                </p>
              </div>

              {/* Specs & Landlord Info */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between py-2 px-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800/60 text-xs font-semibold text-slate-600 dark:text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <Bed className="w-3.5 h-3.5 text-amber-500" />
                    <span>{property.beds} Bed</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Bath className="w-3.5 h-3.5 text-amber-500" />
                    <span>{property.baths} Bath</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Maximize2 className="w-3.5 h-3.5 text-amber-500" />
                    <span>{property.sqft} sqft</span>
                  </div>
                </div>
                
                <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium px-1">
                  Owner/Landlord: <strong className="text-slate-600 dark:text-slate-300">{property.landlord}</strong>
                </span>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* 🌟 Pagination Footer */}
      <div className="p-4 bg-white dark:bg-[#07090e] border border-slate-200/80 dark:border-slate-800/80 rounded-2xl flex items-center justify-between text-xs text-slate-500 font-medium">
        <span>Showing 1 to 4 of 4 properties (View Only)</span>
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
  );
}