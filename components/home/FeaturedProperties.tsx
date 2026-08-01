'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, MapPin, Sparkles, Check, Tag } from 'lucide-react'
import { motion, Variants } from 'framer-motion'
import { getProperty } from '@/app/(PublicGroup)/_action/propertyAction'

interface ISproperty {
  id: string;
  title: string;
  description: string;
  location: string;
  price: number;
  amenities: string[];
  image: string;
  isAvailable: string;
  categoryId: string;
  landlordId: string;
  createdAt: string;
  category: {
    id: string;
    name: string;
  };
  landlord: {
    id: string;
    name: string;
    email: string;
  };
}

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
  const [properties, setProperties] = useState<ISproperty[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await getProperty();
        if (response.success && response.data) {
          const sortedLatest = response.data
            .sort((a: ISproperty, b: ISproperty) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .slice(0, 3);
          setProperties(sortedLatest);
        }
      } catch (error) {
        console.error("Failed to fetch featured properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

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
            <span>Latest Additions</span>
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
            Explore our newest verified real estate listings tailored just for your lifestyle.
          </p>
        </motion.div>

        {/* Loading State or Properties Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-96 bg-slate-200 dark:bg-slate-900 animate-pulse rounded-[2rem]" />
            ))}
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-16 text-slate-500">No properties found.</div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {properties.map((prop) => (
              <motion.div key={prop.id} variants={itemVariants} className="h-full">
                <div className="group bg-white dark:bg-slate-950 rounded-[2rem] border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-amber-500/5 transition-all duration-300 flex flex-col h-full">
                  
                  {/* Image Container - No padding/border, edge to edge */}
                  <div className="relative h-64 w-full overflow-hidden">
                    <img 
                      src={prop.image} 
                      alt={prop.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider text-amber-400 border border-white/10 flex items-center gap-1.5 shadow-lg">
                      <Tag className="h-3 w-3 text-amber-400" /> {prop.category?.name || "Luxury"}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm mb-3">
                      <MapPin className="h-4 w-4 text-amber-500 shrink-0" /> 
                      <span className="truncate">{prop.location}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3 line-clamp-1 text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors">
                      {prop.title}
                    </h3>

                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-4">
                      {prop.description}
                    </p>
                    
                    {/* Amenities Row */}
                    {prop.amenities && prop.amenities.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5 mb-6 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                        {prop.amenities.slice(0, 3).map((amenity, idx) => (
                          <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 text-[10px] font-bold text-slate-600 dark:text-slate-300 capitalize flex items-center gap-1">
                            <Check className="w-3 h-3 text-amber-500" /> {amenity}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Price & Details Button */}
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide font-semibold">Rent Fee</p>
                        <p className="text-2xl font-black text-amber-500">
                          ৳{prop.price?.toLocaleString()}<span className="text-sm font-medium text-slate-500 dark:text-slate-400">/mo</span>
                        </p>
                      </div>
                      
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
        )}

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