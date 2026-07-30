"use client";

import React from "react";
import {
  Building2,
  Sparkles,
  Plus,
  Search,
  MapPin,
  Edit3,
  Trash2,
  CheckCircle2,
  Home,
  ChevronLeft,
  ChevronRight,
  Dumbbell,
  Wifi,
  Car,
  Tag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// 🌟 Dummy Data based on your API Response Structure
const MY_PROPERTIES = [
  {
    id: "6a9c0fce-ebcc-4297-b0e5-dd7c32269b89",
    title: "Modern Apartment",
    description: "A beautiful and spacious apartment in the heart of the city with great natural light.",
    location: "Borishal, Bangladesh",
    price: 10000,
    amenities: ["gym", "wifi"],
    isAvailable: "AVAILABLE",
    createdAt: "2026-07-09T06:03:23.661Z",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600&auto=format&fit=crop",
    category: "Apartment"
  },
  {
    id: "7b8d1a-fcd-4398-c1f6-ee8d43378c90",
    title: "Luxury Duplex Family Home",
    description: "Premium duplex with private parking and round-the-clock security.",
    location: "Gulshan, Dhaka",
    price: 45000,
    amenities: ["parking", "wifi"],
    isAvailable: "RENTED",
    createdAt: "2026-06-15T10:30:00.000Z",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=600&auto=format&fit=crop",
    category: "Duplex"
  }
];

export default function LandlordPropertiesPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      
      {/* 🌟 Top Header & Add Property Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/20">
            <Building2 className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-2">
              My Properties
              <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
              Manage your listings, update details, or remove properties
            </p>
          </div>
        </div>

        {/* 🌟 Create Property Action (Modal Trigger) */}
        <Dialog>
          <DialogTrigger asChild>
            <Button className="h-11 px-5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-extrabold shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300">
              <Plus className="mr-2 h-5 w-5 stroke-[3]" />
              Add New Property
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] bg-white dark:bg-[#07090e] border-slate-200 dark:border-slate-800">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-slate-900 dark:text-slate-100">Add New Property</DialogTitle>
              <DialogDescription className="text-slate-500 dark:text-slate-400">
                Fill in the details below to list a new property on the marketplace.
              </DialogDescription>
            </DialogHeader>
            
            {/* Create Form Placeholder */}
            <div className="py-6 flex flex-col gap-4">
              <div className="p-8 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-center text-slate-400 text-sm">
                [ Create Property Form Fields Will Go Here ]
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <DialogTrigger asChild>
                  <Button variant="outline" className="rounded-xl border-slate-200 dark:border-slate-800">Cancel</Button>
                </DialogTrigger>
                <Button className="rounded-xl bg-amber-500 text-slate-950 hover:bg-amber-600 font-bold">Save Property</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* 🌟 Filter & Search Section */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            type="text"
            placeholder="Search by title, location..."
            className="h-11 pl-10 pr-4 rounded-xl border-slate-200 dark:border-slate-800 bg-white dark:bg-[#07090e] text-sm font-medium focus-visible:ring-2 focus-visible:ring-amber-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <Button variant="outline" className="h-10 rounded-xl bg-amber-500 text-slate-950 font-bold border-amber-500 hover:bg-amber-600">
            All (2)
          </Button>
          <Button variant="outline" className="h-10 rounded-xl border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800">
            Available
          </Button>
          <Button variant="outline" className="h-10 rounded-xl border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800">
            Rented
          </Button>
        </div>
      </div>

      {/* 🌟 Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
        {MY_PROPERTIES.map((property) => (
          <div
            key={property.id}
            className="group relative bg-white dark:bg-[#07090e] border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-4 shadow-xl shadow-slate-200/40 dark:shadow-none hover:border-amber-500/50 dark:hover:border-amber-500/50 transition-all duration-300 flex flex-col sm:flex-row gap-5"
          >
            {/* Image Section */}
            <div className="relative w-full sm:w-52 h-52 sm:h-auto rounded-2xl overflow-hidden shrink-0">
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
              />
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-extrabold bg-slate-950/80 backdrop-blur-md text-amber-400 border border-white/10 flex items-center gap-1.5">
                <Tag className="w-3 h-3" /> {property.category}
              </span>

              <div className="absolute bottom-3 left-3">
                {property.isAvailable === "AVAILABLE" ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/90 text-white backdrop-blur-md">
                    <CheckCircle2 className="w-3 h-3" /> Available
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-900/90 text-slate-300 backdrop-blur-md border border-slate-700">
                    <Home className="w-3 h-3" /> Rented
                  </span>
                )}
              </div>
            </div>

            {/* Content & Actions Section */}
            <div className="flex flex-col justify-between flex-1 py-1">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 line-clamp-1 group-hover:text-amber-500 transition-colors">
                  {property.title}
                </h3>
                
                <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-2 font-medium">
                  <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                  {property.location}
                </p>
                
                {/* Amenities Badges */}
                <div className="flex flex-wrap items-center gap-2 mt-3">
                  {property.amenities.includes("gym") && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[10px] font-semibold text-slate-600 dark:text-slate-300">
                      <Dumbbell className="w-3 h-3 text-amber-500" /> Gym
                    </span>
                  )}
                  {property.amenities.includes("wifi") && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[10px] font-semibold text-slate-600 dark:text-slate-300">
                      <Wifi className="w-3 h-3 text-amber-500" /> Free WiFi
                    </span>
                  )}
                  {property.amenities.includes("parking") && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[10px] font-semibold text-slate-600 dark:text-slate-300">
                      <Car className="w-3 h-3 text-amber-500" /> Parking
                    </span>
                  )}
                </div>

                <div className="mt-4 flex items-end gap-1">
                  <span className="text-2xl font-extrabold text-amber-600 dark:text-amber-400">
                    ৳{property.price.toLocaleString()}
                  </span>
                  <span className="text-sm text-slate-400 font-medium mb-1">
                    /mo
                  </span>
                </div>
              </div>

              {/* 🌟 Action Buttons (Update Modal & Delete) */}
              <div className="flex items-center gap-3 mt-5 pt-4 border-t border-slate-200/80 dark:border-slate-800/80">
                
                {/* Update Modal Trigger */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="flex-1 h-10 rounded-xl border-amber-500/30 text-amber-600 dark:text-amber-400 hover:bg-amber-500 hover:text-slate-950 hover:border-amber-500 font-bold text-xs transition-all duration-300 group/edit"
                    >
                      <Edit3 className="w-4 h-4 mr-2 group-hover/edit:scale-110 transition-transform" /> 
                      Update
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px] bg-white dark:bg-[#07090e] border-slate-200 dark:border-slate-800">
                    <DialogHeader>
                      <DialogTitle className="text-xl font-bold text-slate-900 dark:text-slate-100">Update Property</DialogTitle>
                      <DialogDescription className="text-slate-500 dark:text-slate-400">
                        Update the details for <span className="font-semibold text-slate-700 dark:text-slate-300">{property.title}</span>.
                      </DialogDescription>
                    </DialogHeader>
                    
                    {/* Update Form Placeholder */}
                    <div className="py-6 flex flex-col gap-4">
                      <div className="p-8 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-center text-slate-400 text-sm">
                        [ Update Form Fields Will Go Here ]
                      </div>
                      <div className="flex justify-end gap-3 mt-4">
                        <DialogTrigger asChild>
                          <Button variant="outline" className="rounded-xl border-slate-200 dark:border-slate-800">Cancel</Button>
                        </DialogTrigger>
                        <Button className="rounded-xl bg-amber-500 text-slate-950 hover:bg-amber-600 font-bold">Save Changes</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                
                {/* Delete Button */}
                <Button 
                  variant="outline" 
                  className="flex-1 h-10 rounded-xl border-rose-500/30 text-rose-600 dark:text-rose-400 hover:bg-rose-500 hover:text-white hover:border-rose-500 font-bold text-xs transition-all duration-300 group/delete"
                >
                  <Trash2 className="w-4 h-4 mr-2 group-hover/delete:scale-110 transition-transform" /> 
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 🌟 Pagination Footer */}
      <div className="p-4 bg-white dark:bg-[#07090e] border border-slate-200/80 dark:border-slate-800/80 rounded-2xl flex items-center justify-between text-xs text-slate-500 font-medium">
        <span>Showing 1 to 2 of 2 properties</span>
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