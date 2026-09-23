import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../context/StoreContext';
import { Search, X, ArrowRight, Star, Sparkles } from 'lucide-react';

export const LiveSearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, products, navigateTo } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus on mount & keyboard listener
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const popularSearches = [
    'Modular Sling',
    '280GSM Boxy Tee',
    'Yuzu Sensory Drops',
    'Corduroy Snapback',
    'Tactile Waffle',
    'Titanium'
  ];

  const filteredProducts = searchTerm.trim()
    ? products.filter((p) => {
        const query = searchTerm.toLowerCase();
        return (
          p.name.toLowerCase().includes(query) ||
          p.subtitle.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.tags.some((t) => t.toLowerCase().includes(query)) ||
          p.description.toLowerCase().includes(query)
        );
      })
    : [];

  const handleSelectProduct = (productId: string) => {
    setIsSearchOpen(false);
    setSearchTerm('');
    navigateTo('product-detail', { productId });
  };

  const handlePopularSearchClick = (tag: string) => {
    setSearchTerm(tag);
  };

  const handleViewAllResults = () => {
    setIsSearchOpen(false);
    navigateTo('shop', { category: 'all' });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 lg:p-12 flex items-start justify-center animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        onClick={() => setIsSearchOpen(false)}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
      />

      <div className="relative w-full max-w-2xl bg-[#0f121a] rounded-3xl border border-white/10 shadow-2xl overflow-hidden z-10 my-8">
        {/* Search Header Bar */}
        <div className="p-4 sm:p-6 border-b border-white/10 flex items-center gap-3">
          <Search className="w-5 h-5 text-[#ff5b36] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search bags, boxy tees, caps, sensory drops..."
            className="flex-1 bg-transparent text-base sm:text-lg text-white placeholder-slate-500 focus:outline-none"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              className="p-1 rounded-lg text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={() => setIsSearchOpen(false)}
            className="text-xs px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white font-mono"
          >
            ESC
          </button>
        </div>

        {/* Popular Tags */}
        <div className="px-6 py-3 bg-[#131722] border-b border-white/5 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-slate-400 font-medium shrink-0 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#ff5b36]" />
            Trending:
          </span>
          <div className="flex gap-1.5 shrink-0">
            {popularSearches.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => handlePopularSearchClick(tag)}
                className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Results Area */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {searchTerm.trim() === '' ? (
            <div className="py-8 text-center text-slate-400">
              <p className="text-sm">Type any keyword above or choose a trending query.</p>
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
                {[
                  { name: 'Bags', desc: 'Utility Slings & Totes', cat: 'bags' },
                  { name: 'T-Shirts', desc: '280 GSM Boxy Streetwear', cat: 't-shirts' },
                  { name: 'Caps', desc: 'Corduroy & Aero Speed', cat: 'caps' },
                  { name: 'Flavors', desc: 'Botanical Cold Extracts', cat: 'flavors' }
                ].map((item) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => {
                      setIsSearchOpen(false);
                      navigateTo('shop', { category: item.cat });
                    }}
                    className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-colors group"
                  >
                    <p className="font-bold text-xs text-white group-hover:text-[#ff5b36] transition-colors">
                      {item.name}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{item.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-base font-bold text-white">No products found for "{searchTerm}"</p>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                Try searching for broader terms like "Bags", "Tee", "Caps", or "Yuzu".
              </p>
              <button
                type="button"
                onClick={handleViewAllResults}
                className="mt-4 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold"
              >
                Browse All Products
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-white/5">
                <span>
                  Found <strong className="text-white">{filteredProducts.length}</strong> matching items
                </span>
                <button
                  type="button"
                  onClick={handleViewAllResults}
                  className="text-[#ff5b36] hover:underline flex items-center gap-1 font-semibold"
                >
                  View in Shop <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="space-y-2">
                {filteredProducts.map((prod) => (
                  <div
                    key={prod.id}
                    onClick={() => handleSelectProduct(prod.id)}
                    className="flex items-center gap-4 p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 cursor-pointer transition-all group"
                  >
                    <img
                      src={prod.images[0]}
                      alt={prod.name}
                      className="w-14 h-14 object-cover rounded-xl bg-black border border-white/10 group-hover:scale-105 transition-transform"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-[#ff5b36]">
                          {prod.category}
                        </span>
                        <div className="flex items-center text-amber-400 text-[11px] font-medium">
                          <Star className="w-3 h-3 fill-current mr-0.5" />
                          <span>{prod.rating}</span>
                        </div>
                      </div>

                      <h4 className="text-sm font-bold text-white truncate group-hover:text-[#ff5b36] transition-colors">
                        {prod.name}
                      </h4>
                      <p className="text-xs text-slate-400 truncate">{prod.subtitle}</p>
                    </div>

                    <div className="text-right shrink-0">
                      <p className="text-sm font-black text-white font-display">
                        ${prod.price}
                      </p>
                      {prod.originalPrice && (
                        <p className="text-[10px] text-slate-500 line-through">
                          ${prod.originalPrice}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
