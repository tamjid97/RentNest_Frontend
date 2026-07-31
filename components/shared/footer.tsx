'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Home, Shield, Sparkles, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'

export function Footer() {
  const currentYear = new Date().getFullYear()
  const [email, setEmail] = useState('')

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()

    if (!email.trim()) {
      toast.error('Please enter a valid email address!')
      return
    }

    toast.success('Subscribed Successfully!')
    setEmail('') // ইনপুট ফিল্ড খালি করা
  }

  return (
    <footer className="relative border-t border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#030712] text-slate-600 dark:text-slate-400 overflow-hidden transition-colors duration-300">
      
      {/* Background Ambient Effects & Grids */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f59e0b05_1px,transparent_1px),linear-gradient(to_bottom,#f59e0b05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_100%,#000_70%,transparent_100%)]"></div>
      </div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[300px] w-[800px] bg-amber-500/5 dark:bg-amber-500/[0.04] rounded-full blur-[140px] pointer-events-none"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-12 relative z-10">
        
        {/* --- Top Newsletter Section --- */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
          className="mb-20 rounded-[2.5rem] border border-amber-500/30 dark:border-amber-500/20 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-2xl p-8 md:p-12 shadow-[0_20px_50px_rgba(245,158,11,0.06)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden"
        >
          <div className="absolute -right-20 -top-20 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 mb-4 backdrop-blur-md uppercase tracking-wide shadow-sm">
                <Sparkles className="h-4 w-4" />
                <span>Stay Ahead</span>
              </span>
              <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                Subscribe for exclusive rental{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 dark:from-amber-300 dark:via-amber-400 dark:to-amber-500">
                  deals & updates
                </span>
              </h3>
              <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 font-medium">
                Join 10,000+ tenants and landlords getting the best marketplace insights.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 rounded-2xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-950 px-5 py-4 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-amber-500 dark:focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all shadow-sm"
                required
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-b from-amber-300 via-amber-400 to-amber-600 px-7 py-4 text-sm font-extrabold text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:shadow-[0_0_25px_rgba(245,158,11,0.6)] hover:scale-[1.02] transition-all duration-300 active:scale-95 cursor-pointer"
              >
                <span>Subscribe</span>
                <ArrowRight className="h-4 w-4 stroke-[2.5]" />
              </button>
            </form>
          </div>
        </motion.div>

        {/* --- Main Links Grid --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 gap-10 md:grid-cols-5 mb-16"
        >
          {/* Brand Info with Navbar Matched Logo */}
          <div className="md:col-span-2 flex flex-col gap-5">
            <Link href="/" className="group flex items-center gap-3 transition-transform duration-300 hover:scale-[1.02] w-fit">
              <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/40 transition-all duration-300">
                <Home className="h-6 w-6 text-slate-950 stroke-[2.5]" />
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-300 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-400"></span>
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-none">
                  Rent<span className="text-amber-500 dark:text-amber-400">Nest</span>
                </span>
                <span className="text-[10px] font-medium tracking-widest text-slate-500 dark:text-slate-400 uppercase mt-0.5">
                  Marketplace
                </span>
              </div>
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">
              The premier luxury rental property marketplace. Empowering landlords and tenants through smart, transparent, and seamless property management.
            </p>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 border border-amber-500/20 w-fit px-3.5 py-1.5 rounded-full shadow-sm">
              <Shield className="h-3.5 w-3.5" />
              <span>100% Verified Property Listings</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-900 dark:text-white">Platform</h4>
            <ul className="space-y-3 text-sm font-medium">
              <li><Link href="/" className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors">Home Marketplace</Link></li>
              <li><Link href="/properties" className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors">Browse Homes</Link></li>
              <li><Link href="/how-it-works" className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors">How it Works</Link></li>
              <li><Link href="/pricing" className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors">Landlord Plans</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-900 dark:text-white">Company</h4>
            <ul className="space-y-3 text-sm font-medium">
              <li><Link href="/about" className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors">Contact Support</Link></li>
              <li><Link href="/careers" className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors">Careers</Link></li>
              <li><Link href="/press" className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors">Press Center</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-900 dark:text-white">Legal & Trust</h4>
            <ul className="space-y-3 text-sm font-medium">
              <li><Link href="/privacy" className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors">Terms of Service</Link></li>
              <li><Link href="/cookies" className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors">Cookie Settings</Link></li>
              <li><Link href="/security" className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors">Trust & Security</Link></li>
            </ul>
          </div>
        </motion.div>

        {/* --- Bottom Copyright & Socials --- */}
        <div className="border-t border-slate-200 dark:border-slate-800/80 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            &copy; {currentYear} RentNest Inc. All rights reserved. Built with Next.js & Tailwind CSS.
          </p>

          <div className="flex items-center gap-3">
            {[
              {
                name: "Facebook",
                href: "https://www.facebook.com",
                svg: (
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                )
              },
              {
                name: "Twitter",
                href: "https://twitter.com",
                svg: (
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                )
              },
              {
                name: "Instagram",
                href: "https://www.instagram.com",
                svg: (
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                )
              },
              {
                name: "LinkedIn",
                href: "https://www.linkedin.com",
                svg: (
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                )
              }
            ].map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:border-amber-500 dark:hover:border-amber-400 hover:bg-amber-500 hover:text-slate-950 shadow-sm transition-all duration-300 hover:scale-105"
              >
                {social.svg}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  )
}