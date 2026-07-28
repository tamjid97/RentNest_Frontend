'use client'

import Link from 'next/link'
import { Home, Mail, Send, Shield, Sparkles, ArrowRight, Globe, Code, Share2, MessageSquare } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 overflow-hidden transition-colors duration-300">
      
      {/* Background Accent Gradient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-3/4 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"></div>
      <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 h-40 w-[600px] bg-amber-500/5 blur-[120px] pointer-events-none"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        
        {/* --- Top Newsletter Section --- */}
        <div className="mb-16 rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-950 p-8 md:p-12 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-600 dark:text-amber-400 mb-4">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Stay Ahead</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                Subscribe for exclusive rental deals & updates
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Join 10,000+ tenants and landlords getting the best marketplace insights.
              </p>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 rounded-2xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-950/80 px-4 py-3.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-amber-500 dark:focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all"
                required
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-amber-500 px-6 py-3.5 text-sm font-bold text-slate-950 hover:bg-amber-400 transition-all duration-300 shadow-lg shadow-amber-500/20 active:scale-95"
              >
                <span>Subscribe</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        {/* --- Main Links Grid --- */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-5 mb-16">
          
          {/* Brand Info */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 shadow-md">
                <Home className="h-5 w-5 text-slate-950 stroke-[2.5]" />
              </div>
              <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
                Rent<span className="text-amber-500 dark:text-amber-400">Nest</span>
              </span>
            </Link>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm">
              The premier luxury rental property marketplace. Empowering landlords and tenants through smart, transparent, and seamless property management.
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-600 dark:text-amber-400/90 bg-amber-500/10 border border-amber-500/20 w-fit px-3 py-1.5 rounded-full">
              <Shield className="h-3.5 w-3.5" />
              <span>100% Verified Property Listings</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">Platform</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/" className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors">Home Marketplace</Link></li>
              <li><Link href="/properties" className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors">Browse Homes</Link></li>
              <li><Link href="/how-it-works" className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors">How it Works</Link></li>
              <li><Link href="/pricing" className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors">Landlord Plans</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/about" className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors">Contact Support</Link></li>
              <li><Link href="/careers" className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors">Careers</Link></li>
              <li><Link href="/press" className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors">Press Center</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">Legal & Trust</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/privacy" className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors">Terms of Service</Link></li>
              <li><Link href="/cookies" className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors">Cookie Settings</Link></li>
              <li><Link href="/security" className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors">Trust & Security</Link></li>
            </ul>
          </div>

        </div>

        {/* --- Bottom Copyright & Socials --- */}
        <div className="border-t border-slate-200 dark:border-slate-800/80 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            &copy; {currentYear} RentNest Inc. All rights reserved. Built with Next.js & Tailwind CSS.
          </p>

          <div className="flex items-center gap-3">
            {[
              { icon: Globe, href: "https://facebook.com" },
              { icon: MessageSquare, href: "https://twitter.com" },
              { icon: Share2, href: "https://instagram.com" },
              { icon: Code, href: "https://github.com" },
            ].map((social, idx) => {
              const SocialIcon = social.icon
              return (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:border-amber-500 dark:hover:border-amber-400 hover:bg-amber-500 hover:text-slate-950 transition-all duration-300"
                >
                  <SocialIcon className="h-4 w-4" />
                </a>
              )
            })}
          </div>
        </div>

      </div>
    </footer>
  )
}