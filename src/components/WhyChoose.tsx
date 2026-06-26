import React from 'react';
import { ClipboardList, Zap, LineChart, Trophy } from 'lucide-react';

export default function WhyChoose() {
  const cards = [
    {
      title: "📋 Organización Profesional",
      desc: "Estructura tus entrenamientos desde el calentamiento hasta la vuelta a la calma de forma totalmente clara y metódica.",
      icon: ClipboardList,
      color: "text-blue-400 bg-blue-500/10 border-blue-500/20"
    },
    {
      title: "⚡ Ahorro de Tiempo",
      desc: "No pierdas horas diseñando esquemas desde cero. Abre la plantilla, rellena los campos y estarás listo para dirigir la sesión.",
      icon: Zap,
      color: "text-amber-400 bg-amber-500/10 border-amber-500/20"
    },
    {
      title: "📈 Mejor Seguimiento",
      desc: "Registra el rendimiento de cada jugador, controla quién asiste y analiza la evolución colectiva de tu equipo mes a mes.",
      icon: LineChart,
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
    },
    {
      title: "🏆 Entrenamientos Más Efectivos",
      desc: "Planifica con objetivos sumamente claros que aceleran la asimilación táctica y el acondicionamiento físico de tus futbolistas.",
      icon: Trophy,
      color: "text-orange-400 bg-orange-500/10 border-orange-500/20"
    }
  ];

  return (
    <section className="bg-slate-900 py-16 md:py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-950 relative overflow-hidden">
      
      {/* Background radial glow */}
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-orange-500/5 rounded-full blur-[90px] pointer-events-none"></div>

      <div className="mx-auto max-w-5xl relative z-10 space-y-12">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold font-mono text-orange-400 uppercase tracking-widest block">
            MÁXIMA EFICIENCIA
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
            ¿Por qué utilizar estas plantillas?
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            La diferencia entre planificar improvisando en la cancha y liderar un entrenamiento de alto rendimiento.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div 
                key={idx}
                className="bg-slate-950 border border-slate-850/80 rounded-2xl p-6 hover:border-orange-500/35 transition-all duration-300 shadow-xl hover:-translate-y-1 group flex gap-4"
              >
                <div className={`flex-shrink-0 h-12 w-12 rounded-xl flex items-center justify-center border ${card.color} transition-colors duration-300`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-base sm:text-lg font-black text-white uppercase tracking-tight">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
