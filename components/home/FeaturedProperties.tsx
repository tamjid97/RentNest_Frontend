'use client'

import Link from 'next/link'
import { ArrowRight, Star, MapPin, Building, Home as HomeIcon, Zap, Sparkles } from 'lucide-react'
import { motion, Variants } from 'framer-motion'

const featuredProperties = [
  { id: 1, title: 'Luxury Skyline Apartment', location: 'Gulshan, Dhaka', price: '45,000', beds: 3, baths: 2, sqft: 1800, rating: 4.9, image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80' },
  { id: 2, title: 'Modern Studio Loft', location: 'Banani, Dhaka', price: '25,000', beds: 1, baths: 1, sqft: 850, rating: 4.8, image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80' },
  { id: 3, title: 'Peaceful Family Villa', location: 'Bashundhara R/A', price: '85,000', beds: 5, baths: 4, sqft: 3200, rating: 5.0, image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80' },
]

// Framer Motion Variants
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

export default function FeaturedProperties() {
  return (
    <section className="relative w-full bg-slate-50 dark:bg-[#030712] py-24 overflow-hidden transition-colors duration-300">
      
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f59e0b08_1px,transparent_1px),linear-gradient(to_bottom,#f59e0b08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      </div>
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
        <div className="w-[600px] h-[300px] bg-amber-500/10 dark:bg-amber-500/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
          className="flex flex-col items-center justify-center text-center mb-16 gap-5 max-w-2xl mx-auto"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 backdrop-blur-md shadow-sm uppercase tracking-wide">
            <Sparkles className="h-4 w-4" />
            <span>Top Rated Picks</span>
          </span>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.2]">
            Featured 
            <span className="relative inline-block ml-4 mt-1">
              <span className="absolute -inset-1 block -skew-y-3 bg-amber-500/20 dark:bg-amber-500/20 blur-lg"></span>
              <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 dark:from-amber-300 dark:via-amber-400 dark:to-amber-500">
                Properties
              </span>
            </span>
          </h2>

          <p className="text-slate-500 dark:text-slate-400 font-medium text-sm sm:text-base md:px-8">
            Explore our hand-picked, premium real estate listings tailored just for your lifestyle.
          </p>
        </motion.div>

        {/* Properties Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {featuredProperties.map((prop) => (
            <motion.div key={prop.id} variants={itemVariants} className="h-full">
              <div className="group bg-white dark:bg-slate-950 rounded-[2rem] border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-amber-500/5 transition-all duration-300 flex flex-col h-full">
                
                {/* Image Container */}
                <div className="relative h-64 w-full overflow-hidden">
                  <img 
                    src={prop.image} 
                    alt={prop.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-amber-500 flex items-center gap-1 shadow-sm">
                    <Star className="h-3 w-3 fill-amber-500" /> {prop.rating}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm mb-3">
                    <MapPin className="h-4 w-4 text-amber-500" /> {prop.location}
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4 line-clamp-1 text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors">
                    {prop.title}
                  </h3>
                  
                  {/* Amenities Row */}
                  <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400 mb-6 border-y border-slate-100 dark:border-slate-800/80 py-3">
                    <span className="flex items-center gap-1.5"><Building className="h-4 w-4 text-slate-400"/> {prop.beds} Beds</span>
                    <span className="flex items-center gap-1.5"><HomeIcon className="h-4 w-4 text-slate-400"/> {prop.baths} Baths</span>
                    <span className="flex items-center gap-1.5"><Zap className="h-4 w-4 text-slate-400"/> {prop.sqft} sqft</span>
                  </div>

                  {/* Price & Details Button */}
                  <div className="mt-auto flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide font-semibold">Rent</p>
                      <p className="text-2xl font-black text-amber-500">
                        ৳{prop.price}<span className="text-sm font-medium text-slate-500 dark:text-slate-400">/mo</span>
                      </p>
                    </div>
                    
                    {/* Updated Button with Gradient & All-time Glow */}
                    <Link 
                      href={`/properties/${prop.id}`}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-b from-amber-300 via-amber-400 to-amber-600 text-slate-950 font-extrabold text-sm shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:shadow-[0_0_25px_rgba(245,158,11,0.6)] hover:scale-105 transition-all duration-300"
                    >
                      Details
                    </Link>
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom View All Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 flex justify-center"
        >
          <Link 
            href="/properties" 
            className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-slate-900 dark:bg-white px-8 py-4 font-semibold text-white dark:text-slate-900 transition-all hover:bg-amber-500 dark:hover:bg-amber-500 dark:hover:text-white shadow-md hover:shadow-xl hover:shadow-amber-500/20"
          >
            <span>View All Properties</span>
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>

      </div>
    </section>
  )
}