import React, { useState } from 'react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { Heart, Eye, Star, Check, Plus, Zap, Sparkles } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, featured = false }) => {
  const {
    navigateTo,
    addToCart,
    toggleWishlist,
    isWishlisted,
    openQuickView
  } = useStore();

  const [isHovered, setIsHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product.variations.colors?.[0]?.name
  );
  const [selectedImage, setSelectedImage] = useState<string>(product.images[0]);
  const [isAddedQuickly, setIsAddedQuickly] = useState(false);

  const wishlisted = isWishlisted(product.id);

  const handleCardClick = () => {
    navigateTo('product-detail', { productId: product.id });
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultSize = product.variations.sizes?.[0];
    const defaultFlavor = product.variations.flavors?.[0]?.name;
    const defaultPack = product.variations.packs?.[0]?.name;

    addToCart(
      product,
      {
        size: defaultSize,
        color: selectedColor,
        flavor: defaultFlavor,
        pack: defaultPack
      },
      1,
      true
    );

    setIsAddedQuickly(true);
    setTimeout(() => setIsAddedQuickly(false), 1500);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleQuickViewTrigger = (e: React.MouseEvent) => {
    e.stopPropagation();
    openQuickView(product);
  };

  const handleColorChange = (e: React.MouseEvent, colorName: string, colorImg?: string) => {
    e.stopPropagation();
    setSelectedColor(colorName);
    if (colorImg) {
      setSelectedImage(colorImg);
    }
  };

  const currentDisplayImage =
    isHovered && product.secondImage ? product.secondImage : selectedImage;

  // Category badge config
  const getCategoryBadge = () => {
    switch (product.category) {
      case 'vapes':
        return { label: 'VAPE 15K', bg: 'bg-[#00f59b]/15 text-[#00f59b] border-[#00f59b]/40', icon: Zap };
      case 'caps':
        return { label: 'CAPS', bg: 'bg-[#f59e0b]/15 text-[#f59e0b] border-[#f59e0b]/40', icon: Sparkles };
      case 'bags':
        return { label: 'EDC BAG', bg: 'bg-[#3b82f6]/15 text-[#3b82f6] border-[#3b82f6]/40', icon: null };
      case 't-shirts':
        return { label: 'APPAREL', bg: 'bg-[#ff5b36]/15 text-[#ff5b36] border-[#ff5b36]/40', icon: null };
      default:
        return { label: 'GEAR', bg: 'bg-white/10 text-white border-white/20', icon: null };
    }
  };

  const catBadge = getCategoryBadge();
  const CatIcon = catBadge.icon;

  // Extract key technical spec
  const keySpec =
    product.specifications?.['Puff Count'] ||
    product.specifications?.['Fabric Weight'] ||
    product.specifications?.['Capacity'] ||
    product.specifications?.['Material']?.slice(0, 24) ||
    product.subtitle.slice(0, 30);

  return (
    <div
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col rounded-2xl bg-[#111622] border border-[#222b3e] hover:border-[#00f59b]/60 transition-all duration-300 hover:shadow-2xl hover:shadow-[#00f59b]/5 hover:-translate-y-1 overflow-hidden cursor-pointer p-3.5"
    >
      {/* Image Container with Badges */}
      <div className="relative aspect-[4/4.2] w-full overflow-hidden rounded-xl bg-[#090c13] flex items-center justify-center border border-[#1b2333]">
        <img
          src={currentDisplayImage}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Ambient Gradient Overlay on Bottom of Image */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#090c13] via-transparent to-transparent opacity-60 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase backdrop-blur-md border ${catBadge.bg}`}
          >
            {CatIcon && <CatIcon className="w-2.5 h-2.5 fill-current" />}
            <span>{catBadge.label}</span>
          </span>

          {product.discountBadge && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#ff5b36] text-white shadow-xs">
              {product.discountBadge}
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={handleWishlistToggle}
          className={`absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all backdrop-blur-md ${
            wishlisted
              ? 'bg-rose-500 text-white shadow-md'
              : 'bg-black/50 text-slate-300 hover:text-white hover:bg-black/80 hover:scale-110 border border-white/10'
          }`}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-3.5 h-3.5 ${wishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quick Spec Badge */}
        {keySpec && (
          <div className="absolute bottom-2.5 left-2.5 z-10 px-2 py-0.5 rounded-md text-[10px] font-mono font-medium bg-black/70 text-slate-300 backdrop-blur-md border border-white/10">
            {keySpec}
          </div>
        )}

        {/* Hover Quick View Trigger */}
        <div
          className={`absolute inset-x-2.5 bottom-2.5 z-20 transition-all duration-300 ${
            isHovered
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-3 pointer-events-none'
          }`}
        >
          <button
            type="button"
            onClick={handleQuickViewTrigger}
            className="w-full py-2 px-3 rounded-xl bg-white/90 hover:bg-white text-black text-xs font-bold backdrop-blur-md shadow-lg transition-colors flex items-center justify-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="pt-3 px-1 flex flex-col flex-1 justify-between gap-2 text-white">
        <div>
          {/* Swatches / Ratings */}
          <div className="flex items-center justify-between gap-2 mb-1.5">
            {product.variations.colors && product.variations.colors.length > 0 ? (
              <div className="flex items-center gap-1.5">
                {product.variations.colors.slice(0, 4).map((color) => (
                  <button
                    key={color.name}
                    type="button"
                    onClick={(e) => handleColorChange(e, color.name, color.image)}
                    title={color.name}
                    className={`w-3 h-3 rounded-full transition-all border ${
                      selectedColor === color.name
                        ? 'ring-2 ring-[#00f59b] scale-110 border-black'
                        : 'border-white/20 opacity-80 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: color.hex }}
                  />
                ))}
              </div>
            ) : product.variations.flavors && product.variations.flavors.length > 0 ? (
              <span className="text-[11px] font-medium text-emerald-400">
                {product.variations.flavors.length} Flavors Available
              </span>
            ) : (
              <span className="text-[11px] text-slate-400 font-mono">IN STOCK</span>
            )}

            <div className="flex items-center gap-1 text-amber-400 font-semibold text-[11px]">
              <Star className="w-3 h-3 fill-current" />
              <span>{product.rating}</span>
              <span className="text-slate-400 font-normal">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 className="font-display font-bold text-sm text-slate-100 line-clamp-2 leading-snug group-hover:text-[#00f59b] transition-colors">
            {product.name}
          </h3>
          <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
            {product.subtitle}
          </p>
        </div>

        {/* Price & + Cart Action Button */}
        <div className="pt-2 flex items-center justify-between border-t border-white/5 mt-1">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-bold text-white tracking-tight">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-slate-500 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleQuickAdd}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 shadow-sm active:scale-95 ${
              isAddedQuickly
                ? 'bg-emerald-500 text-black'
                : 'bg-[#00f59b] hover:bg-[#00df8c] text-black shadow-lg shadow-[#00f59b]/15'
            }`}
            title="Add to Cart"
          >
            {isAddedQuickly ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5 stroke-[3]" />
                <span>Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
