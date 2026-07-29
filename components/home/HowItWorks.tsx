'use client'

import { useState } from 'react'
import { Search, UserCheck, Key, Building2, CheckCircle2, Wallet, Sparkles, Check } from 'lucide-react'
import { motion, AnimatePresence, Variants } from 'framer-motion'

const steps = {
  tenant: [
    { 
      icon: Search, 
      title: 'Search & Filter', 
      desc: 'Browse thousands of verified properties that match your exact lifestyle, location, and budget preferences.',
      features: ['Advanced Location Filters', '100% Verified Listings', 'Instant Map & Price Sort']
    },
    { 
      icon: UserCheck, 
      title: 'Visit & Verify', 
      desc: 'Schedule a physical visit or take an immersive virtual tour. Communicate directly with trusted landlords.',
      features: ['Virtual 360° Tours', 'Direct In-App Chat', 'Flexible Scheduling']
    },
    { 
      icon: Key, 
      title: 'Move In Securely', 
      desc: 'Complete payments safely through our protected escrow platform and collect the keys to your new home.',
      features: ['Escrow Payment Protection', 'Signed Digital Agreements', 'Smooth Key Handover']
    }
  ],
  landlord: [
    { 
      icon: Building2, 
      title: 'List Property', 
      desc: 'Add your property details, high-res photos, amenities, and rent expectations in just a few minutes.',
      features: ['Zero Listing Fees', 'AI Description Assistant', 'HD Photo Gallery']
    },
    { 
      icon: CheckCircle2, 
      title: 'Screen Tenants', 
      desc: 'Receive applications from physically and digitally background-checked reliable tenants.',
      features: ['Deep Background Checks', 'Verified Credit Scores', 'Transparent Tenant History']
    },
    { 
      icon: Wallet, 
      title: 'Earn Rent', 
      desc: 'Manage digital contracts effortlessly and receive your rent payments automatically on time, every month.',
      features: ['Auto Rent Collection', 'Automated Invoicing', '24/7 Financial Support']
    }
  ]
}

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState<'tenant' | 'landlord'>('tenant')

  // Explicitly typed with Variants to fix TypeScript error
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05,
      }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 }
    }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 35, scale: 0.95 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: 'spring', 
        stiffness: 110, 
        damping: 18 
      } 
    },
    exit: { opacity: 0, y: -20, scale: 0.95, transition: { duration: 0.2 } }
  }

  return (
    <section className="relative w-full py-28 bg-slate-50 dark:bg-[#030712] overflow-hidden transition-colors duration-300">
      
      {/* Background Glowing Orbs with Smooth Pulse */}
      <motion.div 
        animate={{ 
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.5, 0.3] 
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-500/10 dark:bg-amber-500/5 rounded-full blur-[160px] pointer-events-none"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16 flex flex-col items-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 mb-4 backdrop-blur-md shadow-sm uppercase tracking-wide">
            <Sparkles className="h-4 w-4" />
            Simple Process
          </span>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.2] mb-4">
            How{' '}
            <span className="relative inline-block mx-3 mt-1">
              <span className="absolute -inset-1 block -skew-y-3 bg-amber-500/20 dark:bg-amber-500/20 blur-lg"></span>
              <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 dark:from-amber-300 dark:via-amber-400 dark:to-amber-500">
                RentNest
              </span>
            </span>{' '}
            Works
          </h2>
          
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl text-lg">
            A seamless, transparent, and secure renting experience tailored for everyone involved.
          </p>
        </motion.div>

        {/* Animated Tab Switcher */}
        <div className="flex justify-center mb-20">
          <div className="relative inline-flex bg-slate-100 dark:bg-slate-950 p-1.5 rounded-full border border-slate-200/80 dark:border-slate-800 shadow-sm backdrop-blur-md">
            {(['tenant', 'landlord'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="relative px-8 py-3 rounded-full text-sm font-bold transition-colors duration-300 w-40 sm:w-48 z-10 cursor-pointer focus:outline-none"
              >
                <span className={`relative z-10 transition-colors duration-300 ${activeTab === tab ? 'text-slate-950 font-extrabold' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}>
                  For {tab === 'tenant' ? 'Tenants' : 'Landlords'}
                </span>
                
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTabBackground"
                    className="absolute inset-0 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-600 rounded-full shadow-[0_0_25px_rgba(245,158,11,0.6)] z-0"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Steps Grid */}
        <div className="relative">
          <div className="hidden md:block absolute top-12 left-24 right-24 h-[2px] bg-gradient-to-r from-transparent via-amber-500/30 to-transparent border-t-2 border-dashed border-amber-500/30 -z-10"></div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10"
            >
              {steps[activeTab].map((step, index) => (
                <motion.div 
                  key={step.title}
                  variants={itemVariants}
                  whileHover={{ y: -8, transition: { duration: 0.3, ease: "easeOut" } }}
                  className="relative group text-center flex flex-col items-center"
                >
                  {/* Floating Number Watermark */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 0.4, scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                    className="absolute -top-10 left-1/2 -translate-x-1/2 text-[9rem] font-black text-slate-100/80 dark:text-slate-900/40 -z-10 group-hover:scale-110 group-hover:opacity-60 transition-all duration-500 select-none"
                  >
                    {index + 1}
                  </motion.div>
                  
                  {/* Icon Container */}
                  <div className="w-24 h-24 mx-auto bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-xl shadow-amber-500/5 flex items-center justify-center mb-6 group-hover:border-amber-500/50 dark:group-hover:border-amber-500/50 group-hover:shadow-[0_15px_35px_rgba(245,158,11,0.25)] transition-all duration-500 relative overflow-hidden backdrop-blur-xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <motion.div
                      whileHover={{ rotate: [0, -8, 8, 0], scale: 1.1 }}
                      transition={{ duration: 0.4 }}
                    >
                      <step.icon className="h-10 w-10 text-amber-500 relative z-10" />
                    </motion.div>
                  </div>
                  
                  {/* Premium Content Box */}
                  <div className="w-full bg-white/80 dark:bg-slate-900/60 backdrop-blur-2xl p-7 rounded-3xl border border-slate-200/90 dark:border-slate-800/90 group-hover:bg-white dark:group-hover:bg-slate-900 group-hover:border-amber-500/40 dark:group-hover:border-amber-500/40 transition-all duration-500 shadow-lg shadow-slate-100 dark:shadow-none group-hover:shadow-[0_20px_40px_rgba(245,158,11,0.12)] flex flex-col h-full text-left">
                    
                    <h3 className="text-xl font-extrabold mb-3 text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors text-center">
                      {step.title}
                    </h3>
                    
                    <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm mb-6 text-center">
                      {step.desc}
                    </p>

                    {/* Detailed Features List */}
                    <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-2.5">
                      {step.features.map((feature, fIdx) => (
                        <motion.div 
                          key={fIdx} 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.15 + fIdx * 0.08 }}
                          className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300"
                        >
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-500/10 dark:bg-amber-500/20 text-amber-500 flex items-center justify-center">
                            <Check className="w-3 h-3" />
                          </span>
                          <span>{feature}</span>
                        </motion.div>
                      ))}
                    </div>

                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  )
}