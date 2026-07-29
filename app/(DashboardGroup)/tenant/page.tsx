"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import { 
  Heart, 
  MessageSquare, 
  FileText, 
  KeyRound, 
  Wrench, 
  UserCheck, 
  ArrowRight,
  Sparkles,
  Compass
} from "lucide-react";
import { cn } from "@/lib/utils";

// 🌟 Enterprise-grade Tenant Features Data
const tenantFeatures = [
  {
    title: "Saved Properties",
    description: "Access and compare all your bookmarked apartments, luxury suites, and favorite property listings.",
    icon: Heart,
    color: "text-rose-600 dark:text-rose-400",
    bgGradient: "from-rose-500/15 to-rose-500/5 dark:from-rose-500/20 dark:to-rose-500/5",
    hoverBorder: "hover:border-rose-500/40 dark:hover:border-rose-500/50",
  },
  {
    title: "My Inquiries & Chats",
    description: "Manage direct messages with landlords, track response statuses, and view scheduled property tours.",
    icon: MessageSquare,
    color: "text-blue-600 dark:text-blue-400",
    bgGradient: "from-blue-500/15 to-blue-500/5 dark:from-blue-500/20 dark:to-blue-500/5",
    hoverBorder: "hover:border-blue-500/40 dark:hover:border-blue-500/50",
  },
  {
    title: "Rental Applications",
    description: "Track the review status of your submitted rental applications, lease documents, and background checks.",
    icon: FileText,
    color: "text-amber-600 dark:text-amber-400",
    bgGradient: "from-amber-500/15 to-amber-500/5 dark:from-amber-500/20 dark:to-amber-500/5",
    hoverBorder: "hover:border-amber-500/40 dark:hover:border-amber-500/50",
  },
  {
    title: "Active Lease & Rent",
    description: "View current lease agreements, upcoming monthly rent deadlines, payment receipts, and payment history.",
    icon: KeyRound,
    color: "text-indigo-600 dark:text-indigo-400",
    bgGradient: "from-indigo-500/15 to-indigo-500/5 dark:from-indigo-500/20 dark:to-indigo-500/5",
    hoverBorder: "hover:border-indigo-500/40 dark:hover:border-indigo-500/50",
  },
  {
    title: "Repair & Support",
    description: "Submit maintenance tickets for plumbing, electrical, or structural fixes to your current landlord.",
    icon: Wrench,
    color: "text-teal-600 dark:text-teal-400",
    bgGradient: "from-teal-500/15 to-teal-500/5 dark:from-teal-500/20 dark:to-teal-500/5",
    hoverBorder: "hover:border-teal-500/40 dark:hover:border-teal-500/50",
  },
  {
    title: "Profile & Preferences",
    description: "Update your personal profile, set target budget ranges, preferred locations, and notification settings.",
    icon: UserCheck,
    color: "text-purple-600 dark:text-purple-400",
    bgGradient: "from-purple-500/15 to-purple-500/5 dark:from-purple-500/20 dark:to-purple-500/5",
    hoverBorder: "hover:border-purple-500/40 dark:hover:border-purple-500/50",
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

export default function TenantDashboard() {
  return (
    <div className="space-y-10 pb-12 font-sans transition-colors duration-300">
      
      {/* 🌟 Adaptive Ultra-Premium Hero Banner */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-indigo-50/80 via-white to-slate-100 p-8 shadow-xl shadow-slate-200/50 dark:bg-[#07090e] dark:from-slate-900 dark:via-[#07090e] dark:to-[#0a0f16] dark:shadow-2xl sm:p-12 sm:py-16 border border-indigo-200/60 dark:border-indigo-500/20"
      >
        {/* Subtle glowing borders and mesh background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5 dark:from-transparent dark:to-transparent z-0 pointer-events-none" />
        
        {/* Animated Background Glowing Orbs */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-20 -top-32 h-[500px] w-[500px] rounded-full bg-indigo-400/20 dark:bg-indigo-500/20 blur-[120px] pointer-events-none z-0" 
        />
        <motion.div 
          animate={{ scale: [1, 1.4, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-40 left-10 h-[400px] w-[400px] rounded-full bg-purple-400/20 dark:bg-purple-600/20 blur-[100px] pointer-events-none z-0" 
        />

        <div className="relative z-10 max-w-3xl">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-indigo-500/20 bg-indigo-500/10 dark:border-indigo-500/30 dark:bg-indigo-500/10 px-5 py-2 text-sm font-semibold text-indigo-700 dark:text-indigo-200 backdrop-blur-md shadow-sm"
          >
            <Compass className="h-4 w-4 text-indigo-600 dark:text-indigo-400 drop-shadow-sm" />
            <span className="tracking-wide uppercase text-[11px]">Tenant Portal Active</span>
          </motion.div>
          
          <h1 className="mb-5 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-slate-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-white dark:via-slate-200 dark:to-slate-400">
            Welcome to your <br className="hidden sm:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-200 dark:to-purple-400">
              Comfort Zone
            </span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl font-medium">
            Explore saved homes, manage your active inquiries, track rental applications, and communicate with landlords easily across <span className="text-indigo-600 dark:text-indigo-400 font-semibold">UrbanNest</span>.
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
          <div className="p-2.5 bg-indigo-500/10 dark:bg-indigo-500/10 rounded-xl border border-indigo-500/20">
            <Sparkles className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Tenant Hub & Quick Actions
          </h2>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {tenantFeatures.map((feature, index) => {
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
                  "shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 dark:hover:shadow-black/60",
                  feature.hoverBorder
                )}
              >
                {/* Subtle Gradient Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-100/60 via-transparent to-indigo-50/30 opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:from-white/5 dark:to-transparent" />
                
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