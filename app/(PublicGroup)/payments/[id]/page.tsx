import React from "react";
import Link from "next/link";
import {
  Receipt,
  Sparkles,
  ArrowLeft,
  Calendar,
  MapPin,
  CheckCircle2,
  Clock,
  Building2,
  Download,
  Printer,
  ShieldCheck,
  CreditCard,
  User,
  Hash,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// 🌟 Dummy Single Payment Details Data
const PAYMENT_DETAILS = {
  id: "TXN-992140",
  status: "PAID",
  amount: 10000,
  month: "July, 2026",
  paymentDate: "2026-07-15T10:30:00.000Z",
  method: "bKash / Online Gateway",
  gatewayRef: "BKASH-77892341",
  property: {
    id: "aff955e7-32dc-4daf-9c07-db9ca6d9abb4",
    title: "Modern Apartment with City View",
    location: "Borishal, Bangladesh",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop",
    landlord: "Rahim Uddin",
  },
  tenant: {
    name: "Anik Rahman",
    email: "anik.rahman@gmail.com",
    phone: "+880 1712-345678",
  },
};

export default function PaymentDetailsPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-4xl mx-auto">
      
      {/* 🌟 Top Navigation & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="flex items-center gap-3.5">
          <Link href="/dashboard/tenant/payments">
            <Button variant="outline" size="icon" className="h-11 w-11 rounded-2xl border-slate-200 dark:border-slate-800 hover:bg-amber-500 hover:text-slate-950 transition-all">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/20">
            <Receipt className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
                Payment Details
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                {PAYMENT_DETAILS.id}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
              Official rent invoice and transaction receipt
            </p>
          </div>
        </div>

        {/* Status Badge */}
        <div>
          {PAYMENT_DETAILS.status === "PAID" ? (
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs font-extrabold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <CheckCircle2 className="w-4 h-4" /> Status: Successfully Paid
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs font-extrabold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              <Clock className="w-4 h-4" /> Status: Pending Payment
            </span>
          )}
        </div>
      </div>

      {/* 🌟 Main Invoice Container */}
      <div className="bg-white dark:bg-[#07090e] border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/40 dark:shadow-none space-y-8">
        
        {/* Top Summary Amount & Receipt Banner */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-transparent border border-amber-500/20">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Amount Paid</span>
            <h2 className="text-3xl font-extrabold text-amber-600 dark:text-amber-400 mt-1">
              ৳{PAYMENT_DETAILS.amount.toLocaleString()}
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Rent Period: <span className="font-bold text-slate-800 dark:text-slate-200">{PAYMENT_DETAILS.month}</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="h-10 px-4 rounded-xl border-slate-200 dark:border-slate-800 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <Printer className="w-4 h-4 mr-2" /> Print
            </Button>
            <Button
              className="h-10 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-extrabold text-xs shadow-md shadow-amber-500/20"
            >
              <Download className="w-4 h-4 mr-2" /> Download PDF
            </Button>
          </div>
        </div>

        {/* Grid Details: Property & Transaction Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
          
          {/* Property Details */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Building2 className="w-4 h-4 text-amber-500" /> Property Information
            </h3>

            <div className="flex gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800/60">
              <img
                src={PAYMENT_DETAILS.property.image}
                alt={PAYMENT_DETAILS.property.title}
                className="w-16 h-16 rounded-xl object-cover shrink-0"
              />
              <div className="flex flex-col justify-center">
                <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 line-clamp-1">
                  {PAYMENT_DETAILS.property.title}
                </h4>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  {PAYMENT_DETAILS.property.location}
                </p>
                <span className="text-xs text-slate-400 mt-1">
                  Landlord: <span className="font-semibold text-slate-700 dark:text-slate-300">{PAYMENT_DETAILS.property.landlord}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Transaction Metadata */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-amber-500" /> Transaction Metadata
            </h3>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800/60 space-y-3 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-semibold flex items-center gap-1.5">
                  <Hash className="w-3.5 h-3.5 text-amber-500" /> Transaction ID:
                </span>
                <span className="font-extrabold text-amber-600 dark:text-amber-400">
                  {PAYMENT_DETAILS.id}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-semibold flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-500" /> Payment Date:
                </span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {new Date(PAYMENT_DETAILS.paymentDate).toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-semibold flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-amber-500" /> Payment Method:
                </span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {PAYMENT_DETAILS.method}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-semibold flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-500" /> Gateway Ref:
                </span>
                <span className="font-mono font-bold text-slate-700 dark:text-slate-300">
                  {PAYMENT_DETAILS.gatewayRef}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Security Note */}
        <div className="pt-6 border-t border-slate-200/80 dark:border-slate-800/80 flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-amber-500 shrink-0" />
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            This is an electronically generated digital invoice verified by the platform. No physical signature required.
          </p>
        </div>

      </div>

    </div>
  );
}