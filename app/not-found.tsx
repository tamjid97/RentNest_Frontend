'use client'

import Link from 'next/link'
import { ArrowLeft, AlertCircle, Sparkles } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#07090e] text-slate-100 overflow-hidden font-sans selection:bg-amber-500 selection:text-slate-950">
      
      {/* ================= 3D BACKGROUND EFFECTS ================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden [perspective:1000px]">
        {/* 3D Infinite Grid Floor */}
        <div 
          className="absolute -inset-[100%] opacity-20 bg-[linear-gradient(to_right,#f59e0b15_1px,transparent_1px),linear-gradient(to_bottom,#f59e0b15_1px,transparent_1px)] bg-[size:4rem_4rem] animate-[gridScroll_20s_linear_infinite]"
          style={{ transform: 'rotateX(70deg) translateY(-10%) translateZ(-150px)' }}
        />
        
        {/* 3D Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/15 rounded-full blur-[140px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-sky-600/10 rounded-full blur-[160px] animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 text-center flex flex-col items-center px-4 w-full max-w-2xl">
        
        {/* ================= 3D ANIMATED CONSTRUCTION SCENE ================= */}
        <div className="relative w-80 h-72 mb-4 flex items-center justify-center [perspective:1000px]">
          
          {/* Floating Base */}
          <div className="relative w-full h-full flex items-center justify-center animate-[floatIsland_4s_ease-in-out_infinite]">
            
            {/* Shadow beneath */}
            <div className="absolute bottom-4 w-56 h-12 bg-amber-500/20 rounded-[100%] blur-xl animate-[shadowPulse_4s_ease-in-out_infinite]"></div>

            {/* Custom SVG: Man Building House with Hammer */}
            <svg viewBox="0 0 300 300" className="w-full h-full drop-shadow-[0_20px_35px_rgba(245,158,11,0.25)]">
              
              {/* Floating Island (3D Ground) */}
              <ellipse cx="150" cy="240" rx="110" ry="35" fill="#1e293b" />
              <ellipse cx="150" cy="235" rx="110" ry="35" fill="#334155" />
              <ellipse cx="150" cy="230" rx="100" ry="30" fill="#f59e0b" opacity="0.8" />

              {/* Unfinished House (Scaffolding & Beams) */}
              <g className="drop-shadow-lg">
                {/* Wood Beams */}
                <rect x="70" y="100" width="12" height="120" fill="#92400e" rx="3" />
                <rect x="130" y="120" width="12" height="100" fill="#92400e" rx="3" />
                <rect x="60" y="120" width="90" height="12" fill="#b45309" rx="2" />
                <rect x="60" y="160" width="90" height="12" fill="#b45309" rx="2" />
                {/* Brick Wall */}
                <path d="M75 220 L125 220 L125 180 L75 180 Z" fill="#b91c1c" />
                <path d="M75 190 L125 190 M75 200 L125 200 M75 210 L125 210" stroke="#fca5a5" strokeWidth="1.5" />
                <path d="M85 180 L85 220 M100 180 L100 220 M115 180 L115 220" stroke="#fca5a5" strokeWidth="1.5" strokeDasharray="10 10" />
              </g>

              {/* Blueprint Paper */}
              <path d="M150 240 L180 250 L190 235 L160 225 Z" fill="#38bdf8" opacity="0.7" />
              <line x1="155" y1="235" x2="175" y2="242" stroke="#0284c7" strokeWidth="2" />

              {/* The Builder (Cartoon Man) */}
              <g className="animate-[bouncingBuilder_2s_ease-in-out_infinite]">
                {/* Body/Overalls */}
                <path d="M190 150 Q180 180 185 210 L225 210 Q230 180 220 150 Z" fill="#3b82f6" />
                {/* Belt */}
                <rect x="186" y="180" width="38" height="8" fill="#1e293b" />
                {/* Head */}
                <circle cx="205" cy="130" r="18" fill="#fde047" />
                {/* Hard Hat */}
                <path d="M182 130 A 23 23 0 0 1 228 130 Z" fill="#f59e0b" />
                <rect x="178" y="128" width="54" height="6" fill="#d97706" rx="3" />
                {/* Left Arm (Holding Hammer) */}
                <path d="M195 155 Q170 160 160 170" stroke="#fde047" strokeWidth="10" strokeLinecap="round" fill="none" />
              </g>

              {/* Hammering Animation Group */}
              <g className="animate-hammerStrike" style={{ transformOrigin: '160px 170px' }}>
                {/* Hammer Handle */}
                <rect x="120" y="165" width="45" height="8" fill="#78350f" rx="3" />
                {/* Hammer Head */}
                <path d="M115 155 L130 155 L125 185 L110 185 Z" fill="#94a3b8" />
              </g>

              {/* Sparks/Dust (Triggered when hammer hits) */}
              <g className="animate-sparks opacity-0">
                <circle cx="110" cy="170" r="3" fill="#fef08a" />
                <circle cx="105" cy="160" r="2.5" fill="#fde047" />
                <circle cx="115" cy="150" r="4" fill="#fbbf24" />
              </g>
              
              {/* Floating Construction Sign */}
              <g className="animate-[bounce_3s_ease-in-out_infinite]">
                <rect x="220" y="70" width="60" height="40" fill="#f59e0b" rx="4" />
                <rect x="225" y="75" width="50" height="30" fill="#1e293b" rx="2" />
                <text x="250" y="95" fill="#f59e0b" fontSize="14" fontWeight="bold" textAnchor="middle">404</text>
                {/* String holding sign */}
                <line x1="250" y1="0" x2="250" y2="70" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 4" />
              </g>

            </svg>
          </div>
        </div>

        {/* ================= ERROR CONTENT ================= */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-semibold mb-3 backdrop-blur-md">
          <AlertCircle className="h-4 w-4 text-amber-400" />
          <span>Error 404: Route Not Found</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-3 drop-shadow-lg">
          This <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Route</span> Doesn't Exist
        </h1>
        
        <p className="text-sm md:text-base text-slate-400 mb-8 max-w-md mx-auto leading-relaxed">
          Looks like our builders are still working on this area. The path you are looking for is currently under construction.
        </p>

        {/* ================= 3D BUTTON ================= */}
        <Link 
          href="/"
          className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-extrabold text-sm md:text-base overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(245,158,11,0.4)] hover:shadow-[0_0_45px_rgba(245,158,11,0.6)]"
        >
          <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1.5 transition-transform duration-300" />
          <span>Back to Home</span>
          <Sparkles className="h-4 w-4 text-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity" />
        </Link>

      </div>

      {/* ================= CUSTOM CSS ANIMATIONS ================= */}
      <style>{`
        @keyframes gridScroll {
          0% { transform: rotateX(70deg) translateY(0%) translateZ(-150px); }
          100% { transform: rotateX(70deg) translateY(8rem) translateZ(-150px); }
        }
        @keyframes floatIsland {
          0%, 100% { transform: translateY(0px) rotateY(0deg); }
          50% { transform: translateY(-15px) rotateY(3deg); }
        }
        @keyframes shadowPulse {
          0%, 100% { transform: scale(1); opacity: 0.2; }
          50% { transform: scale(0.85); opacity: 0.1; }
        }
        @keyframes bouncingBuilder {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        @keyframes hammerStrike {
          0% { transform: rotate(15deg); }
          15% { transform: rotate(-35deg); }
          30% { transform: rotate(15deg); }
          100% { transform: rotate(15deg); }
        }
        @keyframes sparks {
          0%, 14% { opacity: 0; transform: scale(0) translate(0, 0); }
          15% { opacity: 1; transform: scale(1.5) translate(-10px, -15px); }
          30%, 100% { opacity: 0; transform: scale(0) translate(-20px, -30px); }
        }
        .animate-hammerStrike {
          animation: hammerStrike 1.5s ease-in-out infinite;
        }
        .animate-sparks {
          animation: sparks 1.5s ease-out infinite;
        }
      `}</style>
    </div>
  )
}