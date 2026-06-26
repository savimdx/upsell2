import React, { useState } from 'react';
import { Eye, CheckCircle2, ChevronRight, Activity, Calendar, Users, FileText, BarChart2 } from 'lucide-react';
import CourtDiagram from './CourtDiagram';

interface ProductSamplesProps {
  onCTA: () => void;
}

export default function ProductSamples({ onCTA }: ProductSamplesProps) {
  const [activeTab, setActiveTab] = useState<'session' | 'attendance' | 'planning' | 'scout'>('session');

  const tabs = [
    { id: 'session' as const, label: 'Plantilla de Entrenamiento', icon: FileText },
    { id: 'attendance' as const, label: 'Control de Asistencia', icon: Users },
    { id: 'planning' as const, label: 'Planificación Semanal', icon: Calendar },
    { id: 'scout' as const, label: 'Evaluación de Jugadores', icon: BarChart2 },
  ];

  return (
    <section className="bg-slate-950 py-16 md:py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-900 relative overflow-hidden">
      
      {/* Field overlay lines */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none"></div>

      <div className="mx-auto max-w-5xl relative z-10 space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-flex items-center space-x-2 bg-orange-500/10 border border-orange-500/30 px-3.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest text-orange-400 uppercase">
            <Eye className="h-3 w-3" />
            <span>MUESTRA DE ALTA FIDELIDAD</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
            Mira una muestra de las plantillas
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Navega por las pestañas de abajo para ver la calidad, el diseño y la facilidad de uso del material digital.
          </p>
        </div>

        {/* Interactive Tabs Selector */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-slate-900/60 p-2 rounded-2xl border border-slate-850">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center justify-center gap-2 py-3 px-2 rounded-xl text-xs font-bold transition-all uppercase cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-orange-600 to-amber-500 text-white shadow-lg shadow-orange-600/15'
                    : 'text-slate-450 hover:bg-slate-900 hover:text-slate-200'
                }`}
              >
                <Icon className="h-4 w-4 flex-shrink-0" />
                <span className="truncate">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Display Container */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-8 shadow-2xl relative min-h-[360px] flex flex-col justify-between">
          
          {/* ================= 1. PLANTILLA DE ENTRENAMIENTO PREVIEW ================= */}
          {activeTab === 'session' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                
                <div className="w-full md:w-1/2 space-y-4">
                  <div className="inline-block bg-orange-500/10 text-orange-400 border border-orange-500/20 px-2.5 py-0.5 rounded font-mono text-[10px] font-bold">
                    FICHA TÁCTICA DE SESIÓN
                  </div>
                  
                  <h3 className="text-xl font-black text-white uppercase">
                    Ficha de Sesión N°12: Presión Tras Pérdida
                  </h3>
                  
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Estructura clara que te guía en cada fase del entrenamiento con explicaciones cortas y directas al grano.
                  </p>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between border-b border-slate-800 py-1.5 text-slate-400">
                      <span>Objetivo principal:</span>
                      <span className="font-bold text-white">Transición Defensiva Rápida</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 py-1.5 text-slate-400">
                      <span>Duración total:</span>
                      <span className="font-bold text-white">75 Minutos</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 py-1.5 text-slate-400">
                      <span>Categoría sugerida:</span>
                      <span className="font-bold text-white">Sub-14 en adelante</span>
                    </div>
                    <div className="flex justify-between py-1.5 text-slate-400">
                      <span>Materiales necesarios:</span>
                      <span className="font-bold text-orange-400">Balones, Conos, Petos (2 colores)</span>
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-1/2 max-w-sm">
                  {/* Embedded beautiful interactive court diagram */}
                  <CourtDiagram type="warmup" />
                </div>

              </div>
            </div>
          )}

          {/* ================= 2. CONTROL DE ASISTENCIA PREVIEW ================= */}
          {activeTab === 'attendance' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-850 pb-3">
                <div>
                  <div className="inline-block bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 rounded font-mono text-[10px] font-bold uppercase">
                    Planilla de Control
                  </div>
                  <h3 className="text-lg font-black text-white uppercase mt-1">Registro Mensual de Asistencia</h3>
                </div>
                <div className="text-[10px] font-mono text-slate-400">
                  Mes: <span className="text-orange-400 font-bold">Octubre</span> | Grupo: <span className="text-orange-400 font-bold">Sub-16 A</span>
                </div>
              </div>

              {/* Attendance Table Representation */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead>
                    <tr className="bg-slate-950/60 text-slate-400 font-mono text-[10px] uppercase border-b border-slate-800">
                      <th className="p-3">Jugador / Posición</th>
                      <th className="p-3 text-center">LUN 04</th>
                      <th className="p-3 text-center">MIÉ 06</th>
                      <th className="p-3 text-center">VIE 08</th>
                      <th className="p-3 text-center">Partidos</th>
                      <th className="p-3 text-center font-bold text-white">% Asistencia</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-850">
                    <tr className="hover:bg-slate-950/30">
                      <td className="p-3 font-semibold text-white">Santi Méndez (Cierre)</td>
                      <td className="p-3 text-center text-emerald-400 font-black">✓</td>
                      <td className="p-3 text-center text-emerald-400 font-black">✓</td>
                      <td className="p-3 text-center text-emerald-400 font-black">✓</td>
                      <td className="p-3 text-center text-emerald-400 font-black">✓</td>
                      <td className="p-3 text-center"><span className="bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 px-2 py-0.5 rounded font-bold font-mono text-[10px]">100%</span></td>
                    </tr>
                    <tr className="hover:bg-slate-950/30">
                      <td className="p-3 font-semibold text-white">Mateo Ruiz (Ala Izq.)</td>
                      <td className="p-3 text-center text-emerald-400 font-black">✓</td>
                      <td className="p-3 text-center text-red-400 font-black">✕</td>
                      <td className="p-3 text-center text-emerald-400 font-black">✓</td>
                      <td className="p-3 text-center text-emerald-400 font-black">✓</td>
                      <td className="p-3 text-center"><span className="bg-amber-500/10 border border-amber-500/25 text-amber-400 px-2 py-0.5 rounded font-bold font-mono text-[10px]">80%</span></td>
                    </tr>
                    <tr className="hover:bg-slate-950/30">
                      <td className="p-3 font-semibold text-white">Leo Castro (Ala Der.)</td>
                      <td className="p-3 text-center text-emerald-400 font-black">✓</td>
                      <td className="p-3 text-center text-emerald-400 font-black">✓</td>
                      <td className="p-3 text-center text-emerald-400 font-black">✓</td>
                      <td className="p-3 text-center text-emerald-400 font-black">✓</td>
                      <td className="p-3 text-center"><span className="bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 px-2 py-0.5 rounded font-bold font-mono text-[10px]">100%</span></td>
                    </tr>
                    <tr className="hover:bg-slate-950/30">
                      <td className="p-3 font-semibold text-white">Hugo Silva (Pívot)</td>
                      <td className="p-3 text-center text-red-400 font-black">✕</td>
                      <td className="p-3 text-center text-emerald-400 font-black">✓</td>
                      <td className="p-3 text-center text-emerald-400 font-black">✓</td>
                      <td className="p-3 text-center text-emerald-400 font-black">✓</td>
                      <td className="p-3 text-center"><span className="bg-amber-500/10 border border-amber-500/25 text-amber-400 px-2 py-0.5 rounded font-bold font-mono text-[10px]">80%</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================= 3. PLANIFICACIÓN SEMANAL PREVIEW ================= */}
          {activeTab === 'planning' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="border-b border-slate-850 pb-3">
                <div className="inline-block bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2.5 py-0.5 rounded font-mono text-[10px] font-bold uppercase">
                  Macroestructura
                </div>
                <h3 className="text-lg font-black text-white uppercase mt-1">Planificación Semanal de Cargas</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-850 space-y-2">
                  <span className="text-[9px] font-mono font-bold text-slate-500 block uppercase">LUNES • SESIÓN 01</span>
                  <h4 className="font-bold text-white text-sm">Fuerza & Resistencia</h4>
                  <p className="text-xs text-slate-400 leading-normal">Activación coordinativa, sprints cortos integrados con balón y juegos reducidos 2v2.</p>
                  <span className="inline-block text-[9px] font-mono bg-red-500/15 border border-red-500/30 text-red-400 px-2 py-0.5 rounded uppercase">Carga: Alta 🔴</span>
                </div>

                <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-850 space-y-2">
                  <span className="text-[9px] font-mono font-bold text-slate-500 block uppercase">MIÉRCOLES • SESIÓN 02</span>
                  <h4 className="font-bold text-white text-sm">Bloques Tácticos</h4>
                  <p className="text-xs text-slate-400 leading-normal">Rotaciones defensivas en rombo (3-1), presión alta zonal y repliegue estructurado.</p>
                  <span className="inline-block text-[9px] font-mono bg-amber-500/15 border border-amber-500/30 text-amber-400 px-2 py-0.5 rounded uppercase">Carga: Media 🟡</span>
                </div>

                <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-850 space-y-2">
                  <span className="text-[9px] font-mono font-bold text-slate-500 block uppercase">VIERNES • SESIÓN 03</span>
                  <h4 className="font-bold text-white text-sm">Estrategia & Balón Parado</h4>
                  <p className="text-xs text-slate-400 leading-normal">Saques de esquina ensayados, tiros libres tácticos y velocidad de reacción final ligera.</p>
                  <span className="inline-block text-[9px] font-mono bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 px-2 py-0.5 rounded uppercase">Carga: Baja 🟢</span>
                </div>
              </div>
            </div>
          )}

          {/* ================= 4. EVALUACIÓN DE JUGADORES PREVIEW ================= */}
          {activeTab === 'scout' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-850 pb-3">
                <div>
                  <div className="inline-block bg-orange-500/10 text-orange-400 border border-orange-500/20 px-2.5 py-0.5 rounded font-mono text-[10px] font-bold uppercase">
                    Scouting de Rendimiento
                  </div>
                  <h3 className="text-lg font-black text-white uppercase mt-1">Ficha de Evaluación: Santiago Méndez</h3>
                </div>
                <div className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-1 rounded">
                  Posición: <span className="text-orange-400 font-bold">Cierre Central</span> | Edad: <span className="text-orange-400 font-bold">15 Años</span>
                </div>
              </div>

              {/* Attributes Progress Bars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex justify-between font-mono text-[10px] text-slate-400">
                      <span>ENTENDIMIENTO TÁCTICO</span>
                      <span className="font-bold text-white">88%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-850">
                      <div className="h-full bg-orange-500 rounded-full" style={{ width: '88%' }}></div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between font-mono text-[10px] text-slate-400">
                      <span>VELOCIDAD & AGILIDAD FÍSICA</span>
                      <span className="font-bold text-white">92%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-850">
                      <div className="h-full bg-orange-500 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between font-mono text-[10px] text-slate-400">
                      <span>HABILIDAD TÉCNICA (PASE/TIRO)</span>
                      <span className="font-bold text-white">80%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-850">
                      <div className="h-full bg-orange-500 rounded-full" style={{ width: '80%' }}></div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-850 flex flex-col justify-between">
                  <div>
                    <h4 className="font-extrabold text-white text-xs uppercase tracking-tight mb-2">Comentarios del Coach:</h4>
                    <p className="text-slate-450 leading-relaxed text-[11px]">
                      "Excelente lectura en bloque defensivo y coberturas por la banda izquierda. Su anticipación evita constantes 1vs1. Debe continuar mejorando la colocación en su pase profundo bajo fatiga."
                    </p>
                  </div>
                  <div className="pt-2 border-t border-slate-900 mt-2 flex justify-between text-[10px] font-mono text-slate-500">
                    <span>Evaluado: 24/06/2026</span>
                    <span className="text-emerald-400 font-bold">Aprobado ✓</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Shared bottom section */}
          <div className="border-t border-slate-850 pt-5 mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-slate-400 font-medium text-center sm:text-left">
              Estas son algunas de las <strong className="text-orange-400">24 plantillas incluidas</strong> en el paquete.
            </p>
            <button
              onClick={onCTA}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-gradient-to-r from-orange-600 via-amber-500 to-orange-600 hover:brightness-110 active:scale-[0.98] text-white font-black px-5 py-3 rounded-xl text-xs uppercase tracking-widest transition-all shadow-md shadow-orange-500/10 cursor-pointer"
            >
              <span>QUIERO TODAS LAS PLANTILLAS</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
