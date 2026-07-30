// app/(DashboardGroup)/layout.tsx
import React from "react"
import { Sidebar } from "./_components/sidebar"
import { getMe } from "@/components/service/getMe";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const user = await getMe();
  
  return (

    <div className="flex flex-col lg:flex-row min-h-screen bg-slate-50 dark:bg-[#07090e]">
      
      <Sidebar user={user} />

      <main className="flex-1 lg:pl-64 flex flex-col min-w-0">
        <div className="flex-1 p-4 sm:p-6">
          {children}
        </div>
      </main>

    </div>
  )
}