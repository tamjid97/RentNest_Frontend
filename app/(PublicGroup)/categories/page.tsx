import React from "react";
import Link from "next/link";
import {
  Building2,
  Sparkles,
  Home,
  Tent,
  Hotel,
  Key,
  ArrowRight,
  TrendingUp,
} from "lucide-react";

// 🌟 Dummy Data for Public Property Categories
const PROPERTY_CATEGORIES = [
  {
    id: "CAT-001",
    name: "Apartments",
    slug: "apartments",
    description: "Modern and spacious apartments for families and professionals.",
    count: 124,
    icon: Building2,
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=600&auto=format&fit=crop",
    trending: true,
  },
  {
    id: "CAT-002",
    name: "Duplex Homes",
    slug: "duplex",
    description: "Premium luxury duplexes with top-notch security and amenities.",
    count: 45,
    icon: Home,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=600&auto=format&fit=crop",
    trending: false,
  },
  {
    id: "CAT-003",
    name: "Studio Flats",
    slug: "studio",
    description: "Compact and cozy studios ideal for singles or students.",
    count: 89,
    icon: Key,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=600&auto=format&fit=crop",
    trending: true,
  },
  {
    id: "CAT-004",
    name: "Villas / Resorts",
    slug: "villas",
    description: "Exclusive vacation homes and private villas for rent.",
    count: 12,
    icon: Hotel,
    image: "https://images.unsplash.com/photo-1613490908592-fd5e43f3366c?q=80&w=600&auto=format&fit=crop",
    trending: false,
  },
  {
    id: "CAT-005",
    name: "Sublet / Shared Room",
    slug: "sublet",
    description: "Affordable shared accommodations and sublets for bachelors.",
    count: 210,
    icon: Tent,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=600&auto=format&fit=crop",
    trending: true,
  },
];

export default function PublicCategoriesPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#04060a] text-slate-900 dark:text-slate-100 pb-16">
      
      {/* 🌟 Hero Header Section */}
      <div className="bg-white dark:bg-[#07090e] border-b border-slate-200/80 dark:border-slate-800/80 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-extrabold">
            <Sparkles className="w-4 h-4" /> Discover by Type
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Browse Property <span className="text-amber-500">Categories</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium">
            Explore different types of rental properties. From luxury duplexes to cozy shared rooms, find exactly what fits your lifestyle.
          </p>
        </div>
      </div>

      {/* 🌟 Categories Grid Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          
          {PROPERTY_CATEGORIES.map((category) => {
            const Icon = category.icon;
            return (
              <Link key={category.id} href={`/properties?category=${category.slug}`}>
                <div className="group relative bg-white dark:bg-[#07090e] border border-slate-200/80 dark:border-slate-800/80 rounded-3xl overflow-hidden shadow-xl shadow-slate-200/40 dark:shadow-none hover:border-amber-500/50 transition-all duration-300 h-full flex flex-col cursor-pointer">
                  
                  {/* Image Header */}
                  <div className="relative h-48 w-full overflow-hidden">
                    <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/20 transition-colors z-10" />
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    />
                    
                    {/* Floating Icon */}
                    <div className="absolute top-4 left-4 z-20 w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-lg">
                      <Icon className="w-5 h-5 drop-shadow-md" />
                    </div>

                    {/* Trending Badge */}
                    {category.trending && (
                      <span className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full text-[10px] font-bold bg-amber-500 text-slate-950 flex items-center gap-1 shadow-lg shadow-amber-500/30">
                        <TrendingUp className="w-3 h-3" /> Trending
                      </span>
                    )}
                  </div>

                  {/* Category Details */}
                  <div className="p-6 flex flex-col flex-grow justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 group-hover:text-amber-500 transition-colors">
                          {category.name}
                        </h2>
                        <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs font-bold border border-slate-200 dark:border-slate-700">
                          {category.count} Listings
                        </span>
                      </div>
                      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                        {category.description}
                      </p>
                    </div>

                    {/* Action Footer */}
                    <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center text-amber-600 dark:text-amber-500 font-bold text-sm group-hover:translate-x-1 transition-transform">
                      Explore Properties <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </div>

                </div>
              </Link>
            );
          })}

        </div>
      </div>

    </div>
  );
}