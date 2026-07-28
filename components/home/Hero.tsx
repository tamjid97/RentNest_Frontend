'use client'
import { useState } from 'react'
import { Search, MapPin, Home as HomeIcon, Sparkles } from 'lucide-react'

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState('')
  const [location, setLocation] = useState('')

  return (
    <section className="relative w-full overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] opacity-30 dark:opacity-20 bg-amber-500 rounded-full blur-[150px] pointer-events-none"></div>
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-sm font-semibold text-amber-600 dark:text-amber-400 mb-8 backdrop-blur-md">
          <Sparkles className="h-4 w-4" />
          <span>The Premier Luxury Rental Marketplace</span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
          Find Your Next <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600">
            Perfect Home
          </span>
        </h1>

        <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Discover verified luxury apartments, houses, and villas. Empowering landlords and tenants through smart, transparent, and seamless property management.
        </p>

        {/* Floating Search Bar */}
        <div className="w-full max-w-4xl bg-white/90 dark:bg-slate-900/80 p-3 md:p-4 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-2xl backdrop-blur-xl flex flex-col md:flex-row gap-3 md:gap-4">
          <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800/50">
            <MapPin className="h-5 w-5 text-amber-500" />
            <input type="text" placeholder="City, Neighborhood..." value={location} onChange={(e) => setLocation(e.target.value)} className="w-full bg-transparent outline-none text-sm font-medium" />
          </div>
          <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800/50">
            <HomeIcon className="h-5 w-5 text-amber-500" />
            <input type="text" placeholder="Property type..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-transparent outline-none text-sm font-medium" />
          </div>
          <button className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 px-8 py-4 text-slate-950 font-bold text-base hover:scale-105 transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)] min-w-[140px]">
            <Search className="h-5 w-5" />
            <span>Search</span>
          </button>
        </div>
      </div>
    </section>
  )
}