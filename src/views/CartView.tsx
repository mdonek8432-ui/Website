import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  ShoppingBag,
  Trash2,
  Heart,
  ArrowRight,
  ShieldCheck,
  Truck,
  Sparkles,
  Tag,
  Check,
  ChevronRight
} from 'lucide-react';

export const CartView: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    cartDiscount,
    cartTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    updateQuantity,
    removeFromCart,
    toggleWishlist,
    navigateTo,
    products,
    addToCart
  } = useStore();

  const [couponCodeInput, setCouponCodeInput] = useState('');
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');

  const freeShippingThreshold = 75;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);
  const freeShippingProgress = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);

  const shippingCost =
    cartSubtotal >= freeShippingThreshold || appliedCoupon?.code === 'FREESHIP'
      ? 0
      : shippingMethod === 'express'
      ? 12.95
      : 5.95;

  const finalOrderTotal = cartTotal + (cart.length > 0 ? shippingCost : 0);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCodeInput.trim()) return;
    applyCoupon(couponCodeInput.trim());
    setCouponCodeInput('');
  };

  const handleMoveToWishlist = (productId: string, cartId: string) => {
    toggleWishlist(productId);
    removeFromCart(cartId);
  };

  // Upsell candidates: products not currently in cart
  const cartProductIds = cart.map((i) => i.productId);
  const upsellProducts = products.filter((p) => !cartProductIds.includes(p.id)).slice(0, 3);

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-slate-500">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h1 className="font-display font-black text-3xl text-white">Your Bag is Empty</h1>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            Looks like you haven't added any bags, boxy tees, corduroy caps, or sensory elixirs yet.
          </p>
        </div>
        <button
          type="button"
          onClick={() => navigateTo('shop', { category: 'all' })}
          className="px-8 py-3.5 rounded-2xl bg-[#ff5b36] hover:bg-[#f04f29] text-white font-bold text-sm shadow-xl shadow-[#ff5b36]/25 transition-all inline-flex items-center gap-2"
        >
          <span>Explore The Catalog</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header & Breadcrumb */}
      <div>
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
          <button onClick={() => navigateTo('home')} className="hover:text-white">
            Home
          </button>
          <span>/</span>
          <span className="text-white">Shopping Bag</span>
        </div>
        <h1 className="font-display font-black text-3xl sm:text-4xl text-white">
          Review Your Bag ({cart.reduce((acc, i) => acc + i.quantity, 0)} items)
        </h1>
      </div>

      {/* Free Shipping Progress Indicator */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#121622] border border-white/10 space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="flex items-center gap-2 text-white">
            <Truck className="w-4 h-4 text-[#ff5b36]" />
            {amountToFreeShipping === 0 ? (
              <span className="text-emerald-400 font-bold">
                You've unlocked Free Express Shipping!
              </span>
            ) : (
              <span>
                Add <strong className="text-white font-mono">${amountToFreeShipping.toFixed(2)}</strong> more for Free Shipping
              </span>
            )}
          </span>
          <span className="text-slate-400 font-mono text-[11px]">
            {Math.round(freeShippingProgress)}%
          </span>
        </div>
        <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#ff5b36] to-[#2656d6] rounded-full transition-all duration-500"
            style={{ width: `${freeShippingProgress}%` }}
          />
        </div>
      </div>

      {/* Main Grid: Cart Items List + Order Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT: CART ITEMS */}
        <div className="lg:col-span-8 space-y-4">
          <div className="divide-y divide-white/5 rounded-3xl bg-[#121622] border border-white/10 overflow-hidden">
            {cart.map((item) => (
              <div
                key={item.id}
                className="p-5 sm:p-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between transition-colors hover:bg-white/[0.01]"
              >
                {/* Item Thumbnail & Details */}
                <div className="flex gap-4 items-center min-w-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    onClick={() => navigateTo('product-detail', { productId: item.productId })}
                    className="w-20 h-24 sm:w-24 sm:h-28 rounded-2xl object-cover bg-black border border-white/10 shrink-0 cursor-pointer"
                  />
                  <div className="space-y-1 min-w-0">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-[#ff5b36]">
                      {item.category}
                    </span>
                    <h3
                      onClick={() => navigateTo('product-detail', { productId: item.productId })}
                      className="text-sm sm:text-base font-bold text-white hover:text-[#ff5b36] cursor-pointer transition-colors truncate"
                    >
                      {item.name}
                    </h3>

                    {/* Selected Variations Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-1 text-[11px] text-slate-300">
                      {item.selectedSize && (
                        <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10">
                          Size: {item.selectedSize}
                        </span>
                      )}
                      {item.selectedColor && (
                        <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10">
                          Color: {item.selectedColor}
                        </span>
                      )}
                      {item.selectedFlavor && (
                        <span className="px-2 py-0.5 rounded-md bg-amber-400/10 text-amber-300 border border-amber-400/20">
                          Flavor: {item.selectedFlavor}
                        </span>
                      )}
                      {item.selectedPack && (
                        <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10">
                          Pack: {item.selectedPack}
                        </span>
                      )}
                    </div>

                    <p className="text-xs font-mono text-slate-400 pt-1">
                      ${item.unitPrice} each
                    </p>
                  </div>
                </div>

                {/* Stepper, Subtotal & Actions */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-white/5">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-white/10 rounded-xl bg-black/40 px-2">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1.5 text-slate-400 hover:text-white"
                    >
                      -
                    </button>
                    <span className="px-2.5 font-mono font-bold text-xs text-white">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1.5 text-slate-400 hover:text-white"
                    >
                      +
                    </button>
                  </div>

                  {/* Subtotal */}
                  <div className="text-right min-w-[70px]">
                    <span className="font-display font-black text-base text-white">
                      ${(item.unitPrice * item.quantity).toFixed(2)}
                    </span>
                  </div>

                  {/* Secondary Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleMoveToWishlist(item.productId, item.id)}
                      className="p-2 rounded-lg text-slate-400 hover:text-rose-400 transition-colors"
                      title="Save for Later (Move to Wishlist)"
                    >
                      <Heart className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 rounded-lg text-slate-400 hover:text-rose-400 transition-colors"
                      title="Remove from bag"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Upsell Carousel */}
          {upsellProducts.length > 0 && (
            <div className="p-6 rounded-3xl bg-[#121622] border border-white/10 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#ff5b36]" />
                Recommended Studio Add-Ons
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {upsellProducts.map((up) => (
                  <div
                    key={up.id}
                    className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between gap-3"
                  >
                    <img
                      src={up.images[0]}
                      alt={up.name}
                      className="w-12 h-12 object-cover rounded-xl shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-white truncate">{up.name}</p>
                      <p className="text-[11px] font-mono text-slate-400">${up.price}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => addToCart(up, {}, 1, false)}
                      className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-[#ff5b36] hover:text-white text-slate-300 text-[10px] font-bold transition-colors"
                    >
                      + Add
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT: ORDER SUMMARY CARD */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-3xl bg-[#121622] border border-white/10 space-y-6 sticky top-24">
            <h3 className="font-display font-black text-xl text-white">Order Summary</h3>

            {/* Coupon Code Input */}
            <div>
              {appliedCoupon ? (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-emerald-400" />
                    <span>
                      Code <strong>{appliedCoupon.code}</strong> applied (-${cartDiscount})
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={removeCoupon}
                    className="text-xs text-rose-400 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponCodeInput}
                    onChange={(e) => setCouponCodeInput(e.target.value)}
                    placeholder="Coupon code (e.g. KROMA15)"
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#ff5b36]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}
            </div>

            {/* Shipping Method Selector */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Delivery Option
              </span>
              <div className="space-y-2 text-xs">
                <label
                  className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                    shippingMethod === 'standard'
                      ? 'border-[#ff5b36] bg-[#ff5b36]/10 text-white'
                      : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="shipping"
                      checked={shippingMethod === 'standard'}
                      onChange={() => setShippingMethod('standard')}
                      className="text-[#ff5b36] focus:ring-0"
                    />
                    <span>Standard Express (3–5 Days)</span>
                  </div>
                  <span className="font-mono font-bold">
                    {cartSubtotal >= freeShippingThreshold ? 'FREE' : '$5.95'}
                  </span>
                </label>

                <label
                  className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                    shippingMethod === 'express'
                      ? 'border-[#ff5b36] bg-[#ff5b36]/10 text-white'
                      : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="shipping"
                      checked={shippingMethod === 'express'}
                      onChange={() => setShippingMethod('express')}
                      className="text-[#ff5b36] focus:ring-0"
                    />
                    <span>Priority Air (1–2 Days)</span>
                  </div>
                  <span className="font-mono font-bold">$12.95</span>
                </label>
              </div>
            </div>

            {/* Price Calculations */}
            <div className="space-y-2.5 pt-4 border-t border-white/10 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Items Subtotal</span>
                <span className="font-mono font-bold text-white">${cartSubtotal.toFixed(2)}</span>
              </div>

              {cartDiscount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Discount Applied</span>
                  <span className="font-mono font-bold">-${cartDiscount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-300">
                <span>Estimated Shipping</span>
                <span className="font-mono font-bold text-white">
                  {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
                </span>
              </div>

              <div className="flex justify-between text-slate-300">
                <span>Estimated Taxes (Included)</span>
                <span className="font-mono text-slate-400">$0.00</span>
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-between items-baseline">
                <span className="font-display font-bold text-base text-white">Estimated Total</span>
                <span className="font-display font-black text-2xl text-white">
                  ${finalOrderTotal.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Checkout Action */}
            <button
              type="button"
              onClick={() => navigateTo('checkout')}
              className="w-full py-4 px-6 rounded-2xl bg-[#ff5b36] hover:bg-[#f04f29] text-white font-bold text-sm shadow-xl shadow-[#ff5b36]/25 transition-all flex items-center justify-center gap-2 active:scale-98"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Security Guarantee Badges */}
            <div className="pt-2 flex items-center justify-center gap-4 text-[11px] text-slate-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>256-Bit SSL Secured</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#ff5b36]" />
                <span>Tracked Dispatch</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
