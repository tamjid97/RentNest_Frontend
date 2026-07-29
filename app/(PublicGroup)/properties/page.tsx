import React from "react";
import Link from "next/link";
import {
  Building2,
  Sparkles,
  Search,
  MapPin,
  Bed,
  Bath,
  Maximize2,
  ArrowRight,
  Filter,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Tag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// 🌟 Dummy Data for Public Properties List
const PUBLIC_PROPERTIES = [
  {
    id: "6a9c0fce-ebcc-4297-b0e5-dd7c32269b89",
    title: "Modern Apartment with City View",
    description: "A beautiful and spacious apartment in the heart of the city with great natural light.",
    location: "Borishal, Bangladesh",
    price: 10000,
    beds: 3,
    baths: 2,
    sqft: "1,500",
    category: "Apartment",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop",
    isAvailable: "AVAILABLE",
  },
  {
    id: "7b8d1a-fcd-4398-c1f6-ee8d43378c90",
    title: "Luxury Duplex Family Home",
    description: "Premium duplex with private parking and round-the-clock security.",
    location: "Gulshan, Dhaka",
    price: 45000,
    beds: 4,
    baths: 3,
    sqft: "2,800",
    category: "Duplex",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop",
    isAvailable: "AVAILABLE",
  },
  {
    id: "5c7e9b-abc-1234-9e8d-112233445566",
    title: "Cozy Studio Apartment",
    description: "Compact and modern studio ideal for single professionals or students.",
    location: "Banani, Dhaka",
    price: 18000,
    beds: 1,
    baths: 1,
    sqft: "650",
    category: "Studio",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800&auto=format&fit=crop",
    isAvailable: "AVAILABLE",
  },
];

export default function PublicPropertiesPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#04060a] text-slate-900 dark:text-slate-100 pb-16">
      
      {/* 🌟 Hero Header Section */}
      <div className="bg-white dark:bg-[#07090e] border-b border-slate-200/80 dark:border-slate-800/80 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-extrabold">
            <Sparkles className="w-4 h-4" /> Explore Available Rentals
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Find Your Dream <span className="text-amber-500">Property</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium">
            Browse through our verified listings, compare prices, and request rentals directly from landlords.
          </p>

          {/* Search & Filter Bar */}
          <div className="max-w-3xl mx-auto mt-8 flex flex-col sm:flex-row items-center gap-3 bg-white dark:bg-[#07090e] p-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none">
            <div className="relative w-full flex items-center">
              <Search className="absolute left-4 w-4 h-4 text-slate-400" />
              <Input
                type="text"
                placeholder="Search by location, title..."
                className="h-12 pl-11 pr-4 border-0 bg-transparent text-sm font-medium focus-visible:ring-0"
              />
            </div>
            <Button className="w-full sm:w-auto h-12 px-8 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-extrabold shadow-lg shadow-amber-500/25">
              Search
            </Button>
          </div>
        </div>
      </div>

      {/* 🌟 Main Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-8">
        
        {/* Category Filter Chips */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <Button variant="outline" className="h-10 rounded-xl bg-amber-500 text-slate-950 font-bold border-amber-500 hover:bg-amber-600">
              All Properties
            </Button>
            <Button variant="outline" className="h-10 rounded-xl border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800">
              Apartment
            </Button>
            <Button variant="outline" className="h-10 rounded-xl border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800">
              Duplex
            </Button>
            <Button variant="outline" className="h-10 rounded-xl border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800">
              Studio
            </Button>
          </div>

          <span className="text-xs text-slate-400 font-semibold">
            Showing 3 properties
          </span>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PUBLIC_PROPERTIES.map((property) => (
            <div
              key={property.id}
              className="group bg-white dark:bg-[#07090e] border border-slate-200/80 dark:border-slate-800/80 rounded-3xl overflow-hidden shadow-xl shadow-slate-200/40 dark:shadow-none hover:border-amber-500/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Property Image */}
                <div className="relative h-56 w-full overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-extrabold bg-slate-950/80 backdrop-blur-md text-amber-400 border border-white/10 flex items-center gap-1.5">
                    <Tag className="w-3 h-3" /> {property.category}
                  </span>
                  <span className="absolute bottom-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-500/90 text-white backdrop-blur-md">
                    Available
                  </span>
                </div>

                {/* Property Details */}
                <div className="p-5 space-y-3">
                  <h3 className="text-lg font-extrabold text-slate-900 dark:text-slate-100 line-clamp-1 group-hover:text-amber-500 transition-colors">
                    {property.title}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 font-medium">
                    <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                    {property.location}
                  </p>

                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                    {property.description}
                  </p>

                  {/* Specs Chips */}
                  <div className="flex items-center justify-between py-2.5 px-3 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800/60 text-xs font-semibold text-slate-600 dark:text-slate-300">
                    <div className="flex items-center gap-1">
                      <Bed className="w-3.5 h-3.5 text-amber-500" /> {property.beds} Bed
                    </div>
                    <div className="flex items-center gap-1">
                      <Bath className="w-3.5 h-3.5 text-amber-500" /> {property.baths} Bath
                    </div>
                    <div className="flex items-center gap-1">
                      <Maximize2 className="w-3.5 h-3.5 text-amber-500" /> {property.sqft} sqft
                    </div>
                  </div>
                </div>
              </div>

              {/* Price & Action Footer */}
              <div className="p-5 pt-0 flex items-center justify-between mt-4">
                <div>
                  <span className="text-xs text-slate-400 font-semibold">Rent Price</span>
                  <div className="text-xl font-extrabold text-amber-600 dark:text-amber-400">
                    ৳{property.price.toLocaleString()}
                    <span className="text-xs text-slate-400 font-normal">/mo</span>
                  </div>
                </div>

                <Link href={`/properties/${property.id}`}>
                  <Button className="h-10 px-5 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-white font-bold text-xs transition-all duration-300">
                    View Details <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </Button>
                </Link>
              </div>

            </div>
          ))}
        </div>

        {/* Pagination Footer */}
        <div className="p-4 bg-white dark:bg-[#07090e] border border-slate-200/80 dark:border-slate-800/80 rounded-2xl flex items-center justify-between text-xs text-slate-500 font-medium">
          <span>Showing 1 to 3 of 3 public properties</span>
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