import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Ruler } from 'lucide-react';

export const SizeGuideModal: React.FC = () => {
  const { isSizeGuideOpen, setIsSizeGuideOpen } = useStore();
  const [tab, setTab] = useState<'tees' | 'caps' | 'bags'>('tees');

  if (!isSizeGuideOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 lg:p-12 flex items-center justify-center animate-in fade-in duration-200">
      <div
        onClick={() => setIsSizeGuideOpen(false)}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
      />

      <div className="relative w-full max-w-2xl bg-[#0f121a] rounded-3xl border border-white/10 shadow-2xl overflow-hidden z-10 p-6 sm:p-8">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-[#ff5b36]" />
            <h3 className="font-display font-bold text-lg text-white">
              Studio Sizing & Fit Architecture
            </h3>
          </div>
          <button
            type="button"
            onClick={() => setIsSizeGuideOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 my-5 border-b border-white/10 pb-3">
          {[
            { id: 'tees', label: 'T-Shirts (Boxy Fit)' },
            { id: 'caps', label: 'Caps & Headwear' },
            { id: 'bags', label: 'Bags & Slings' }
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                tab === item.id
                  ? 'bg-[#ff5b36] text-white'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Tables */}
        {tab === 'tees' && (
          <div className="space-y-4">
            <p className="text-xs text-slate-300 leading-relaxed">
              Our 280 GSM heavyweight tees feature a relaxed boxy cut with dropped shoulder seams.
              For an oversized streetwear aesthetic, stay true to size. For a tailored standard fit,
              consider sizing down one step.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400 font-mono">
                    <th className="py-2.5 px-3">Size</th>
                    <th className="py-2.5 px-3">Chest (inches)</th>
                    <th className="py-2.5 px-3">Length (inches)</th>
                    <th className="py-2.5 px-3">Shoulder Width</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-200">
                  <tr>
                    <td className="py-2.5 px-3 font-bold text-white">XS</td>
                    <td className="py-2.5 px-3">38 - 40"</td>
                    <td className="py-2.5 px-3">27.0"</td>
                    <td className="py-2.5 px-3">19.5"</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-bold text-white">S</td>
                    <td className="py-2.5 px-3">41 - 43"</td>
                    <td className="py-2.5 px-3">28.0"</td>
                    <td className="py-2.5 px-3">20.5"</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-bold text-white">M</td>
                    <td className="py-2.5 px-3">44 - 46"</td>
                    <td className="py-2.5 px-3">29.0"</td>
                    <td className="py-2.5 px-3">21.5"</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-bold text-white">L</td>
                    <td className="py-2.5 px-3">47 - 49"</td>
                    <td className="py-2.5 px-3">30.0"</td>
                    <td className="py-2.5 px-3">22.5"</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-bold text-white">XL</td>
                    <td className="py-2.5 px-3">50 - 52"</td>
                    <td className="py-2.5 px-3">31.0"</td>
                    <td className="py-2.5 px-3">23.5"</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-bold text-white">XXL</td>
                    <td className="py-2.5 px-3">53 - 55"</td>
                    <td className="py-2.5 px-3">32.0"</td>
                    <td className="py-2.5 px-3">24.5"</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === 'caps' && (
          <div className="space-y-4">
            <p className="text-xs text-slate-300 leading-relaxed">
              All KROMA caps are unstructured low-profile or medium crowns equipped with adjustable
              brass sliders or elastic toggles. Fits head circumferences between 54cm and 62cm (21.2"
              – 24.4"). One size fits virtually all head shapes comfortably.
            </p>
          </div>
        )}

        {tab === 'bags' && (
          <div className="space-y-4">
            <p className="text-xs text-slate-300 leading-relaxed">
              Every sling and tote bag is mapped to daily essentials:
            </p>
            <ul className="text-xs text-slate-300 space-y-2 list-disc pl-5">
              <li>
                <strong>Modular Utility Sling (5.5L):</strong> Fits iPad Mini / 11" iPad, Kindle,
                phone, passport, keys, and 500ml water bottle.
              </li>
              <li>
                <strong>Sculptural Canvas Tote (22L):</strong> Dedicated padded compartment for 16"
                MacBook Pro, magazines, gym attire, and water flask.
              </li>
              <li>
                <strong>Trans-Transit Backpack (24L):</strong> Fits 16" laptops, overnight change of
                clothes, chargers, and camera gear.
              </li>
            </ul>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
          <span>Need custom sizing advice? Chat with our studio team.</span>
          <button
            type="button"
            onClick={() => setIsSizeGuideOpen(false)}
            className="px-4 py-2 rounded-xl bg-white text-slate-900 font-bold hover:bg-slate-200"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
