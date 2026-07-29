'use client'

import { useState, useEffect } from 'react'
import { Star, Quote, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const testimonials = [
  { 
    id: 1,
    name: 'Rahim Uddin', 
    role: 'Verified Tenant', 
    text: 'RentNest made finding my new apartment in Gulshan so seamless. The verified listings gave me ultimate peace of mind without dealing with brokers.', 
    rating: 5,
    location: 'Gulshan, Dhaka',
    avatarBg: 'from-amber-400 to-amber-600'
  },
  { 
    id: 2,
    name: 'Sarah Ahmed', 
    role: 'Property Landlord', 
    text: 'Listing my property was effortless. I found reliable, background-checked tenants within just 3 days of posting my apartment!', 
    rating: 5,
    location: 'Banani, Dhaka',
    avatarBg: 'from-amber-500 to-yellow-600'
  },
  { 
    id: 3,
    name: 'Tarek Rahman', 
    role: 'Verified Tenant', 
    text: 'The UI is stunning and customer support is top-notch. Digital agreements and secure payments made shifting completely stress-free.', 
    rating: 5,
    location: 'Bashundhara R/A',
    avatarBg: 'from-amber-400 to-orange-500'
  },
  { 
    id: 4,
    name: 'Nusrat Jahan', 
    role: 'Verified Tenant', 
    text: 'Absolute transparency from start to finish. Finding a luxury family flat has never been this fast and straightforward.', 
    rating: 5,
    location: 'Dhanmondi, Dhaka',
    avatarBg: 'from-yellow-400 to-amber-600'
  }
]

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)

  // Auto cycle every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  const activeTestimonial = testimonials[activeIndex]

  return (
    <section className="relative w-full py-28 bg-slate-50 dark:bg-[#030712] overflow-hidden transition-colors  duration-300">
      
      {/* Background Glowing Ambient Orbs */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-amber-500/10 dark:bg-amber-500/[0.07] rounded-full blur-[150px] pointer-events-none"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 dark:bg-amber-500/10 px-4 py-1.5 text-xs font-extrabold text-amber-700 dark:text-amber-400 mb-4 backdrop-blur-md uppercase tracking-widest shadow-sm"
          >
            <Sparkles className="h-4 w-4 animate-pulse" />
            Client Success Stories
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.2] mb-4"
          >
            Trusted by{' '}
            <span className="relative inline-block ml-4 mt-1">
              <span className="absolute -inset-1 block -skew-y-3 bg-amber-500/20 dark:bg-amber-500/20 blur-lg"></span>
              <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 dark:from-amber-300 dark:via-amber-400 dark:to-amber-500">
                Thousands of Users
              </span>
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 dark:text-slate-400 max-w-xl text-base sm:text-lg leading-relaxed"
          >
            Explore firsthand accounts of how RentNest is transforming the rental experience across Dhaka.
          </motion.p>
        </div>

        {/* Split Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Side: Interactive Client List Selection */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {testimonials.map((item, index) => {
              const isActive = activeIndex === index
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setActiveIndex(index)}
                  className={`cursor-pointer p-5 rounded-2xl transition-all duration-300 flex items-center justify-between border ${
                    isActive
                      ? 'bg-white dark:bg-slate-900/90 border-amber-500/60 dark:border-amber-500/50 shadow-[0_10px_30px_rgba(245,158,11,0.12)] dark:shadow-[0_10px_30px_rgba(245,158,11,0.1)] scale-[1.02]'
                      : 'bg-white/50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800/80 hover:border-amber-500/30 hover:bg-white/80 dark:hover:bg-slate-900/70'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${item.avatarBg} flex items-center justify-center font-extrabold text-slate-950 text-lg shadow-md`}>
                      {item.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className={`font-bold text-base ${isActive ? 'text-amber-700 dark:text-amber-400' : 'text-slate-900 dark:text-slate-200'}`}>
                        {item.name}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        {item.role} • {item.location}
                      </p>
                    </div>
                  </div>

                  <div className={`h-8 w-8 rounded-full flex items-center justify-center transition-colors ${
                    isActive ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30' : 'text-slate-400 bg-slate-100 dark:bg-slate-800/80'
                  }`}>
                    <ArrowRight className={`h-4 w-4 transition-transform ${isActive ? 'translate-x-0.5' : ''}`} />
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Right Side: Active Featured Display Card */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial.id}
                initial={{ opacity: 0, scale: 0.96, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="relative bg-white dark:bg-slate-900/95 border border-amber-500/30 dark:border-amber-500/30 rounded-[2.5rem] p-8 sm:p-12 shadow-[0_20px_50px_rgba(245,158,11,0.08)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden"
              >
                {/* Watermark Quote */}
                <div className="absolute top-6 right-8 text-amber-500/10 dark:text-amber-400/10 pointer-events-none">
                  <Quote className="h-32 w-32 rotate-180" />
                </div>

                <div className="relative z-10">
                  {/* Rating Stars & Badge */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex gap-1 text-amber-500 dark:text-amber-400">
                      {[...Array(activeTestimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-current" />
                      ))}
                    </div>
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 dark:bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1 rounded-full">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Verified Review
                    </div>
                  </div>

                  {/* Main Review Quote */}
                  <p className="text-xl sm:text-2xl md:text-3xl font-medium text-slate-800 dark:text-slate-100 mb-10 leading-relaxed">
                    "{activeTestimonial.text}"
                  </p>

                  {/* Author Details Footer */}
                  <div className="flex items-center gap-4 pt-6 border-t border-slate-200 dark:border-slate-800/80">
                    <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${activeTestimonial.avatarBg} flex items-center justify-center font-extrabold text-slate-950 text-2xl shadow-lg`}>
                      {activeTestimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">
                        {activeTestimonial.name}
                      </h3>
                      <p className="text-xs text-amber-700 dark:text-amber-400 font-bold uppercase tracking-wider">
                        {activeTestimonial.role} • <span className="text-slate-500 dark:text-slate-400 font-normal">{activeTestimonial.location}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  )
}