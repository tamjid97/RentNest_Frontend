import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { Providers } from "./providers"; 
import { Toaster } from "@/components/ui/sonner";
import { getMe } from "@/components/service/getMe";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "RentNest - Find Your Dream Rental Home",
  description: "A modern rental property marketplace built with Next.js",
  icons: {
    icon: "/logo.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const user = await getMe();
  return (
    // suppressHydrationWarning বাধ্যতামূলক next-themes এর জন্য
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="font-sans antialiased bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col min-h-screen transition-colors duration-300">
        <Providers>
          
          <Navbar user={user} /> 
          <main className="flex-grow">
            {children}
            <Toaster position="top-right" />
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}