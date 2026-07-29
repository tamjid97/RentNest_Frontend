'use client'

import { useState } from 'react'
import { Search, MapPin, Home as HomeIcon, Sparkles, Star, ShieldCheck, Building } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState('')
  const [location, setLocation] = useState('')

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, type: "spring", bounce: 0.3 } }
  }

  return (
    <section className="relative w-full min-h-[95vh] flex flex-col justify-center overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24 bg-slate-50 dark:bg-[#030712]">
      
      {/* ================= ULTRA PREMIUM BACKGROUND EFFECTS ================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f59e0b08_1px,transparent_1px),linear-gradient(to_bottom,#f59e0b08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_70%,transparent_110%)]"></div>
        
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] bg-amber-500/20 dark:bg-amber-500/15 rounded-full blur-[140px]"
        />
        <motion.div 
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-[150px]"
        />
      </div>
      
      {/* ================= MAIN CONTENT ================= */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center w-full"
        >
          {/* Floating Luxury Badge */}
          <motion.div variants={itemVariants} className="mb-10">
            <motion.div 
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-white/60 dark:bg-white/5 px-6 py-2.5 text-sm font-semibold text-amber-600 dark:text-amber-400 backdrop-blur-xl shadow-[0_4px_24px_-8px_rgba(245,158,11,0.3)]"
            >
              <Sparkles className="h-4 w-4" />
              <span className="tracking-widest uppercase text-[11px] md:text-xs">The Premier Luxury Rental Marketplace</span>
            </motion.div>
          </motion.div>

          {/* Premium Headline */}
          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8 leading-[1.1] text-slate-900 dark:text-white drop-shadow-sm">
            Find Your Next <br className="hidden md:block" />
            <span className="relative whitespace-nowrap inline-block mt-2 md:mt-0">
              <span className="absolute -inset-1 block -skew-y-3 bg-amber-500/30 dark:bg-amber-500/40 blur-2xl opacity-60"></span>
              <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 dark:from-amber-300 dark:via-amber-400 dark:to-amber-500 drop-shadow-lg">
                Perfect Home
              </span>
            </span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-14 leading-relaxed font-medium">
            Discover verified luxury apartments, houses, and villas. Empowering landlords and tenants through smart, transparent property management.
          </motion.p>

          {/* ================= ULTRA CLEAN & PREMIUM SEARCH BAR ================= */}
          <motion.div variants={itemVariants} className="w-full max-w-4xl relative group z-20">
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/30 to-indigo-500/30 rounded-[2.5rem] blur-xl opacity-50 group-hover:opacity-80 transition duration-700"></div>
            
            <div className="relative bg-white/80 dark:bg-[#0b1120]/80 p-3 md:p-3 rounded-[2.5rem] border border-white/60 dark:border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.6)] backdrop-blur-2xl flex flex-col md:flex-row gap-2">
              
              {/* Location Input */}
              <div className="flex-1 flex items-center gap-3.5 px-6 py-4 rounded-[2rem] bg-slate-100/70 dark:bg-white/5 border border-slate-200/60 dark:border-white/5 focus-within:ring-2 focus-within:ring-amber-500/50 focus-within:bg-white dark:focus-within:bg-white/10 transition-all">
                <div className="p-2.5 bg-amber-500/10 rounded-2xl shrink-0">
                  <MapPin className="h-5 w-5 text-amber-500" />
                </div>
                <div className="flex flex-col text-left w-full">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Location</span>
                  <input 
                    type="text" 
                    placeholder="City, Neighborhood..." 
                    value={location} 
                    onChange={(e) => setLocation(e.target.value)} 
                    className="w-full bg-transparent outline-none text-sm md:text-base font-semibold text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500" 
                  />
                </div>
              </div>

              {/* Property Type Input */}
              <div className="flex-1 flex items-center gap-3.5 px-6 py-4 rounded-[2rem] bg-slate-100/70 dark:bg-white/5 border border-slate-200/60 dark:border-white/5 focus-within:ring-2 focus-within:ring-amber-500/50 focus-within:bg-white dark:focus-within:bg-white/10 transition-all">
                <div className="p-2.5 bg-amber-500/10 rounded-2xl shrink-0">
                  <HomeIcon className="h-5 w-5 text-amber-500" />
                </div>
                <div className="flex flex-col text-left w-full">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Property Type</span>
                  <input 
                    type="text" 
                    placeholder="Apartment, Villa, House..." 
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)} 
                    className="w-full bg-transparent outline-none text-sm md:text-base font-semibold text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500" 
                  />
                </div>
              </div>

              {/* Search Button */}
              <button className="relative overflow-hidden flex items-center justify-center gap-3 rounded-[2rem] bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 px-8 py-5 text-slate-950 font-extrabold text-base md:text-lg hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_25px_rgba(245,158,11,0.4)] min-w-[160px] group/btn">
                <Search className="h-5 w-5 transition-transform group-hover/btn:rotate-90 duration-300" />
                <span>Search</span>
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent animate-[shimmer_2.5s_infinite_linear]"></div>
              </button>
            </div>
          </motion.div>

          {/* ================= TRUST STATS ================= */}
          <motion.div variants={itemVariants} className="mt-14 flex flex-wrap items-center justify-center gap-8 md:gap-14 text-slate-600 dark:text-slate-400 text-sm md:text-base font-semibold">
            <div className="flex items-center gap-3 hover:text-amber-500 transition-colors cursor-default">
              <div className="p-2.5 bg-white dark:bg-white/5 shadow-sm border border-slate-100 dark:border-white/10 rounded-full"><Building className="h-5 w-5 text-amber-500" /></div>
              <span>10,000+ Properties</span>
            </div>
            <div className="flex items-center gap-3 hover:text-amber-500 transition-colors cursor-default">
              <div className="p-2.5 bg-white dark:bg-white/5 shadow-sm border border-slate-100 dark:border-white/10 rounded-full"><ShieldCheck className="h-5 w-5 text-amber-500" /></div>
              <span>Verified Listings</span>
            </div>
            <div className="flex items-center gap-3 hover:text-amber-500 transition-colors cursor-default">
              <div className="p-2.5 bg-white dark:bg-white/5 shadow-sm border border-slate-100 dark:border-white/10 rounded-full"><Star className="h-5 w-5 text-amber-500" /></div>
              <span>4.9/5 User Ratings</span>
            </div>
          </motion.div>

        </motion.div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </section>
  )
}