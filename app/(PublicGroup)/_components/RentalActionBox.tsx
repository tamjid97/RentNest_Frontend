"use client";

import React, { useState, useTransition, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CreditCard, ShieldCheck } from "lucide-react";
import { createRentalRequestAction } from "../_action/rentalAction";

interface Landlord {
  name?: string;
  profilePhoto?: string | null;
  [key: string]: unknown;
}

interface RentalActionBoxProps {
  propertyId: string;
  price: number;
  landlord?: Landlord | string;
  initialStatus?: string;
}

export default function RentalActionBox({
  propertyId,
  price,
  landlord,
  initialStatus = "",
}: RentalActionBoxProps) {
  const [isPending, startTransition] = useTransition();
  const [requestStatus, setRequestStatus] = useState<string>(initialStatus);
  const [isMounted, setIsMounted] = useState(false);

  // পেজ লোড হওয়ার পর লোকাল স্টোরেজ চেক করবে
  useEffect(() => {
    setIsMounted(true);
    // যদি ব্যাকএন্ড থেকে কোনো স্ট্যাটাস না আসে, তবে লোকাল স্টোরেজ চেক করবে
    if (!initialStatus) {
      const savedStatus = localStorage.getItem(`rental_status_${propertyId}`);
      if (savedStatus) {
        setRequestStatus(savedStatus);
      }
    }
  }, [propertyId, initialStatus]);

  const handleRentalRequest = () => {
    startTransition(async () => {
      const rentalPayload = {
        propertyId: propertyId,
        rentStartDate: new Date().toISOString(),
        rentEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      };

      const result = await createRentalRequestAction(rentalPayload);
      
      if (result.success) {
        setRequestStatus("PENDING");
        // সফল হলে লোকাল স্টোরেজে সেভ করে রাখা হচ্ছে
        localStorage.setItem(`rental_status_${propertyId}`, "PENDING"); 
        alert(result.message || "Rental request submitted successfully!");
      } else {
        alert(result.message || "Failed to submit rental request.");
      }
    });
  };

  let landlordName = "Property Owner";
  let landlordAvatar =
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop";

  if (landlord && typeof landlord === "object") {
    if (typeof landlord.name === "string") landlordName = landlord.name;
    if (typeof landlord.profilePhoto === "string" && landlord.profilePhoto.trim() !== "") {
      landlordAvatar = landlord.profilePhoto;
    }
  }

  // Hydration Error এড়াতে কম্পোনেন্ট মাউন্ট হওয়ার আগে কিছুই রেন্ডার করবে না
  if (!isMounted) return <div className="h-[400px] w-full animate-pulse bg-slate-100 dark:bg-slate-800 rounded-3xl"></div>;

  const currentStatus = requestStatus.toUpperCase();

  return (
    <div className="bg-white dark:bg-[#07090e] border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/40 dark:shadow-none space-y-6">
      
      {/* Price Tag */}
      <div className="flex items-baseline justify-between pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Monthly Rent</span>
          <h2 className="text-3xl font-extrabold text-amber-600 dark:text-amber-400 mt-1">
            ৳{Number(price || 0).toLocaleString()}
          </h2>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
          Per Month
        </span>
      </div>

      {/* Landlord Card */}
      {landlord && (
        <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800/60">
          <img src={landlordAvatar} alt={landlordName} className="w-12 h-12 rounded-xl object-cover ring-2 ring-amber-500/40" />
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Managed By</span>
            <span className="text-sm font-bold text-slate-900 dark:text-slate-100">{landlordName}</span>
            <span className="text-xs text-amber-600 dark:text-amber-400 font-semibold">Verified Landlord</span>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="space-y-3 pt-2">
        {currentStatus === "APPROVED" ? (
          <>
            <div className="w-full h-12 flex items-center justify-center rounded-2xl bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 border border-emerald-600/20 font-extrabold text-xs">
              ✓ Request Approved by Landlord
            </div>
            <Button className="w-full h-14 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-extrabold shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 text-sm">
              <CreditCard className="w-5 h-5 mr-2 stroke-[2.5]" />
              Proceed to Payment
            </Button>
          </>
        ) : currentStatus === "PENDING" || currentStatus === "REQUESTED" ? (
          <Button disabled className="w-full h-12 rounded-2xl bg-amber-400/20 text-amber-600 dark:text-amber-400 border border-amber-400/30 font-extrabold text-xs cursor-not-allowed">
            ⏳ Rental Request Pending...
          </Button>
        ) : (
          <Button onClick={handleRentalRequest} disabled={isPending} variant="outline" className="w-full h-14 rounded-2xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-extrabold hover:bg-slate-800 dark:hover:bg-slate-200 text-sm disabled:opacity-50 transition-all duration-300">
            {isPending ? "Submitting..." : "Submit Rental Request"}
          </Button>
        )}
      </div>

      {/* Security Note */}
      <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center gap-3">
        <ShieldCheck className="w-6 h-6 text-amber-500 shrink-0" />
        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
          Secure transaction guaranteed. Payments are processed through encrypted gateway.
        </p>
      </div>

    </div>
  );
}