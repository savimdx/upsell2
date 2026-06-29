import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface OfferProps {
  onPurchase: () => void;
}

export default function Offer({ onPurchase }: OfferProps) {
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          return 1800; // Reset for continuous demo urgency
        }
        return prev - 1;
      });
    }, 1000);

    // Dynamically load Hotmart checkout script
    const scriptId = 'hotmart-checkout-script';
    let script = document.getElementById(scriptId) as HTMLScriptElement;

    const initWidget = () => {
      if ((window as any).checkoutElements) {
        try {
          (window as any).checkoutElements.init('salesFunnel').mount('#hotmart-sales-funnel');
        } catch (err) {
          console.error("Error mounting Hotmart sales funnel widget:", err);
        }
      }
    };

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://checkout.hotmart.com/lib/hotmart-checkout-elements.js';
      script.async = true;
      script.onload = () => {
        initWidget();
      };
      document.body.appendChild(script);
    } else {
      // If script is already present, attempt initialization immediately or on load
      initWidget();
    }

    return () => {
      clearInterval(timer);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <section id="special-offer-section" className="bg-slate-950 py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-slate-900 relative scroll-mt-20 overflow-hidden">
      
      {/* Glow backgrounds */}
      <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-orange-600/10 rounded-full blur-[130px] pointer-events-none"></div>

      <div className="mx-auto max-w-4xl relative z-10">
        
        {/* Urgency countdown bar */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 bg-red-600/20 border-2 border-red-500 px-5 py-3 rounded-2xl shadow-xl shadow-red-950/50 animate-pulse">
            <Clock className="h-5 w-5 text-red-500 animate-spin-slow" />
            <span className="text-xs sm:text-sm font-black text-white uppercase tracking-wider font-mono">
              ¡ATENCIÓN! ESTA OFERTA CON EL 90% DE DESCUENTO EXPIRA EN: <span className="text-red-500 text-base font-extrabold">{formatTime(timeLeft)}</span>
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
            <a 
              href="https://ibb.co/QFym4qLy" 
              target="_blank" 
              rel="noopener noreferrer" 
              referrerPolicy="no-referrer"
              className="block max-w-[280px] sm:max-w-[320px] mx-auto my-3"
            >
              <img 
                src="https://i.ibb.co/cc4Tjp04/Chat-GPT-Image-26-de-jun-de-2026-11-17-15.png" 
                alt="Garantía" 
                referrerPolicy="no-referrer"
                className="w-full h-auto mx-auto object-contain rounded-lg"
              />
            </a>
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

          {/* CTA Button */}
          <div className="max-w-md mx-auto pt-4">
            <div id="hotmart-sales-funnel" className="min-h-[100px] w-full flex items-center justify-center"></div>
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
