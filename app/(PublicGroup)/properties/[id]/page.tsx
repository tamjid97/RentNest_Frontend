import React from "react";
import Link from "next/link";
import {
  Building2,
  Sparkles,
  ArrowLeft,
  MapPin,
  Bed,
  Bath,
  Maximize2,
  ShieldCheck,
  CreditCard,
  Calendar,
  User,
  CheckCircle2,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// 🌟 Dummy Property Details Data with Payment Option
const PROPERTY_DETAILS = {
  id: "6a9c0fce-ebcc-4297-b0e5-dd7c32269b89",
  title: "Modern Apartment with City View",
  description: "A beautiful and spacious apartment in the heart of the city with great natural light, premium fittings, high-speed elevator, and round-the-clock security. Perfect for families or working professionals looking for luxury and convenience.",
  location: "Borishal, Bangladesh",
  price: 10000,
  beds: 3,
  baths: 2,
  sqft: "1,500",
  category: "Apartment",
  image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop",
  landlord: {
    name: "Rahim Uddin",
    phone: "+880 1712-345678",
    email: "rahim.uddin@gmail.com",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop",
  },
  amenities: [
    "High-speed Elevator",
    "24/7 Security & CCTV",
    "Dedicated Parking Space",
    "Backup Generator",
    "High-speed Internet Ready",
  ],
};

export default function PropertyDetailsWithPaymentPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#04060a] text-slate-900 dark:text-slate-100 pb-20">
      
      {/* 🌟 Top Navigation & Header */}
      <div className="bg-white dark:bg-[#07090e] border-b border-slate-200/80 dark:border-slate-800/80 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/properties">
            <Button variant="outline" className="h-11 px-4 rounded-2xl border-slate-200 dark:border-slate-800 hover:bg-amber-500 hover:text-slate-950 font-bold text-xs transition-all">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Properties
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              Verified Property
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* 🌟 Left Side: Main Property Info */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Image Banner */}
            <div className="relative h-[350px] sm:h-[450px] w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 dark:border-slate-800/80">
              <img
                src={PROPERTY_DETAILS.image}
                alt={PROPERTY_DETAILS.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 px-4 py-1.5 rounded-full text-xs font-extrabold bg-slate-950/80 backdrop-blur-md text-amber-400 border border-white/10">
                {PROPERTY_DETAILS.category}
              </div>
            </div>

            {/* Title & Location */}
            <div className="bg-white dark:bg-[#07090e] border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/40 dark:shadow-none space-y-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
                  {PROPERTY_DETAILS.title}
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2 mt-2 font-medium">
                  <MapPin className="w-4 h-4 text-amber-500" />
                  {PROPERTY_DETAILS.location}
                </p>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-3 gap-4 py-4 px-5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800/60 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <Bed className="w-4 h-4 text-amber-500" /> {PROPERTY_DETAILS.beds} Bedrooms
                </div>
                <div className="flex items-center gap-2">
                  <Bath className="w-4 h-4 text-amber-500" /> {PROPERTY_DETAILS.baths} Bathrooms
                </div>
                <div className="flex items-center gap-2">
                  <Maximize2 className="w-4 h-4 text-amber-500" /> {PROPERTY_DETAILS.sqft} sqft
                </div>
              </div>

              {/* Description */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                  About Property
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                  {PROPERTY_DETAILS.description}
                </p>
              </div>

              {/* Amenities */}
              <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                  Key Amenities
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PROPERTY_DETAILS.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                      <div className="w-5 h-5 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* 🌟 Right Side: Pricing & Payment Box */}
          <div className="lg:col-span-4 sticky top-6">
            <div className="bg-white dark:bg-[#07090e] border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/40 dark:shadow-none space-y-6">
              
              {/* Price Tag */}
              <div className="flex items-baseline justify-between pb-6 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Monthly Rent</span>
                  <h2 className="text-3xl font-extrabold text-amber-600 dark:text-amber-400 mt-1">
                    ৳{PROPERTY_DETAILS.price.toLocaleString()}
                  </h2>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                  Per Month
                </span>
              </div>

              {/* Landlord Card */}
              <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800/60">
                <img
                  src={PROPERTY_DETAILS.landlord.avatar}
                  alt={PROPERTY_DETAILS.landlord.name}
                  className="w-12 h-12 rounded-xl object-cover ring-2 ring-amber-500/40"
                />
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Managed By</span>
                  <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    {PROPERTY_DETAILS.landlord.name}
                  </span>
                  <span className="text-xs text-amber-600 dark:text-amber-400 font-semibold">
                    Verified Landlord
                  </span>
                </div>
              </div>

              {/* 🌟 Payment / Rent Button */}
              <div className="space-y-3 pt-2">
                <Button className="w-full h-14 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-extrabold shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 text-sm">
                  <CreditCard className="w-5 h-5 mr-2 stroke-[2.5]" />
                  Proceed to Payment (Pay Rent)
                </Button>

                <Button variant="outline" className="w-full h-12 rounded-2xl border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 text-xs">
                  Submit Rental Request First
                </Button>
              </div>

              {/* Security Note */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-amber-500 shrink-0" />
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  Secure transaction guaranteed. Payments are processed through encrypted gateway.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>

    </div>
  );
}