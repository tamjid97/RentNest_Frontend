import React from 'react'
import { User, Mail, Shield, Calendar, Sparkles, CheckCircle2, BadgeCheck } from 'lucide-react'
import * as motion from 'framer-motion/client'
import { getMe } from '@/components/service/getMe'


export default async function ProfilePage() {
  // সার্ভার অ্যাকশন থেকে রিয়েল ডেটা ফেচ করা হচ্ছে
  const res = await getMe()

  // যদি ইউজার লগইন না থাকে বা এরর আসে
  if (!res.success || !res.data?.profile) {
    return (
      <div className="min-h-[85vh] bg-slate-50 dark:bg-[#030712] flex items-center justify-center px-4">
        <div className="text-center space-y-3">
          <p className="text-base font-bold text-red-500">{res.message || "Failed to load profile."}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">Please log in to view your profile information.</p>
        </div>
      </div>
    )
  }

  const profile = res.data.profile

  // createdAt থেকে সুন্দর ডেট ফরম্যাট তৈরি
  const formattedDate = new Date(profile.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  // প্রফাইল ফটো না থাকলে নামের প্রথম অক্ষর দিয়ে অবতার তৈরি
  const initialLetter = profile.name ? profile.name.charAt(0).toUpperCase() : 'U'

  return (
    <div className="min-h-[85vh] bg-slate-50 dark:bg-[#030712] py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="mx-auto max-w-4xl space-y-8">
        
        {/* --- Top Header & Banner Section --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[2.5rem] border border-amber-500/30 dark:border-amber-500/20 bg-white dark:bg-slate-900 p-8 md:p-10 shadow-xl"
        >
          {/* Background Decorative Glow */}
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-72 h-72 bg-gradient-to-br from-amber-500/20 to-amber-600/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
            {/* Avatar */}
            <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-300 text-slate-950 text-4xl font-black shadow-lg shadow-amber-500/30 ring-4 ring-amber-500/20 overflow-hidden">
              {profile.profilePhoto ? (
                <img src={profile.profilePhoto} alt={profile.name} className="h-full w-full object-cover" />
              ) : (
                initialLetter
              )}
              <span className="absolute bottom-1 right-1 flex h-7 w-7 items-center justify-center rounded-full bg-slate-950 text-amber-400 border-2 border-white dark:border-slate-900 shadow-md">
                <Sparkles className="h-3.5 w-3.5" />
              </span>
            </div>

            {/* User Metadata */}
            <div className="text-center md:text-left space-y-2 flex-1">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {profile.name}
                </h1>
                <span className="px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-extrabold uppercase tracking-widest shadow-sm">
                  {profile.role}
                </span>
              </div>
              
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                User ID: <span className="text-slate-700 dark:text-slate-300 font-mono text-xs">{profile.id}</span>
              </p>
              
              {/* Status Badge */}
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full mt-1">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Status: {profile.activeStatus}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* --- Profile Details Cards Grid --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Card 1: Personal & Contact Information */}
          <div className="rounded-[2rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-7 shadow-sm">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white mb-6 flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
                <User className="h-5 w-5" />
              </div>
              Personal Information
            </h3>
            
            <div className="space-y-5 text-sm">
              <div className="flex items-center justify-between py-2.5 border-b border-slate-100 dark:border-slate-800/80">
                <span className="text-slate-500 dark:text-slate-400 flex items-center gap-2 font-medium">
                  <Mail className="h-4 w-4 text-amber-500" /> Email Address
                </span>
                <span className="font-bold text-slate-900 dark:text-white">{profile.email}</span>
              </div>
              
              <div className="flex items-center justify-between py-2.5">
                <span className="text-slate-500 dark:text-slate-400 flex items-center gap-2 font-medium">
                  <Calendar className="h-4 w-4 text-amber-500" /> Member Since
                </span>
                <span className="font-bold text-slate-900 dark:text-white">{formattedDate}</span>
              </div>
            </div>
          </div>

          {/* Card 2: Security & Trust Overview */}
          <div className="rounded-[2rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-7 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white mb-6 flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
                  <Shield className="h-5 w-5" />
                </div>
                Trust & Verification
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800">
                  <BadgeCheck className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Verified Profile</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Your identity has been securely verified through RentNest marketplace safety protocols.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
              <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                To update your profile information, please contact platform support.
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  )
}