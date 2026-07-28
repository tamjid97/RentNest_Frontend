'use client'

import { ShieldCheck } from "lucide-react"

type Partner = {
  name: string
  src: string
}

// প্রথম সারির লোগোগুলো
const rowOnePartners: Partner[] = [
  { name: "Visa", src: "/logos/visa (1).svg" },
  { name: "Mastercard", src: "/logos/mastercard (1).svg" },
  { name: "PayPal", src: "/logos/paypal (1).svg" },
  { name: "Stripe", src: "/logos/stripe (1).svg" },
  { name: "Apple Pay", src: "/logos/apple-pay (1).svg" },
  { name: "Google Pay", src: "/logos/google-pay (1).svg" },
  { name: "Chase", src: "/logos/chase (1).svg" },
  { name: "HSBC", src: "/logos/hsbc (1).svg" },
]

// দ্বিতীয় সারির লোগোগুলো (ভিন্ন অর্ডারে সাজানো)
const rowTwoPartners: Partner[] = [
  { name: "Apple Pay", src: "/logos/apple-pay (1).svg" },
  { name: "Google Pay", src: "/logos/google-pay (1).svg" },
  { name: "Chase", src: "/logos/chase (1).svg" },
  { name: "HSBC", src: "/logos/hsbc (1).svg" },
  { name: "Visa", src: "/logos/visa (1).svg" },
  { name: "Mastercard", src: "/logos/mastercard (1).svg" },
  { name: "PayPal", src: "/logos/paypal (1).svg" },
  { name: "Stripe", src: "/logos/stripe (1).svg" },
]

function LogoCard({ partner }: { partner: Partner }) {
  return (
    <div className="flex shrink-0 items-center justify-center px-3">
      <div className="flex items-center justify-center w-36 h-20 sm:w-44 sm:h-22 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-md hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all duration-300 p-4">
        <img
          src={partner.src}
          alt={`${partner.name} logo`}
          loading="lazy"
          className="max-h-8 sm:max-h-10 w-auto object-contain transition-transform duration-300 hover:scale-105"
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
      className="w-full bg-slate-50 dark:bg-slate-950 py-20 overflow-hidden border-y border-slate-200/60 dark:border-slate-800/60 transition-colors duration-300"
    >
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
          animation: scroll-rtl 35s linear infinite;
        }
        .animate-marquee-ltr {
          animation: scroll-ltr 35s linear infinite;
        }
        .animate-marquee-rtl:hover,
        .animate-marquee-ltr:hover {
          animation-play-state: paused;
        }
        .mask-edges {
          mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
        }
      `}</style>

      {/* সেকশনের হেডার অংশ */}
      <div className="mx-auto max-w-6xl px-6 mb-12">
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            Secure &amp; Certified Gateways
          </span>
          <h2
            id="trusted-partners-heading"
            className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            Trusted Payment Partners &amp; Banks
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md">
            Experience seamless and secure transactions backed by world-class financial institutions.
          </p>
        </div>
      </div>

      {/* ফুল-উইথ ডুয়েল রো মারিকুই কন্টেইনার */}
      <div className="relative w-full mask-edges overflow-hidden flex flex-col gap-6 py-2">
        
        {/* প্রথম সারি: ডান থেকে বামে (RTL) */}
        <div className="w-full overflow-hidden">
          <div className="animate-marquee-rtl flex w-max flex-nowrap items-center">
            {/* ৩ বার রেন্ডার করা হয়েছে যাতে যেকোনো বড় ডিসপ্লেতে ফুল উইথ কভার করে */}
            {[...rowOnePartners, ...rowOnePartners, ...rowOnePartners].map((partner, index) => (
              <LogoCard key={`r1-${index}`} partner={partner} />
            ))}
          </div>
        </div>

        {/* দ্বিতীয় সারি: বাম থেকে ডানে (LTR) */}
        <div className="w-full overflow-hidden">
          <div className="animate-marquee-ltr flex w-max flex-nowrap items-center">
            {[...rowTwoPartners, ...rowTwoPartners, ...rowTwoPartners].map((partner, index) => (
              <LogoCard key={`r2-${index}`} partner={partner} />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}