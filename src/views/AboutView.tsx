import React from 'react';
import { useStore } from '../context/StoreContext';
import { Sparkles, ArrowRight, ShieldCheck, Heart, Layers, Droplets } from 'lucide-react';

export const AboutView: React.FC = () => {
  const { navigateTo } = useStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Hero Header */}
      <div className="max-w-3xl space-y-6">
        <span className="text-[11px] uppercase font-mono tracking-widest text-[#ff5b36] font-bold">
          About KROMA Studio
        </span>
        <h1 className="font-display font-black text-4xl sm:text-6xl text-white tracking-tight leading-[1.1]">
          At the intersection of tactile fashion and sensory living.
        </h1>
        <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light">
          Founded in 2024, KROMA is an independent lifestyle research studio dedicated to crafting
          elevated everyday objects. We reject disposable fast fashion in favor of architectural
          silhouettes, heavyweight combed cotton, German magnetic hardware, and organic botanical
          flavor extracts designed to heighten your daily existence.
        </p>
      </div>

      {/* Hero Visual Banner */}
      <div className="relative aspect-[21/9] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
        <img
          src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1600&q=80"
          alt="KROMA Design Workshop"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e14] via-transparent to-transparent opacity-80" />
        <div className="absolute bottom-6 left-6 sm:left-10 text-white space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#ff5b36]">
            Studio Atelier • Prototype Lab
          </span>
          <p className="font-display font-bold text-lg sm:text-xl">
            Where textile physics meets sensory culinary chemistry.
          </p>
        </div>
      </div>

      {/* 3 Core Design Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 rounded-3xl bg-[#121622] border border-white/10 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#ff5b36]/10 text-[#ff5b36] flex items-center justify-center">
            <Layers className="w-6 h-6" />
          </div>
          <h3 className="font-display font-black text-xl text-white">280 GSM Boxy Architecture</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Our t-shirts are spun with long-staple Aegean organic combed cotton. The 280 GSM weight
            guarantees a permanent boxy structural drape that resists collar sag and washing
            distortion over years of daily wear.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-[#121622] border border-white/10 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#2656d6]/10 text-[#2656d6] flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-display font-black text-xl text-white">Ballistic Cordura & Fidlock®</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Every bag silhouette incorporates military-grade 840D water-repellent Cordura® fabric,
            weatherproof YKK AquaGuard® zippers, and authentic German magnetic Fidlock® buckles that
            release effortlessly with one pull.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-[#121622] border border-white/10 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-400/10 text-amber-400 flex items-center justify-center">
            <Droplets className="w-6 h-6" />
          </div>
          <h3 className="font-display font-black text-xl text-white">Zero-Sugar Sensory Botany</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Why stop at what you wear? Our sensory studio produces small-batch botanical drops using
            cold-vacuum terpene extraction. Just 3 drops transform standard hydration into a complex,
            Michelin-grade aromatic experience.
          </p>
        </div>
      </div>

      {/* Studio Action Footer */}
      <div className="p-10 rounded-3xl bg-gradient-to-r from-[#171a24] to-[#202737] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="font-display font-black text-2xl text-white">
            Experience the tactile difference.
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            Backed by our unconditional 30-day wear-and-test guarantee.
          </p>
        </div>
        <button
          type="button"
          onClick={() => navigateTo('shop', { category: 'all' })}
          className="px-8 py-3.5 rounded-2xl bg-[#ff5b36] hover:bg-[#f04f29] text-white font-bold text-xs shadow-xl transition-all inline-flex items-center gap-2"
        >
          <span>Explore All Collections</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
