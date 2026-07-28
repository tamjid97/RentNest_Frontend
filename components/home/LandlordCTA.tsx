import { Home as HomeIcon, ArrowRight } from 'lucide-react'

export default function LandlordCTA() {
  return (
    <section className="py-10 px-4 mb-10">
      <div className="mx-auto max-w-6xl rounded-[3rem] bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 p-10 md:p-16 text-center shadow-2xl shadow-amber-500/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-20"><HomeIcon className="h-64 w-64 text-slate-950"/></div>
        <div className="relative z-10">
          <h2 className="text-3xl md:text-5xl font-black text-slate-950 mb-6 tracking-tight">Own a Property?</h2>
          <p className="text-slate-900 font-medium text-lg mb-10 max-w-2xl mx-auto">
            Join RentNest today. List your property for free, find verified tenants instantly, and manage your rent collection completely online.
          </p>
          <button className="bg-slate-950 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-slate-800 hover:scale-105 transition-all shadow-xl flex items-center justify-center gap-2 mx-auto">
            List Your Property <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  )
}