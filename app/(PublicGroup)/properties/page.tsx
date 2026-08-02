"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Search,
  MapPin,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Tag,
  Check,
  ShieldCheck,
  Building,
  Ban,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { getProperty } from "../_action/propertyAction";

interface ISproperty {
  id: string;
  title: string;
  description: string;
  location: string;
  price: number;
  amenities: string[];
  image?: string;
  images?: string[]; // ব্যাকএন্ড থেকে অ্যারে আসতে পারে
  isAvailable: string;
  categoryId: string;
  landlordId: string;
  createdAt: string;
  category: {
    id: string;
    name: string;
  };
  landlord: {
    id: string;
    name: string;
    email: string;
    profilePhoto?: string | null;
  };
}

export default function PublicPropertiesPage() {
  const [properties, setProperties] = useState<ISproperty[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await getProperty();
        
        console.log("Property Action Response:", response);

        if (Array.isArray(response)) {
          setProperties(response);
        } else if (response?.success && Array.isArray(response?.data)) {
          setProperties(response.data);
        } else if (Array.isArray(response?.data)) {
          setProperties(response.data);
        } else {
          setProperties([]);
        }
      } catch (error) {
        console.error("Failed to fetch properties:", error);
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const filteredProperties = properties.filter((property) => {
    const title = property?.title || "";
    const location = property?.location || "";
    const description = property?.description || "";

    const matchesSearch =
      title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "ALL" ||
      property?.category?.name?.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  const uniqueCategories = Array.isArray(properties)
    ? (Array.from(
        new Set(properties.map((p) => p?.category?.name).filter(Boolean))
      ) as string[])
    : [];

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#030712] text-slate-900 dark:text-slate-100 pb-20 selection:bg-amber-500 selection:text-black">
      
      {/* 🌟 Luxury Hero Section */}
      <div className="relative overflow-hidden bg-white dark:bg-[#07090e] border-b border-slate-200/80 dark:border-slate-800/80 pt-16 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-40 dark:opacity-20 blur-3xl">
          <div className="absolute -top-10 left-1/4 w-72 h-72 bg-amber-500/30 rounded-full" />
          <div className="absolute top-10 right-1/4 w-96 h-96 bg-orange-500/20 rounded-full" />
        </div>

        <div className="relative max-w-7xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-bold tracking-wide shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
            <span>EXECUTIVE RENTAL COLLECTION</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 dark:text-white">
            Discover Premium <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 bg-clip-text text-transparent">Living Spaces</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-normal leading-relaxed">
            Curated selection of verified luxury apartments, duplexes, and suites available for instant rental booking.
          </p>

          {/* Functional Search Bar */}
          <div className="max-w-3xl mx-auto mt-10 p-2 sm:p-2.5 rounded-2xl sm:rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-2xl shadow-slate-300/40 dark:shadow-amber-500/5 flex flex-col sm:flex-row items-center gap-2 transition-all">
            <div className="relative w-full flex items-center pl-3">
              <Search className="w-5 h-5 text-amber-500 shrink-0" />
              <Input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by city, neighborhood, or property title..."
                className="h-11 border-0 bg-transparent text-sm font-medium focus-visible:ring-0 shadow-none text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button className="w-full sm:w-auto h-11 px-8 rounded-xl sm:rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:opacity-95 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all duration-300">
                Find Places
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 🌟 Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-8">
        
        {/* Dynamic Category Filter Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/60 dark:border-slate-800/60">
          <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none">
            <Button
              onClick={() => setSelectedCategory("ALL")}
              className={`h-9 px-5 rounded-full text-xs font-bold shadow-sm transition-all ${
                selectedCategory === "ALL"
                  ? "bg-slate-900 dark:bg-amber-500 text-white dark:text-slate-950"
                  : "bg-transparent text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800/80"
              }`}
            >
              All Properties
            </Button>

            {uniqueCategories.map((catName) => (
              <Button
                key={catName}
                onClick={() => setSelectedCategory(catName)}
                variant={selectedCategory === catName ? "default" : "outline"}
                className={`h-9 px-5 rounded-full text-xs font-medium transition-all ${
                  selectedCategory === catName
                    ? "bg-slate-900 dark:bg-amber-500 text-white dark:text-slate-950 font-bold border-transparent"
                    : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/80"
                }`}
              >
                {catName}
              </Button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-semibold">
            <Building className="w-4 h-4 text-amber-500" />
            <span>Showing {loading ? "..." : filteredProperties.length} Available Listings</span>
          </div>
        </div>

        {/* Shadcn Skeleton Loader */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="bg-white dark:bg-[#07090e] border border-slate-200/80 dark:border-slate-800/80 rounded-[28px] overflow-hidden flex flex-col justify-between">
                <Skeleton className="h-60 w-full rounded-none" />
                <div className="p-6 space-y-4">
                  <div className="space-y-2.5">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-6 w-3/4" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-3.5 w-full" />
                    <Skeleton className="h-3.5 w-5/6" />
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800/80">
                    <Skeleton className="h-8 w-24" />
                    <Skeleton className="h-10 w-28 rounded-2xl" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredProperties.length === 0 ? (
          <div className="text-center py-24 bg-white dark:bg-[#07090e] rounded-3xl border border-slate-200 dark:border-slate-800">
            <Building className="w-12 h-12 mx-auto text-amber-500/50 mb-3" />
            <h3 className="text-lg font-bold">No Properties Found</h3>
            <p className="text-xs text-slate-500 mt-1">Try adjusting your search query or category filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property) => {
              // ছবির ইউআরএল হ্যান্ডেল করার জন্য (image বা images অ্যারে থেকে যেকোনো একটা নেওয়া)
              const displayImage = property.image || (property.images && property.images.length > 0 ? property.images[0] : "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop");

              return (
                <div
                  key={property.id}
                  className="group relative bg-white dark:bg-[#07090e] border border-slate-200/80 dark:border-slate-800/80 rounded-[28px] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-amber-500/10 hover:-translate-y-1.5 hover:border-amber-500/40 transition-all duration-500 flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-60 w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
                      <img
                        src={displayImage}
                        alt={property.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-black/60 backdrop-blur-md text-amber-400 border border-white/10 flex items-center gap-1.5 shadow-lg">
                          <Tag className="w-3 h-3 text-amber-400" />
                          {property.category?.name || "Luxury"}
                        </span>
                      </div>

                      <div className="absolute bottom-4 left-4">
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase backdrop-blur-md border shadow-lg flex items-center gap-1 ${
                            property.isAvailable === "AVAILABLE"
                              ? "bg-emerald-500/80 text-white border-emerald-400/30"
                              : "bg-rose-500/80 text-white border-rose-400/30"
                          }`}
                        >
                          {property.isAvailable === "AVAILABLE" ? (
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                          ) : (
                            <Ban className="w-3 h-3 text-white" />
                          )}
                          {property.isAvailable === "AVAILABLE" ? "Available Now" : "Unavailable / Booked"}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 space-y-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 text-xs font-semibold">
                          <MapPin className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">{property.location}</span>
                        </div>

                        <h3 className="text-xl font-extrabold text-slate-900 dark:text-white line-clamp-1 group-hover:text-amber-500 transition-colors">
                          {property.title}
                        </h3>
                      </div>

                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                        {property.description}
                      </p>

                      {property.amenities && property.amenities.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1.5 pt-1">
                          {property.amenities.slice(0, 3).map((amenity, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 text-[10px] font-bold text-slate-600 dark:text-slate-300 capitalize flex items-center gap-1"
                            >
                              <Check className="w-3 h-3 text-amber-500" />
                              {amenity}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-6 pt-0 space-y-4">
                    <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800/80">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 text-slate-950 font-black text-xs flex items-center justify-center shadow-sm overflow-hidden">
                          {property.landlord?.profilePhoto ? (
                            <img src={property.landlord.profilePhoto} alt="Landlord" className="w-full h-full object-cover" />
                          ) : (
                            property.landlord?.name?.charAt(0) || "L"
                          )}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] text-slate-400 font-medium">Listed By</span>
                          <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                            {property.landlord?.name || "Property Owner"}
                            <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Rent Fee</span>
                        <div className="text-2xl font-black text-slate-900 dark:text-white flex items-baseline gap-0.5">
                          <span className="text-amber-500 text-lg">৳</span>
                          {property.price?.toLocaleString()}
                          <span className="text-xs text-slate-400 font-medium">/mo</span>
                        </div>
                      </div>

                      <Link href={`/properties/${property.id}`}>
                        <Button className="h-11 px-6 rounded-2xl bg-slate-900 dark:bg-slate-800 hover:bg-gradient-to-r hover:from-amber-500 hover:to-orange-500 hover:text-slate-950 text-white font-extrabold text-xs transition-all duration-300 shadow-md">
                          Explore <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                        </Button>
                      </Link>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

        {/* Footer */}
        <div className="p-5 bg-white dark:bg-[#07090e] border border-slate-200/80 dark:border-slate-800/80 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
          <span>Displaying total {filteredProperties.length} verified listings</span>
          <div className="flex items-center gap-2">
            <Button size="icon" variant="outline" disabled className="h-9 w-9 rounded-xl border-slate-200 dark:border-slate-800">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button size="icon" variant="outline" disabled className="h-9 w-9 rounded-xl border-slate-200 dark:border-slate-800">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}