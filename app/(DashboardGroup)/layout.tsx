// app/(DashboardGroup)/layout.tsx
import React from "react"
import { Sidebar } from "./_components/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // উদাহরণস্বরূপ ইউজারের ডাটা (এটি আপনার অথেনটিকেশন বা সেশন থেকে ডাইনামিক আসবে)
  const user = {
    data: {
      role: "ADMIN", // "USER", "MODERATOR", অথবা "ADMIN" হতে পারে
      name: "John Doe",
    },
  }

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-[#07090e]">
      
      {/* 🌟 Sidebar Component */}
      <Sidebar user={user} />

      {/* 🌟 Main Content Area */}
      {/* md:pl-64 দেওয়া হয়েছে যাতে ডেস্কটপে সাইডবারের নিচে কন্টেন্ট ঢুকে না যায় */}
      <main className="flex-1 md:pl-64 flex flex-col min-w-0">
        <div className="flex-1 p-6">
          {children}
        </div>
      </main>

    </div>
  )
}