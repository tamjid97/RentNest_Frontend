'use client'

import { ShieldCheck } from "lucide-react"
import { motion } from "framer-motion"

type Partner = {
  name: string
  src: string
}

const rowOnePartners: Partner[] = [
  { name: "Visa", src: "/logos/visa.svg" },
  { name: "Mastercard", src: "/logos/mastercard.svg" },
  { name: "PayPal", src: "/logos/paypal.svg" },
  { name: "Stripe", src: "/logos/stripe.svg" },
  { name: "Apple Pay", src: "/logos/apple-pay.svg" },
  { name: "Google Pay", src: "/logos/google-pay.svg" },
  { name: "Chase", src: "/logos/chase.svg" },
  { name: "HSBC", src: "/logos/hsbc.svg" },
]

const rowTwoPartners: Partner[] = [
  { name: "Apple Pay", src: "/logos/apple-pay.svg" },
  { name: "Google Pay", src: "/logos/google-pay.svg" },
  { name: "Chase", src: "/logos/chase.svg" },
  { name: "HSBC", src: "/logos/hsbc.svg" },
  { name: "Visa", src: "/logos/visa.svg" },
  { name: "Mastercard", src: "/logos/mastercard.svg" },
  { name: "PayPal", src: "/logos/paypal.svg" },
  { name: "Stripe", src: "/logos/stripe.svg" },
]

function LogoCard({ partner }: { partner: Partner }) {
  return (
    <div className="flex shrink-0 items-center justify-center px-3.5">
      <div className="flex items-center justify-center w-36 h-20 sm:w-44 sm:h-24 bg-white dark:bg-[#0b1120]/80 border border-slate-200/60 dark:border-white/5 rounded-2xl shadow-[0_4px_15px_rgba(0,0,0,0.02)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_25px_rgba(245,158,11,0.12)] hover:border-amber-500/40 dark:hover:border-amber-500/30 transition-all duration-500 p-4 backdrop-blur-md group/card">
        <img
          src={partner.src}
          alt={`${partner.name} logo`}
          loading="lazy"
          className="max-h-8 sm:max-h-10 w-auto object-contain transition-transform duration-500 group-hover/card:scale-110"
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/120x40/e2e8f0/1e293b?text=' + partner.name
          }}
        />
      </div>
    </div>
  )
}

export default function TrustedPartners() {
  return (
    <section
      aria-labelledby="trusted-partners-heading"
      className="w-full bg-slate-50 dark:bg-[#030712] py-24 overflow-hidden transition-colors duration-300 relative"
    >
      {/* ================= HERO SECTION-ER MOTON BACKGROUND EFFECTS ================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f59e0b08_1px,transparent_1px),linear-gradient(to_bottom,#f59e0b08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      </div>

      {/* Background Subtle Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
        <div className="w-[500px] h-[250px] bg-amber-500/10 dark:bg-amber-500/5 rounded-full blur-[120px]"></div>
      </div>

      <style jsx>{`
        @keyframes scroll-rtl {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        @keyframes scroll-ltr {
          0% { transform: translateX(-33.333%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-rtl {
          animation: scroll-rtl 40s linear infinite;
        }
        .animate-marquee-ltr {
          animation: scroll-ltr 40s linear infinite;
        }
        .animate-marquee-rtl:hover,
        .animate-marquee-ltr:hover {
          animation-play-state: paused;
        }
        .mask-edges {
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
      `}</style>

      {/* Header Section */}
      <div className="mx-auto max-w-4xl px-6 mb-14 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: "spring" as const, bounce: 0.3 }}
          className="flex flex-col items-center gap-4 text-center"
        >
          {/* Badge */}
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 backdrop-blur-md shadow-sm tracking-wide uppercase">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            <span>Secure &amp; Certified Gateways</span>
          </span>

          {/* Title */}
          <h2
            id="trusted-partners-heading"
            className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.2]"
          >
            Trusted Payment Partners <br className="hidden sm:block" />
            <span className="relative whitespace-nowrap inline-block mt-1">
              <span className="absolute -inset-1 block -skew-y-3 bg-amber-500/20 dark:bg-amber-500/20 blur-lg"></span>
              <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 dark:from-amber-300 dark:via-amber-400 dark:to-amber-500">
                &amp; Global Banks
              </span>
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-lg font-medium mt-1">
            Experience seamless and secure transactions backed by world-class financial institutions.
          </p>
        </motion.div>
      </div>

      {/* Marquee Container */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.1 }}
        className="relative w-full mask-edges overflow-hidden flex flex-col gap-5 py-2 z-10"
      >
        {/* Row 1 (RTL) */}
        <div className="w-full overflow-hidden">
          <div className="animate-marquee-rtl flex w-max flex-nowrap items-center">
            {[...rowOnePartners, ...rowOnePartners, ...rowOnePartners].map((partner, index) => (
              <LogoCard key={`r1-${index}`} partner={partner} />
            ))}
          </div>
        </div>

        {/* Row 2 (LTR) */}
        <div className="w-full overflow-hidden">
          <div className="animate-marquee-ltr flex w-max flex-nowrap items-center">
            {[...rowTwoPartners, ...rowTwoPartners, ...rowTwoPartners].map((partner, index) => (
              <LogoCard key={`r2-${index}`} partner={partner} />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}