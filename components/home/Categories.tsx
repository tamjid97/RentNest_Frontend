'use client'

import { Building, Building2, Home as HomeIcon, Tent, LayoutGrid } from 'lucide-react'
import { motion, Variants } from 'framer-motion'

const categories = [
  { 
    name: 'Apartment', 
    icon: Building, 
    count: '4,230+',
    description: 'Modern residential spaces designed for comfortable and stylish city living.'
  },
  { 
    name: 'Studio', 
    icon: Building2, 
    count: '1,850+',
    description: 'Compact, efficient layouts perfect for individuals and young professionals.'
  },
  { 
    name: 'Villa', 
    icon: HomeIcon, 
    count: '840+',
    description: 'Luxurious standalone homes featuring private outdoor spaces and premium amenities.'
  },
  { 
    name: 'Sublet', 
    icon: Tent, 
    count: '3,120+',
    description: 'Flexible short-term rentals and shared spaces for transitional and easy living.'
  },
]

// Framer Motion Variants explicitly typed
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 100, damping: 15 } 
  }
}

export default function Categories() {
  return (
    <section className="relative w-full bg-slate-50 dark:bg-[#030712] py-24 overflow-hidden transition-colors duration-300">
      
      {/* ================= BACKGROUND EFFECTS ================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f59e0b08_1px,transparent_1px),linear-gradient(to_bottom,#f59e0b08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      </div>
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
        <div className="w-[600px] h-[300px] bg-amber-500/10 dark:bg-amber-500/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        
        {/* ================= HEADER SECTION (CENTERED) ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
          className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16 gap-5"
        >
          {/* Badge */}
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 backdrop-blur-md shadow-sm uppercase tracking-wide">
            <LayoutGrid className="h-4 w-4" />
            <span>Property Types</span>
          </span>
          
          {/* Premium Gradient Title */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.2]">
            Explore Our <br className="hidden sm:block" />
            <span className="relative inline-block mt-1">
              <span className="absolute -inset-1 block -skew-y-3 bg-amber-500/20 dark:bg-amber-500/20 blur-lg"></span>
              <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 dark:from-amber-300 dark:via-amber-400 dark:to-amber-500">
                Top Categories
              </span>
            </span>
          </h2>
          
          <p className="text-slate-500 dark:text-slate-400 font-medium text-sm sm:text-base md:px-8">
            Discover the perfect property tailored to your lifestyle. Browse through our extensive collection of premium real estate options.
          </p>
        </motion.div>

        {/* ================= GRID CARDS SECTION ================= */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {categories.map((cat, idx) => {
            const Icon = cat.icon
            return (
              <motion.div key={idx} variants={itemVariants} className="h-full">
                <div className="group relative flex flex-col p-7 sm:p-8 rounded-[2rem] bg-white/60 dark:bg-[#0b1120]/60 border border-slate-200/80 dark:border-white/5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_30px_rgba(245,158,11,0.12)] hover:border-amber-500/40 dark:hover:border-amber-500/30 transition-all duration-500 backdrop-blur-xl cursor-pointer overflow-hidden z-10 h-full hover:-translate-y-1.5">
                  
                  {/* Subtle Top Gradient Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

                  {/* Main Icon Box */}
                  <div className="h-16 w-16 rounded-2xl bg-slate-100 dark:bg-slate-800/80 group-hover:bg-amber-500 flex items-center justify-center text-slate-700 dark:text-slate-300 group-hover:text-white transition-all duration-500 shadow-sm mb-6">
                    <Icon className="h-8 w-8" strokeWidth={1.5} />
                  </div>
                  
                  {/* Card Title & Description */}
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-300">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors duration-300">
                    {cat.description}
                  </p>
                  
                  {/* Footer Data (Premium Structure) */}
                  <div className="mt-auto pt-5 border-t border-slate-200/80 dark:border-slate-700/50 flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">
                      Active Listings
                    </span>
                    <span className="text-sm font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 px-3 py-1 rounded-full border border-amber-200/50 dark:border-amber-500/20">
                      {cat.count}
                    </span>
                  </div>
                  
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}