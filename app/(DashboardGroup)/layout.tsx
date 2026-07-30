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
    <div className="flex min-h-screen bg-slate-50 dark:bg-[#07090e]">
      
      
      <Sidebar user={user} />

      <main className="flex-1 md:pl-64 flex flex-col min-w-0">
        <div className="flex-1 p-6">
          {children}
        </div>
      </main>

    </div>
  )
}