import React from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowRight, Sparkles, Flame, ShieldCheck } from 'lucide-react';

interface MegaMenuProps {
  onClose: () => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ onClose }) => {
  const { navigateTo, products } = useStore();

  const handleCategoryClick = (category: string) => {
    navigateTo('shop', { category });
    onClose();
  };

  const handleProductClick = (productId: string) => {
    navigateTo('product-detail', { productId });
    onClose();
  };

  const featuredDrop = products.find((p) => p.isTrending || p.isBestSeller) || products[0];

  return (
    <div
      onMouseLeave={onClose}
      className="absolute top-full left-0 w-full bg-[#10131c]/98 backdrop-blur-2xl border-b border-white/10 shadow-2xl py-8 px-6 lg:px-12 z-40 animate-in fade-in slide-in-from-top-2 duration-200"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {/* Categories Column */}
        <div className="space-y-4">
          <p className="text-xs font-bold uppercase tracking-wider text-[#ff5b36] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Core Categories
          </p>
          <ul className="space-y-2.5">
            {[
              { id: 'all', label: 'All Products', count: '10+ Items' },
              { id: 'bags', label: 'Architectural Bags', count: 'Slings & Totes' },
              { id: 't-shirts', label: 'Heavyweight T-Shirts', count: '280 GSM Boxy' },
              { id: 'caps', label: 'Tactile Caps', count: 'Corduroy & Aero' },
              { id: 'flavors', label: 'Sensory Flavor Drops', count: 'Organic Elixirs' },
              { id: 'accessories', label: 'Lifestyle Hardware', count: 'Titanium EDC' }
            ].map((cat) => (
              <li key={cat.id}>
                <button
                  type="button"
                  onClick={() => handleCategoryClick(cat.id)}
                  className="group flex flex-col text-left py-1 w-full transition-colors"
                >
                  <span className="text-sm font-semibold text-slate-200 group-hover:text-white group-hover:translate-x-1 transition-transform flex items-center justify-between">
                    {cat.label}
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#ff5b36]" />
                  </span>
                  <span className="text-xs text-slate-400">{cat.count}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Featured Bags & Apparel Quick Links */}
        <div className="space-y-4">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Featured Textilery
          </p>
          <div className="space-y-3">
            {products
              .filter((p) => p.category === 't-shirts' || p.category === 'bags')
              .slice(0, 3)
              .map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleProductClick(item.id)}
                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 cursor-pointer transition-colors group"
                >
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded-lg border border-white/10 group-hover:scale-105 transition-transform"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-slate-200 truncate group-hover:text-[#ff5b36] transition-colors">
                      {item.name}
                    </p>
                    <p className="text-xs text-slate-400">${item.price}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Sensory Flavor Drops Column */}
        <div className="space-y-4">
          <p className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5" />
            Flavor Studio
          </p>
          <div className="space-y-3">
            {products
              .filter((p) => p.category === 'flavors')
              .slice(0, 3)
              .map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleProductClick(item.id)}
                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 cursor-pointer transition-colors group"
                >
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded-lg border border-white/10 group-hover:scale-105 transition-transform"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-slate-200 truncate group-hover:text-amber-400 transition-colors">
                      {item.name}
                    </p>
                    <p className="text-xs text-slate-400">${item.price} • Organic</p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Highlight Banner / Trending Drop */}
        <div className="md:col-span-2 relative rounded-2xl overflow-hidden border border-white/10 group bg-gradient-to-br from-[#1a1f2c] to-[#12151e] p-5 flex flex-col justify-between">
          <div className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:opacity-40 transition-opacity group-hover:scale-105 duration-500" style={{ backgroundImage: `url(${featuredDrop.images[0]})` }} />
          <div className="relative z-10">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#ff5b36] text-white mb-2">
              Signature Drop
            </span>
            <h4 className="text-lg font-bold text-white font-display leading-tight">
              {featuredDrop.name}
            </h4>
            <p className="text-xs text-slate-300 mt-1 line-clamp-2 max-w-sm">
              {featuredDrop.subtitle}
            </p>
          </div>

          <div className="relative z-10 pt-4 flex items-center justify-between">
            <span className="text-base font-bold text-white">${featuredDrop.price}</span>
            <button
              type="button"
              onClick={() => handleProductClick(featuredDrop.id)}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-white text-slate-900 hover:bg-[#ff5b36] hover:text-white transition-colors flex items-center gap-1.5"
            >
              Discover Piece
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
