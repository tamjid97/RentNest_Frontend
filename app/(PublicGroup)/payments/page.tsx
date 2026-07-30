import React from "react";
import {
  Receipt,
  Sparkles,
  Search,
  Download,
  Calendar,
  MapPin,
  CheckCircle2,
  Clock,
  Building2,
  ChevronLeft,
  ChevronRight,
  CreditCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// 🌟 Dummy Data for Tenant's Payment History
const PAYMENT_HISTORY = [
  {
    id: "TXN-992140",
    property: {
      title: "Modern Apartment with City View",
      location: "Borishal, Bangladesh",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=400&auto=format&fit=crop",
    },
    amount: 10000,
    month: "July, 2026",
    paymentDate: "15 Jul, 2026",
    status: "PAID",
    method: "BKASH / Online",
  },
  {
    id: "TXN-883102",
    property: {
      title: "Luxury Duplex Family Home",
      location: "Gulshan, Dhaka",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=400&auto=format&fit=crop",
    },
    amount: 45000,
    month: "June, 2026",
    paymentDate: "01 Jun, 2026",
    status: "PAID",
    method: "Bank Transfer",
  },
  {
    id: "TXN-772091",
    property: {
      title: "Modern Apartment with City View",
      location: "Borishal, Bangladesh",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=400&auto=format&fit=crop",
    },
    amount: 10000,
    month: "August, 2026",
    paymentDate: "-",
    status: "PENDING",
    method: "Unpaid",
  },
];

export default function TenantPaymentHistoryPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      
      {/* 🌟 Top Header & Total Spent Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/20">
            <Receipt className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-2">
              Payment History
              <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
              Track all your rent payments, transaction IDs, and invoices
            </p>
          </div>
        </div>

        {/* Total Paid Summary Chip */}
        <div className="px-4 py-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-3">
          <CreditCard className="w-5 h-5 text-amber-500" />
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Paid (Completed)</span>
            <span className="text-sm font-extrabold text-amber-600 dark:text-amber-400">৳55,000</span>
          </div>
        </div>
      </div>

      {/* 🌟 Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            type="text"
            placeholder="Search by transaction ID or property..."
            className="h-11 pl-10 pr-4 rounded-xl border-slate-200 dark:border-slate-800 bg-white dark:bg-[#07090e] text-sm font-medium focus-visible:ring-2 focus-visible:ring-amber-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <Button variant="outline" className="h-10 rounded-xl bg-amber-500 text-slate-950 font-bold border-amber-500 hover:bg-amber-600">
            All (3)
          </Button>
          <Button variant="outline" className="h-10 rounded-xl border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800">
            Paid
          </Button>
          <Button variant="outline" className="h-10 rounded-xl border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800">
            Pending
          </Button>
        </div>
      </div>

      {/* 🌟 Payment Table Container */}
      <div className="bg-white dark:bg-[#07090e] border border-slate-200/80 dark:border-slate-800/80 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th className="py-4 px-6">Transaction ID & Property</th>
                <th className="py-4 px-6">Rent Month</th>
                <th className="py-4 px-6">Amount</th>
                <th className="py-4 px-6">Payment Date & Method</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Invoice</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200/70 dark:divide-slate-800/70 text-sm">
              {PAYMENT_HISTORY.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-900/30 transition-colors group">
                  
                  {/* Transaction ID & Property */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.property.image}
                        alt={item.property.title}
                        className="w-14 h-11 rounded-xl object-cover shrink-0"
                      />
                      <div className="flex flex-col">
                        <span className="font-extrabold text-xs text-amber-600 dark:text-amber-400">
                          {item.id}
                        </span>
                        <span className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-amber-500 transition-colors line-clamp-1 mt-0.5">
                          {item.property.title}
                        </span>
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-amber-500" /> {item.property.location}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Rent Month */}
                  <td className="py-4 px-6">
                    <span className="font-semibold text-slate-700 dark:text-slate-300 text-xs">
                      {item.month}
                    </span>
                  </td>

                  {/* Amount */}
                  <td className="py-4 px-6">
                    <span className="font-extrabold text-slate-900 dark:text-slate-100">
                      ৳{item.amount.toLocaleString()}
                    </span>
                  </td>

                  {/* Date & Method */}
                  <td className="py-4 px-6">
                    <div className="flex flex-col text-xs space-y-1">
                      <span className="font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-amber-500" /> {item.paymentDate}
                      </span>
                      <span className="text-slate-400">
                        Via: {item.method}
                      </span>
                    </div>
                  </td>

                  {/* Status Badge */}
                  <td className="py-4 px-6">
                    {item.status === "PAID" && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Paid
                      </span>
                    )}
                    {item.status === "PENDING" && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                        <Clock className="w-3.5 h-3.5" /> Pending
                      </span>
                    )}
                  </td>

                  {/* Download Invoice Action */}
                  <td className="py-4 px-6 text-right">
                    {item.status === "PAID" ? (
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-9 px-3 rounded-xl border-amber-500/30 text-amber-600 dark:text-amber-400 hover:bg-amber-500 hover:text-slate-950 font-bold text-xs transition-all duration-200"
                      >
                        <Download className="w-3.5 h-3.5 mr-1.5" /> Invoice
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        className="h-9 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-extrabold text-xs shadow-md shadow-amber-500/20"
                      >
                        Pay Now
                      </Button>
                    )}
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 font-medium">
          <span>Showing 1 to 3 of 3 payment records</span>
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