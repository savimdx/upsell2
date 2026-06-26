import React from 'react';
import { Sparkles, CheckCircle2, ShieldCheck, Download, Award } from 'lucide-react';

interface HeroProps {
  onCTA: () => void;
}

export default function Hero({ onCTA }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-slate-100 pt-10 pb-16 md:pt-16 md:pb-24 border-b border-slate-900">
      
      {/* Soccer/Futsal court tactical layout backdrop */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,rgba(249,115,22,0.012)_1px,transparent_1px),linear-gradient(to_bottom,rgba(249,115,22,0.012)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"></div>

      {/* Sporty gradient lights */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-orange-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[450px] h-[450px] bg-amber-500/5 rounded-full blur-[130px] pointer-events-none"></div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="flex flex-col items-center space-y-6">
          
          <span className="inline-flex items-center space-x-2 bg-orange-500/10 border border-orange-500/20 px-3.5 py-1.5 rounded-full text-xs font-black tracking-widest text-orange-400 uppercase">
            <Sparkles className="h-3.5 w-3.5 text-orange-400 animate-pulse" />
            <span>SISTEMA DIGITAL INSTANTÁNEO</span>
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none text-white uppercase font-sans max-w-4xl mx-auto">
            24 Plantillas Profesionales de <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500">
              Entrenamiento
            </span> de Fútbol Sala
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-medium leading-relaxed max-w-2xl mx-auto">
            Planifica sesiones de entrenamiento en minutos, organiza tu temporada y mejora el rendimiento de tu equipo con plantillas listas para usar.
          </p>

          {/* Product Image Presentation */}
          <div className="w-full max-w-xl mx-auto my-2 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl transition-all duration-500 hover:scale-[1.01] hover:border-orange-500/30">
            <img 
              src="https://i.ibb.co/DfddrNVL/Chat-GPT-Image-26-de-jun-de-2026-11-17-15.png" 
              alt="24 Plantillas de Entrenamiento de Fútbol Sala" 
              className="w-full h-auto object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Fast Benefits Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 w-full max-w-3xl">
            <div className="flex items-center justify-center space-x-3 text-sm text-slate-200 font-semibold bg-slate-900/50 border border-slate-850/60 p-3 rounded-xl hover:border-orange-500/30 transition-colors">
              <CheckCircle2 className="h-5 w-5 text-orange-400 flex-shrink-0" />
              <span>Organiza tus entrenamientos</span>
            </div>
            <div className="flex items-center justify-center space-x-3 text-sm text-slate-200 font-semibold bg-slate-900/50 border border-slate-850/60 p-3 rounded-xl hover:border-orange-500/30 transition-colors">
              <CheckCircle2 className="h-5 w-5 text-orange-400 flex-shrink-0" />
              <span>Mejora el rendimiento del equipo</span>
            </div>
            <div className="flex items-center justify-center space-x-3 text-sm text-slate-200 font-semibold bg-slate-900/50 border border-slate-850/60 p-3 rounded-xl hover:border-orange-500/30 transition-colors">
              <CheckCircle2 className="h-5 w-5 text-orange-400 flex-shrink-0" />
              <span>Uso inmediato</span>
            </div>
          </div>

          {/* Call to Action Button */}
          <div className="pt-4 flex flex-col items-center gap-3">
            <div className="flex items-center gap-2 text-xs text-slate-450 font-mono">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>Garantía de Satisfacción de 7 días</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
