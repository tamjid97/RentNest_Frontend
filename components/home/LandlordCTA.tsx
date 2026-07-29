'use client'

import Link from 'next/link'
import { ArrowRight, Building, ShieldCheck, Sparkles, TrendingUp, Users } from 'lucide-react'
import { motion } from 'framer-motion'

export default function LandlordCTA() {
  return (
    <section className="relative w-full py-28 px-4 sm:px-6 lg:px-8bg-slate-50 dark:bg-[#030712] overflow-hidden transition-colors duration-300">
      
      {/* Background Ambient Glowing Orbs */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-amber-500/10 dark:bg-amber-500/5 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-10 w-[500px] h-[500px] bg-amber-600/10 dark:bg-amber-600/5 rounded-full blur-[150px] pointer-events-none"></div>

      {/* Main Container */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mx-auto max-w-7xl relative rounded-[3rem] bg-gradient-to-br from-white via-amber-50/60 to-amber-100/40 dark:from-slate-900 dark:via-slate-950 dark:to-[#020617] border border-amber-500/30 dark:border-amber-500/30 p-8 sm:p-12 md:p-20 overflow-hidden shadow-2xl shadow-amber-500/10 dark:shadow-amber-500/15 transition-colors duration-300"
      >
        {/* Inner Background Glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-amber-500/15 dark:from-amber-500/20 to-transparent rounded-full blur-[140px] pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-amber-600/10 dark:from-amber-600/15 to-transparent rounded-full blur-[130px] pointer-events-none -translate-x-1/3 translate-y-1/3"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-7 text-left"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-4 py-1.5 text-xs font-extrabold text-amber-700 dark:text-amber-400 mb-6 backdrop-blur-md uppercase tracking-widest shadow-sm">
              <Sparkles className="h-4 w-4 animate-pulse" />
              For Property Owners & Landlords
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight leading-[1.1]">
              Own a Property? <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 dark:from-amber-300 dark:via-amber-400 dark:to-amber-600 filter drop-shadow-sm">
                List & Earn More Today.
              </span>
            </h2>

            <p className="text-slate-600 dark:text-slate-300 font-normal text-base sm:text-lg mb-10 max-w-xl leading-relaxed">
              Join RentNest today. List your property for free, find 100% verified tenants instantly, and manage your rent collection completely online without hassle.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link 
                href="/list-property" 
                className="group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 px-8 py-4 rounded-2xl font-extrabold text-base shadow-lg shadow-amber-500/25 hover:shadow-[0_0_35px_rgba(245,158,11,0.6)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 overflow-hidden"
              >
                <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative z-10">List Your Property Free</span>
                <ArrowRight className="h-5 w-5 relative z-10 transition-transform duration-300 group-hover:translate-x-1.5" />
              </Link>
              
              <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/80 dark:bg-white/[0.06] border border-amber-500/20 dark:border-white/10 backdrop-blur-md shadow-sm">
                <ShieldCheck className="h-6 w-6 text-amber-600 dark:text-amber-400 shrink-0" />
                <div className="text-left">
                  <p className="text-xs text-slate-500 dark:text-slate-400">Zero Risk</p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">Verified Agreements</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Ultra-Animated Floating Card */}
          <div className="lg:col-span-5 relative flex justify-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              animate={{ y: [0, -12, 0] }}
              transition={{
                duration: 0.7,
                delay: 0.3,
                y: {
                  repeat: Infinity,
                  duration: 5,
                  ease: "easeInOut"
                }
              }}
              className="w-full max-w-md bg-white/90 dark:bg-slate-900/80 backdrop-blur-3xl border border-amber-500/30 dark:border-amber-500/40 p-6 sm:p-8 rounded-[2.5rem] shadow-[0_20px_50px_rgba(245,158,11,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative overflow-hidden group hover:border-amber-500/70 hover:shadow-[0_25px_60px_rgba(245,158,11,0.2)] transition-all duration-500"
            >
              {/* Decorative Background Icon watermark */}
              <div className="absolute -right-8 -bottom-8 opacity-5 dark:opacity-10 pointer-events-none group-hover:scale-125 group-hover:rotate-12 transition-all duration-700">
                <Building className="h-56 w-56 text-amber-600 dark:text-amber-400" />
              </div>

              {/* Floating Live Badge */}
              <div className="absolute top-6 right-6 inline-flex items-center gap-1.5 bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-bold text-amber-700 dark:text-amber-400 backdrop-blur-md shadow-sm">
                <span className="w-2 h-2 rounded-full bg-amber-500 dark:bg-amber-400 animate-ping"></span>
                Live Sync
              </div>

              <div className="flex items-center gap-3 mb-6">
                <motion.div 
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  className="h-14 w-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 dark:from-amber-500/30 dark:to-amber-600/10 border border-amber-500/30 dark:border-amber-500/40 flex items-center justify-center text-amber-600 dark:text-amber-400 shadow-lg shadow-amber-500/10"
                >
                  <TrendingUp className="h-7 w-7" />
                </motion.div>
                <div>
                  <h4 className="font-extrabold text-slate-900 dark:text-white text-lg">Average Return</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Higher occupancy rate</p>
                </div>
              </div>

              <div className="mb-6 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border-l-4 border-amber-500 p-3.5 rounded-r-2xl">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">Revenue Boost</span>
                  <span className="text-amber-600 dark:text-amber-400 font-black text-base">+35% Revenue</span>
                </div>
              </div>

              {/* Mini Stats Grid with interactive hover */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <motion.div 
                  whileHover={{ scale: 1.03, backgroundColor: "rgba(245, 158, 11, 0.08)" }}
                  className="bg-amber-50/60 dark:bg-white/[0.04] p-4 rounded-2xl border border-amber-500/20 dark:border-white/10 transition-colors shadow-sm"
                >
                  <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 mb-1">
                    <Users className="h-4 w-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">Tenants</span>
                  </div>
                  <p className="text-2xl font-black text-slate-900 dark:text-white">5,000+</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Active daily seekers</p>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.03, backgroundColor: "rgba(245, 158, 11, 0.08)" }}
                  className="bg-amber-50/60 dark:bg-white/[0.04] p-4 rounded-2xl border border-amber-500/20 dark:border-white/10 transition-colors shadow-sm"
                >
                  <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 mb-1">
                    <ShieldCheck className="h-4 w-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">Payouts</span>
                  </div>
                  <p className="text-2xl font-black text-slate-900 dark:text-white">100%</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">On-time digital rent</p>
                </motion.div>
              </div>

            </motion.div>
          </div>

        </div>
      </motion.div>
    </section>
  )
}