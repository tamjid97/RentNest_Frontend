import React from "react";
import Link from "next/link";
import {
  Receipt,
  Sparkles,
  Calendar,
  MapPin,
  CheckCircle2,
  Clock,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getPaymentHistory } from "../_action/paymentPageAction";

interface PropertyType {
  title: string;
  location: string;
  image: string | null;
}

interface RentalRequestType {
  property: PropertyType;
}

interface PaymentType {
  id: string;
  amount: number;
  status: string;
  provider: string;
  createdAt: string;
  rentalRequest: RentalRequestType;
}

const formatDate = (dateString: string) => {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatMonth = (dateString: string) => {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
  });
};

export default async function TenantPaymentHistoryPage() {
  const response = await getPaymentHistory();

  let payments: PaymentType[] = [];

  if (Array.isArray(response)) {
    payments = response;
  } else if (Array.isArray(response?.data)) {
    payments = response.data;
  } else if (Array.isArray(response?.data?.result)) {
    payments = response.data.result;
  } else if (response?.data && typeof response.data === "object") {
    payments = [response.data];
  }

  const totalPaid = payments
    .filter((p: PaymentType) => p.status === "PAID" || p.status === "COMPLETED")
    .reduce((sum: number, p: PaymentType) => sum + (p.amount || 0), 0);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Top Header & Total Spent Summary */}
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
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Total Paid (Completed)
            </span>
            <span className="text-sm font-extrabold text-amber-600 dark:text-amber-400">
              ৳{totalPaid.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Payment Table Container */}
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
                <th className="py-4 px-6 text-right">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200/70 dark:divide-slate-800/70 text-sm">
              {payments.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500 font-medium">
                    No payment records found.
                  </td>
                </tr>
              ) : (
                payments.map((item: PaymentType) => {
                  const property = item.rentalRequest?.property;
                  const isPaid = item.status === "PAID" || item.status === "COMPLETED";

                  return (
                    <tr
                      key={item.id}
                      className="hover:bg-slate-50/60 dark:hover:bg-slate-900/30 transition-colors group"
                    >
                      {/* Transaction ID & Property */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <img
                            src={property?.image || "https://via.placeholder.com/150"}
                            alt={property?.title || "Property Image"}
                            className="w-14 h-11 rounded-xl object-cover shrink-0"
                          />
                          <div className="flex flex-col">
                            <span className="font-extrabold text-xs text-amber-600 dark:text-amber-400">
                              TXN-{item.id.substring(0, 8).toUpperCase()}
                            </span>
                            <span className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-amber-500 transition-colors line-clamp-1 mt-0.5">
                              {property?.title || "Unknown Property"}
                            </span>
                            <span className="text-xs text-slate-400 flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-amber-500" />{" "}
                              {property?.location || "N/A"}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Rent Month */}
                      <td className="py-4 px-6">
                        <span className="font-semibold text-slate-700 dark:text-slate-300 text-xs">
                          {formatMonth(item.createdAt)}
                        </span>
                      </td>

                      {/* Amount */}
                      <td className="py-4 px-6">
                        <span className="font-extrabold text-slate-900 dark:text-slate-100">
                          ৳{item.amount?.toLocaleString()}
                        </span>
                      </td>

                      {/* Date & Method */}
                      <td className="py-4 px-6">
                        <div className="flex flex-col text-xs space-y-1">
                          <span className="font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-amber-500" />{" "}
                            {formatDate(item.createdAt)}
                          </span>
                          <span className="text-slate-400">
                            Via: {item.provider || "N/A"}
                          </span>
                        </div>
                      </td>

                      {/* Status Badge */}
                      <td className="py-4 px-6">
                        {isPaid ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Paid
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                            <Clock className="w-3.5 h-3.5" /> Pending
                          </span>
                        )}
                      </td>

                      {/* View Details Action with Link */}
                      <td className="py-4 px-6 text-right">
                        {isPaid ? (
                          <Link href={`/tenant/payments/${item.id}`}>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-9 px-3 rounded-xl border-amber-500/30 text-amber-600 dark:text-amber-400 hover:bg-amber-500 hover:text-slate-950 font-bold text-xs transition-all duration-200"
                            >
                              <Eye className="w-3.5 h-3.5 mr-1.5" /> View Details
                            </Button>
                          </Link>
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
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 font-medium">
          <span>
            Showing {payments.length > 0 ? 1 : 0} to {payments.length} of {payments.length} payment records
          </span>
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