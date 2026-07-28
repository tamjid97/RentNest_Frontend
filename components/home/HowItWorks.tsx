'use client'
import { useState } from 'react'
import { Search, UserCheck, Key, Building2, CheckCircle2, Wallet } from 'lucide-react'

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState<'tenant' | 'landlord'>('tenant')

  return (
    <section className="py-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">How RentNest Works</h2>
        <p className="text-slate-500 dark:text-slate-400">Seamless process for everyone involved</p>
      </div>

      <div className="flex justify-center mb-12">
        <div className="inline-flex bg-slate-100 dark:bg-slate-900 rounded-full p-1 border border-slate-200 dark:border-slate-800">
          <button onClick={() => setActiveTab('tenant')} className={`px-8 py-3 rounded-full text-sm font-bold transition-all ${activeTab === 'tenant' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}>
            For Tenants
          </button>
          <button onClick={() => setActiveTab('landlord')} className={`px-8 py-3 rounded-full text-sm font-bold transition-all ${activeTab === 'landlord' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}>
            For Landlords
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {activeTab === 'tenant' ? (
          <>
            <div className="text-center p-6"><div className="w-16 h-16 mx-auto bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center mb-6"><Search className="h-8 w-8"/></div><h3 className="text-xl font-bold mb-3">1. Search & Filter</h3><p className="text-slate-500">Browse thousands of verified properties that match your lifestyle and budget.</p></div>
            <div className="text-center p-6"><div className="w-16 h-16 mx-auto bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center mb-6"><UserCheck className="h-8 w-8"/></div><h3 className="text-xl font-bold mb-3">2. Visit & Verify</h3><p className="text-slate-500">Schedule a visit or take a virtual tour. Communicate directly with landlords.</p></div>
            <div className="text-center p-6"><div className="w-16 h-16 mx-auto bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center mb-6"><Key className="h-8 w-8"/></div><h3 className="text-xl font-bold mb-3">3. Move In securely</h3><p className="text-slate-500">Pay securely through our platform and get the keys to your new home.</p></div>
          </>
        ) : (
          <>
            <div className="text-center p-6"><div className="w-16 h-16 mx-auto bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center mb-6"><Building2 className="h-8 w-8"/></div><h3 className="text-xl font-bold mb-3">1. List Property</h3><p className="text-slate-500">Add your property details, photos, and rent expectations in minutes.</p></div>
            <div className="text-center p-6"><div className="w-16 h-16 mx-auto bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center mb-6"><CheckCircle2 className="h-8 w-8"/></div><h3 className="text-xl font-bold mb-3">2. Screen Tenants</h3><p className="text-slate-500">Receive applications from verified and background-checked tenants.</p></div>
            <div className="text-center p-6"><div className="w-16 h-16 mx-auto bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center mb-6"><Wallet className="h-8 w-8"/></div><h3 className="text-xl font-bold mb-3">3. Earn Rent</h3><p className="text-slate-500">Manage digital contracts and receive rent payments automatically on time.</p></div>
          </>
        )}
      </div>
    </section>
  )
}