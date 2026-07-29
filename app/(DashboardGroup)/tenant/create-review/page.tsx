"use client";

import React, { useState } from "react";
import {
  Star,
  Sparkles,
  MapPin,
  MessageSquare,
  Send,
  Home,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// 🌟 Dummy Property Data being reviewed
const PROPERTY_DETAILS = {
  propertyId: "2d2b61bf-e854-4deb-a99b-4bc21ec543a7",
  title: "Modern & Cozy City Apartment",
  location: "Dhanmondi, Dhaka",
  image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800&auto=format&fit=crop",
  landlord: "Karim Ahmed",
};

export default function CreateReviewPage() {
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState("Very nice and clean apartment! Recommended.");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 🌟 Exact API Payload Structure requested
    const payload = {
      propertyId: PROPERTY_DETAILS.propertyId,
      rating: rating,
      comment: comment,
    };

    console.log("Submitting Review Payload:", payload);
    alert("Review submitted successfully! (Check console for payload)");
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-4xl mx-auto">
      
      {/* 🌟 Top Header */}
      <div className="flex items-center gap-4 pb-6 border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/20">
          <Star className="w-6 h-6 stroke-[2.5]" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-2">
            Write a Property Review
            <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
            Share your experience to help other tenants and rate your stay.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* 🌟 Left: Property Summary Card */}
        <div className="md:col-span-5 bg-white dark:bg-[#07090e] border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-5 shadow-xl shadow-slate-200/40 dark:shadow-none">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Home className="w-4 h-4 text-amber-500" /> Property Overview
          </h3>

          <div className="w-full h-40 rounded-2xl overflow-hidden mb-4">
            <img 
              src={PROPERTY_DETAILS.image} 
              alt={PROPERTY_DETAILS.title} 
              className="w-full h-full object-cover"
            />
          </div>

          <h2 className="text-base font-extrabold text-slate-900 dark:text-slate-100 line-clamp-1">
            {PROPERTY_DETAILS.title}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-1.5 font-medium">
            <MapPin className="w-3.5 h-3.5 text-amber-500" />
            {PROPERTY_DETAILS.location}
          </p>

          <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">Managed by</span>
            <span className="font-bold text-slate-800 dark:text-slate-200">{PROPERTY_DETAILS.landlord}</span>
          </div>
        </div>

        {/* 🌟 Right: Review Form */}
        <div className="md:col-span-7 bg-white dark:bg-[#07090e] border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/40 dark:shadow-none">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Rating Stars Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                Overall Rating
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 focus:outline-none transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        (hoverRating || rating) >= star
                          ? "fill-amber-400 text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]"
                          : "text-slate-300 dark:text-slate-700"
                      } transition-colors duration-200`}
                    />
                  </button>
                ))}
                <span className="ml-3 px-3 py-1 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 font-extrabold text-sm border border-amber-500/20">
                  {rating} / 5 Stars
                </span>
              </div>
            </div>

            {/* Comment Textarea */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-amber-500" /> Your Review Comment
              </label>
              <textarea
                rows={4}
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your feedback about the property, cleanliness, amenities, and landlord..."
                className="w-full rounded-2xl border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-sm font-medium p-4 focus-visible:ring-2 focus-visible:ring-amber-500 focus:outline-none resize-none text-slate-800 dark:text-slate-200"
              />
            </div>

            {/* Hidden Property ID */}
            <input type="hidden" name="propertyId" value={PROPERTY_DETAILS.propertyId} />

            {/* Submit Action Button */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-3">
              <Button
                type="submit"
                className="w-full sm:w-auto h-12 px-8 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-extrabold shadow-lg shadow-amber-500/25 text-xs transition-all duration-300"
              >
                <Send className="w-4 h-4 mr-2" />
                Submit Review
              </Button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}