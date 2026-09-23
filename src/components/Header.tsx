import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { MegaMenu } from './MegaMenu';
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Zap,
  Flame,
  Settings,
  ArrowRight,
  Compass
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    currentView,
    navigateTo,
    activeCategory,
    cartCount,
    wishlist,
    setIsMiniCartOpen,
    setIsSearchOpen,
    setIsWpGuideOpen
  } = useStore();

  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // User prioritized categories with short concise names (strictly 1 line)
  const navLinks = [
    { label: 'Vapes', view: 'shop', category: 'vapes', bengali: 'ভ্যাপ' },
    { label: 'Caps', view: 'shop', category: 'caps', bengali: 'ক্যাপ' },
    { label: 'Bags', view: 'shop', category: 'bags', bengali: 'ব্যাগ' },
    { label: 'T-Shirts', view: 'shop', category: 't-shirts', bengali: 'টি-শার্ট' },
    { label: 'Shop All', view: 'shop', category: 'all', bengali: 'সব পণ্য' }
  ];

  const handleNavClick = (link: { label?: string; view: string; category?: string }) => {
    navigateTo(link.view, { category: link.category });
    setIsMobileMenuOpen(false);
    setIsMegaMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all">
      {/* Top Announcement Bar */}
      <div className="bg-[#05070c] border-b border-[#181f2f] text-xs py-2 px-4 text-center text-slate-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="hidden sm:flex items-center gap-2 text-emerald-400 text-[11px] font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#00f59b] animate-pulse" />
            <span>NEW DROP: VAPEX NEBULA 15K PUFF POD WITH OLED SCREEN</span>
          </div>

          <div className="flex-1 text-center font-medium text-slate-300 text-[11px] sm:text-xs">
            <span>LIMITED OFFER:</span> USE CODE{' '}
            <span className="font-mono bg-white/10 px-2 py-0.5 rounded text-[#00f59b] font-bold tracking-wider">
              VAPEX20
            </span>{' '}
            FOR 20% OFF ALL VAPES & GEAR • FREE DISCREET SHIPPING OVER $40
          </div>

          <div className="hidden sm:flex items-center gap-3 text-slate-300">
            <button
              type="button"
              onClick={() => setIsWpGuideOpen(true)}
              className="bg-[#00f59b]/20 hover:bg-[#00f59b] text-[#00f59b] hover:text-black px-2.5 py-0.5 rounded-full text-[11px] font-bold transition-all flex items-center gap-1.5 border border-[#00f59b]/40"
              title="WordPress & WooCommerce Replication Blueprint"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#00f59b]" />
              <span>WordPress Guide</span>
            </button>
            <span className="text-white/20">|</span>
            <button
              onClick={() => navigateTo('admin')}
              className="hover:text-white transition-colors flex items-center gap-1 text-[11px]"
              title="Store Owner Admin Panel"
            >
              <Settings className="w-3 h-3 text-[#00f59b]" />
              <span>Admin</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="bg-[#0b0f19]/95 backdrop-blur-xl border-b border-[#1c2438] text-white transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-3 xl:gap-6 flex-nowrap">
          {/* Mobile menu trigger */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors flex-shrink-0"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Left Brand Logo: VAPEX */}
          <div
            onClick={() => navigateTo('home')}
            className="cursor-pointer flex items-center gap-2.5 sm:gap-3 select-none group flex-shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#00f59b] via-[#10b981] to-[#3b82f6] p-[1px] shadow-lg shadow-[#00f59b]/15 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#0b0f19] rounded-[11px] flex items-center justify-center">
                <Zap className="w-5 h-5 text-[#00f59b] fill-current" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-display text-2xl sm:text-3xl font-black text-white tracking-wider leading-none">
                  VAPEX
                </span>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold bg-[#00f59b] text-black tracking-widest">
                  LAB
                </span>
              </div>
              <span className="text-[9px] uppercase tracking-[0.2em] font-medium text-slate-400 mt-0.5 whitespace-nowrap">
                Vape • Caps • Bags • Tees
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links - Strictly 1 Line */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 flex-nowrap flex-shrink-0">
            {navLinks.map((link) => {
              const isActive =
                currentView === 'shop' && activeCategory === link.category;

              return (
                <button
                  key={link.label}
                  type="button"
                  onClick={() => handleNavClick(link)}
                  className={`text-sm xl:text-[15px] font-semibold whitespace-nowrap transition-all relative px-3 xl:px-4 py-2 rounded-xl flex items-center flex-shrink-0 ${
                    isActive
                      ? 'bg-[#00f59b]/15 text-[#00f59b] border border-[#00f59b]/35 shadow-sm shadow-[#00f59b]/15 font-bold'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="whitespace-nowrap">{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Area: Search Input Pill, Wishlist & Cart Bag */}
          <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
            {/* Search Input Pill on XL displays */}
            <div
              onClick={() => setIsSearchOpen(true)}
              className="cursor-pointer hidden xl:flex items-center gap-2.5 bg-[#141b2c] hover:bg-[#1a233a] border border-[#242f49] rounded-full px-4 py-2 text-xs text-slate-300 transition-all w-44 2xl:w-56 flex-shrink-0"
            >
              <Search className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
              <span className="text-slate-400 font-normal truncate">Search products...</span>
            </div>

            {/* Search Icon button for MD to LG screens */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="hidden md:flex xl:hidden p-2.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-full transition-all flex-shrink-0"
              title="Search products"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Mobile Search Icon */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="md:hidden p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-full transition-all flex-shrink-0"
              title="Search products"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Icon */}
            <button
              type="button"
              onClick={() => navigateTo('wishlist')}
              className="relative p-2.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-full transition-all"
              title="Wishlist"
            >
              <Heart className="w-5 h-5 hover:scale-110 transition-transform" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              type="button"
              onClick={() => setIsMiniCartOpen(true)}
              className="relative flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#00f59b] hover:bg-[#00df8c] text-black font-bold text-xs transition-all active:scale-95 shadow-lg shadow-[#00f59b]/20"
              title="View Cart"
            >
              <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
              <span className="hidden sm:inline">Bag</span>
              <span className="w-5 h-5 rounded-full bg-black text-white text-[11px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            </button>

            {/* User Account / Admin */}
            <button
              type="button"
              onClick={() => navigateTo('admin')}
              className="p-2.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-full transition-all hidden sm:flex"
              title="Account & Admin"
            >
              <User className="w-5 h-5 hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>

        {/* Mega Menu Dropdown */}
        {isMegaMenuOpen && <MegaMenu onClose={() => setIsMegaMenuOpen(false)} />}
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#0e1322] border-b border-[#1c2438] p-5 space-y-4 animate-in slide-in-from-top-4 duration-200 shadow-2xl">
          <div
            onClick={() => {
              setIsSearchOpen(true);
              setIsMobileMenuOpen(false);
            }}
            className="flex items-center gap-2.5 bg-[#151c2d] border border-[#242f49] rounded-xl px-4 py-3 text-xs text-slate-400"
          >
            <Search className="w-4 h-4 text-slate-400" />
            <span>Search vapes, caps, bags, tees...</span>
          </div>

          <div className="flex flex-col space-y-2 pt-2">
            {navLinks.map((link) => {
              const isActive =
                currentView === 'shop' && activeCategory === link.category;

              return (
                <button
                  key={link.label}
                  type="button"
                  onClick={() => handleNavClick(link)}
                  className={`flex items-center justify-between px-4 py-3.5 rounded-xl text-left text-base font-bold transition-colors ${
                    isActive
                      ? 'bg-[#00f59b]/15 text-[#00f59b] border border-[#00f59b]/30'
                      : 'text-slate-200 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span className="text-base sm:text-lg">{link.label}</span>
                  {link.bengali && (
                    <span className="text-xs px-2.5 py-1 rounded-md bg-white/5 text-slate-300 font-medium">
                      {link.bengali}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                setIsWpGuideOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="text-xs font-bold text-[#00f59b] flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>WordPress Replication Guide</span>
            </button>

            <button
              type="button"
              onClick={() => {
                navigateTo('admin');
                setIsMobileMenuOpen(false);
              }}
              className="text-xs text-slate-400 hover:text-white"
            >
              Admin Dashboard
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
