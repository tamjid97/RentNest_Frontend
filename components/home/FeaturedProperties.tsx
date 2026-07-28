import Link from 'next/link'
import { ArrowRight, Star, MapPin, Building, Home as HomeIcon, Zap } from 'lucide-react'

const featuredProperties = [
  { id: 1, title: 'Luxury Skyline Apartment', location: 'Gulshan, Dhaka', price: '45,000', beds: 3, baths: 2, sqft: 1800, rating: 4.9, image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80' },
  { id: 2, title: 'Modern Studio Loft', location: 'Banani, Dhaka', price: '25,000', beds: 1, baths: 1, sqft: 850, rating: 4.8, image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80' },
  { id: 3, title: 'Peaceful Family Villa', location: 'Bashundhara R/A', price: '85,000', beds: 5, baths: 4, sqft: 3200, rating: 5.0, image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80' },
]

export default function FeaturedProperties() {
  return (
    <section className="py-20 bg-slate-100 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Featured Properties</h2>
            <p className="text-slate-500 dark:text-slate-400">Hand-picked premium spaces just for you</p>
          </div>
          <Link href="/properties" className="hidden md:flex items-center gap-2 text-amber-600 dark:text-amber-400 font-semibold hover:gap-3 transition-all">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProperties.map((prop) => (
            <div key={prop.id} className="group bg-white dark:bg-slate-950 rounded-[2rem] border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-xl hover:shadow-amber-500/5 transition-all duration-300">
              <div className="relative h-64 w-full overflow-hidden">
                <img src={prop.image} alt={prop.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-amber-500 flex items-center gap-1">
                  <Star className="h-3 w-3 fill-amber-500" /> {prop.rating}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-slate-500 text-sm mb-3">
                  <MapPin className="h-4 w-4 text-amber-500" /> {prop.location}
                </div>
                <h3 className="text-xl font-bold mb-4 line-clamp-1">{prop.title}</h3>
                <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400 mb-6 border-y border-slate-100 dark:border-slate-800 py-3">
                  <span className="flex items-center gap-1"><Building className="h-4 w-4"/> {prop.beds} Beds</span>
                  <span className="flex items-center gap-1"><HomeIcon className="h-4 w-4"/> {prop.baths} Baths</span>
                  <span className="flex items-center gap-1"><Zap className="h-4 w-4"/> {prop.sqft} sqft</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide">Rent</p>
                    <p className="text-2xl font-black text-amber-500">৳{prop.price}<span className="text-sm font-medium text-slate-500">/mo</span></p>
                  </div>
                  <button className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-sm hover:bg-amber-500 dark:hover:bg-amber-500 hover:text-slate-950 transition-colors">
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}