"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Star,
  ArrowLeft,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CreateReviewPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const propertyId = searchParams.get("propertyId");

  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!propertyId) {
      setErrorMessage("Property ID is missing from the query parameters.");
      return;
    }

    if (!comment.trim()) {
      setErrorMessage("Please write a comment for your review.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      // এখানে আপনার ব্যাকএন্ড API বা Server Action কল করতে পারেন
      // যেমন: await createReviewAction({ propertyId, rating, comment });
      
      // সিমুলেশনের জন্য ১ সেকেন্ড ওয়েট করা হচ্ছে
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSuccessMessage(true);
      setTimeout(() => {
        router.push("/tenant/payments"); // সাবমিট হওয়ার পর পেমেন্টস পেজে রিডাইরেক্ট হবে
      }, 2000);
    } catch (err) {
      console.error(err);
      setErrorMessage("Failed to submit review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-2xl mx-auto">
      {/* Top Navigation & Header */}
      <div className="flex items-center gap-3.5 pb-6 border-b border-slate-200/80 dark:border-slate-800/80">
        <Link href="/tenant/payments">
          <Button variant="outline" size="icon" className="h-11 w-11 rounded-2xl border-slate-200 dark:border-slate-800 hover:bg-amber-500 hover:text-slate-950 transition-all">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/20">
          <Star className="w-6 h-6 fill-slate-950" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Write a Review
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
            Share your experience about this property
          </p>
        </div>
      </div>

      {/* Main Review Form Card */}
      <div className="bg-white dark:bg-[#07090e] border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/40 dark:shadow-none">
        {successMessage ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              Review Submitted Successfully!
            </h3>
            <p className="text-xs text-slate-500">
              Thank you for your valuable feedback. Redirecting...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {errorMessage && (
              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {!propertyId && (
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>Warning: Property ID is missing from the URL. Review submission might fail.</span>
              </div>
            )}

            {/* Rating Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Select Rating
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
                          ? "fill-amber-400 text-amber-400"
                          : "text-slate-300 dark:text-slate-700"
                      } transition-colors`}
                    />
                  </button>
                ))}
                <span className="ml-3 font-extrabold text-sm text-slate-800 dark:text-slate-200">
                  {rating} / 5 Stars
                </span>
              </div>
            </div>

            {/* Review Comment Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Your Feedback
              </label>
              <textarea
                rows={5}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write about your stay, property condition, landlord behavior, etc..."
                className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-4 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all resize-none"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-extrabold text-sm shadow-lg shadow-amber-500/25 transition-all"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Submitting...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" /> Submit Review
                </>
              )}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}