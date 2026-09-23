import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  Send,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Zap,
  ArrowRight,
  CheckCircle2,
  Lock,
  Award
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo, setIsWpGuideOpen } = useStore();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-[#05070d] border-t border-[#182133] text-slate-300">
      {/* Brand Value Pillars Bar */}
      <div className="border-b border-white/5 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-[#0c101a] border border-[#1b253b]">
            <div className="w-10 h-10 rounded-xl bg-[#00f59b]/15 text-[#00f59b] flex items-center justify-center shrink-0 border border-[#00f59b]/30">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">100% Authentic Vapes</p>
              <p className="text-[11px] text-slate-400">Scratch & verify QR security codes</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-[#0c101a] border border-[#1b253b]">
            <div className="w-10 h-10 rounded-xl bg-sky-400/15 text-sky-400 flex items-center justify-center shrink-0 border border-sky-400/30">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Discreet Fast Shipping</p>
              <p className="text-[11px] text-slate-400">Plain unmarked box, free over $40</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-[#0c101a] border border-[#1b253b]">
            <div className="w-10 h-10 rounded-xl bg-amber-400/15 text-amber-400 flex items-center justify-center shrink-0 border border-amber-400/30">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">30-Day Hardware Warranty</p>
              <p className="text-[11px] text-slate-400">No-hassle replacements</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-[#0c101a] border border-[#1b253b]">
            <div className="w-10 h-10 rounded-xl bg-rose-400/15 text-rose-400 flex items-center justify-center shrink-0 border border-rose-400/30">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Encrypted 256-Bit Checkout</p>
              <p className="text-[11px] text-slate-400">SSL secure & age verified</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand info & Newsletter */}
          <div className="lg:col-span-2 space-y-6">
            <div
              onClick={() => navigateTo('home')}
              className="cursor-pointer inline-flex items-center gap-3 select-none"
            >
              <div className="w-9 h-9 rounded-xl bg-[#00f59b] flex items-center justify-center text-black font-black text-lg shadow-lg shadow-[#00f59b]/25">
                V
              </div>
              <span className="font-display text-2xl font-black tracking-wider text-white">
                VAPEX<span className="text-[#00f59b]">.</span>
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              VAPEX curates high-performance 15,000 puff smart pod vapes, botanical nicotine salts,
              vintage corduroy caps, tactical EDC slings, and heavyweight streetwear tees.
            </p>

            {/* Newsletter Subscription */}
            <div className="space-y-3">
              <p className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#00f59b]" />
                <span>Get 20% Off Your First Drop</span>
              </p>

              {subscribed ? (
                <div className="flex items-center gap-2 text-xs text-[#00f59b] bg-[#00f59b]/10 border border-[#00f59b]/30 p-3 rounded-xl font-medium">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Welcome! Use code <strong>VAPEX20</strong> at checkout.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email..."
                    required
                    className="flex-1 bg-[#121726] border border-[#232f4a] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00f59b] transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-[#00f59b] hover:bg-[#00df8c] text-black font-bold text-xs transition-colors shrink-0 flex items-center gap-1.5 shadow-md shadow-[#00f59b]/15"
                  >
                    <span>Join</span>
                    <Send className="w-3 h-3" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Quick Links Column 1: Main Categories */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Categories (ক্যাটাগরি)
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('shop', { category: 'vapes' })}
                  className="hover:text-[#00f59b] transition-colors flex items-center gap-1.5 text-[#00f59b] font-semibold"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00f59b]" />
                  <span>1. Vapes & Pods (ভ্যাপ)</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('shop', { category: 'caps' })}
                  className="hover:text-amber-400 transition-colors"
                >
                  2. Caps & Headwear (ক্যাপ)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('shop', { category: 'bags' })}
                  className="hover:text-sky-400 transition-colors"
                >
                  3. Bags & Utility (ব্যাগ)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('shop', { category: 't-shirts' })}
                  className="hover:text-rose-400 transition-colors"
                >
                  4. T-Shirts & Shorts (টি-শার্ট)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('shop', { category: 'all' })}
                  className="hover:text-white transition-colors"
                >
                  All Drops (সকল প্রোডাক্ট)
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Links Column 2: Tech Specs */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Vapor Specs (টেক তথ্য)
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <span className="text-[#00f59b] font-mono text-[10px]">15K</span>
                <span>HyperCoil Mesh Pods</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-sky-400 font-mono text-[10px]">OLED</span>
                <span>Curved Digital Screen</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-amber-400 font-mono text-[10px]">SALT</span>
                <span>SubZero Botanical Extracts</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-purple-400 font-mono text-[10px]">TYPE-C</span>
                <span>30-Minute Fast Charging</span>
              </li>
            </ul>
          </div>

          {/* Quick Links Column 3: WordPress & Help */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              WordPress Blueprint
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => setIsWpGuideOpen(true)}
                  className="text-[#00f59b] hover:underline font-bold flex items-center gap-1.5"
                >
                  <span>Elementor Replication Guide</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('admin')}
                  className="hover:text-white transition-colors"
                >
                  Admin Dashboard
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('wishlist')}
                  className="hover:text-white transition-colors"
                >
                  Saved Wishlist
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('cart')}
                  className="hover:text-white transition-colors"
                >
                  Shopping Bag & Checkout
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal & Age Disclaimer */}
        <div className="pt-10 mt-12 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} VAPEX Studio. All rights reserved. 21+ Age Verification Required.</p>
          <div className="flex items-center gap-4">
            <span className="px-2 py-0.5 rounded bg-white/5 text-slate-400 font-mono text-[10px]">
              CALIFORNIA PROP 65 COMPLIANT
            </span>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
