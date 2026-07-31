"use client";

import React, { useEffect, useState } from "react";
import {
  Building2,
  Sparkles,
  Search,
  MapPin,
  CheckCircle2,
  Home,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
  Loader2,
  User,
  Tag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { getAllProperty } from "../_action/property";

// 🌟 Property Interfaces & Types
interface Landlord {
  name: string;
  email: string;
}

interface Category {
  name: string;
}

type PropertyItem = {
  id: string;
  title: string;
  description: string;
  location: string;
  price: number;
  amenities: string[];
  isAvailable: string;
  createdAt: string;
  updatedAt: string;
  categoryId: string;
  landlordId: string;
  category: Category;
  landlord: Landlord;
};

type PropertyApiResponse = {
  success: boolean;
  statusCode?: number;
  message: string;
  data?: PropertyItem[] | { data?: PropertyItem[] };
};

export default function AdminPropertiesReadOnlyPage() {
  const [properties, setProperties] = useState<PropertyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const res: PropertyApiResponse = await getAllProperty();
        
        if (res.success && res.data) {
          // টাইপ সেইফ ডেটা এক্সট্রাকশন
          let dataArray: PropertyItem[] = [];

          if (Array.isArray(res.data)) {
            dataArray = res.data;
          } else if (
            typeof res.data === "object" &&
            res.data !== null &&
            "data" in res.data &&
            Array.isArray((res.data as { data?: PropertyItem[] }).data)
          ) {
            dataArray = (res.data as { data: PropertyItem[] }).data;
          }

          setProperties(dataArray);
        } else {
          toast.error(res.message || "Failed to fetch properties.");
        }
      } catch (error) {
        console.error("Error fetching properties:", error);
        toast.error("Something went wrong!");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // ফিল্টারিং এবং সার্চ লজিক
  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.landlord?.name?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" ||
      property.isAvailable?.toUpperCase() === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      
      {/* 🌟 Top Header */}
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, location or landlord..."
            className="h-11 pl-10 pr-4 rounded-xl border-slate-200 dark:border-slate-800 bg-white dark:bg-[#07090e] text-sm font-medium focus-visible:ring-2 focus-visible:ring-amber-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {["ALL", "AVAILABLE", "RENTED"].map((status) => (
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

      {/* 🌟 Properties Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
          <p className="text-sm font-medium text-slate-500">Loading properties...</p>
        </div>
      ) : filteredProperties.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-slate-200 dark:border-slate-800 rounded-3xl">
          <p className="text-sm font-medium text-slate-500">No properties found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredProperties.map((property) => (
            <div
              key={property.id}
              className="group relative bg-white dark:bg-[#07090e] border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-5 shadow-xl shadow-slate-200/40 dark:shadow-none flex flex-col justify-between gap-4"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-extrabold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                    <Tag className="w-3 h-3" /> {property.category?.name || "Property"}
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
                      ${property.price}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">/mo</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 line-clamp-1">
                  {property.title}
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
                  {property.description}
                </p>

                <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-2 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  {property.location}
                </p>
              </div>

              {/* Amenities & Landlord Info */}
              <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                <div className="flex flex-wrap gap-1.5">
                  {property.amenities?.map((amenity, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 text-[10px] font-bold uppercase"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-slate-400 dark:text-slate-500 font-medium flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-amber-500" />
                    Landlord: <strong className="text-slate-700 dark:text-slate-300">{property.landlord?.name}</strong>
                  </span>

                  <div>
                    {property.isAvailable?.toUpperCase() === "AVAILABLE" && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        <CheckCircle2 className="w-3 h-3" /> Available
                      </span>
                    )}
                    {property.isAvailable?.toUpperCase() === "RENTED" && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-500/10 text-slate-400 border border-slate-500/20">
                        <Home className="w-3 h-3" /> Rented
                      </span>
                    )}
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* 🌟 Pagination Footer */}
      <div className="p-4 bg-white dark:bg-[#07090e] border border-slate-200/80 dark:border-slate-800/80 rounded-2xl flex items-center justify-between text-xs text-slate-500 font-medium">
        <span>Showing {filteredProperties.length} of {properties.length} properties (View Only)</span>
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