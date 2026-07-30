"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import { 
  Building2, 
  PlusCircle, 
  MessageSquare, 
  Wallet, 
  Wrench, 
  TrendingUp, 
  ArrowRight,
  Sparkles,
  Home
} from "lucide-react";
import { cn } from "@/lib/utils";

// 🌟 Enterprise-grade Landlord Features Data
const landlordFeatures = [
  {
    title: "My Listed Properties",
    description: "View, edit, and manage all your active property listings, unit availability, and rental pricing.",
    icon: Building2,
    color: "text-emerald-600 dark:text-emerald-400",
    bgGradient: "from-emerald-500/15 to-emerald-500/5 dark:from-emerald-500/20 dark:to-emerald-500/5",
    hoverBorder: "hover:border-emerald-500/40 dark:hover:border-emerald-500/50",
  },
  {
    title: "Add New Listing",
    description: "Post new apartments, houses, or commercial spaces with high-quality photos and detailed amenities.",
    icon: PlusCircle,
    color: "text-blue-600 dark:text-blue-400",
    bgGradient: "from-blue-500/15 to-blue-500/5 dark:from-blue-500/20 dark:to-blue-500/5",
    hoverBorder: "hover:border-blue-500/40 dark:hover:border-blue-500/50",
  },
  {
    title: "Tenant Inquiries",
    description: "Respond to direct messages, booking requests, and tour schedules sent by prospective tenants.",
    icon: MessageSquare,
    color: "text-amber-600 dark:text-amber-400",
    bgGradient: "from-amber-500/15 to-amber-500/5 dark:from-amber-500/20 dark:to-amber-500/5",
    hoverBorder: "hover:border-amber-500/40 dark:hover:border-amber-500/50",
  },
  {
    title: "Rent & Payments",
    description: "Track monthly rent collections, pending tenant dues, payout history, and payment receipts.",
    icon: Wallet,
    color: "text-indigo-600 dark:text-indigo-400",
    bgGradient: "from-indigo-500/15 to-indigo-500/5 dark:from-indigo-500/20 dark:to-indigo-500/5",
    hoverBorder: "hover:border-indigo-500/40 dark:hover:border-indigo-500/50",
  },
  {
    title: "Maintenance Requests",
    description: "Monitor repair tickets, plumbing, and facility maintenance issues submitted by current tenants.",
    icon: Wrench,
    color: "text-rose-600 dark:text-rose-400",
    bgGradient: "from-rose-500/15 to-rose-500/5 dark:from-rose-500/20 dark:to-rose-500/5",
    hoverBorder: "hover:border-rose-500/40 dark:hover:border-rose-500/50",
  },
  {
    title: "Performance Analytics",
    description: "Analyze property impression views, booking lead conversion rates, and revenue generation metrics.",
    icon: TrendingUp,
    color: "text-teal-600 dark:text-teal-400",
    bgGradient: "from-teal-500/15 to-teal-500/5 dark:from-teal-500/20 dark:to-teal-500/5",
    hoverBorder: "hover:border-teal-500/40 dark:hover:border-teal-500/50",
  },
];

// 🌟 Framer Motion Variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 300, damping: 24 } 
  },
};

export default function LandlordDashboard() {
  return (
    <div className="space-y-10 pb-12 font-sans transition-colors duration-300">
      
      {/* 🌟 Adaptive Ultra-Premium Hero Banner */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-amber-50/80 via-white to-slate-100 p-8 shadow-xl shadow-slate-200/50 dark:bg-[#07090e] dark:from-slate-900 dark:via-[#07090e] dark:to-[#0a0f16] dark:shadow-2xl sm:p-12 sm:py-16 border border-amber-200/60 dark:border-amber-500/20"
      >
        {/* Subtle glowing borders and mesh background */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-orange-500/5 dark:from-transparent dark:to-transparent z-0 pointer-events-none" />
        
        {/* Animated Background Glowing Orbs */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-20 -top-32 h-[500px] w-[500px] rounded-full bg-amber-400/20 dark:bg-amber-500/20 blur-[120px] pointer-events-none z-0" 
        />
        <motion.div 
          animate={{ scale: [1, 1.4, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-40 left-10 h-[400px] w-[400px] rounded-full bg-orange-400/20 dark:bg-orange-600/20 blur-[100px] pointer-events-none z-0" 
        />

        <div className="relative z-10 max-w-3xl">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-amber-500/20 bg-amber-500/10 dark:border-amber-500/30 dark:bg-amber-500/10 px-5 py-2 text-sm font-semibold text-amber-700 dark:text-amber-200 backdrop-blur-md shadow-sm"
          >
            <Home className="h-4 w-4 text-amber-600 dark:text-amber-400 drop-shadow-sm" />
            <span className="tracking-wide uppercase text-[11px]">Verified Landlord Portal</span>
          </motion.div>
          
          <h1 className="mb-5 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-slate-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-white dark:via-slate-200 dark:to-slate-400">
            Welcome to your <br className="hidden sm:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-200 dark:to-amber-500">
              Property Empire
            </span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl font-medium">
            Manage your real estate listings, respond to prospective tenant inquiries, track rent payments, and optimize performance across <span className="text-amber-600 dark:text-amber-400 font-semibold">UrbanNest</span>.
          </p>
        </div>
      </motion.div>

      {/* 🚀 Features Grid Area */}
      <div className="pt-2">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-8 flex items-center gap-3"
        >
          <div className="p-2.5 bg-amber-500/10 dark:bg-amber-500/10 rounded-xl border border-amber-500/20">
            <Sparkles className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Landlord Management Actions
          </h2>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {landlordFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className={cn(
                  "group relative cursor-pointer overflow-hidden rounded-2xl p-7 transition-all duration-300",
                  "bg-white/80 dark:bg-[#0a0f16]/80 backdrop-blur-xl",
                  "border border-slate-200/80 dark:border-slate-800/60",
                  "shadow-sm hover:shadow-xl hover:shadow-amber-500/10 dark:hover:shadow-black/60",
                  feature.hoverBorder
                )}
              >
                {/* Subtle Gradient Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-100/60 via-transparent to-amber-50/30 opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:from-white/5 dark:to-transparent" />
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="mb-6 flex items-start justify-between">
                    <div
                      className={cn(
                        "flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br shadow-inner transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3",
                        feature.bgGradient,
                        feature.color
                      )}
                    >
                      <Icon className="h-7 w-7" strokeWidth={1.5} />
                    </div>
                    <div className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-800/60 flex items-center justify-center opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                      <ArrowRight className="h-4 w-4 text-slate-700 dark:text-slate-300" />
                    </div>
                  </div>
                  
                  <h3 className="mb-3 text-xl font-bold text-slate-900 dark:text-slate-100">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium mt-auto">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
      
    </div>
  );
}