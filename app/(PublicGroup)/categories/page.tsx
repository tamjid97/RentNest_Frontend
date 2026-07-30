"use client"; // ক্লায়েন্ট কম্পোনেন্টে রূপান্তর করা হয়েছে কারণ এখানে সার্ভার অ্যাকশনের ডেটা লোড করতে হবে

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  Building2, // ক্যাটাগরির জন্য ডিফল্ট আইকন যোগ করা হয়েছে
} from "lucide-react";
import { getCatagory } from "../_action/catagory";

interface IScatagory {
  id: string;
  name: string;
  description?: string; // ব্যাকএন্ডের ডেটার সাথে মিল রাখতে এগুলো অপশনাল প্রপার্টি হিসেবে রাখা হলো
  slug?: string;
  image?: string;
}

export default function PublicCategoriesPage() {
  // 🌟 ১. ক্যাটাগরি ডেটা এবং লোডিং স্টেট ডিক্লেয়ার করা হলো
  const [categories, setCategories] = useState<IScatagory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // 🌟 ২. পেজ লোড হওয়ার সাথে সাথে সার্ভার অ্যাকশন কল করে ডেটা ফেচ করা হলো
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCatagory();
        if (response.success && response.data) {
          // ব্যাকএন্ড থেকে আসা ডেটা স্টেটে সেট করা হলো
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
        
        {/* লোডিং অবস্থা দেখানোর জন্য */}
        {loading ? (
          <div className="text-center py-20 text-slate-400 font-medium">
            Loading categories...
          </div>
        ) : categories.length === 0 ? (
          // ডেটা না থাকলে মেসেজ দেখানোর জন্য
          <div className="text-center py-20 text-slate-400 font-medium">
            No categories found!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            
            {/* 🌟 ৩. ডামি ডেটার বদলে ডায়নামিক ক্যাটাগরি অ্যারে ম্যাপ (Map) করা হলো */}
            {categories.map((category) => {
              // ক্যাটাগরির নিজস্ব ছবি বা আইকন না থাকলে ফলব্যাক বা ডিফল্ট ব্যবহার করা যাবে
              const categoryImage = category.image || "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600&auto=format&fit=crop";
              const categorySlug = category.slug || category.name.toLowerCase();

              return (
                <Link key={category.id} href={`/properties?category=${categorySlug}`}>
                  <div className="group relative bg-white dark:bg-[#07090e] border border-slate-200/80 dark:border-slate-800/80 rounded-3xl overflow-hidden shadow-xl shadow-slate-200/40 dark:shadow-none hover:border-amber-500/50 transition-all duration-300 h-full flex flex-col cursor-pointer">
                    
                    {/* Image Header */}
                    <div className="relative h-48 w-full overflow-hidden">
                      <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/20 transition-colors z-10" />
                      <img
                        src={categoryImage}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                      />
                      
                      {/* Floating Icon */}
                      <div className="absolute top-4 left-4 z-20 w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-lg">
                        <Building2 className="w-5 h-5 drop-shadow-md" />
                      </div>

                      {/* Trending Badge (ঐচ্ছিক চাইলে রাখতে পারেন) */}
                      <span className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full text-[10px] font-bold bg-amber-500 text-slate-950 flex items-center gap-1 shadow-lg shadow-amber-500/30">
                        <TrendingUp className="w-3 h-3" /> Popular
                      </span>
                    </div>

                    {/* Category Details */}
                    <div className="p-6 flex flex-col flex-grow justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 group-hover:text-amber-500 transition-colors">
                            {category.name}
                          </h2>
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                          {category.description || "Explore properties under this category."}
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
        )}

      </div>

    </div>
  );
}