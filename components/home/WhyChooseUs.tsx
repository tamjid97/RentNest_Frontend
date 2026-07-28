import { ShieldCheck, CreditCard, Clock } from 'lucide-react'

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-slate-950 text-white relative overflow-hidden">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Why RentNest is the best choice for you</h2>
            <p className="text-slate-400 mb-8 leading-relaxed">We remove the friction from renting. No hidden fees, no fake listings, and 100% digital paperwork for a stress-free experience.</p>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="mt-1 bg-amber-500/20 p-2 rounded-lg text-amber-400"><ShieldCheck className="h-5 w-5"/></div>
                <div><h4 className="font-bold text-lg">100% Verified Listings</h4><p className="text-slate-400 text-sm mt-1">Every property and user is physically and digitally verified.</p></div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 bg-amber-500/20 p-2 rounded-lg text-amber-400"><CreditCard className="h-5 w-5"/></div>
                <div><h4 className="font-bold text-lg">Secure Digital Payments</h4><p className="text-slate-400 text-sm mt-1">Pay rent through credit cards, mobile banking, or bank transfers easily.</p></div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 bg-amber-500/20 p-2 rounded-lg text-amber-400"><Clock className="h-5 w-5"/></div>
                <div><h4 className="font-bold text-lg">24/7 Support</h4><p className="text-slate-400 text-sm mt-1">Our dedicated team is always ready to resolve disputes or answer queries.</p></div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-[3rem] bg-gradient-to-tr from-slate-900 to-slate-800 border border-slate-700 shadow-2xl flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80')] opacity-50 bg-cover bg-center"></div>
              <div className="relative z-10 bg-slate-900/80 backdrop-blur-md p-8 rounded-3xl border border-slate-700 text-center">
                <ShieldCheck className="h-16 w-16 text-amber-400 mx-auto mb-4" />
                <h3 className="text-2xl font-black">Safe & Secure</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}