import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  X,
  ExternalLink,
  Layers,
  Palette,
  CheckCircle2,
  Copy,
  Check,
  FileCode,
  Layout,
  Package,
  Sparkles,
  ShoppingBag,
  HelpCircle,
  ArrowRight
} from 'lucide-react';

export const WordPressGuideModal: React.FC = () => {
  const { isWpGuideOpen, setIsWpGuideOpen } = useStore();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'plugins' | 'pages' | 'colors' | 'faq'>('plugins');

  if (!isWpGuideOpen) return null;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const plugins = [
    {
      name: 'WooCommerce',
      author: 'Automattic',
      isFree: true,
      role: 'Core E-Commerce Engine',
      bengaliRole: 'কোর ইকমার্স ইঞ্জিন',
      desc: 'Powers products, product variations, inventory, shopping cart, customer checkout, orders, and payment gateways.',
      elementorTip: 'Install via Plugins > Add New. Run the setup wizard and select your currency.'
    },
    {
      name: 'Elementor / Elementor Pro',
      author: 'Elementor.com',
      isFree: true,
      role: 'Drag-and-Drop Page Builder',
      bengaliRole: 'পেজ ও থিম বিল্ডার',
      desc: 'Used to build the header, footer, hero slider, category boxes, promo banners, and single product templates without code.',
      elementorTip: 'Use "Theme Builder" in Elementor Pro to create Custom Header, Footer, and Single Product templates.'
    },
    {
      name: 'Variation Swatches for WooCommerce',
      author: 'Emran Ahmed',
      isFree: true,
      role: 'Color, Size & Flavor Swatches',
      bengaliRole: 'কালার, সাইজ ও ফ্লেভার বাটন',
      desc: 'Transforms standard WooCommerce dropdowns into modern clickable color circles, size pills, and label buttons.',
      elementorTip: 'Navigate to WooCommerce > Settings > Swatches. Set shape to Rounded/Circle.'
    },
    {
      name: 'TI WooCommerce Wishlist',
      author: 'TemplateInvaders',
      isFree: true,
      role: 'Customer Wishlist System',
      bengaliRole: 'উইশলিস্ট (হৃদয় আইকন)',
      desc: 'Adds the floating heart button on product cards and a dedicated wishlist page with "Add to cart" capabilities.',
      elementorTip: 'Set position to "After Add to Cart" or "Top Right of Product Image".'
    },
    {
      name: 'Side Cart WooCommerce (Ajax)',
      author: 'XootiX',
      isFree: true,
      role: 'Sliding Mini-Cart Drawer',
      bengaliRole: 'স্লাইড-আউট মিনি কার্ট',
      desc: 'Creates the smooth right-hand drawer when users click the shopping bag or click "Add to Cart" without page reload.',
      elementorTip: 'Matches the exact AJAX Mini Cart drawer experience seen in this live demo.'
    },
    {
      name: 'WPC Smart Quick View for WooCommerce',
      author: 'WPClever',
      isFree: true,
      role: 'Product Quick View Modal',
      bengaliRole: 'কুইক ভিউ পপআপ',
      desc: 'Allows shoppers to view product details, select variations, and add to bag directly from the product grid.',
      elementorTip: 'Enables instant modal preview on hover over product cards.'
    },
    {
      name: 'WPC Frequently Bought Together',
      author: 'WPClever',
      isFree: true,
      role: 'Outfit / Bundle Offers',
      bengaliRole: 'বান্ডেল ডিসকাউন্ট (Tee + Cap + Bag)',
      desc: 'Enables the 15% off bundle section (T-shirt + Cap + Bag) with 1-click add to cart.',
      elementorTip: 'Use shortcode or widget on Single Product or Home page.'
    }
  ];

  const colorTokens = [
    { name: 'Cyber Neon Mint (Primary Brand & CTA)', hex: '#00F59B', usage: 'Main Hero CTAs, Add to Cart Buttons, Vape Badges, Active States' },
    { name: 'Dark Obsidian Canvas (Page Background)', hex: '#090C13', usage: 'Main Body Background, Dark Luxury Contrast, Grid Dividers' },
    { name: 'Midnight Charcoal (Product Cards)', hex: '#111622', usage: 'Product Cards, Interactive Flavor Bar, Feature Banners' },
    { name: 'Electric Sky Blue (Bags & Tech)', hex: '#3B82F6', usage: 'Bag Category Badges, Ice Menthol Accents, Secondary Badges' },
    { name: 'Warm Amber Gold (Caps & Reviews)', hex: '#F59E0B', usage: 'Cap Category Badges, 5-Star Ratings, Corduroy Highlights' },
    { name: 'Sunset Coral (Hot Drops & Apparel)', hex: '#FF5B36', usage: 'Discount Badges, Apparel Badges, Sale Countdown Tags' },
    { name: 'Border Slate (Subtle 1px Lines)', hex: '#222B3E', usage: 'Card Borders, Navigation Dividers, Modal Outlines' }
  ];

  const pageLayouts = [
    {
      page: 'Home Page (ফ্রন্ট পেজ - VAPEX)',
      widgets: [
        '1. Top Header: VAPEX Logo + Search Bar Pill + Nav (Vapes & Pods, Caps, Bags, T-Shirts) + Wishlist + Cart',
        '2. Hero Section (Vape Focus): High-tech vape presentation, 15,000 Puffs, Dual Mesh HyperCoil, OLED Live battery simulation + Shop Vape CTA',
        '3. Category Directory (4 Pillars): 1. Vapes & Pods (ভ্যাপ) ➔ 2. Caps (ক্যাপ) ➔ 3. Bags (ব্যাগ) ➔ 4. T-Shirts & Apparel (পোশাক - Flatlay only)',
        '4. Interactive Flavor Lounge: 4 clickable flavor tabs (Miami Mint Frost, Blue Razz Freeze, Tokyo Mango, Sour Apple) with instant intensity specs',
        '5. Bestselling Drops Grid: Tab filters (All Drops, Vapes, Caps, Bags, T-Shirts) + 4-column responsive grid with Neon Mint + Cart buttons',
        '6. Dual Feature Showcase: Left card for 15K Nebula Pod Pro + Right card for Corduroy Snapback & Tactical Fidlock Sling',
        '7. Trust & Verification Bar: 100% Authentic anti-counterfeit QR, Discreet 2-day delivery, 30-day device warranty, 21+ age verification',
        '8. Customer Reviews & Community: 4.95/5 score with 3 verified buyer testimonials',
        '9. VAPEX Footer: 4 Category columns, Newsletter 20% discount signup, Legal disclaimers & Copyright'
      ]
    },
    {
      page: 'Shop / Catalog (শপ আর্কাইভ পেজ)',
      widgets: [
        '1. Left Sidebar (30%): Product Categories with Counts, Price Filter Slider, In-stock checkbox, Active Filters',
        '2. Right Column (70%): Archive Title, Result Counter ("Showing 1-12 of 12 items"), Sorting dropdown',
        '3. Product Grid: 3 or 4 columns with Hover Quick View & Wishlist buttons'
      ]
    },
    {
      page: 'Single Product (প্রোডাক্ট ডিটেইলস পেজ)',
      widgets: [
        '1. Breadcrumbs: Home > Shop > Category > Product Name',
        '2. Left Column: Product Gallery with thumbnail strip below',
        '3. Right Column: Title, Star Rating, Price with strikethrough, Stock status, Short description, Variation Swatches (Colors, Sizes, Flavors), Quantity Stepper, Add to Cart, Buy Now, Wishlist heart',
        '4. Tabs: Description, Additional Information (Specifications table), Reviews & Star rating form',
        '5. Related Products Grid (4 items)'
      ]
    },
    {
      page: 'Cart & Checkout (কার্ট ও চেকআউট)',
      widgets: [
        '1. Cart Page: WooCommerce [woocommerce_cart] shortcode or Gutenberg Cart Block with coupon box & shipping calculator',
        '2. Checkout Page: WooCommerce [woocommerce_checkout] shortcode or modern 2-column Checkout Block with Billing address on left, Order review and Payment Gateways (bKash/Nagad/Stripe/COD) on right',
        '3. Thank You Page: Standard WooCommerce Order Received receipt'
      ]
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-white text-slate-900 rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-900 via-[#1e293b] to-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#ff5b36] to-[#2563eb] flex items-center justify-center font-display font-black text-white text-xl shadow-lg">
              W
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display font-black text-lg sm:text-xl text-white">
                  WordPress & WooCommerce Replication Blueprint
                </h2>
                <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#ff5b36] text-white uppercase tracking-wider">
                  ওয়ার্ডপ্রেস গাইড
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Complete guide to copy this exact design 1:1 using WordPress, Elementor & WooCommerce
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsWpGuideOpen(false)}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center border-b border-slate-200 bg-slate-50 px-4 sm:px-6 overflow-x-auto text-xs font-bold text-slate-600 gap-1 sm:gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('plugins')}
            className={`py-3.5 px-3 sm:px-4 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'plugins'
                ? 'border-[#ff5b36] text-[#ff5b36] bg-white font-black'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>1. Required Free Plugins (প্লাগইনসমূহ)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('pages')}
            className={`py-3.5 px-3 sm:px-4 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'pages'
                ? 'border-[#ff5b36] text-[#ff5b36] bg-white font-black'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            <Layout className="w-4 h-4" />
            <span>2. Elementor Page Layouts (পেজ স্ট্রাকচার)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('colors')}
            className={`py-3.5 px-3 sm:px-4 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'colors'
                ? 'border-[#ff5b36] text-[#ff5b36] bg-white font-black'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            <Palette className="w-4 h-4" />
            <span>3. Colors & Fonts (কালার ও ফন্ট)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('faq')}
            className={`py-3.5 px-3 sm:px-4 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'faq'
                ? 'border-[#ff5b36] text-[#ff5b36] bg-white font-black'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>4. Step-by-Step Guide (স্টেপ বাই স্টেপ)</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* TAB 1: PLUGINS */}
          {activeTab === 'plugins' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">
                    এই ডেমো সাইটের সব ফিচার সম্পূর্ণ নরমাল ও স্ট্যান্ডার্ড ওয়ার্ডপ্রেস ও উকমার্সে তৈরি করার উপযোগী!
                  </p>
                  <p className="text-amber-800 text-xs mt-1">
                    নিচে দেওয়া ফ্রি প্লাগইনগুলো ইনস্টল করলে আপনার ওয়ার্ডপ্রেস সাইটটি হুবহু এই ডেমোর মতো কাজ করবে (ভেরিয়েশন সোয়াচ, স্লাইড কার্ট, কুইক ভিউ, উইশলিস্ট ইত্যাদি)।
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {plugins.map((p, idx) => (
                  <div
                    key={p.name}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-all space-y-2.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#ff5b36] bg-[#ff5b36]/10 px-2 py-0.5 rounded-full">
                        {p.bengaliRole}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        100% Free Plugin
                      </span>
                    </div>

                    <h4 className="font-display font-bold text-sm sm:text-base text-slate-900">
                      {p.name}
                    </h4>

                    <p className="text-xs text-slate-600 leading-relaxed">{p.desc}</p>

                    <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-500 font-medium">
                      💡 <strong>Elementor Tip:</strong> {p.elementorTip}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: PAGE LAYOUTS */}
          {activeTab === 'pages' && (
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-blue-950 text-xs sm:text-sm">
                <p className="font-bold text-blue-900">
                  Elementor পেজ লেআউট ও উইজেট সাজানোর নির্দেশনা
                </p>
                <p className="text-blue-800 text-xs mt-1">
                  প্রতিটি সেকশন কীভাবে এলিমেন্টরে তৈরি করবেন তার পরিষ্কার তালিকা নিচে দেওয়া হলো:
                </p>
              </div>

              <div className="space-y-4">
                {pageLayouts.map((layout) => (
                  <div
                    key={layout.page}
                    className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3"
                  >
                    <h3 className="font-display font-black text-base text-slate-900 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      {layout.page}
                    </h3>

                    <ul className="space-y-1.5 text-xs text-slate-700 pl-2">
                      {layout.widgets.map((widget, i) => (
                        <li key={i} className="flex items-start gap-2 py-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#ff5b36] shrink-0 mt-1.5" />
                          <span>{widget}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: COLORS & FONTS */}
          {activeTab === 'colors' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 text-xs text-slate-700">
                <p className="font-bold text-slate-900">
                  Elementor Site Settings &gt; Global Colors & Fonts-এ এই কোডগুলো সেট করুন:
                </p>
              </div>

              {/* Color Grid */}
              <div className="space-y-3">
                <h4 className="font-display font-bold text-sm text-slate-900">
                  Primary Color Codes (কালার কোডসমূহ)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {colorTokens.map((c) => (
                    <div
                      key={c.hex}
                      className="p-3 rounded-xl border border-slate-200 bg-white flex items-center justify-between gap-3 shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-xl shadow-inner border border-black/10 shrink-0"
                          style={{ backgroundColor: c.hex }}
                        />
                        <div>
                          <p className="font-bold text-xs text-slate-900">{c.name}</p>
                          <p className="text-[11px] text-slate-500 font-mono">{c.hex}</p>
                          <p className="text-[10px] text-slate-400">{c.usage}</p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleCopy(c.hex, c.hex)}
                        className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"
                        title="Copy hex code"
                      >
                        {copiedKey === c.hex ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Typography */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
                <h4 className="font-display font-bold text-sm text-slate-900">
                  Typography (গুগল ফন্টস)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700">
                  <div className="p-3 rounded-xl bg-white border border-slate-200">
                    <span className="font-bold text-slate-900 block font-display text-base">
                      Outfit (Display & Headings)
                    </span>
                    <p className="text-slate-500 mt-1">
                      Weights: 600 (Semi-bold), 700 (Bold), 800 (Extra Bold)
                    </p>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Use for: Page headings, product titles, prices, hero banner.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-slate-200">
                    <span className="font-bold text-slate-900 block text-base font-sans">
                      Plus Jakarta Sans (Body & UI)
                    </span>
                    <p className="text-slate-500 mt-1">
                      Weights: 400 (Regular), 500 (Medium), 600 (Semi-bold)
                    </p>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Use for: Paragraphs, buttons, navigation menu, product descriptions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: STEP-BY-STEP GUIDE */}
          {activeTab === 'faq' && (
            <div className="space-y-4 text-xs sm:text-sm text-slate-700">
              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1.5">
                  <h4 className="font-display font-bold text-sm text-slate-900">
                    ধাপ ১: ওয়ার্ডপ্রেস থিম নির্বাচন
                  </h4>
                  <p className="text-xs text-slate-600">
                    ওয়ার্ডপ্রেস ইনস্টল করার পর Appearance &gt; Themes-এ গিয়ে <strong>"Hello Elementor"</strong> (ফ্রি ও দ্রুততম) অথবা <strong>"Astra"</strong> থিম ইনস্টল ও অ্যাক্টিভ করুন।
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1.5">
                  <h4 className="font-display font-bold text-sm text-slate-900">
                    ধাপ ২: প্লাগইনসমূহ ইনস্টল করুন
                  </h4>
                  <p className="text-xs text-slate-600">
                    Plugins &gt; Add New-এ গিয়ে <strong>WooCommerce</strong>, <strong>Elementor</strong>, <strong>Variation Swatches for WooCommerce</strong>, <strong>TI WooCommerce Wishlist</strong>, এবং <strong>Side Cart WooCommerce</strong> ইনস্টল করুন।
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1.5">
                  <h4 className="font-display font-bold text-sm text-slate-900">
                    ধাপ ৩: প্রোডাক্ট ও ভেরিয়েশন তৈরি (Attributes)
                  </h4>
                  <p className="text-xs text-slate-600">
                    Products &gt; Attributes-এ গিয়ে ৩টি গ্লোবাল অ্যাট্রিবিউট বানান:
                    <br />
                    • <strong>Color</strong> (Type: Color - হেক্স কোড দিন যেমন #000000, #E0A96D)
                    <br />
                    • <strong>Size</strong> (Type: Button/Label - S, M, L, XL)
                    <br />
                    • <strong>Flavor</strong> (Type: Button - Yuzu, Smoked Orange, Wild Mint)
                    <br />
                    এরপর Variable Product হিসেবে টি-শার্ট, ক্যাপ, ব্যাগ ও ফ্লেভার আপলোড করুন।
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1.5">
                  <h4 className="font-display font-bold text-sm text-slate-900">
                    ধাপ ৪: হোমপেজ ডিজাইন (Elementor)
                  </h4>
                  <p className="text-xs text-slate-600">
                    Pages &gt; Add New দিয়ে "Home" নাম দিন এবং "Edit with Elementor" বাটনে ক্লিক করুন। তারপর উপরে উল্লিখিত সেকশনগুলো পর্যায়ক্রমে সাজিয়ে পাবলিশ করে দিন।
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1.5">
                  <h4 className="font-display font-bold text-sm text-slate-900">
                    ধাপ ৫: কার্ট ও চেকআউট সেটআপ
                  </h4>
                  <p className="text-xs text-slate-600">
                    WooCommerce ডিফল্টভাবে Cart, Checkout, My Account পেজগুলো তৈরি করে দেয়। পেমেন্ট হিসেবে ক্যাশ অন ডেলিভারি (COD) এবং bKash/Nagad বা Stripe অনায়াসে সংযুক্ত করতে পারবেন।
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <p className="text-slate-500 text-center sm:text-left">
            Need help replicating? All features, cards, buttons and tabs are 100% WooCommerce standard.
          </p>
          <button
            type="button"
            onClick={() => setIsWpGuideOpen(false)}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-[#ff5b36] text-white font-bold transition-colors"
          >
            Got it, Let's Explore Store
          </button>
        </div>
      </div>
    </div>
  );
};
