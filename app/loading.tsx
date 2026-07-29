// app/loading.tsx
'use client'

export default function Loading() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-slate-50 dark:bg-[#07090e] overflow-hidden relative">
      
      {/* 🌟 Background Glowing Effect (Professional touch) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-[80px] animate-pulse" />

      {/* 🌟 Main Animation Container */}
      <div className="relative flex flex-col items-center z-10">
        
        {/* --- CARTOON SCENE: Floating Island & House --- */}
        <div className="relative w-56 h-56 flex flex-col items-center justify-end animate-bounce" style={{ animationDuration: '3s' }}>
          
          {/* ☀️ Animated Sun / Moon */}
          <div className="absolute top-4 right-4 w-10 h-10 bg-amber-400 rounded-full shadow-[0_0_20px_rgba(251,191,36,0.5)]">
             <div className="absolute top-1.5 right-2 w-3 h-3 bg-white/40 rounded-full" />
          </div>

          {/* ☁️ Floating Clouds */}
          <div className="absolute top-10 left-0 w-16 h-5 bg-slate-200 dark:bg-slate-700 rounded-full opacity-80 animate-pulse">
             <div className="absolute -top-3 left-3 w-8 h-8 bg-slate-200 dark:bg-slate-700 rounded-full" />
          </div>
          <div className="absolute top-16 right-0 w-12 h-4 bg-slate-200 dark:bg-slate-700 rounded-full opacity-60">
             <div className="absolute -top-2 left-2 w-6 h-6 bg-slate-200 dark:bg-slate-700 rounded-full" />
          </div>

          {/* 🏠 The Cute Cartoon House */}
          <div className="relative w-32 h-24 mb-2 z-10">
            
            {/* Chimney & Smoke */}
            <div className="absolute -top-6 right-4 w-5 h-10 bg-rose-600 rounded-t-sm" />
            <div className="absolute -top-10 right-3 w-3 h-3 bg-slate-300 dark:bg-slate-500 rounded-full animate-ping" style={{ animationDuration: '2s' }} />
            <div className="absolute -top-14 right-5 w-4 h-4 bg-slate-300 dark:bg-slate-500 rounded-full animate-ping delay-300" style={{ animationDuration: '2.5s' }} />

            {/* Roof */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-40 h-16 bg-indigo-600 rounded-lg skew-x-12 border-b-4 border-indigo-800 shadow-md" />
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-40 h-16 bg-indigo-500 rounded-lg -skew-x-12 border-b-4 border-indigo-700 shadow-md" />

            {/* House Body */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-28 h-16 bg-white dark:bg-slate-800 rounded-b-xl shadow-[0_5px_15px_rgba(0,0,0,0.1)] border-x border-b border-slate-200 dark:border-slate-700 overflow-hidden">
              
              {/* Door */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-10 bg-teal-500 rounded-t-lg border-t-2 border-r-2 border-l-2 border-teal-600">
                <div className="absolute top-1/2 right-1.5 w-1.5 h-1.5 bg-white rounded-full" />
              </div>
              
              {/* Glowing Windows (Cartoon Eyes effect) */}
              <div className="absolute top-3 left-3 w-6 h-6 bg-amber-200 rounded-md shadow-[0_0_15px_rgba(253,230,138,0.9)] animate-pulse" />
              <div className="absolute top-3 right-3 w-6 h-6 bg-amber-200 rounded-md shadow-[0_0_15px_rgba(253,230,138,0.9)] animate-pulse delay-75" />
            </div>
          </div>

          {/* 🏝️ Floating Island Base */}
          <div className="w-48 h-8 bg-emerald-500 dark:bg-emerald-600 rounded-[100%] shadow-[0_10px_20px_rgba(16,185,129,0.3)] border-b-4 border-emerald-700 z-0"></div>
        </div>

        {/* 🌑 Floor Shadow (Scales naturally as the island bounces) */}
        <div className="w-32 h-3 bg-black/10 dark:bg-black/40 rounded-[100%] blur-sm mt-4 animate-pulse" style={{ animationDuration: '3s' }} />

        {/* --- PROFESSIONAL LOADING TEXT --- */}
        <div className="mt-10 flex flex-col items-center gap-2">
          
          {/* Animated Header */}
          <div className="flex items-center gap-2">
            <span className="text-xl font-extrabold tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-teal-500 uppercase">
              Discovering
            </span>
            <div className="flex space-x-1 mt-1">
              <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-bounce"></span>
            </div>
          </div>

          {/* Subtitle */}
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Curating the best properties for you
          </p>

        </div>

      </div>
    </div>
  );
}