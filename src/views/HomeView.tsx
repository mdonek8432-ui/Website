import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import {
  Zap,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Star,
  CheckCircle2,
  SlidersHorizontal,
  Flame,
  ChevronLeft,
  ChevronRight,
  Package,
  Clock,
  Layers,
  Award
} from 'lucide-react';
import { ProductCategory } from '../types';

export const HomeView: React.FC = () => {
  const { products, navigateTo, setActiveCategory, setIsWpGuideOpen } = useStore();

  // Tab filter for Bestsellers
  const [activeTab, setActiveTab] = useState<'all' | 'vapes' | 'caps' | 'bags' | 't-shirts'>('all');

  // Interactive Vape Flavor Bar Selection
  const [selectedFlavorIndex, setSelectedFlavorIndex] = useState(0);

  const flavorShowcase = [
    {
      name: 'Miami Mint Frost',
      notes: 'Crisp Spearmint, Glacial Menthol & Sweet Peppermint',
      intensity: 'Extra Bold ❄️',
      color: '#00F59B',
      accentBg: 'from-[#00F59B]/20 to-transparent',
      puffMatch: '15,000 Puffs Nebula Series',
      image: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=1000&q=80'
    },
    {
      name: 'Blue Razz Freeze',
      notes: 'Wild Blue Raspberry & Chilled Glacial Sugar Crystals',
      intensity: 'Bold Tart & Sweet 🫐',
      color: '#3B82F6',
      accentBg: 'from-[#3B82F6]/20 to-transparent',
      puffMatch: 'Dual Mesh HyperCoil Pod',
      image: 'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&w=1000&q=80'
    },
    {
      name: 'Tokyo Mango Peach',
      notes: 'Golden Alphonso Mango Nectar & White Peach Pulp',
      intensity: 'Sweet & Tropical 🥭',
      color: '#F59E0B',
      accentBg: 'from-[#F59E0B]/20 to-transparent',
      puffMatch: 'OLED Smart Vapor Series',
      image: 'https://images.unsplash.com/photo-1541689592655-f5f52825a3b8?auto=format&fit=crop&w=1000&q=80'
    },
    {
      name: 'Sour Green Apple Ice',
      notes: 'Crisp Granny Smith Tang with Sub-Zero Frost',
      intensity: 'Ultra Sour & Fresh 🍏',
      color: '#84CC16',
      accentBg: 'from-[#84CC16]/20 to-transparent',
      puffMatch: '12K FrostPulse Bar',
      image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=80'
    }
  ];

  // Filter products for the showcase
  const filteredProducts = products.filter((p) => {
    if (activeTab === 'all') return true;
    return p.category === activeTab;
  });

  // Vape specific products for hero highlight
  const vapeProducts = products.filter((p) => p.category === 'vapes');

  return (
    <div className="w-full bg-[#090c13] text-[#f1f5f9] overflow-hidden">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION: VAPE FLAGSHIP WITH VIBRANT LIGHTING & OLED BADGE         */}
      {/* ========================================================================= */}
      <section className="relative min-h-[580px] lg:min-h-[640px] flex items-center pt-8 pb-16 px-4 sm:px-6 lg:px-8 border-b border-[#182133] overflow-hidden">
        {/* Ambient Gradient Mesh Backgrounds */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00f59b]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#3b82f6]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-72 h-72 bg-[#8b5cf6]/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
          {/* Left Column: Headline, Specs & CTAs */}
          <div className="lg:col-span-7 flex flex-col space-y-6 text-left">
            {/* Top Category Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#141b2c] border border-[#232f4a] w-fit shadow-md">
              <span className="w-2 h-2 rounded-full bg-[#00f59b] animate-ping" />
              <span className="text-xs font-bold tracking-wider text-[#00f59b] uppercase">
                MAIN DROP: 15,000 PUFF DUAL MESH VAPES
              </span>
              <span className="text-[11px] text-slate-400">| ভ্যাপ ও লাইফস্টাইল</span>
            </div>

            {/* Main Punchy Headline */}
            <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.08]">
              Next-Gen <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f59b] via-[#38bdf8] to-[#818cf8]">Vapor Tech</span> & Urban Street Essentials.
            </h1>

            {/* Subtitle in Bengali & English */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              মেইন কালেকশন: ১৫,০০০ পাফ ডুয়াল-মেশ <strong className="text-[#00f59b] font-semibold">স্মার্ট ভ্যাপ</strong>, ভিন্টেজ কর্ডারয় <strong className="text-amber-400 font-semibold">ক্যাপ</strong>, ট্যাকটিকাল ইডিসি <strong className="text-blue-400 font-semibold">ব্যাগ</strong> এবং ২৮০ জিএসএম হেভিওয়েট <strong className="text-rose-400 font-semibold">টি-শার্ট</strong>। কোনো মানব মডেল নয়—১০০% প্রিমিয়াম প্রোডাক্ট আর্ট।
            </p>

            {/* Hardware Tech Specs Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
              <div className="p-3 rounded-xl bg-[#121726] border border-[#20293d] flex flex-col">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">PUFF POWER</span>
                <span className="text-base font-bold text-[#00f59b]">15,000 Puffs</span>
              </div>
              <div className="p-3 rounded-xl bg-[#121726] border border-[#20293d] flex flex-col">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">COIL SYSTEM</span>
                <span className="text-base font-bold text-sky-400">0.8Ω Dual Mesh</span>
              </div>
              <div className="p-3 rounded-xl bg-[#121726] border border-[#20293d] flex flex-col">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">DISPLAY</span>
                <span className="text-base font-bold text-amber-400">Curved OLED</span>
              </div>
              <div className="p-3 rounded-xl bg-[#121726] border border-[#20293d] flex flex-col">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">CHARGE</span>
                <span className="text-base font-bold text-purple-400">Type-C 30m</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                type="button"
                onClick={() => navigateTo('shop', { category: 'vapes' })}
                className="px-6 sm:px-8 py-3.5 rounded-xl bg-[#00f59b] hover:bg-[#00df8c] text-black font-extrabold text-sm sm:text-base transition-all transform hover:scale-[1.02] active:scale-95 shadow-xl shadow-[#00f59b]/25 flex items-center gap-2"
              >
                <Zap className="w-5 h-5 fill-current" />
                <span>Shop Vape Drops (ভ্যাপ)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => navigateTo('shop', { category: 'caps' })}
                className="px-6 py-3.5 rounded-xl bg-[#151c2e] hover:bg-[#1e273f] text-white border border-[#2a3754] font-bold text-sm sm:text-base transition-all flex items-center gap-2"
              >
                <span>Caps & Lifestyle Gear</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Product Image (Clean, No Borders, No Text or Overlays on Image) */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="w-full max-w-md lg:max-w-lg overflow-hidden rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=1200&q=80"
                alt="VAPEX Vape Pod"
                className="w-full h-auto max-h-[500px] object-cover rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. FOUR MAIN CATEGORY PILLARS (IN EXACT USER PRIORITY: VAPES, CAPS, BAGS, TEES) */}
      {/* ========================================================================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-[#00f59b] mb-1">
              CATEGORY DIRECTORY • ক্যাটাগরি তালিকা
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
              Shop by Category (অগ্রাধিকার ক্রম)
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md">
            ১. ভ্যাপ (Vapes) ➔ ২. ক্যাপ (Caps) ➔ ৩. ব্যাগ (Bags) ➔ ৪. টি-শার্ট (T-Shirts)
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* 1. VAPES (MAIN CATEGORY #1 - ভ্যাপ) */}
          <div
            onClick={() => navigateTo('shop', { category: 'vapes' })}
            className="group relative rounded-2xl bg-gradient-to-b from-[#131a29] to-[#0c101a] border-2 border-[#00f59b]/40 hover:border-[#00f59b] p-4 cursor-pointer transition-all duration-300 hover:-translate-y-1.5 shadow-xl hover:shadow-[#00f59b]/15 flex flex-col justify-between"
          >
            <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#06080e] mb-4">
              <img
                src="https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&w=800&q=80"
                alt="Vapes and Pods"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-[#00f59b] text-black text-[10px] font-extrabold tracking-wider uppercase">
                #1 MAIN CATEGORY
              </div>
              <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/70 text-[#00f59b] font-mono text-[10px]">
                15K PUFFS
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-display font-bold text-lg text-white group-hover:text-[#00f59b] transition-colors">
                  Vapes & Pods (ভ্যাপ)
                </h3>
                <ArrowRight className="w-4 h-4 text-[#00f59b] group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="text-xs text-slate-400 line-clamp-2">
                স্মার্ট OLED ডিসপ্লে, ১৫০০০ পাফ, ডুয়াল মেশ কয়েল এবং সল্ট নিকোটিন জুস।
              </p>
            </div>
          </div>

          {/* 2. CAPS (CATEGORY #2 - ক্যাপ) */}
          <div
            onClick={() => navigateTo('shop', { category: 'caps' })}
            className="group relative rounded-2xl bg-[#121624] border border-[#222c42] hover:border-amber-400 p-4 cursor-pointer transition-all duration-300 hover:-translate-y-1.5 shadow-xl hover:shadow-amber-400/10 flex flex-col justify-between"
          >
            <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#06080e] mb-4">
              <img
                src="https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80"
                alt="Vintage Corduroy Caps"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-amber-400 text-black text-[10px] font-extrabold tracking-wider uppercase">
                #2 CATEGORY
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-display font-bold text-lg text-white group-hover:text-amber-400 transition-colors">
                  Caps & Headwear (ক্যাপ)
                </h3>
                <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="text-xs text-slate-400 line-clamp-2">
                ৮-ওয়েল হেভি কর্ডারয় স্ন্যাপব্যাক ও ৫-প্যানেল ওয়াটারপ্রুফ টেকনিকাল ক্যাপ।
              </p>
            </div>
          </div>

          {/* 3. BAGS (CATEGORY #3 - ব্যাগ) */}
          <div
            onClick={() => navigateTo('shop', { category: 'bags' })}
            className="group relative rounded-2xl bg-[#121624] border border-[#222c42] hover:border-sky-400 p-4 cursor-pointer transition-all duration-300 hover:-translate-y-1.5 shadow-xl hover:shadow-sky-400/10 flex flex-col justify-between"
          >
            <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#06080e] mb-4">
              <img
                src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80"
                alt="Tactical EDC Bags"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-sky-400 text-black text-[10px] font-extrabold tracking-wider uppercase">
                #3 CATEGORY
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-display font-bold text-lg text-white group-hover:text-sky-400 transition-colors">
                  Bags & Slings (ব্যাগ)
                </h3>
                <ArrowRight className="w-4 h-4 text-sky-400 group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="text-xs text-slate-400 line-clamp-2">
                Fidlock ম্যাগনেটিক বাকল সহ ৮৪০D কর্ডুরা স্লিং এবং রোল-টপ ওয়াটারপ্রুফ ব্যাগ।
              </p>
            </div>
          </div>

          {/* 4. T-SHIRTS (CATEGORY #4 - টি-শার্ট) */}
          <div
            onClick={() => navigateTo('shop', { category: 't-shirts' })}
            className="group relative rounded-2xl bg-[#121624] border border-[#222c42] hover:border-rose-400 p-4 cursor-pointer transition-all duration-300 hover:-translate-y-1.5 shadow-xl hover:shadow-rose-400/10 flex flex-col justify-between"
          >
            <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#06080e] mb-4">
              <img
                src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80"
                alt="T-Shirt"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-display font-bold text-lg text-white group-hover:text-rose-400 transition-colors">
                  T-Shirts (টি-শার্ট)
                </h3>
                <ArrowRight className="w-4 h-4 text-rose-400 group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="text-xs text-slate-400 line-clamp-2">
                ২৮০ GSM হেভিওয়েট ব্ল্যাঙ্ক ড্রপ শোল্ডার এবং ভিন্টেজ এসিড ওয়াশ টি-শার্ট।
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. INTERACTIVE VAPE FLAVOR BAR EXPERIENCE (ভ্যাপ ফ্লেভার লাউঞ্জ)         */}
      {/* ========================================================================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-y border-[#1a2336] bg-[#0c101a] relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="px-3 py-1 rounded-full bg-[#00f59b]/15 text-[#00f59b] text-xs font-mono font-bold tracking-widest uppercase border border-[#00f59b]/30">
              SENSORY LAB • ফ্লেভার নোটস
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white mt-3">
              Explore Premium Vape Flavors
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              ক্লিক করে আপনার পছন্দের ভ্যাপ ফ্লেভার প্রোফাইল এবং ইনটেনসিটি পরীক্ষা করুন।
            </p>
          </div>

          {/* Flavor Selection Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
            {flavorShowcase.map((flavor, index) => (
              <button
                key={flavor.name}
                type="button"
                onClick={() => setSelectedFlavorIndex(index)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 border ${
                  selectedFlavorIndex === index
                    ? 'bg-white text-black shadow-lg scale-105 border-white'
                    : 'bg-[#141b2c] text-slate-300 border-[#222d46] hover:border-white/40'
                }`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: flavor.color }}
                />
                <span>{flavor.name}</span>
              </button>
            ))}
          </div>

          {/* Active Flavor Showcase Panel */}
          {flavorShowcase[selectedFlavorIndex] && (
            <div className="rounded-3xl bg-[#121727] border border-[#232f4a] p-6 sm:p-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative overflow-hidden shadow-2xl">
              {/* Background ambient glow matching flavor */}
              <div
                className="absolute -top-24 -left-24 w-72 h-72 rounded-full blur-[90px] pointer-events-none opacity-40"
                style={{ backgroundColor: flavorShowcase[selectedFlavorIndex].color }}
              />

              {/* Left Column: Flavor Visual Product Photo */}
              <div className="md:col-span-5 relative flex justify-center">
                <div className="relative aspect-[4/4] w-full max-w-sm rounded-2xl overflow-hidden bg-[#06080e] border border-white/10 shadow-xl">
                  <img
                    src={flavorShowcase[selectedFlavorIndex].image}
                    alt={flavorShowcase[selectedFlavorIndex].name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-transparent to-transparent opacity-60" />
                  <div
                    className="absolute bottom-3 left-3 px-3 py-1 rounded-full text-black font-bold text-xs shadow-md"
                    style={{ backgroundColor: flavorShowcase[selectedFlavorIndex].color }}
                  >
                    {flavorShowcase[selectedFlavorIndex].puffMatch}
                  </div>
                </div>
              </div>

              {/* Right Column: Flavor Specs & Instant Buy */}
              <div className="md:col-span-7 flex flex-col space-y-4">
                <div className="text-xs font-mono text-slate-400">
                  AROMA & TASTE SPECS • {flavorShowcase[selectedFlavorIndex].intensity}
                </div>

                <h3 className="text-2xl sm:text-3xl font-display font-black text-white">
                  {flavorShowcase[selectedFlavorIndex].name}
                </h3>

                <p className="text-base text-slate-300 leading-relaxed">
                  {flavorShowcase[selectedFlavorIndex].notes}
                </p>

                <div className="grid grid-cols-3 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-[#090d16] border border-white/5">
                    <div className="text-[10px] text-slate-400 font-mono">SWEETNESS</div>
                    <div className="text-white font-bold text-sm">4.5 / 5</div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#090d16] border border-white/5">
                    <div className="text-[10px] text-slate-400 font-mono">ICE MENTHOL</div>
                    <div className="text-sky-400 font-bold text-sm">5.0 / 5</div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#090d16] border border-white/5">
                    <div className="text-[10px] text-slate-400 font-mono">THROAT HIT</div>
                    <div className="text-[#00f59b] font-bold text-sm">Smooth Salt</div>
                  </div>
                </div>

                <div className="pt-4 flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => navigateTo('shop', { category: 'vapes' })}
                    className="px-6 py-3 rounded-xl bg-[#00f59b] hover:bg-[#00df8c] text-black font-bold text-sm transition-all flex items-center gap-2 shadow-lg shadow-[#00f59b]/20"
                  >
                    <span>Shop This Flavor</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsWpGuideOpen(true)}
                    className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                  >
                    <span>How to replicate in WooCommerce</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. BESTSELLING PRODUCTS GRID (WITH FILTER TABS)                           */}
      {/* ========================================================================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-[#00f59b] mb-1">
              CURATED DROPS • বেস্টসেলার কালেকশন
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
              Bestselling Drops ✧
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs font-bold">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
                activeTab === 'all'
                  ? 'bg-[#00f59b] text-black shadow-md'
                  : 'bg-[#131927] text-slate-300 hover:text-white border border-[#222b40]'
              }`}
            >
              All Drops
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('vapes')}
              className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'vapes'
                  ? 'bg-[#00f59b] text-black shadow-md'
                  : 'bg-[#131927] text-slate-300 hover:text-white border border-[#222b40]'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Vapes (ভ্যাপ)</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('caps')}
              className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
                activeTab === 'caps'
                  ? 'bg-[#00f59b] text-black shadow-md'
                  : 'bg-[#131927] text-slate-300 hover:text-white border border-[#222b40]'
              }`}
            >
              Caps (ক্যাপ)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('bags')}
              className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
                activeTab === 'bags'
                  ? 'bg-[#00f59b] text-black shadow-md'
                  : 'bg-[#131927] text-slate-300 hover:text-white border border-[#222b40]'
              }`}
            >
              Bags (ব্যাগ)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('t-shirts')}
              className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
                activeTab === 't-shirts'
                  ? 'bg-[#00f59b] text-black shadow-md'
                  : 'bg-[#131927] text-slate-300 hover:text-white border border-[#222b40]'
              }`}
            >
              T-Shirts & Shorts
            </button>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. SPLIT FEATURE SHOWCASE: VAPE TECH VS STREET EDC COMBO                  */}
      {/* ========================================================================= */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Card: 15K Vape Tech Spotlight */}
          <div
            onClick={() => navigateTo('shop', { category: 'vapes' })}
            className="group relative rounded-3xl bg-gradient-to-tr from-[#121827] via-[#101420] to-[#141b2c] border border-[#222e47] hover:border-[#00f59b]/50 p-6 sm:p-8 cursor-pointer transition-all duration-300 hover:shadow-2xl overflow-hidden flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-full bg-[#00f59b]/20 text-[#00f59b] font-mono text-xs font-bold">
                HIGH VOLTAGE DROP
              </span>
              <span className="text-xs text-slate-400 font-mono">15,000 PUFFS</span>
            </div>

            <div className="my-4">
              <h3 className="font-display font-black text-2xl sm:text-3xl text-white group-hover:text-[#00f59b] transition-colors">
                Nebula Pod Pro HyperCoil
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-2">
                ডুয়াল মেশ সাব-ওম কয়েল, টাইপ-সি ফাস্ট চার্জ এবং রিয়েল-টাইম ডিজিটাল কার্ভড ওলেড স্ক্রিন।
              </p>
            </div>

            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-[#06080e] mb-4">
              <img
                src="https://images.unsplash.com/photo-1541689592655-f5f52825a3b8?auto=format&fit=crop&w=1000&q=80"
                alt="Nebula Pod Pro"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-lg font-bold text-white">$24.99 USD</span>
              <span className="text-xs font-bold text-[#00f59b] flex items-center gap-1">
                <span>View Vape Series</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Right Card: Caps & Tactical Sling Combo */}
          <div
            onClick={() => navigateTo('shop', { category: 'caps' })}
            className="group relative rounded-3xl bg-gradient-to-tr from-[#161726] via-[#10121d] to-[#1c182a] border border-[#302544] hover:border-amber-400/50 p-6 sm:p-8 cursor-pointer transition-all duration-300 hover:shadow-2xl overflow-hidden flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-400 font-mono text-xs font-bold">
                URBAN EDC COMBO
              </span>
              <span className="text-xs text-slate-400 font-mono">CAPS & SLINGS</span>
            </div>

            <div className="my-4">
              <h3 className="font-display font-black text-2xl sm:text-3xl text-white group-hover:text-amber-400 transition-colors">
                Vintage Corduroy & Fidlock Sling
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-2">
                ৮-ওয়েল টেক্সচার্ড কটন কর্ডারয় স্ন্যাপব্যাক এবং ৮৪০D ব্যালিস্টিক কর্ডুরা নাইলন ম্যাগনেটিক স্লিং ব্যাগ।
              </p>
            </div>

            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-[#06080e] mb-4">
              <img
                src="https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=1000&q=80"
                alt="Vintage Cap and Bag Flatlay"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-lg font-bold text-white">From $36.00 USD</span>
              <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                <span>Explore Streetwear Gear</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. TRUST PILLARS & VERIFIED BADGES                                        */}
      {/* ========================================================================= */}
      <section className="py-12 border-y border-[#182133] bg-[#0c101a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#00f59b]/15 text-[#00f59b] flex items-center justify-center shrink-0 border border-[#00f59b]/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">100% Authentic</h4>
              <p className="text-[11px] text-slate-400">Anti-counterfeit codes</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-400/15 text-sky-400 flex items-center justify-center shrink-0 border border-sky-400/30">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">Discreet Fast Shipping</h4>
              <p className="text-[11px] text-slate-400">Plain packaging 2-day delivery</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/15 text-amber-400 flex items-center justify-center shrink-0 border border-amber-400/30">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">30-Day Device Warranty</h4>
              <p className="text-[11px] text-slate-400">Direct replacement guarantee</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-400/15 text-rose-400 flex items-center justify-center shrink-0 border border-rose-400/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">Age Verified 21+</h4>
              <p className="text-[11px] text-slate-400">Compliant & secure checkout</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. VERIFIED REVIEWS / SOCIAL PROOF                                        */}
      {/* ========================================================================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-1 text-amber-400 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-current" />
            ))}
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
            4.95 / 5.0 Average Community Score
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Over 2,400+ verified customer reviews across vapes, caps, bags and apparel.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#111624] border border-[#202a3f] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1 text-amber-400 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <h4 className="text-white font-bold text-sm mb-1.5">
                "The OLED battery display is a lifesaver"
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                VAPEX Nebula-র ব্যাটারি এবং ই-জুসের ডিজিটাল ডিসপ্লেটা অসাধারণ। ফ্লেভার শেষ হওয়ার আগে বুঝতে পারি। মায়ামি মিন্ট ফ্লেভারটা খুবই স্মুথ।
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-semibold">Tanzim R.</span>
              <span className="text-[#00f59b] text-[11px] font-mono">Verified Vaper</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#111624] border border-[#202a3f] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1 text-amber-400 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <h4 className="text-white font-bold text-sm mb-1.5">
                "Thick corduroy cap & tactical sling combo"
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                কর্ডের ক্যাপটার ফিট চমৎকার। আর স্লিং ব্যাগটাতে ভ্যাপ পড রাখার আলাদা ড্রপ স্লট রয়েছে, তাই লিক বা হারিয়ে যাওয়ার কোনো ভয় থাকে না।
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-semibold">Farhan K.</span>
              <span className="text-amber-400 text-[11px] font-mono">Verified Buyer</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#111624] border border-[#202a3f] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1 text-amber-400 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <h4 className="text-white font-bold text-sm mb-1.5">
                "Heavyweight 280 GSM Tee drape is unmatched"
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                টি-শার্টটার ফ্যাব্রিক অনেক হেভি এবং কলারটা ধোয়ার পরেও টাইট থাকে। কোনো মডেল ছাড়া পিওর প্রোডাক্ট শট দেখে অর্ডার করেছিলাম, কোয়ালিটি প্রত্যাশার চেয়েও ভালো।
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-semibold">Nayeem H.</span>
              <span className="text-sky-400 text-[11px] font-mono">Verified Buyer</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. WORDPRESS & ELEMENTOR REPLICATION CALLOUT BAR                          */}
      {/* ========================================================================= */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#141b2c] via-[#1a2339] to-[#141b2c] border border-[#283654] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#00f59b] text-black flex items-center justify-center font-display font-black text-2xl shrink-0 shadow-lg shadow-[#00f59b]/25">
              W
            </div>
            <div>
              <h3 className="text-lg font-display font-bold text-white">
                WordPress & Elementor Replication Ready
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                এই পুরো ডিজাইনটি এলিমেন্টর প্রো ও উকমার্স দিয়ে সহজে তৈরি করার সম্পূর্ণ প্লাগইন ও কালার গাইড প্রস্তুত আছে।
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsWpGuideOpen(true)}
            className="px-6 py-3 rounded-xl bg-[#00f59b] hover:bg-[#00df8c] text-black font-extrabold text-xs sm:text-sm whitespace-nowrap transition-all shadow-md active:scale-95"
          >
            Open WordPress Guide (ওয়ার্ডপ্রেস গাইড)
          </button>
        </div>
      </section>
    </div>
  );
};
