import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import {
  Star,
  ShoppingBag,
  Heart,
  Share2,
  Check,
  ShieldCheck,
  Truck,
  RotateCcw,
  Ruler,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Flame,
  Clock,
  Sparkles,
  MessageSquarePlus
} from 'lucide-react';

export const ProductDetailView: React.FC = () => {
  const {
    products,
    selectedProductId,
    addToCart,
    toggleWishlist,
    isWishlisted,
    navigateTo,
    setIsSizeGuideOpen,
    getProductReviews,
    addReview,
    markReviewHelpful,
    showNotification
  } = useStore();

  const product = products.find((p) => p.id === selectedProductId) || products[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(undefined);
  const [selectedFlavor, setSelectedFlavor] = useState<string | undefined>(undefined);
  const [selectedPack, setSelectedPack] = useState<string | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'shipping' | 'returns' | 'reviews'>('desc');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  // Review Form state
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);

  // Initialize options whenever product changes
  useEffect(() => {
    setActiveImageIndex(0);
    setQuantity(1);
    setSelectedSize(product.variations.sizes?.[0]);
    setSelectedColor(product.variations.colors?.[0]?.name);
    setSelectedFlavor(product.variations.flavors?.[0]?.name);
    setSelectedPack(product.variations.packs?.[0]?.name);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product.id]);

  const wishlisted = isWishlisted(product.id);
  const productReviews = getProductReviews(product.id);

  // Dynamic price based on pack variation
  let unitPrice = product.price;
  if (selectedPack && product.variations.packs) {
    const p = product.variations.packs.find((pack) => pack.name === selectedPack);
    if (p) unitPrice = p.price;
  }

  const handleAddToCart = (openDrawer = true) => {
    addToCart(
      product,
      {
        size: selectedSize,
        color: selectedColor,
        flavor: selectedFlavor,
        pack: selectedPack
      },
      quantity,
      openDrawer
    );
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1200);
  };

  const handleBuyNow = () => {
    addToCart(
      product,
      {
        size: selectedSize,
        color: selectedColor,
        flavor: selectedFlavor,
        pack: selectedPack
      },
      quantity,
      false
    );
    navigateTo('checkout');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.subtitle,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showNotification('Product link copied to clipboard!', 'info');
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewAuthor || !reviewTitle || !reviewComment) return;

    addReview({
      productId: product.id,
      author: reviewAuthor,
      rating: reviewRating,
      title: reviewTitle,
      comment: reviewComment
    });

    setReviewAuthor('');
    setReviewTitle('');
    setReviewComment('');
    setShowReviewForm(false);
  };

  // Related products
  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.category === product.category || product.relatedProductIds?.includes(p.id)))
    .slice(0, 4);

  // Frequently bought together bundle
  const bundleItems = products
    .filter((p) => product.frequentlyBoughtTogetherIds?.includes(p.id))
    .slice(0, 2);

  const rawBundlePrice = product.price + bundleItems.reduce((acc, it) => acc + it.price, 0);
  const bundleSavings = Math.round(rawBundlePrice * 0.15);
  const finalBundlePrice = rawBundlePrice - bundleSavings;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-400">
        <button onClick={() => navigateTo('home')} className="hover:text-white">
          Home
        </button>
        <span>/</span>
        <button onClick={() => navigateTo('shop', { category: 'all' })} className="hover:text-white">
          Shop
        </button>
        <span>/</span>
        <button
          onClick={() => navigateTo('shop', { category: product.category })}
          className="hover:text-white capitalize"
        >
          {product.category}
        </button>
        <span>/</span>
        <span className="text-white truncate font-medium max-w-[200px] sm:max-w-none">
          {product.name}
        </span>
      </nav>

      {/* Main PDP Grid: Left Gallery + Right Configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-start">
        {/* LEFT COLUMN: IMAGES & GALLERY */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-[#121622] border border-white/10 group shadow-2xl">
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
              {product.discountBadge && (
                <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[#ff5b36] text-white shadow-md">
                  {product.discountBadge}
                </span>
              )}
            </div>

            {/* Lightbox Trigger */}
            <button
              type="button"
              onClick={() => setIsLightboxOpen(true)}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 hover:bg-black text-white backdrop-blur-md border border-white/10 transition-colors"
              title="Expand image fullscreen"
            >
              <Maximize2 className="w-4 h-4" />
            </button>

            {/* Gallery Arrows */}
            {product.images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() =>
                    setActiveImageIndex((prev) =>
                      prev === 0 ? product.images.length - 1 : prev - 1
                    )
                  }
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black text-white flex items-center justify-center backdrop-blur-md transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setActiveImageIndex((prev) =>
                      prev === product.images.length - 1 ? 0 : prev + 1
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black text-white flex items-center justify-center backdrop-blur-md transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnails Row */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 h-24 rounded-2xl overflow-hidden border-2 shrink-0 transition-all ${
                    activeImageIndex === idx
                      ? 'border-[#ff5b36] scale-105 shadow-lg'
                      : 'border-white/10 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Value Props Row under Gallery */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/5 text-center text-xs text-slate-300">
            <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5">
              <Truck className="w-4 h-4 text-[#ff5b36] mx-auto mb-1.5" />
              <p className="font-bold text-white text-[11px]">Free Worldwide Dispatch</p>
              <p className="text-[10px] text-slate-400">Orders over $75</p>
            </div>
            <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5">
              <RotateCcw className="w-4 h-4 text-emerald-400 mx-auto mb-1.5" />
              <p className="font-bold text-white text-[11px]">30-Day Guarantee</p>
              <p className="text-[10px] text-slate-400">Zero-hassle returns</p>
            </div>
            <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5">
              <ShieldCheck className="w-4 h-4 text-[#2656d6] mx-auto mb-1.5" />
              <p className="font-bold text-white text-[11px]">Ethical Craft</p>
              <p className="text-[10px] text-slate-400">100% Studio Verified</p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: PRODUCT INFO & PURCHASE CONTROLS */}
        <div className="lg:col-span-5 space-y-6">
          {/* Header & Title */}
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
              <span className="font-mono uppercase text-[#ff5b36] font-bold">
                {product.category} • SKU: {product.sku}
              </span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                In Stock ({product.stock} units remaining)
              </span>
            </div>

            <h1 className="font-display font-black text-2xl sm:text-3xl xl:text-4xl text-white leading-tight">
              {product.name}
            </h1>
            <p className="text-sm text-slate-300 mt-1 font-light leading-relaxed">
              {product.subtitle}
            </p>

            {/* Ratings & Jump to Reviews */}
            <div className="flex items-center gap-3 mt-3 pt-3 border-t border-white/5">
              <div className="flex items-center text-amber-400 gap-1 text-sm font-bold">
                <Star className="w-4 h-4 fill-current" />
                <span>{product.rating}</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('reviews');
                  document.getElementById('product-tabs')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-xs text-slate-400 hover:text-white underline"
              >
                Based on {product.reviewsCount} verified community reviews
              </button>
            </div>
          </div>

          {/* Pricing */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-baseline justify-between">
            <div className="flex items-baseline gap-3">
              <span className="font-display font-black text-3xl sm:text-4xl text-white">
                ${unitPrice}
              </span>
              {product.originalPrice && (
                <span className="text-sm font-mono text-slate-400 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
            {product.originalPrice && (
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Save ${product.originalPrice - unitPrice}
              </span>
            )}
          </div>

          {/* VARIATIONS */}

          {/* 1. Size Variation (for tees, etc.) */}
          {product.variations.sizes && (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-200">
                  Select Size: <strong className="text-white font-mono">{selectedSize}</strong>
                </span>
                <button
                  type="button"
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-[#ff5b36] hover:underline flex items-center gap-1 text-xs font-semibold"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  Studio Sizing Guide
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {product.variations.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-12 h-11 px-3.5 rounded-xl text-xs font-bold transition-all border ${
                      selectedSize === size
                        ? 'bg-[#ff5b36] border-[#ff5b36] text-white shadow-lg shadow-[#ff5b36]/25'
                        : 'bg-white/5 border-white/10 text-slate-300 hover:border-white/20'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 2. Color Swatches */}
          {product.variations.colors && (
            <div className="space-y-2.5">
              <span className="text-xs font-bold text-slate-200 block">
                Selected Color: <strong className="text-white">{selectedColor}</strong>
              </span>
              <div className="flex gap-2.5">
                {product.variations.colors.map((color) => (
                  <button
                    key={color.name}
                    type="button"
                    onClick={() => {
                      setSelectedColor(color.name);
                      if (color.image) {
                        const imgIdx = product.images.indexOf(color.image);
                        if (imgIdx > -1) setActiveImageIndex(imgIdx);
                      }
                    }}
                    className={`w-9 h-9 rounded-full border-2 transition-transform ${
                      selectedColor === color.name
                        ? 'border-[#ff5b36] scale-110 ring-2 ring-[#ff5b36]/30'
                        : 'border-white/20 hover:scale-105'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          )}

          {/* 3. Flavor Drops Specific Profiles */}
          {product.variations.flavors && (
            <div className="space-y-2.5">
              <span className="text-xs font-bold text-amber-400 block flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5" />
                Select Sensory Flavor Profile:
              </span>
              <div className="grid grid-cols-2 gap-2.5">
                {product.variations.flavors.map((flv) => (
                  <button
                    key={flv.name}
                    type="button"
                    onClick={() => setSelectedFlavor(flv.name)}
                    className={`p-3 rounded-2xl border text-left text-xs transition-all ${
                      selectedFlavor === flv.name
                        ? 'border-amber-400 bg-amber-400/15 text-white shadow-lg'
                        : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/20'
                    }`}
                  >
                    <p className="font-bold text-xs">{flv.name}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{flv.notes}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 4. Pack Multipliers */}
          {product.variations.packs && (
            <div className="space-y-2.5">
              <span className="text-xs font-bold text-slate-200 block">Package Size:</span>
              <div className="space-y-2">
                {product.variations.packs.map((pack) => (
                  <button
                    key={pack.name}
                    type="button"
                    onClick={() => setSelectedPack(pack.name)}
                    className={`w-full p-3 rounded-xl border text-xs flex items-center justify-between transition-all ${
                      selectedPack === pack.name
                        ? 'border-[#ff5b36] bg-[#ff5b36]/15 text-white'
                        : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/20'
                    }`}
                  >
                    <span className="font-bold">{pack.name}</span>
                    <div className="flex items-center gap-2">
                      {pack.savingsLabel && (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                          {pack.savingsLabel}
                        </span>
                      )}
                      <span className="font-mono font-bold text-sm text-white">${pack.price}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* PURCHASE ACTIONS & QUANTITY */}
          <div className="pt-4 border-t border-white/10 space-y-3">
            <div className="flex gap-3">
              {/* Stepper */}
              <div className="flex items-center border border-white/10 rounded-2xl bg-black/40 px-3">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-2 text-slate-400 hover:text-white"
                >
                  -
                </button>
                <span className="px-3 font-mono font-bold text-sm text-white">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-2 text-slate-400 hover:text-white"
                >
                  +
                </button>
              </div>

              {/* Add to Cart */}
              <button
                type="button"
                onClick={() => handleAddToCart(true)}
                className="flex-1 py-4 px-6 rounded-2xl bg-[#ff5b36] hover:bg-[#f04f29] text-white font-bold text-sm shadow-xl shadow-[#ff5b36]/25 transition-all flex items-center justify-center gap-2 active:scale-98"
              >
                {isAdded ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    <span>Add to Bag • ${(unitPrice * quantity).toFixed(2)}</span>
                  </>
                )}
              </button>

              {/* Wishlist */}
              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                className={`p-3.5 rounded-2xl border transition-all ${
                  wishlisted
                    ? 'border-rose-500 bg-rose-500/20 text-rose-400'
                    : 'border-white/10 bg-white/5 text-slate-300 hover:text-white'
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-5 h-5 ${wishlisted ? 'fill-current' : ''}`} />
              </button>

              {/* Share */}
              <button
                type="button"
                onClick={handleShare}
                className="p-3.5 rounded-2xl border border-white/10 bg-white/5 text-slate-300 hover:text-white transition-all"
                title="Share link"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            {/* Buy Now Direct Button */}
            <button
              type="button"
              onClick={handleBuyNow}
              className="w-full py-3.5 rounded-2xl bg-white text-slate-900 hover:bg-slate-200 text-xs font-bold transition-all shadow-md"
            >
              Instant Express Buy
            </button>
          </div>

          {/* Delivery Estimator Callout */}
          <div className="p-4 rounded-2xl bg-[#121622] border border-white/5 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-white font-bold">
              <Clock className="w-4 h-4 text-[#ff5b36]" />
              <span>Fast Dispatch Guaranteed</span>
            </div>
            <p className="text-slate-400 leading-snug">
              Order within <strong>3 hours and 24 minutes</strong> to have your package dispatched
              today. Estimated arrival: 3–4 business days with end-to-end tracking.
            </p>
          </div>
        </div>
      </div>

      {/* TABS & ACCORDION SECTION */}
      <div id="product-tabs" className="pt-8 border-t border-white/10">
        <div className="flex gap-4 border-b border-white/10 overflow-x-auto pb-4">
          {[
            { id: 'desc', label: 'Story & Craft' },
            { id: 'specs', label: 'Technical Specifications' },
            { id: 'shipping', label: 'Shipping & Delivery' },
            { id: 'returns', label: 'Returns & Guarantee' },
            { id: 'reviews', label: `Reviews (${productReviews.length})` }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-slate-900 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Description & Story */}
        {activeTab === 'desc' && (
          <div className="py-8 grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-slate-300 leading-relaxed">
            <div className="space-y-4">
              <h3 className="font-display font-bold text-lg text-white">The Design Story</h3>
              <p>{product.description}</p>
              <p>{product.story}</p>
            </div>
            <div className="space-y-4 p-6 rounded-2xl bg-[#121622] border border-white/5">
              <h4 className="font-display font-bold text-sm text-white">Key Studio Highlights</h4>
              <ul className="space-y-2.5 text-xs">
                {product.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Tab 2: Specifications */}
        {activeTab === 'specs' && (
          <div className="py-8 max-w-2xl">
            <div className="divide-y divide-white/5 border border-white/10 rounded-2xl overflow-hidden bg-[#121622]">
              {Object.entries(product.specifications).map(([key, val]) => (
                <div key={key} className="p-4 flex flex-col sm:flex-row sm:justify-between text-xs gap-1">
                  <span className="font-bold text-slate-400 uppercase tracking-wider">{key}</span>
                  <span className="text-white sm:text-right font-medium">{val}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Shipping */}
        {activeTab === 'shipping' && (
          <div className="py-8 space-y-4 max-w-2xl text-xs text-slate-300 leading-relaxed">
            <h3 className="font-display font-bold text-base text-white">Worldwide Delivery Options</h3>
            <p>
              All KROMA products are packaged in biodegradable matte mailers with tamper-evident
              labels. Orders placed before 2 PM local time ship same-day from our nearest regional hub.
            </p>
            <ul className="space-y-2 list-disc pl-5">
              <li>
                <strong>Standard Express (3–5 business days):</strong> $5.95 (Free on orders over $75).
              </li>
              <li>
                <strong>Priority Air Courier (1–2 business days):</strong> $12.95.
              </li>
              <li>
                <strong>Cash on Delivery (COD):</strong> Available in eligible metropolitan areas.
              </li>
            </ul>
          </div>
        )}

        {/* Tab 4: Returns */}
        {activeTab === 'returns' && (
          <div className="py-8 space-y-4 max-w-2xl text-xs text-slate-300 leading-relaxed">
            <h3 className="font-display font-bold text-base text-white">30-Day Happiness Policy</h3>
            <p>
              We want you to feel complete tactile conviction in what you wear and carry. You can test
              our apparel and bags for up to 30 days. If the fit, silhouette, or texture isn’t
              exceptional, initiate a prepaid return or exchange instantly via your account dashboard.
            </p>
          </div>
        )}

        {/* Tab 5: Customer Reviews */}
        {activeTab === 'reviews' && (
          <div className="py-8 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-[#121622] border border-white/10">
              <div className="flex items-center gap-6">
                <div>
                  <span className="text-4xl font-black font-display text-white">
                    {product.rating}
                  </span>
                  <div className="flex items-center text-amber-400 gap-1 my-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs text-slate-400">
                    {productReviews.length} total reviews
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="px-5 py-2.5 rounded-xl bg-white text-slate-900 font-bold text-xs hover:bg-[#ff5b36] hover:text-white transition-colors flex items-center gap-2 self-start sm:self-auto"
              >
                <MessageSquarePlus className="w-4 h-4" />
                <span>Write a Verified Review</span>
              </button>
            </div>

            {/* Review Submission Form */}
            {showReviewForm && (
              <form
                onSubmit={handleReviewSubmit}
                className="p-6 rounded-3xl bg-[#151926] border border-[#ff5b36]/30 space-y-4 animate-in fade-in"
              >
                <h4 className="font-display font-bold text-sm text-white">
                  Share Your Experience With {product.name}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-slate-300 font-medium block mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={reviewAuthor}
                      onChange={(e) => setReviewAuthor(e.target.value)}
                      placeholder="e.g. Jordan Sterling"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#ff5b36]"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-300 font-medium block mb-1">Rating</label>
                    <div className="flex items-center gap-1.5 pt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewRating(star)}
                          className="p-1"
                        >
                          <Star
                            className={`w-5 h-5 ${
                              star <= reviewRating
                                ? 'text-amber-400 fill-current'
                                : 'text-slate-600'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-medium block mb-1">Review Headline</label>
                  <input
                    type="text"
                    required
                    value={reviewTitle}
                    onChange={(e) => setReviewTitle(e.target.value)}
                    placeholder="e.g. Substantial weight, perfect boxy drape"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#ff5b36]"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-medium block mb-1">Detailed Feedback</label>
                  <textarea
                    rows={3}
                    required
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    placeholder="How does the fabric, hardware, or sensory profile feel in your daily routine?"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#ff5b36]"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowReviewForm(false)}
                    className="px-4 py-2 rounded-xl bg-white/5 text-slate-300 text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-xl bg-[#ff5b36] hover:bg-[#f04f29] text-white text-xs font-bold shadow-lg"
                  >
                    Publish Review
                  </button>
                </div>
              </form>
            )}

            {/* Reviews List */}
            <div className="space-y-4">
              {productReviews.length === 0 ? (
                <p className="text-xs text-slate-400 py-6 text-center">
                  Be the first to review this piece!
                </p>
              ) : (
                productReviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-5 rounded-2xl bg-[#121622] border border-white/5 space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">{rev.author}</span>
                        {rev.verifiedPurchase && (
                          <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                            Verified Buyer
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">{rev.date}</span>
                    </div>

                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>

                    <h5 className="text-xs font-bold text-slate-200">{rev.title}</h5>
                    <p className="text-xs text-slate-300 leading-relaxed">{rev.comment}</p>

                    <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400">
                      <span>Was this review helpful?</span>
                      <button
                        type="button"
                        onClick={() => markReviewHelpful(rev.id)}
                        className="hover:text-white transition-colors"
                      >
                        Helpful ({rev.helpfulCount})
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* COMPLETE THE LOOK / FREQUENTLY BOUGHT TOGETHER */}
      {bundleItems.length > 0 && (
        <section className="p-8 rounded-3xl bg-[#121622] border border-white/10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#ff5b36]">
                Curated Ensemble
              </span>
              <h3 className="font-display font-black text-xl sm:text-2xl text-white mt-0.5">
                Complete The Look
              </h3>
            </div>
            <span className="text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full font-bold self-start sm:self-auto">
              Save 15% on All 3 Items
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8 flex flex-wrap items-center gap-4">
              {/* Main item */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-14 h-14 object-cover rounded-lg"
                />
                <div>
                  <p className="text-xs font-bold text-white truncate max-w-[140px]">
                    {product.name}
                  </p>
                  <p className="text-xs font-mono text-[#ff5b36]">${product.price}</p>
                </div>
              </div>

              <span className="text-slate-500 font-bold text-lg">+</span>

              {/* Bundle items */}
              {bundleItems.map((bItem) => (
                <React.Fragment key={bItem.id}>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                    <img
                      src={bItem.images[0]}
                      alt={bItem.name}
                      className="w-14 h-14 object-cover rounded-lg"
                    />
                    <div>
                      <p className="text-xs font-bold text-white truncate max-w-[140px]">
                        {bItem.name}
                      </p>
                      <p className="text-xs font-mono text-slate-300">${bItem.price}</p>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>

            <div className="md:col-span-4 p-5 rounded-2xl bg-[#0c0e14] border border-white/10 space-y-3">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black font-display text-white">
                  ${finalBundlePrice}
                </span>
                <span className="text-xs font-mono text-slate-400 line-through">
                  ${rawBundlePrice}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  addToCart(product, {}, 1, false);
                  bundleItems.forEach((it) => addToCart(it, {}, 1, false));
                  showNotification('Added complete 3-piece look to your bag!', 'success');
                }}
                className="w-full py-3 rounded-xl bg-[#ff5b36] hover:bg-[#f04f29] text-white text-xs font-bold shadow-lg"
              >
                Add All 3 Items To Bag
              </button>
            </div>
          </div>
        </section>
      )}

      {/* YOU MAY ALSO LIKE */}
      <section className="space-y-6">
        <h3 className="font-display font-black text-xl sm:text-2xl text-white">
          You May Also Like
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((rel) => (
            <ProductCard key={rel.id} product={rel} />
          ))}
        </div>
      </section>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          <button
            type="button"
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white"
          >
            ✕
          </button>
          <img
            src={product.images[activeImageIndex]}
            alt={product.name}
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-2xl"
          />
        </div>
      )}
    </div>
  );
};
