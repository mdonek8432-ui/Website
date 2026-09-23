import React from 'react';
import { useStore } from '../context/StoreContext';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Truck
} from 'lucide-react';

export const MiniCart: React.FC = () => {
  const {
    cart,
    isMiniCartOpen,
    setIsMiniCartOpen,
    updateCartQuantity,
    removeFromCart,
    cartCount,
    cartSubtotal,
    freeShippingThreshold,
    amountNeededForFreeShipping,
    navigateTo
  } = useStore();

  if (!isMiniCartOpen) return null;

  const freeShippingProgress = Math.min(
    100,
    Math.round((cartSubtotal / freeShippingThreshold) * 100)
  );

  const handleCheckoutClick = () => {
    setIsMiniCartOpen(false);
    navigateTo('checkout');
  };

  const handleViewBagClick = () => {
    setIsMiniCartOpen(false);
    navigateTo('cart');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-300">
      {/* Backdrop */}
      <div
        onClick={() => setIsMiniCartOpen(false)}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0f121a] border-l border-white/10 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#ff5b36]" />
              <h2 className="font-display font-bold text-lg text-white">Your Bag</h2>
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-white/10 text-slate-300">
                {cartCount}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setIsMiniCartOpen(false)}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
              aria-label="Close bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Meter */}
          <div className="bg-[#141824] px-6 py-3.5 border-b border-white/5">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="flex items-center gap-1.5 font-medium text-slate-200">
                <Truck className="w-3.5 h-3.5 text-[#ff5b36]" />
                {amountNeededForFreeShipping === 0 ? (
                  <span className="text-emerald-400 font-bold">
                    You unlocked Free Express Shipping!
                  </span>
                ) : (
                  <span>
                    Add <strong className="text-white">${amountNeededForFreeShipping.toFixed(2)}</strong> for Free Shipping
                  </span>
                )}
              </span>
              <span className="font-mono text-slate-400">{freeShippingProgress}%</span>
            </div>
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 rounded-full ${
                  freeShippingProgress >= 100
                    ? 'bg-emerald-400'
                    : 'bg-gradient-to-r from-[#ff5b36] to-[#2656d6]'
                }`}
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 divide-y divide-white/5">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-slate-500 mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-display font-bold text-base text-white">Your bag is empty</h3>
                <p className="text-xs text-slate-400 max-w-xs mt-1 mb-6">
                  Explore our collection of architectural bags, heavyweight tees, corduroy caps, and sensory flavor drops.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsMiniCartOpen(false);
                    navigateTo('shop');
                  }}
                  className="px-6 py-2.5 rounded-xl bg-white text-slate-900 hover:bg-[#ff5b36] hover:text-white text-xs font-bold transition-all shadow-md"
                >
                  Start Exploring
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="pt-4 first:pt-0 flex gap-4">
                  {/* Thumbnail */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-24 object-cover rounded-xl bg-black/40 border border-white/10 shrink-0"
                  />

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-bold text-slate-100 line-clamp-1">
                          {item.name}
                        </h4>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Variation tags */}
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {item.selectedSize && (
                          <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/5">
                            Size: {item.selectedSize}
                          </span>
                        )}
                        {item.selectedColor && (
                          <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/5">
                            Color: {item.selectedColor}
                          </span>
                        )}
                        {item.selectedFlavor && (
                          <span className="text-[10px] px-2 py-0.5 rounded bg-amber-400/10 text-amber-300 border border-amber-400/20">
                            {item.selectedFlavor}
                          </span>
                        )}
                        {item.selectedPack && (
                          <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/5">
                            {item.selectedPack}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-white/10 rounded-lg bg-black/40">
                        <button
                          type="button"
                          onClick={() => updateCartQuantity(item.id, -1)}
                          className="p-1.5 text-slate-400 hover:text-white transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold font-mono text-white">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateCartQuantity(item.id, 1)}
                          className="p-1.5 text-slate-400 hover:text-white transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Total */}
                      <div className="text-right">
                        <span className="text-sm font-black text-white font-display">
                          ${(item.unitPrice * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer with Checkout Actions */}
          {cart.length > 0 && (
            <div className="p-6 bg-[#121622] border-t border-white/10 space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Subtotal</span>
                  <span className="font-mono text-white font-bold">
                    ${cartSubtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Shipping</span>
                  <span>
                    {amountNeededForFreeShipping === 0 ? (
                      <strong className="text-emerald-400">FREE</strong>
                    ) : (
                      'Calculated at checkout'
                    )}
                  </span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  onClick={handleCheckoutClick}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#ff5b36] to-[#ff784b] hover:from-[#f04f29] hover:to-[#f06e40] text-white font-bold text-sm shadow-xl shadow-[#ff5b36]/25 transition-all flex items-center justify-center gap-2 group active:scale-98"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  type="button"
                  onClick={handleViewBagClick}
                  className="w-full py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 text-xs font-semibold transition-colors flex items-center justify-center"
                >
                  View Full Bag & Apply Coupon
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>256-Bit SSL Encrypted & 30-Day Guaranteed Returns</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
