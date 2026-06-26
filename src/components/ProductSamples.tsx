import React, { useState } from 'react';
import { Eye } from 'lucide-react';

interface ProductSamplesProps {
  onCTA: () => void;
}

export default function ProductSamples({ onCTA }: ProductSamplesProps) {
  const [isPaused, setIsPaused] = useState(false);

  const sampleImages = [
    {
      id: 1,
      url: 'https://i.ibb.co/DPsV4JB7/Screenshot-20260626-121054-Adobe-Acrobat.jpg',
      href: 'https://ibb.co/XfN2XQnz',
      alt: 'Muestra Ficha de Entrenamiento'
    },
    {
      id: 2,
      url: 'https://i.ibb.co/fVPHxNvx/Screenshot-20260626-121106-Adobe-Acrobat.jpg',
      href: 'https://ibb.co/20fdkMNk',
      alt: 'Muestra Control de Asistencia'
    },
    {
      id: 3,
      url: 'https://i.ibb.co/XkVfqD2w/Screenshot-20260626-121113-Adobe-Acrobat.jpg',
      href: 'https://ibb.co/prn6SQ0m',
      alt: 'Muestra Planificación Semanal'
    },
    {
      id: 4,
      url: 'https://i.ibb.co/Z12QkqCQ/Screenshot-20260626-121119-Adobe-Acrobat.jpg',
      href: 'https://ibb.co/93ZxCQjx',
      alt: 'Muestra Evaluación de Jugadores'
    }
  ];

  // Duplicate the array of images to enable a seamless infinite scrolling marquee loop
  const marqueeImages = [...sampleImages, ...sampleImages, ...sampleImages, ...sampleImages];

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
            Mira la calidad, el diseño y la facilidad de uso del material digital de muestra.
          </p>
        </div>

        {/* Automatic Scrolling Images Carousel */}
        <div className="relative w-full overflow-hidden py-2 bg-slate-900/20 border border-slate-900/60 rounded-3xl">
          {/* Subtle cinematic left and right gradients */}
          <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-20 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-20 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none"></div>

          <div 
            className="animate-marquee gap-4 px-4 py-2"
            style={{ 
              animationPlayState: isPaused ? 'paused' : 'running',
              animationDuration: '30s'
            }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
          >
            {marqueeImages.map((image, idx) => (
              <a
                key={`${image.id}-${idx}`}
                href={image.href}
                target="_blank"
                rel="noopener noreferrer"
                referrerPolicy="no-referrer"
                className="block relative flex-shrink-0 group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-2xl border border-slate-800 group-hover:border-orange-500/80 transition-all duration-300 shadow-lg bg-slate-950 h-[380px] sm:h-[550px] md:h-[680px] lg:h-[750px] aspect-[9/19.5]">
                  <img 
                    src={image.url} 
                    alt={image.alt}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                  />
                </div>
              </a>
            ))}
          </div>
        </div>


      </div>
    </section>
  );
}
