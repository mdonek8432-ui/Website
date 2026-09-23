import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import {
  X,
  Star,
  ShoppingBag,
  Heart,
  ArrowRight,
  ShieldCheck,
  Ruler,
  Check,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export const QuickViewModal: React.FC = () => {
  const {
    isQuickViewOpen,
    closeQuickView,
    quickViewProduct,
    addToCart,
    toggleWishlist,
    isWishlisted,
    navigateTo,
    setIsSizeGuideOpen
  } = useStore();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(undefined);
  const [selectedFlavor, setSelectedFlavor] = useState<string | undefined>(undefined);
  const [selectedPack, setSelectedPack] = useState<string | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  // Synchronize options when modal opens with a product
  useEffect(() => {
    if (quickViewProduct) {
      setActiveImageIndex(0);
      setQuantity(1);
      setSelectedSize(quickViewProduct.variations.sizes?.[0]);
      setSelectedColor(quickViewProduct.variations.colors?.[0]?.name);
      setSelectedFlavor(quickViewProduct.variations.flavors?.[0]?.name);
      setSelectedPack(quickViewProduct.variations.packs?.[0]?.name);
    }
  }, [quickViewProduct]);

  if (!isQuickViewOpen || !quickViewProduct) return null;

  const wishlisted = isWishlisted(quickViewProduct.id);

  // Dynamic price based on pack if applicable
  let currentPrice = quickViewProduct.price;
  if (selectedPack && quickViewProduct.variations.packs) {
    const packObj = quickViewProduct.variations.packs.find((p) => p.name === selectedPack);
    if (packObj) currentPrice = packObj.price;
  }

  const handleAddToCart = () => {
    addToCart(
      quickViewProduct,
      {
        size: selectedSize,
        color: selectedColor,
        flavor: selectedFlavor,
        pack: selectedPack
      },
      quantity,
      true
    );
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      closeQuickView();
    }, 900);
  };

  const handleBuyNow = () => {
    addToCart(
      quickViewProduct,
      {
        size: selectedSize,
        color: selectedColor,
        flavor: selectedFlavor,
        pack: selectedPack
      },
      quantity,
      false
    );
    closeQuickView();
    navigateTo('checkout');
  };

  const handleViewFullProduct = () => {
    closeQuickView();
    navigateTo('product-detail', { productId: quickViewProduct.id });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 lg:p-8 flex items-center justify-center animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        onClick={closeQuickView}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
      />

      <div className="relative w-full max-w-4xl bg-[#0f121a] rounded-3xl border border-white/10 shadow-2xl overflow-hidden z-10 my-8">
        {/* Close Button */}
        <button
          type="button"
          onClick={closeQuickView}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center border border-white/10 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Gallery */}
          <div className="p-6 bg-[#0c0e14] flex flex-col justify-between">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-black/50 border border-white/5">
              <img
                src={quickViewProduct.images[activeImageIndex] || quickViewProduct.images[0]}
                alt={quickViewProduct.name}
                className="w-full h-full object-cover object-center"
              />

              {quickViewProduct.images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveImageIndex((prev) =>
                        prev === 0 ? quickViewProduct.images.length - 1 : prev - 1
                      )
                    }
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center backdrop-blur-sm"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveImageIndex((prev) =>
                        prev === quickViewProduct.images.length - 1 ? 0 : prev + 1
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center backdrop-blur-sm"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {quickViewProduct.images.length > 1 && (
              <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
                {quickViewProduct.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                      activeImageIndex === idx
                        ? 'border-[#ff5b36] scale-105'
                        : 'border-white/10 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Content & Controls */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-6 max-h-[85vh] overflow-y-auto">
            <div className="space-y-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#ff5b36]">
                  {quickViewProduct.category} • SKU: {quickViewProduct.sku}
                </span>
                <h2 className="text-xl sm:text-2xl font-black font-display text-white mt-1">
                  {quickViewProduct.name}
                </h2>
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center text-amber-400 gap-1 text-sm font-semibold">
                    <Star className="w-4 h-4 fill-current" />
                    <span>{quickViewProduct.rating}</span>
                  </div>
                  <span className="text-xs text-slate-400">
                    ({quickViewProduct.reviewsCount} verified reviews)
                  </span>
                  <span className="text-xs text-emerald-400 font-medium">
                    • In Stock ({quickViewProduct.stock} left)
                  </span>
                </div>
              </div>

              {/* Pricing */}
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-black text-white font-display">
                  ${currentPrice}
                </span>
                {quickViewProduct.originalPrice && (
                  <span className="text-sm text-slate-400 line-through">
                    ${quickViewProduct.originalPrice}
                  </span>
                )}
                {quickViewProduct.discountBadge && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#ff5b36]/20 text-[#ff5b36] border border-[#ff5b36]/30">
                    {quickViewProduct.discountBadge}
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {quickViewProduct.description}
              </p>

              {/* Variations - Sizes */}
              {quickViewProduct.variations.sizes && (
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-200">
                      Select Size: <strong className="text-white">{selectedSize}</strong>
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsSizeGuideOpen(true)}
                      className="text-[#ff5b36] hover:underline flex items-center gap-1 text-xs"
                    >
                      <Ruler className="w-3.5 h-3.5" />
                      Size Guide
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {quickViewProduct.variations.sizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-10 h-10 px-3 rounded-xl text-xs font-bold transition-all border ${
                          selectedSize === size
                            ? 'bg-[#ff5b36] border-[#ff5b36] text-white shadow-lg shadow-[#ff5b36]/20'
                            : 'bg-white/5 border-white/10 text-slate-300 hover:border-white/30'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Variations - Colors */}
              {quickViewProduct.variations.colors && (
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-bold text-slate-200 block">
                    Select Color: <strong className="text-white">{selectedColor}</strong>
                  </span>
                  <div className="flex gap-2">
                    {quickViewProduct.variations.colors.map((color) => (
                      <button
                        key={color.name}
                        type="button"
                        onClick={() => setSelectedColor(color.name)}
                        className={`w-8 h-8 rounded-full border-2 transition-transform ${
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

              {/* Variations - Flavors */}
              {quickViewProduct.variations.flavors && (
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-bold text-slate-200 block">
                    Sensory Profile: <strong className="text-amber-400">{selectedFlavor}</strong>
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {quickViewProduct.variations.flavors.map((flv) => (
                      <button
                        key={flv.name}
                        type="button"
                        onClick={() => setSelectedFlavor(flv.name)}
                        className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                          selectedFlavor === flv.name
                            ? 'border-amber-400 bg-amber-400/10 text-amber-200'
                            : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/20'
                        }`}
                      >
                        <p className="font-bold">{flv.name}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">
                          {flv.notes}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Variations - Pack Sizes */}
              {quickViewProduct.variations.packs && (
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-bold text-slate-200 block">Select Quantity Pack:</span>
                  <div className="space-y-1.5">
                    {quickViewProduct.variations.packs.map((pack) => (
                      <button
                        key={pack.name}
                        type="button"
                        onClick={() => setSelectedPack(pack.name)}
                        className={`w-full p-2.5 rounded-xl border text-xs flex items-center justify-between transition-all ${
                          selectedPack === pack.name
                            ? 'border-[#ff5b36] bg-[#ff5b36]/10 text-white'
                            : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/20'
                        }`}
                      >
                        <span className="font-semibold">{pack.name}</span>
                        <div className="flex items-center gap-2">
                          {pack.savingsLabel && (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                              {pack.savingsLabel}
                            </span>
                          )}
                          <span className="font-mono font-bold">${pack.price}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <div className="flex gap-3">
                {/* Quantity Stepper */}
                <div className="flex items-center border border-white/10 rounded-xl bg-black/40 px-2">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-2 text-slate-400 hover:text-white"
                  >
                    -
                  </button>
                  <span className="px-2 font-mono font-bold text-sm text-white">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-2 text-slate-400 hover:text-white"
                  >
                    +
                  </button>
                </div>

                {/* Add to Bag Button */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#ff5b36] hover:bg-[#f04f29] text-white font-bold text-sm shadow-xl shadow-[#ff5b36]/25 transition-all flex items-center justify-center gap-2 active:scale-98"
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag</span>
                    </>
                  )}
                </button>

                {/* Wishlist Button */}
                <button
                  type="button"
                  onClick={() => toggleWishlist(quickViewProduct.id)}
                  className={`p-3 rounded-xl border transition-all ${
                    wishlisted
                      ? 'border-rose-500 bg-rose-500/20 text-rose-400'
                      : 'border-white/10 bg-white/5 text-slate-300 hover:text-white'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${wishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>

              <button
                type="button"
                onClick={handleBuyNow}
                className="w-full py-2.5 rounded-xl bg-white text-slate-900 hover:bg-slate-200 text-xs font-bold transition-all shadow-md"
              >
                Instant Buy Now
              </button>

              <button
                type="button"
                onClick={handleViewFullProduct}
                className="w-full py-2 text-xs text-slate-400 hover:text-white text-center flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>View Full Technical Specs & Reviews</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
