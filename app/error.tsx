'use client'

import { useEffect } from 'react'
import { RefreshCcw, AlertTriangle, Sparkles } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // আপনি চাইলে এখানে error লগিং সার্ভিস (যেমন Sentry) যুক্ত করতে পারেন
    console.error(error)
  }, [error])

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#07090e] text-slate-100 overflow-hidden font-sans selection:bg-red-500 selection:text-white">
      
      {/* ================= 3D BACKGROUND EFFECTS ================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden [perspective:1000px]">
        {/* 3D Infinite Grid Floor - Slightly reddish to indicate error */}
        <div 
          className="absolute -inset-[100%] opacity-20 bg-[linear-gradient(to_right,#ef444415_1px,transparent_1px),linear-gradient(to_bottom,#ef444415_1px,transparent_1px)] bg-[size:4rem_4rem] animate-[gridScroll_20s_linear_infinite]"
          style={{ transform: 'rotateX(70deg) translateY(-10%) translateZ(-150px)' }}
        />
        
        {/* 3D Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-[140px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-orange-600/10 rounded-full blur-[160px] animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 text-center flex flex-col items-center px-4 w-full max-w-2xl">
        
        {/* ================= 3D ANIMATED BROKEN SERVER SCENE ================= */}
        <div className="relative w-80 h-72 mb-4 flex items-center justify-center [perspective:1000px]">
          
          {/* Floating Base */}
          <div className="relative w-full h-full flex items-center justify-center animate-[floatIsland_4s_ease-in-out_infinite]">
            
            {/* Shadow beneath */}
            <div className="absolute bottom-4 w-56 h-12 bg-red-500/20 rounded-[100%] blur-xl animate-[shadowPulse_4s_ease-in-out_infinite]"></div>

            {/* Custom SVG: Broken Server & Fixing Robot/Wrench */}
            <svg viewBox="0 0 300 300" className="w-full h-full drop-shadow-[0_20px_35px_rgba(239,68,68,0.2)]">
              
              {/* Floating Island (3D Ground) */}
              <ellipse cx="150" cy="240" rx="110" ry="35" fill="#1e293b" />
              <ellipse cx="150" cy="235" rx="110" ry="35" fill="#334155" />
              <ellipse cx="150" cy="230" rx="100" ry="30" fill="#ef4444" opacity="0.6" />

              {/* Server Rack Background (Shadow) */}
              <rect x="110" y="80" width="90" height="140" fill="#1e293b" rx="6" />
              
              {/* Main Server Rack */}
              <rect x="100" y="70" width="90" height="140" fill="#334155" rx="6" />
              <rect x="105" y="75" width="80" height="130" fill="#475569" rx="4" />
              
              {/* Server Screen (Glitching) */}
              <rect x="115" y="85" width="50" height="30" fill="#0f172a" rx="2" />
              <g className="animate-glitchScreen">
                <path d="M120 95 L155 95" stroke="#ef4444" strokeWidth="2" strokeDasharray="5 2" />
                <path d="M120 105 L145 105" stroke="#ef4444" strokeWidth="2" strokeDasharray="10 4" />
              </g>

              {/* Server Status Lights */}
              <circle cx="125" cy="130" r="4" fill="#ef4444" className="animate-[ping_1.5s_infinite]" />
              <circle cx="125" cy="130" r="4" fill="#dc2626" />
              <circle cx="140" cy="130" r="3" fill="#10b981" opacity="0.4" />
              <circle cx="150" cy="130" r="3" fill="#10b981" opacity="0.4" />

              {/* Open/Broken Panel Area */}
              <rect x="110" y="150" width="70" height="50" fill="#0f172a" />
              {/* Hanging door panel */}
              <path d="M110 150 L140 210 L110 210 Z" fill="#64748b" />
              
              {/* Spinning Gear inside broken panel */}
              <g className="animate-[spin_3s_linear_infinite]" style={{ transformOrigin: '145px 175px' }}>
                <circle cx="145" cy="175" r="12" fill="#f59e0b" />
                {/* Gear Teeth */}
                <rect x="142" y="158" width="6" height="34" fill="#f59e0b" rx="1" />
                <rect x="130" y="172" width="30" height="6" fill="#f59e0b" rx="1" />
                <path d="M135 165 L155 185 M155 165 L135 185" stroke="#f59e0b" strokeWidth="6" strokeLinecap="round" />
                {/* Gear Center */}
                <circle cx="145" cy="175" r="5" fill="#0f172a" />
              </g>

              {/* Broken Wires */}
              <path d="M115 160 Q130 170 120 185" stroke="#38bdf8" strokeWidth="2" fill="none" />
              <path d="M170 160 Q150 165 165 180" stroke="#f43f5e" strokeWidth="2" fill="none" />

              {/* Automated Wrench Fixing the server */}
              <g className="animate-[wrenchFix_1.5s_ease-in-out_infinite]" style={{ transformOrigin: '170px 185px' }}>
                <rect x="160" y="180" width="45" height="10" fill="#94a3b8" rx="3" />
                <path d="M200 173 C208 173 212 180 212 185 C212 190 208 197 200 197 L198 185 Z" fill="#cbd5e1" />
                <circle cx="204" cy="185" r="3" fill="#0f172a" />
              </g>

              {/* Sparks Animation from the broken wires */}
              <g className="animate-sparks opacity-0" style={{ transformOrigin: '120px 185px' }}>
                <circle cx="120" cy="185" r="2.5" fill="#fde047" />
                <circle cx="115" cy="175" r="2" fill="#fef08a" />
                <circle cx="125" cy="195" r="3" fill="#fbbf24" />
                <circle cx="110" cy="190" r="1.5" fill="#ffffff" />
              </g>
              
              {/* Floating 500 Error Sign (Left Side) */}
              <g className="animate-[bounce_3.5s_ease-in-out_infinite]">
                <rect x="25" y="90" width="60" height="40" fill="#ef4444" rx="4" />
                <rect x="30" y="95" width="50" height="30" fill="#1e293b" rx="2" />
                <text x="55" y="115" fill="#fca5a5" fontSize="14" fontWeight="bold" textAnchor="middle">500</text>
                {/* String holding sign to the base */}
                <line x1="55" y1="130" x2="105" y2="230" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />
              </g>

            </svg>
          </div>
        </div>

        {/* ================= ERROR CONTENT ================= */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 text-xs font-semibold mb-3 backdrop-blur-md">
          <AlertTriangle className="h-4 w-4 text-red-400" />
          <span>Error 500: Internal Server Error</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-3 drop-shadow-lg">
          System <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-500">Malfunction</span>
        </h1>
        
        <p className="text-sm md:text-base text-slate-400 mb-8 max-w-md mx-auto leading-relaxed">
          Opps! Our server encountered an unexpected glitch. Don't worry, our automated systems and engineers are working to fix it.
        </p>

        {/* ================= 3D BUTTON (Reset/Try Again) ================= */}
        <button 
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
          className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-red-500 to-orange-600 text-white font-extrabold text-sm md:text-base overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(239,68,68,0.3)] hover:shadow-[0_0_45px_rgba(239,68,68,0.5)]"
        >
          <RefreshCcw className="h-5 w-5 group-hover:-rotate-180 transition-transform duration-500 ease-in-out" />
          <span>Try Again</span>
          <Sparkles className="h-4 w-4 text-white/70 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>

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
        @keyframes glitchScreen {
          0%, 100% { opacity: 1; transform: translateX(0); }
          5% { opacity: 0.8; transform: translateX(-2px); }
          10% { opacity: 0.9; transform: translateX(2px); }
          15% { opacity: 1; transform: translateX(0); }
        }
        @keyframes wrenchFix {
          0%, 100% { transform: rotate(0deg) translate(0, 0); }
          25% { transform: rotate(-15deg) translate(-5px, -5px); }
          75% { transform: rotate(10deg) translate(2px, 2px); }
        }
        @keyframes sparks {
          0%, 10% { opacity: 0; transform: scale(0) translate(0, 0); }
          20% { opacity: 1; transform: scale(1.2) translate(-15px, 20px); }
          40%, 100% { opacity: 0; transform: scale(0) translate(-30px, 40px); }
        }
        .animate-sparks {
          animation: sparks 2s ease-out infinite;
        }
        .animate-glitchScreen {
          animation: glitchScreen 3s infinite;
        }
      `}</style>
    </div>
  )
}