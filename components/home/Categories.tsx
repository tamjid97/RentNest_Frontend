import { Building, Building2, Home as HomeIcon, Tent } from 'lucide-react'

const categories = [
  { name: 'Apartment', icon: Building, count: '4,230+' },
  { name: 'Studio', icon: Building2, count: '1,850+' },
  { name: 'Villa', icon: HomeIcon, count: '840+' },
  { name: 'Sublet', icon: Tent, count: '3,120+' },
]

export default function Categories() {
  return (
    <section className="py-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Explore Categories</h2>
          <p className="text-slate-500 dark:text-slate-400">Find the perfect property type for your needs</p>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((cat, idx) => {
          const Icon = cat.icon
          return (
            <div key={idx} className="group cursor-pointer p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-amber-500 dark:hover:border-amber-400 hover:shadow-lg transition-all duration-300">
              <div className="h-12 w-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 mb-4 group-hover:scale-110 transition-transform">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold mb-1">{cat.name}</h3>
              <p className="text-sm text-slate-500">{cat.count} properties</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}