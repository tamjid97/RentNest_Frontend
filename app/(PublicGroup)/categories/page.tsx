"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  Building2,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton"; // Shadcn Skeleton Import করা হলো
import { getCatagory } from "../_action/catagory";

interface IScatagory {
  id: string;
  name: string;
  description?: string;
  slug?: string;
  image?: string;
}

export default function PublicCategoriesPage() {
  const [categories, setCategories] = useState<IScatagory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCatagory();
        if (response.success && response.data) {
          setCategories(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#030712] text-slate-900 dark:text-slate-100 pb-20 selection:bg-amber-500 selection:text-black">
      
      {/* 🌟 Luxury Hero Header Section */}
      <div className="relative overflow-hidden bg-white dark:bg-[#07090e] border-b border-slate-200/80 dark:border-slate-800/80 pt-16 pb-16 px-4 sm:px-6 lg:px-8">
        
        {/* Background Subtle Gradient Blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-40 dark:opacity-20 blur-3xl">
          <div className="absolute -top-10 left-1/4 w-72 h-72 bg-amber-500/30 rounded-full" />
          <div className="absolute top-10 right-1/4 w-96 h-96 bg-orange-500/20 rounded-full" />
        </div>

        <div className="relative max-w-7xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-bold tracking-wide shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
            <span>DISCOVER BY TYPE</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 dark:text-white">
            Browse Property <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 bg-clip-text text-transparent">Categories</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-normal leading-relaxed">
            Explore different types of rental properties. From luxury duplexes to cozy shared rooms, find exactly what fits your lifestyle.
          </p>
        </div>
      </div>

      {/* 🌟 Categories Grid Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        
        {/* 🌟 Shadcn Skeleton Loader */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="bg-white dark:bg-[#07090e] border border-slate-200/80 dark:border-slate-800/80 rounded-[28px] overflow-hidden p-3 flex flex-col justify-between">
                {/* Image Skeleton */}
                <Skeleton className="h-48 w-full rounded-[20px]" />
                
                <div className="p-4 space-y-3">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-3.5 w-full" />
                  <Skeleton className="h-3.5 w-5/6" />
                </div>

                <div className="p-4 pt-0">
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
            ))}
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center py-24 bg-white dark:bg-[#07090e] rounded-3xl border border-slate-200 dark:border-slate-800">
            <Building2 className="w-12 h-12 mx-auto text-amber-500/50 mb-3" />
            <h3 className="text-lg font-bold">No Categories Found</h3>
            <p className="text-xs text-slate-500 mt-1">Please check back later for new categories.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {categories.map((category) => {
              const categoryImage = category.image || "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600&auto=format&fit=crop";
              const categorySlug = category.slug || category.name.toLowerCase();

              return (
                <Link key={category.id} href={`/properties?category=${categorySlug}`}>
                  <div className="group relative bg-white dark:bg-[#07090e] border border-slate-200/80 dark:border-slate-800/80 rounded-[28px] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-amber-500/10 hover:-translate-y-1.5 hover:border-amber-500/40 transition-all duration-500 h-full flex flex-col cursor-pointer justify-between">
                    
                    <div>
                      {/* Image Header with Padding & Rounded Frame */}
                      <div className="relative h-48 w-full overflow-hidden p-2 bg-slate-100 dark:bg-slate-900">
                        <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/20 transition-colors z-10 m-2 rounded-[20px]" />
                        <img
                          src={categoryImage}
                          alt={category.name}
                          className="w-full h-full object-cover rounded-[20px] group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        
                        {/* Floating Icon */}
                        <div className="absolute top-5 left-5 z-20 w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-lg">
                          <Building2 className="w-5 h-5 drop-shadow-md" />
                        </div>

                        {/* Trending Badge */}
                        <span className="absolute top-5 right-5 z-20 px-3 py-1 rounded-full text-[10px] font-bold bg-amber-500 text-slate-950 flex items-center gap-1 shadow-lg shadow-amber-500/30">
                          <TrendingUp className="w-3 h-3" /> Popular
                        </span>
                      </div>

                      {/* Category Details */}
                      <div className="p-6">
                        <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 group-hover:text-amber-500 transition-colors mb-2">
                          {category.name}
                        </h2>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                          {category.description || "Explore properties under this category."}
                        </p>
                      </div>
                    </div>

                    {/* Action Footer */}
                    <div className="p-6 pt-0">
                      <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center text-amber-600 dark:text-amber-500 font-extrabold text-xs group-hover:translate-x-1.5 transition-transform">
                        Explore Properties <ArrowRight className="w-4 h-4 ml-2" />
                      </div>
                    </div>

                  </div>
                </Link>
              );
            })}

          </div>
        )}

      </div>

    </div>
  );
}