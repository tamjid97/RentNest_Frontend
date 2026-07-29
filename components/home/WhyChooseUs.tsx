'use client'

import { ShieldCheck, CreditCard, Clock, Sparkles, CheckCircle2, TrendingUp } from 'lucide-react'
import { motion, Variants } from 'framer-motion'

const features = [
  {
    icon: ShieldCheck,
    title: "100% Verified Listings",
    description: "Every property and user is physically and digitally verified to ensure top-notch security.",
    bg: "bg-amber-500/10 dark:bg-amber-500/20",
    textColor: "text-amber-600 dark:text-amber-400"
  },
  {
    icon: CreditCard,
    title: "Secure Digital Payments",
    description: "Pay rent seamlessly through credit cards, mobile banking, or secure bank transfers.",
    bg: "bg-amber-500/10 dark:bg-amber-500/20",
    textColor: "text-amber-600 dark:text-amber-400"
  },
  {
    icon: Clock,
    title: "24/7 Dedicated Support",
    description: "Our expert team is always on standby to resolve disputes or answer your queries anytime.",
    bg: "bg-amber-500/10 dark:bg-amber-500/20",
    textColor: "text-amber-600 dark:text-amber-400"
  }
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  }
}

export default function WhyChooseUs() {
  return (
    <section className="relative w-full py-28  dark:bg-[#030712] overflow-hidden  dark:border-slate-800/60 transition-colors duration-300">
      
      {/* Background Glowing Orbs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-amber-500/10 dark:bg-amber-600/15 rounded-full blur-[140px] pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-yellow-500/10 dark:bg-amber-500/10 rounded-full blur-[160px] pointer-events-none translate-x-1/3 translate-y-1/3"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Text & Features with Staggered Animation */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 mb-6 backdrop-blur-md shadow-sm uppercase tracking-wide">
                <Sparkles className="h-4 w-4" />
                The RentNest Advantage
              </span>
            </motion.div>
            
            <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 leading-[1.15]">
              Why RentNest is the <br className="hidden md:block" />
              <span className="relative inline-block mt-1">
                <span className="absolute -inset-1 block -skew-y-3 bg-amber-500/20 dark:bg-amber-500/20 blur-lg"></span>
                <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 dark:from-amber-300 dark:via-amber-400 dark:to-amber-500">
                  best choice for you
                </span>
              </span>
            </motion.h2>
            
            <motion.p variants={itemVariants} className="text-slate-500 dark:text-slate-400 mb-10 text-lg leading-relaxed max-w-lg">
              We remove the friction from renting. No hidden fees, no fake listings, and 100% digital paperwork for a stress-free experience.
            </motion.p>
            
            <motion.div variants={containerVariants} className="space-y-4">
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  variants={itemVariants}
                  className="group flex items-start gap-5 p-4 rounded-2xl hover:bg-slate-50/80 dark:hover:bg-slate-900/50 border border-transparent hover:border-amber-500/30 dark:hover:border-amber-500/20 transition-all duration-300 backdrop-blur-sm"
                >
                  <div className={`shrink-0 mt-1 ${feature.bg} p-3 rounded-2xl shadow-inner group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className={`h-6 w-6 ${feature.textColor}`} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-1 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                      {feature.title}
                    </h4>
                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column: Borderless Premium Visuals with Floating Animation */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative lg:h-[600px] flex items-center justify-center"
          >
            {/* Main Image Container - Completely Borderless with Amber Glow */}
            <div className="relative w-full max-w-md aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(245,158,11,0.15)] z-10 group">
              <img 
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80" 
                alt="Modern Apartment" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>
              
              <div className="absolute bottom-8 left-8 right-8">
                <div className="bg-white/10 dark:bg-slate-900/60 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 p-5 rounded-2xl text-white shadow-2xl">
                  <h3 className="text-xl font-bold mb-1">Safe & Secure</h3>
                  <p className="text-sm text-slate-200">Your trusted real estate partner.</p>
                </div>
              </div>
            </div>

            {/* Floating Glassmorphism Card 1: Verified Badge */}
            <motion.div 
              animate={{ y: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute top-10 -left-6 md:-left-10 z-20 bg-white/90 dark:bg-slate-900/90 p-4 rounded-2xl shadow-xl shadow-amber-500/10 border border-slate-100 dark:border-slate-800 flex items-center gap-4 backdrop-blur-xl"
            >
              <div className="bg-amber-100 dark:bg-amber-500/20 p-2.5 rounded-full text-amber-600 dark:text-amber-400">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div className="pr-4">
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-0.5">Status</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white">100% Verified</p>
              </div>
            </motion.div>

            {/* Floating Glassmorphism Card 2: Active Renters */}
            <motion.div 
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-20 -right-6 md:-right-10 z-20 bg-white/90 dark:bg-slate-900/90 p-4 rounded-2xl shadow-xl shadow-amber-500/10 border border-slate-100 dark:border-slate-800 flex items-center gap-4 backdrop-blur-xl"
            >
              <div className="bg-amber-100 dark:bg-amber-500/20 p-2.5 rounded-full text-amber-600 dark:text-amber-400">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div className="pr-4">
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-0.5">Active Users</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white">50K+ Renters</p>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  )
}