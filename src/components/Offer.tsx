import React, { useState, useEffect } from 'react';
import { Clock, ShieldCheck, CreditCard, Sparkles, Check } from 'lucide-react';

interface OfferProps {
  onPurchase: () => void;
}

export default function Offer({ onPurchase }: OfferProps) {
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          return 900; // Reset for continuous demo urgency
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const benefits = [
    "Acceso instantáneo",
    "Descarga digital",
    "Uso ilimitado",
    "Compatible con cualquier dispositivo"
  ];

  return (
    <section id="special-offer-section" className="bg-slate-950 py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-slate-900 relative scroll-mt-20 overflow-hidden">
      
      {/* Glow backgrounds */}
      <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-orange-600/10 rounded-full blur-[130px] pointer-events-none"></div>

      <div className="mx-auto max-w-4xl relative z-10">
        
        {/* Urgency countdown bar */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 bg-red-600/10 border border-red-500/30 px-4 py-2.5 rounded-2xl shadow-lg animate-pulse">
            <Clock className="h-4.5 w-4.5 text-red-400" />
            <span className="text-xs sm:text-sm font-black text-white uppercase tracking-wider font-mono">
              ¡ATENCIÓN! ESTA OFERTA CON EL 90% DE DESCUENTO EXPIRA EN: <span className="text-red-400">{formatTime(timeLeft)}</span>
            </span>
          </div>
        </div>

        {/* Pricing Card */}
        <div id="offer-pricing-card" className="bg-gradient-to-br from-orange-950/20 via-slate-900 to-orange-950/20 border-2 border-orange-500 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden text-center max-w-2xl mx-auto space-y-6 scroll-mt-28">
          
          <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-orange-400/5 blur-3xl pointer-events-none"></div>

          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 bg-orange-500 text-slate-950 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mx-auto shadow-md">
              🔥 OFERTA DE LANZAMIENTO ÚNICA
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-none uppercase">
              Obtén acceso inmediato hoy
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
              Empieza a organizar tus entrenamientos como un profesional desde hoy mismo.
            </p>
          </div>

          {/* Pricing area */}
          <div className="py-6 border-y border-slate-800 max-w-md mx-auto space-y-3">
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-slate-450">
              <span>Valor Oficial: <span className="line-through text-red-500 font-extrabold">$47.00 USD</span></span>
              <span className="bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-mono font-bold text-[9px] uppercase tracking-wider">
                Ahorras $42.10
              </span>
            </div>

            <div className="flex items-baseline justify-center">
              <span className="text-5xl sm:text-6xl font-black text-orange-400 tracking-tight animate-pulse">
                $4.90
              </span>
              <span className="text-lg font-bold text-orange-500 ml-1.5 font-mono">
                USD
              </span>
            </div>

            <p className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">
              Pago único • Acceso de por vida • Sin suscripciones mensuales
            </p>
          </div>

          {/* Benefits Checkboxes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto text-left">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-center space-x-2.5 text-xs sm:text-sm text-slate-200">
                <div className="h-5 w-5 rounded-full bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 flex-shrink-0">
                  <Check className="h-3 w-3 stroke-[3]" />
                </div>
                <span className="font-semibold">{benefit}</span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="max-w-md mx-auto pt-4">
            <button
              onClick={onPurchase}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-orange-600 via-amber-500 to-orange-600 hover:brightness-110 active:scale-[0.98] text-white font-black text-sm tracking-widest uppercase transition-all shadow-xl shadow-orange-500/20 cursor-pointer border border-orange-400/20"
            >
              <CreditCard className="h-4.5 w-4.5" />
              <span>DESCARGAR AHORA</span>
            </button>
            <p className="text-[10px] text-slate-500 mt-2 font-mono uppercase tracking-wide">
              🔒 Procesamiento Seguro cifrado SSL de 256 bits
            </p>
          </div>

          {/* Trust Seals */}
          <div className="flex justify-center items-center gap-4 text-[9px] font-mono text-slate-500 uppercase tracking-wider pt-2 border-t border-slate-900">
            <span>🛡️ Garantía de 7 días</span>
            <span>⚡ Descarga Directa</span>
            <span>👍 Soporte Permanente</span>
          </div>

        </div>

      </div>
    </section>
  );
}
