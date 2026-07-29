"use client";

import React, { useState } from "react";
import {
  CalendarDays,
  Sparkles,
  MapPin,
  Bed,
  Bath,
  Maximize2,
  ShieldCheck,
  CreditCard,
  Send,
  Home,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// 🌟 Dummy Property Data (The property tenant wants to rent)
const PROPERTY_DETAILS = {
  id: "aff955e7-32dc-4daf-9c07-db9ca6d9abb4",
  title: "Modern Apartment with City View",
  location: "Borishal, Bangladesh",
  price: 10000,
  beds: 3,
  baths: 2,
  sqft: "1,500",
  landlord: "Rahim Uddin",
  image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop",
};

export default function TenantRentalRequestPage() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 🌟 API Payload Structure
    const payload = {
      propertyId: PROPERTY_DETAILS.id,
      rentStartDate: new Date(startDate).toISOString(),
      rentEndDate: new Date(endDate).toISOString(),
    };
    
    console.log("Submitting Request...", payload);
    alert("Rental request submitted successfully! (Check console for payload)");
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-6xl mx-auto">
      
      {/* 🌟 Top Header */}
      <div className="flex items-center gap-4 pb-6 border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/20">
          <CalendarDays className="w-6 h-6 stroke-[2.5]" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-2">
            Submit Rental Request
            <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
            Select your desired rental duration to send a request to the landlord.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* 🌟 Left Side: Property Summary Card */}
        <div className="lg:col-span-5 bg-white dark:bg-[#07090e] border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-5 shadow-xl shadow-slate-200/40 dark:shadow-none relative overflow-hidden">
          {/* Subtle Background Glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 blur-3xl rounded-full pointer-events-none" />

          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Home className="w-4 h-4" /> Property Details
          </h3>

          <div className="w-full h-48 rounded-2xl overflow-hidden mb-5">
            <img 
              src={PROPERTY_DETAILS.image} 
              alt={PROPERTY_DETAILS.title} 
              className="w-full h-full object-cover"
            />
          </div>

          <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 line-clamp-2">
            {PROPERTY_DETAILS.title}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-2 font-medium">
            <MapPin className="w-4 h-4 text-amber-500" />
            {PROPERTY_DETAILS.location}
          </p>

          <div className="flex items-center justify-between py-3 px-4 mt-5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800/60 text-xs font-semibold text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-1.5">
              <Bed className="w-4 h-4 text-amber-500" /> {PROPERTY_DETAILS.beds} Bed
            </div>
            <div className="flex items-center gap-1.5">
              <Bath className="w-4 h-4 text-amber-500" /> {PROPERTY_DETAILS.baths} Bath
            </div>
            <div className="flex items-center gap-1.5">
              <Maximize2 className="w-4 h-4 text-amber-500" /> {PROPERTY_DETAILS.sqft} sqft
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-slate-500">Monthly Rent</span>
              <span className="text-2xl font-extrabold text-amber-600 dark:text-amber-400">
                ৳{PROPERTY_DETAILS.price.toLocaleString()}
              </span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-xs font-semibold text-slate-500">Landlord</span>
              <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                {PROPERTY_DETAILS.landlord}
              </span>
            </div>
          </div>
        </div>

        {/* 🌟 Right Side: Rental Request Form */}
        <div className="lg:col-span-7 bg-white dark:bg-[#07090e] border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/40 dark:shadow-none">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                Duration of Stay <CalendarDays className="w-5 h-5 text-amber-500" />
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Please select your move-in date and how long you intend to stay.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Rent Start Date */}
              <div className="space-y-2.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide flex items-center gap-1.5">
                  Rent Start Date
                </label>
                <div className="relative">
                  <Input 
                    type="date"
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="h-12 w-full rounded-xl border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-sm font-medium focus-visible:ring-2 focus-visible:ring-amber-500 px-4"
                  />
                </div>
              </div>

              {/* Rent End Date */}
              <div className="space-y-2.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide flex items-center gap-1.5">
                  Rent End Date
                </label>
                <div className="relative">
                  <Input 
                    type="date"
                    required
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="h-12 w-full rounded-xl border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-sm font-medium focus-visible:ring-2 focus-visible:ring-amber-500 px-4"
                  />
                </div>
              </div>
            </div>

            {/* 🌟 Guarantees / Info Box */}
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 mt-6 flex flex-col sm:flex-row gap-4">
              <ShieldCheck className="w-8 h-8 text-amber-500 shrink-0" />
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-900 dark:text-amber-500">
                  Zero Upfront Payment Needed
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Submitting a rental request is completely free. You will only be asked to make a payment once the landlord approves your request.
                </p>
              </div>
            </div>

            {/* Hidden Property ID field for context */}
            <input type="hidden" name="propertyId" value={PROPERTY_DETAILS.id} />

            {/* 🌟 Submit Action */}
            <div className="pt-6 mt-6 border-t border-slate-200/80 dark:border-slate-800/80 flex items-center justify-end gap-4">
              <Button 
                type="button" 
                variant="ghost" 
                className="h-12 px-6 rounded-xl text-slate-500 font-bold hover:text-slate-900 dark:hover:text-slate-100"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="h-12 px-8 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-extrabold shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                <Send className="w-4 h-4 mr-2" />
                Submit Request
              </Button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}