// app/page.tsx
import Hero from '@/components/home/Hero'
import TrustedPartners from '@/components/home/TrustedPartners'
import Categories from '@/components/home/Categories'
import FeaturedProperties from '@/components/home/FeaturedProperties'
import HowItWorks from '@/components/home/HowItWorks'
import WhyChooseUs from '@/components/home/WhyChooseUs'
import Testimonials from '@/components/home/Testimonials'
import LandlordCTA from '@/components/home/LandlordCTA'
import { Navbar } from '@/components/shared/navbar'
import { Footer } from '@/components/shared/footer'


export default async function Home() {
  

  await new Promise((resolve) => setTimeout(resolve, 2000));

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#07090e] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Navbar /> 
      <main>
        <Hero />
        <TrustedPartners />
        <Categories />
        <FeaturedProperties />
        <HowItWorks />
        <WhyChooseUs />
        <Testimonials />
        <LandlordCTA />
      </main>
      <Footer />
    </div>
  )
}