import { Star } from 'lucide-react'

const testimonials = [
  { name: 'Rahim Uddin', role: 'Tenant', text: 'RentNest made finding my new apartment so easy. The verified listings gave me peace of mind.', rating: 5 },
  { name: 'Sarah Ahmed', role: 'Landlord', text: 'Listing my property was seamless. I found reliable tenants within just 3 days of posting!', rating: 5 },
  { name: 'Tarek Rahman', role: 'Tenant', text: 'The interface is stunning and the customer support is top-notch. Highly recommended.', rating: 4 },
]

export default function Testimonials() {
  return (
    <section className="py-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">Loved by Thousands</h2>
        <p className="text-slate-500 dark:text-slate-400">See what our tenants and landlords have to say</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((test, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800">
            <div className="flex gap-1 text-amber-500 mb-6">
              {[...Array(test.rating)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
            </div>
            <p className="text-slate-700 dark:text-slate-300 mb-8 italic">"{test.text}"</p>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center font-bold text-slate-950 text-xl">
                {test.name.charAt(0)}
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">{test.name}</h4>
                <p className="text-xs text-slate-500 uppercase">{test.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}