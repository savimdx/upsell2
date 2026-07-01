import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import WhyChoose from './components/WhyChoose';
import Offer from './components/Offer';
import SalesNotification from './components/SalesNotification';
import { LocalPrice } from './contexts/CurrencyContext';
import { CheckCircle2, Download, Sparkles, CreditCard, Shield, Mail, User, Wallet, Loader2 } from 'lucide-react';

export default function App() {
  const [viewMode, setViewMode] = useState<'sales' | 'checkout' | 'thankyou'>('sales');
  
  // Checkout Modal State
  const [checkoutName, setCheckoutName] = useState('');
  const [checkoutEmail, setCheckoutEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'transfer'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [formError, setFormError] = useState('');

  // Credit Card Form States
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  // Sticky Urgent Countdown syncing
  const [timeLeftSticky, setTimeLeftSticky] = useState(900); // 15 mins matching the Offer timer

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeftSticky((prev) => {
        if (prev <= 1) {
          return 900;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatStickyTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Scroll to top helper when state changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [viewMode]);

  // Open checkout trigger
  const handleOpenCheckout = () => {
    setViewMode('checkout');
    setFormError('');
  };

  // Smooth scroll to offer section or pricing card
  const handleScrollToOffer = () => {
    const pricingCard = document.getElementById('offer-pricing-card');
    if (pricingCard) {
      pricingCard.scrollIntoView({ behavior: 'smooth' });
    } else {
      const section = document.getElementById('special-offer-section');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Handle Simulated checkout submission
  const handleConfirmPurchase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkoutName.trim()) {
      setFormError('Por favor ingresa tu nombre completo.');
      return;
    }
    if (!checkoutEmail.trim() || !checkoutEmail.includes('@')) {
      setFormError('Por favor ingresa un correo electrónico válido.');
      return;
    }

    if (paymentMethod === 'card') {
      if (cardNumber.length < 16) {
        setFormError('Por favor ingresa un número de tarjeta válido (16 dígitos).');
        return;
      }
      if (!cardExpiry.includes('/')) {
        setFormError('Por favor ingresa la fecha de vencimiento (MM/AA).');
        return;
      }
      if (cardCvv.length < 3) {
        setFormError('Por favor ingresa el código de seguridad CVV.');
        return;
      }
    }

    setFormError('');
    setIsProcessing(true);

    // Simulate high-fidelity secure processing
    setTimeout(() => {
      setIsProcessing(false);
      setViewMode('thankyou');
    }, 1800);
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 antialiased overflow-x-hidden selection:bg-orange-500 selection:text-slate-950 font-sans">
      
      {/* Live sales social-proof notifications bubble */}
      <SalesNotification />

      {/* ================= CONDITIONAL FUNNEL STATES RENDERING ================= */}

      {viewMode === 'sales' && (
        <div className="animate-fadeIn">
          
          {/* Urgency Scarcity Ticker Banner */}
          <div className="bg-gradient-to-r from-amber-800 via-orange-600 to-amber-500 text-white text-center py-2 px-4 font-bold text-xs tracking-wider shadow-lg flex items-center justify-center gap-2 relative z-40 border-b border-orange-500/20 select-none">
            <Sparkles className="h-4 w-4 text-amber-200 animate-spin" />
            <span className="uppercase tracking-widest text-[9px] sm:text-[11px]">
              ¡ATENCIÓN! OFERTA DE LANZAMIENTO ÚNICA — QUEDAN POCOS ACCESOS A ESTE PRECIO
            </span>
          </div>

          {/* 1. HERO SECTION */}
          <Hero onCTA={handleScrollToOffer} />

          {/* 4. BENEFICIOS */}
          <WhyChoose />

          {/* 6. OFERTA FINAL */}
          <Offer onPurchase={handleOpenCheckout} />
        </div>
      )}

      {/* ================= CHECKOUT MODAL FLOW ================= */}
      {viewMode === 'checkout' && (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-950 relative overflow-hidden">
          
          {/* Soccer field decorative backdrop */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"></div>
          <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-orange-600/10 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative z-10 space-y-6">
            
            {/* Header / Brand */}
            <div className="text-center space-y-2">
              <span className="text-[10px] font-mono font-bold text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
                🔒 CONEXIÓN SEGURA CIFRADA
              </span>
              <h2 className="text-2xl font-black text-white uppercase tracking-tight">
                Completa tu Pedido
              </h2>
              <p className="text-xs text-slate-400">
                Estás a un paso de acceder a las 24 plantillas profesionales de fútbol.
              </p>
            </div>

            {/* Error messaging */}
            {formError && (
              <div className="p-3.5 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-400 font-semibold">
                ⚠️ {formError}
              </div>
            )}

            {/* Checkout Form */}
            <form onSubmit={handleConfirmPurchase} className="space-y-4 text-xs sm:text-sm">
              
              {/* Name */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-350 uppercase tracking-wider font-mono">Nombre Completo</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    required
                    placeholder="Ej. Juan Pérez"
                    value={checkoutName}
                    onChange={(e) => setCheckoutName(e.target.value)}
                    disabled={isProcessing}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-orange-500 rounded-xl py-3 pl-11 pr-4 text-white focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-350 uppercase tracking-wider font-mono">Correo Electrónico</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 h-4 text-slate-500" />
                  <input
                    type="email"
                    required
                    placeholder="ejemplo@correo.com"
                    value={checkoutEmail}
                    onChange={(e) => setCheckoutEmail(e.target.value)}
                    disabled={isProcessing}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-orange-500 rounded-xl py-3 pl-11 pr-4 text-white focus:outline-none transition-colors"
                  />
                </div>
                <span className="text-[10px] text-slate-500 font-medium block">
                  Enviaremos las plantillas de inmediato a este correo.
                </span>
              </div>

              {/* Payment Methods selector */}
              <div className="space-y-1.5 pt-1">
                <label className="block text-xs font-bold text-slate-350 uppercase tracking-wider font-mono">Método de Pago</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    disabled={isProcessing}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'bg-orange-500/10 border-orange-500 text-white font-extrabold'
                        : 'bg-slate-950 border-slate-850 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <CreditCard className="h-4 w-4" />
                    <span className="text-[10px] tracking-tight">Tarjeta</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('paypal')}
                    disabled={isProcessing}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                      paymentMethod === 'paypal'
                        ? 'bg-orange-500/10 border-orange-500 text-white font-extrabold'
                        : 'bg-slate-950 border-slate-850 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Wallet className="h-4 w-4" />
                    <span className="text-[10px] tracking-tight">PayPal</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('transfer')}
                    disabled={isProcessing}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                      paymentMethod === 'transfer'
                        ? 'bg-orange-500/10 border-orange-500 text-white font-extrabold'
                        : 'bg-slate-950 border-slate-850 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Wallet className="h-4 w-4" />
                    <span className="text-[10px] tracking-tight">PIX / QR</span>
                  </button>
                </div>
              </div>

              {/* Payment specific details view */}
              {paymentMethod === 'card' && (
                <div className="p-4 bg-slate-950/60 border border-slate-850 rounded-2xl space-y-3 animate-fadeIn">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-slate-400 font-mono">Número de Tarjeta</label>
                    <input
                      type="text"
                      maxLength={16}
                      placeholder="4111 2222 3333 4444"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ''))}
                      disabled={isProcessing}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-orange-500 text-xs font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-slate-400 font-mono">Vence (MM/AA)</label>
                      <input
                        type="text"
                        maxLength={5}
                        placeholder="12/28"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        disabled={isProcessing}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-orange-500 text-xs font-mono text-center"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-slate-400 font-mono">CVV</label>
                      <input
                        type="password"
                        maxLength={4}
                        placeholder="123"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                        disabled={isProcessing}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-orange-500 text-xs font-mono text-center"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'paypal' && (
                <div className="p-4 bg-slate-950/60 border border-slate-850 rounded-2xl text-center space-y-2 animate-fadeIn">
                  <p className="text-xs text-slate-300">
                    Serás redirigido de forma segura a PayPal para autorizar el cargo único de <strong className="text-white"><LocalPrice usd={4.90} /></strong>.
                  </p>
                  <span className="text-[10px] font-mono font-bold text-slate-500">PROCESAMIENTO INSTANTÁNEO</span>
                </div>
              )}

              {paymentMethod === 'transfer' && (
                <div className="p-4 bg-slate-950/60 border border-slate-850 rounded-2xl text-center space-y-2 animate-fadeIn">
                  <p className="text-xs text-slate-300">
                    Se generará un código QR PIX único o datos de transferencia por un valor de <strong className="text-white"><LocalPrice usd={4.90} /></strong>.
                  </p>
                  <span className="text-[10px] font-mono font-bold text-emerald-400">DESCARGA AUTOMÁTICA AL INSTANTE</span>
                </div>
              )}

              {/* Order total info box */}
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-850 flex justify-between items-center text-xs">
                <span className="text-slate-400 font-semibold">Total a debitar:</span>
                <span className="font-mono text-base font-black text-orange-400 animate-pulse"><LocalPrice usd={4.90} /></span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-3.5 bg-gradient-to-r from-orange-600 to-amber-500 hover:brightness-110 disabled:brightness-75 text-white font-black rounded-xl tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-orange-500/10"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="h-4.5 w-4.5 animate-spin text-white" />
                      <span>PROCESANDO PAGO...</span>
                    </>
                  ) : (
                    <>
                      <Shield className="h-4 w-4" />
                      <span>CONFIRMAR PAGO SEGURADO</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setViewMode('sales')}
                  disabled={isProcessing}
                  className="w-full py-2.5 bg-slate-950 border border-slate-850 hover:bg-slate-850/60 text-slate-450 hover:text-slate-300 font-bold rounded-xl transition-colors cursor-pointer text-center"
                >
                  Cancelar y Volver
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* ================= THANK YOU SCREEN ================= */}
      {viewMode === 'thankyou' && (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-950 relative overflow-hidden">
          
          {/* Soccer field decorative backdrop */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"></div>

          <div className="max-w-xl w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative z-10 text-center space-y-8 animate-fadeIn">
            
            {/* Header Success checkmark */}
            <div className="flex flex-col items-center space-y-3">
              <div className="h-16 w-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="h-10 w-10 stroke-[2.5]" />
              </div>
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest block">
                ¡PAGO COMPLETADO CON ÉXITO!
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
                ¡Gracias por tu confianza!
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Hemos enviado las credenciales de acceso y tu paquete digital directamente a tu bandeja de correo electrónico <span className="text-orange-400 font-bold">{checkoutEmail || 'usuario@correo.com'}</span>.
              </p>
            </div>

            {/* Receipt invoice details box */}
            <div className="bg-slate-950/60 border border-slate-850 rounded-2xl p-5 text-left space-y-4">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-850 pb-2.5 flex items-center justify-between">
                <span>Resumen de tu Pedido</span>
                <span className="text-orange-400 font-mono text-[10px]">CÓD: PTS-88291A</span>
              </p>

              <ul className="space-y-3 text-xs sm:text-sm">
                <li className="flex justify-between items-center text-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-500">✓</span>
                    <span>24 Plantillas de Entrenamiento de Fútbol (Pack Completo)</span>
                  </div>
                  <span className="font-bold font-mono text-slate-400"><LocalPrice usd={4.90} /></span>
                </li>
              </ul>

              <div className="border-t border-slate-850 pt-3 flex justify-between items-center font-bold text-white text-sm sm:text-base">
                <span>Total Cargado:</span>
                <span className="font-mono text-orange-400 text-lg sm:text-xl">
                  <LocalPrice usd={4.90} />
                </span>
              </div>
            </div>

            {/* Real downloadable simulated items */}
            <div className="space-y-3">
              <p className="text-sm sm:text-base text-orange-400 font-black uppercase tracking-wider bg-orange-500/10 py-2.5 px-4 rounded-xl border border-orange-500/20 inline-block">
                📥 ACCESO DE DESCARGA INSTANTÁNEO
              </p>
              
              <div className="flex flex-col gap-3 justify-center max-w-sm mx-auto">
                <button 
                  onClick={() => alert("¡Descarga Simulada de Éxito!\nEl PDF con las '24 Plantillas de Entrenamiento de Fútbol' se ha descargado correctamente en tu dispositivo.")}
                  className="w-full px-6 py-3.5 rounded-xl bg-gradient-to-r from-orange-600 via-amber-500 to-orange-600 hover:brightness-110 text-white font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg animate-pulse"
                >
                  <Download className="h-4.5 w-4.5 stroke-[2.5]" />
                  <span>Descargar 24 Plantillas (PDF)</span>
                </button>
              </div>
            </div>

            {/* Return to sales link */}
            <div className="pt-4 border-t border-slate-850">
              <button
                onClick={() => setViewMode('sales')}
                className="text-xs text-slate-550 hover:text-slate-450 underline font-medium cursor-pointer transition-colors"
              >
                Volver a la página principal
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
