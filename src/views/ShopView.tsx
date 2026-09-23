import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import {
  SlidersHorizontal,
  X,
  RotateCcw,
  LayoutGrid,
  Grid3X3,
  Star,
  Check,
  ChevronDown
} from 'lucide-react';
import { SortOption } from '../types';

export const ShopView: React.FC = () => {
  const { products, activeCategory, setActiveCategory } = useStore();

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState<string>(activeCategory || 'all');
  const [maxPrice, setMaxPrice] = useState<number>(180);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedFlavors, setSelectedFlavors] = useState<string[]>([]);
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [onlyOnSale, setOnlyOnSale] = useState<boolean>(false);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<SortOption>('popularity');
  const [gridCols, setGridCols] = useState<3 | 4>(4);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  // Synchronize category if context activeCategory changes
  React.useEffect(() => {
    if (activeCategory) {
      setSelectedCategory(activeCategory);
    }
  }, [activeCategory]);

  const categories = [
    { id: 'all', label: 'All Drops (সকল প্রোডাক্ট)' },
    { id: 'vapes', label: '1. Vapes & Pods (ভ্যাপ - Main)' },
    { id: 'caps', label: '2. Caps & Headwear (ক্যাপ)' },
    { id: 'bags', label: '3. Bags & Slings (ব্যাগ)' },
    { id: 't-shirts', label: '4. T-Shirts & Apparel (পোশাক)' }
  ];

  const allSizes = ['S', 'M', 'L', 'XL', 'XXL', 'Adjustable', 'Single 30ml', 'Pack of 3'];

  const colorOptions = [
    { name: 'Neon Mint', hex: '#00F59B' },
    { name: 'Obsidian Black', hex: '#161922' },
    { name: 'Electric Violet', hex: '#8B5CF6' },
    { name: 'Caramel Rust', hex: '#D97706' },
    { name: 'Cyber Cyan', hex: '#06B6D4' }
  ];

  const flavorOptions = [
    'Miami Mint Frost',
    'Blue Razz Freeze',
    'Tokyo Mango Peach',
    'Sour Green Apple Ice',
    'Japanese Yuzu Ice',
    'Smoked Vanilla Tobacco'
  ];

  const resetFilters = () => {
    setSelectedCategory('all');
    setActiveCategory('all');
    setMaxPrice(180);
    setSelectedSizes([]);
    setSelectedColors([]);
    setSelectedFlavors([]);
    setOnlyInStock(false);
    setOnlyOnSale(false);
    setMinRating(0);
    setSortBy('popularity');
  };

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    maxPrice < 180 ||
    selectedSizes.length > 0 ||
    selectedColors.length > 0 ||
    selectedFlavors.length > 0 ||
    onlyInStock ||
    onlyOnSale ||
    minRating > 0;

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;

        // Price filter
        if (p.price > maxPrice) return false;

        // Stock filter
        if (onlyInStock && p.stock <= 0) return false;

        // Sale filter
        if (onlyOnSale && !p.originalPrice) return false;

        // Rating filter
        if (minRating > 0 && p.rating < minRating) return false;

        // Size filter
        if (selectedSizes.length > 0) {
          const hasSize =
            p.variations.sizes?.some((s) => selectedSizes.includes(s)) ||
            p.variations.packs?.some((pack) => selectedSizes.includes(pack.name));
          if (!hasSize) return false;
        }

        // Color filter
        if (selectedColors.length > 0) {
          const hasColor = p.variations.colors?.some((c) =>
            selectedColors.some((sc) => c.name.toLowerCase().includes(sc.toLowerCase()))
          );
          if (!hasColor) return false;
        }

        // Flavor filter
        if (selectedFlavors.length > 0) {
          const hasFlavor = p.variations.flavors?.some((f) => selectedFlavors.includes(f.name));
          if (!hasFlavor) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'popularity') return (b.reviewsCount || 0) - (a.reviewsCount || 0);
        if (sortBy === 'latest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0;
      });
  }, [
    products,
    selectedCategory,
    maxPrice,
    onlyInStock,
    onlyOnSale,
    minRating,
    selectedSizes,
    selectedColors,
    selectedFlavors,
    sortBy
  ]);

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const toggleColor = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const toggleFlavor = (flv: string) => {
    setSelectedFlavors((prev) =>
      prev.includes(flv) ? prev.filter((f) => f !== flv) : [...prev, flv]
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-widest">
            Studio Catalog • {filteredProducts.length} Items Available
          </span>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-white mt-1">
            {categories.find((c) => c.id === selectedCategory)?.label || 'All Products'}
          </h1>
        </div>

        {/* Controls: Mobile filter trigger, Sort dropdown, Grid toggle */}
        <div className="flex items-center gap-3">
          {/* Mobile Filter Button */}
          <button
            type="button"
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold flex items-center gap-2"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#ff5b36]" />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-[#ff5b36]" />
            )}
          </button>

          {/* Sort By Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="appearance-none bg-[#121622] border border-white/10 text-white text-xs font-semibold rounded-xl pl-3.5 pr-8 py-2.5 focus:outline-none focus:border-[#ff5b36]"
            >
              <option value="popularity">Sort by: Popularity</option>
              <option value="latest">Sort by: Newest Releases</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Desktop Grid density toggle */}
          <div className="hidden sm:flex items-center p-1 rounded-xl bg-white/5 border border-white/10">
            <button
              type="button"
              onClick={() => setGridCols(3)}
              className={`p-1.5 rounded-lg transition-colors ${
                gridCols === 3 ? 'bg-[#ff5b36] text-white' : 'text-slate-400 hover:text-white'
              }`}
              title="3 Column Grid"
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setGridCols(4)}
              className={`p-1.5 rounded-lg transition-colors ${
                gridCols === 4 ? 'bg-[#ff5b36] text-white' : 'text-slate-400 hover:text-white'
              }`}
              title="4 Column Grid"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Active Filter Chips */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs text-slate-400">Active filters:</span>
          {selectedCategory !== 'all' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#ff5b36]/15 text-[#ff5b36] border border-[#ff5b36]/30">
              Category: {selectedCategory}
              <button onClick={() => setSelectedCategory('all')}>
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {maxPrice < 180 && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white border border-white/10">
              Under ${maxPrice}
              <button onClick={() => setMaxPrice(180)}>
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {selectedSizes.map((s) => (
            <span
              key={s}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white border border-white/10"
            >
              Size: {s}
              <button onClick={() => toggleSize(s)}>
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          {selectedColors.map((c) => (
            <span
              key={c}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white border border-white/10"
            >
              Color: {c}
              <button onClick={() => toggleColor(c)}>
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          {selectedFlavors.map((f) => (
            <span
              key={f}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-400/15 text-amber-300 border border-amber-400/30"
            >
              Flavor: {f}
              <button onClick={() => toggleFlavor(f)}>
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          {onlyInStock && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              In Stock Only
              <button onClick={() => setOnlyInStock(false)}>
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {onlyOnSale && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#ff5b36]/15 text-[#ff5b36] border border-[#ff5b36]/30">
              On Sale
              <button onClick={() => setOnlyOnSale(false)}>
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {minRating > 0 && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white border border-white/10">
              {minRating}★ & Up
              <button onClick={() => setMinRating(0)}>
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          <button
            type="button"
            onClick={resetFilters}
            className="text-xs text-rose-400 hover:underline flex items-center gap-1 ml-2 font-semibold"
          >
            <RotateCcw className="w-3 h-3" />
            Reset all
          </button>
        </div>
      )}

      {/* Main Content: Sidebar + Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* DESKTOP SIDEBAR FILTERS */}
        <aside className="hidden lg:block lg:col-span-3 space-y-6 p-6 rounded-3xl bg-[#121622] border border-white/10">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <span className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#ff5b36]" />
              Filter Studio
            </span>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetFilters}
                className="text-[11px] text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Categories
            </h4>
            <div className="space-y-1">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setActiveCategory(cat.id);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center justify-between ${
                    selectedCategory === cat.id
                      ? 'bg-[#ff5b36] text-white shadow-md'
                      : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className="text-[10px] opacity-70">
                    {cat.id === 'all'
                      ? products.length
                      : products.filter((p) => p.category === cat.id).length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="space-y-3 pt-3 border-t border-white/10">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-400 uppercase tracking-wider">Max Price</span>
              <span className="font-mono font-bold text-white">${maxPrice}</span>
            </div>
            <input
              type="range"
              min={25}
              max={180}
              step={5}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#ff5b36] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>$25</span>
              <span>$180+</span>
            </div>
          </div>

          {/* Size Options */}
          <div className="space-y-3 pt-3 border-t border-white/10">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Sizes & Packs
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {allSizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => toggleSize(size)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                    selectedSizes.includes(size)
                      ? 'bg-[#ff5b36] border-[#ff5b36] text-white'
                      : 'bg-white/5 border-white/10 text-slate-300 hover:border-white/20'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Swatches */}
          <div className="space-y-3 pt-3 border-t border-white/10">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Color Tone
            </h4>
            <div className="flex flex-wrap gap-2">
              {colorOptions.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => toggleColor(c.name)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs border transition-all ${
                    selectedColors.includes(c.name)
                      ? 'border-[#ff5b36] bg-[#ff5b36]/20 text-white'
                      : 'border-white/10 bg-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full border border-white/20"
                    style={{ backgroundColor: c.hex }}
                  />
                  <span>{c.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Sensory Flavor Profiles */}
          <div className="space-y-3 pt-3 border-t border-white/10">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Sensory Flavor Profiles
            </h4>
            <div className="space-y-1.5">
              {flavorOptions.map((flv) => (
                <label
                  key={flv}
                  className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer hover:text-white"
                >
                  <input
                    type="checkbox"
                    checked={selectedFlavors.includes(flv)}
                    onChange={() => toggleFlavor(flv)}
                    className="rounded border-white/20 bg-white/5 text-amber-400 focus:ring-0"
                  />
                  <span>{flv}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Availability & Sale */}
          <div className="space-y-2 pt-3 border-t border-white/10">
            <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer hover:text-white">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="rounded border-white/20 bg-white/5 text-[#ff5b36] focus:ring-0"
              />
              <span>In Stock Only</span>
            </label>

            <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer hover:text-white">
              <input
                type="checkbox"
                checked={onlyOnSale}
                onChange={(e) => setOnlyOnSale(e.target.checked)}
                className="rounded border-white/20 bg-white/5 text-[#ff5b36] focus:ring-0"
              />
              <span>On Sale Items</span>
            </label>
          </div>

          {/* Rating */}
          <div className="space-y-2 pt-3 border-t border-white/10">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Customer Rating
            </h4>
            <div className="space-y-1">
              {[4.8, 4.5, 4.0].map((rate) => (
                <button
                  key={rate}
                  type="button"
                  onClick={() => setMinRating(minRating === rate ? 0 : rate)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between ${
                    minRating === rate
                      ? 'bg-amber-400/20 text-amber-300 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-current text-amber-400" />
                    {rate}★ & Above
                  </span>
                  {minRating === rate && <Check className="w-3 h-3 text-amber-400" />}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* PRODUCTS GRID */}
        <div className="lg:col-span-9">
          {filteredProducts.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-[#121622] border border-white/10 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-slate-500 mx-auto">
                <SlidersHorizontal className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-white">No matching products found</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Try loosening your filter constraints or reset all filters to view our full collection.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="px-6 py-2.5 rounded-xl bg-[#ff5b36] text-white text-xs font-bold hover:bg-[#f04f29] shadow-lg"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div
              className={`grid grid-cols-2 sm:grid-cols-2 ${
                gridCols === 4 ? 'lg:grid-cols-3 xl:grid-cols-4' : 'lg:grid-cols-3'
              } gap-4 sm:gap-6`}
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* MOBILE FILTER DRAWER */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end animate-in fade-in duration-200">
          <div
            onClick={() => setIsMobileFilterOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
          />

          <div className="relative w-full max-w-xs bg-[#0f121a] h-full p-6 overflow-y-auto space-y-6 shadow-2xl z-10 border-l border-white/10">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <h3 className="font-bold text-base text-white">Filters</h3>
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Categories */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Categories
              </h4>
              <div className="space-y-1">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setActiveCategory(cat.id);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold ${
                      selectedCategory === cat.id
                        ? 'bg-[#ff5b36] text-white'
                        : 'text-slate-300 hover:bg-white/5'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Price Slider */}
            <div className="space-y-2 pt-3 border-t border-white/10">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-slate-400">Max Price</span>
                <span className="text-white font-mono">${maxPrice}</span>
              </div>
              <input
                type="range"
                min={25}
                max={180}
                step={5}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#ff5b36]"
              />
            </div>

            {/* Done & Apply */}
            <div className="pt-4 border-t border-white/10 space-y-2">
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full py-3 rounded-xl bg-[#ff5b36] text-white font-bold text-xs"
              >
                Apply Filters ({filteredProducts.length} Results)
              </button>
              <button
                type="button"
                onClick={resetFilters}
                className="w-full py-2.5 rounded-xl bg-white/5 text-slate-300 font-semibold text-xs"
              >
                Reset All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
