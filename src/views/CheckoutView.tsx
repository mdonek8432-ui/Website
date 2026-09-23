import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  ShieldCheck,
  Lock,
  Truck,
  CreditCard,
  DollarSign,
  ArrowRight,
  CheckCircle2,
  Tag,
  AlertCircle
} from 'lucide-react';

export type PaymentMethod = 'credit_card' | 'paypal' | 'apple_pay' | 'cod' | 'cash_on_delivery';

export const CheckoutView: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    cartDiscount,
    cartTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    createOrder,
    navigateTo
  } = useStore();

  // Contact & Address form states
  const [email, setEmail] = useState('alex.turner@example.com');
  const [firstName, setFirstName] = useState('Alex');
  const [lastName, setLastName] = useState('Turner');
  const [street, setStreet] = useState('742 Evergreen Studio St');
  const [apartment, setApartment] = useState('Apt 4B');
  const [city, setCity] = useState('Brooklyn');
  const [state, setState] = useState('NY');
  const [postalCode, setPostalCode] = useState('11201');
  const [country, setCountry] = useState('United States');
  const [phone, setPhone] = useState('+1 (555) 382-9912');
  const [orderNotes, setOrderNotes] = useState('');

  // Shipping & Payment selection
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('credit_card');

  // Credit Card details
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('883');
  const [cardHolder, setCardHolder] = useState('Alex Turner');

  // Coupon state
  const [couponCodeInput, setCouponCodeInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const freeShippingThreshold = 75;
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

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setIsProcessing(true);

    setTimeout(() => {
      const order = createOrder({
        customer: {
          fullName: `${firstName} ${lastName}`.trim(),
          email,
          phone,
          address: apartment ? `${street}, ${apartment}` : street,
          city,
          state,
          postalCode,
          country
        },
        shippingMethod: shippingMethod === 'express' ? 'Express Tracked Dispatch' : 'Standard Carbon-Neutral',
        shippingCost,
        paymentMethod
      });

      setIsProcessing(false);
      navigateTo('order-confirmation', { orderId: order.id });
    }, 1200);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">No items in checkout</h2>
        <p className="text-xs text-slate-400">
          Your shopping bag is empty. Please select products before proceeding to checkout.
        </p>
        <button
          type="button"
          onClick={() => navigateTo('shop', { category: 'all' })}
          className="px-6 py-3 rounded-xl bg-[#ff5b36] text-white font-bold text-xs"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-white/10">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#ff5b36]">
            Secure 256-Bit SSL Checkout
          </span>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-white mt-1">
            Express Checkout
          </h1>
        </div>
        <div className="flex items-center gap-2 text-xs text-emerald-400">
          <Lock className="w-4 h-4" />
          <span>Encrypted Gateway</span>
        </div>
      </div>

      <form onSubmit={handleSubmitOrder}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* LEFT: CUSTOMER, ADDRESS & PAYMENT FORM */}
          <div className="lg:col-span-7 space-y-8">
            {/* Express Payment Accelerators */}
            <div className="p-6 rounded-3xl bg-[#121622] border border-white/10 space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block text-center">
                Instant One-Tap Express Checkout
              </span>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('apple_pay')}
                  className="py-3 px-4 rounded-xl bg-white text-black font-bold text-xs hover:bg-slate-200 transition-colors flex items-center justify-center gap-1.5"
                >
                  Pay
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('paypal')}
                  className="py-3 px-4 rounded-xl bg-[#ffc439] text-[#003087] font-black text-xs hover:brightness-105 transition-all"
                >
                  PayPal
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('credit_card')}
                  className="py-3 px-4 rounded-xl bg-white/10 text-white font-bold text-xs hover:bg-white/20 transition-colors"
                >
                  G Pay
                </button>
              </div>
            </div>

            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-white/10"></div>
              <span className="flex-shrink mx-4 text-[11px] font-mono uppercase tracking-wider text-slate-500">
                Or Continue With Shipping Address
              </span>
              <div className="flex-grow border-t border-white/10"></div>
            </div>

            {/* 1. Contact Info */}
            <div className="p-6 rounded-3xl bg-[#121622] border border-white/10 space-y-4">
              <h3 className="font-display font-bold text-base text-white">1. Contact Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-300 font-medium block mb-1">
                    Email Address (for order tracking)
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#ff5b36]"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-300 font-medium block mb-1">
                    Phone Number (for courier SMS)
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#ff5b36]"
                  />
                </div>
              </div>
            </div>

            {/* 2. Shipping Address */}
            <div className="p-6 rounded-3xl bg-[#121622] border border-white/10 space-y-4">
              <h3 className="font-display font-bold text-base text-white">2. Shipping Destination</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-300 font-medium block mb-1">First Name</label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#ff5b36]"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-300 font-medium block mb-1">Last Name</label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#ff5b36]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs text-slate-300 font-medium block mb-1">
                    Street Address
                  </label>
                  <input
                    type="text"
                    required
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#ff5b36]"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-300 font-medium block mb-1">
                    Apartment / Suite (Optional)
                  </label>
                  <input
                    type="text"
                    value={apartment}
                    onChange={(e) => setApartment(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#ff5b36]"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-300 font-medium block mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#ff5b36]"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-300 font-medium block mb-1">
                    State / Region
                  </label>
                  <input
                    type="text"
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#ff5b36]"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-300 font-medium block mb-1">
                    Postal / Zip Code
                  </label>
                  <input
                    type="text"
                    required
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#ff5b36]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs text-slate-300 font-medium block mb-1">Country</label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full bg-[#171c2a] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#ff5b36]"
                  >
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                    <option value="Germany">Germany</option>
                    <option value="Japan">Japan</option>
                    <option value="France">France</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 3. Shipping Options */}
            <div className="p-6 rounded-3xl bg-[#121622] border border-white/10 space-y-3">
              <h3 className="font-display font-bold text-base text-white">3. Shipping Speed</h3>
              <div className="space-y-2 text-xs">
                <label
                  className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    shippingMethod === 'standard'
                      ? 'border-[#ff5b36] bg-[#ff5b36]/10 text-white'
                      : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shipping"
                      checked={shippingMethod === 'standard'}
                      onChange={() => setShippingMethod('standard')}
                      className="text-[#ff5b36] focus:ring-0"
                    />
                    <div>
                      <p className="font-bold">Standard Tracked Express</p>
                      <p className="text-[11px] text-slate-400">Delivered within 3–5 business days</p>
                    </div>
                  </div>
                  <span className="font-mono font-bold">
                    {cartSubtotal >= freeShippingThreshold ? 'FREE' : '$5.95'}
                  </span>
                </label>

                <label
                  className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    shippingMethod === 'express'
                      ? 'border-[#ff5b36] bg-[#ff5b36]/10 text-white'
                      : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shipping"
                      checked={shippingMethod === 'express'}
                      onChange={() => setShippingMethod('express')}
                      className="text-[#ff5b36] focus:ring-0"
                    />
                    <div>
                      <p className="font-bold">Priority Air Courier</p>
                      <p className="text-[11px] text-slate-400">Guaranteed within 1–2 business days</p>
                    </div>
                  </div>
                  <span className="font-mono font-bold">$12.95</span>
                </label>
              </div>
            </div>

            {/* 4. Payment Selection */}
            <div className="p-6 rounded-3xl bg-[#121622] border border-white/10 space-y-4">
              <h3 className="font-display font-bold text-base text-white">4. Payment Gateway</h3>

              <div className="space-y-3">
                {/* Option 1: Credit Card */}
                <div
                  className={`rounded-2xl border transition-all ${
                    paymentMethod === 'credit_card'
                      ? 'border-[#ff5b36] bg-[#171c2a]'
                      : 'border-white/10 bg-white/5'
                  }`}
                >
                  <label className="flex items-center justify-between p-4 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'credit_card'}
                        onChange={() => setPaymentMethod('credit_card')}
                        className="text-[#ff5b36] focus:ring-0"
                      />
                      <span className="font-bold text-xs text-white">Credit / Debit Card</span>
                    </div>
                    <div className="flex gap-1.5 text-[10px] font-mono text-slate-400">
                      <span>VISA</span>
                      <span>MC</span>
                      <span>AMEX</span>
                    </div>
                  </label>

                  {paymentMethod === 'credit_card' && (
                    <div className="p-4 pt-0 border-t border-white/5 space-y-3 text-xs">
                      <div>
                        <label className="text-slate-400 block mb-1">Card Number</label>
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2 text-white font-mono text-xs focus:outline-none focus:border-[#ff5b36]"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-slate-400 block mb-1">Expiration (MM/YY)</label>
                          <input
                            type="text"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2 text-white font-mono text-xs focus:outline-none focus:border-[#ff5b36]"
                          />
                        </div>
                        <div>
                          <label className="text-slate-400 block mb-1">Security Code (CVC)</label>
                          <input
                            type="text"
                            value={cardCvc}
                            onChange={(e) => setCardCvc(e.target.value)}
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2 text-white font-mono text-xs focus:outline-none focus:border-[#ff5b36]"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-slate-400 block mb-1">Cardholder Name</label>
                        <input
                          type="text"
                          value={cardHolder}
                          onChange={(e) => setCardHolder(e.target.value)}
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2 text-white text-xs focus:outline-none focus:border-[#ff5b36]"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Option 2: Cash On Delivery */}
                <div
                  className={`rounded-2xl border transition-all ${
                    paymentMethod === 'cash_on_delivery'
                      ? 'border-[#ff5b36] bg-[#171c2a]'
                      : 'border-white/10 bg-white/5'
                  }`}
                >
                  <label className="flex items-center justify-between p-4 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'cash_on_delivery'}
                        onChange={() => setPaymentMethod('cash_on_delivery')}
                        className="text-[#ff5b36] focus:ring-0"
                      />
                      <div>
                        <span className="font-bold text-xs text-white block">
                          Cash on Delivery (COD)
                        </span>
                        <span className="text-[11px] text-slate-400">
                          Pay directly in cash upon receiving your package at your doorstep
                        </span>
                      </div>
                    </div>
                    <DollarSign className="w-4 h-4 text-emerald-400" />
                  </label>
                </div>
              </div>
            </div>

            {/* Order Notes */}
            <div className="p-6 rounded-3xl bg-[#121622] border border-white/10 space-y-2">
              <label className="text-xs text-slate-300 font-bold block">
                Special Delivery Instructions or Gift Notes (Optional)
              </label>
              <textarea
                rows={2}
                value={orderNotes}
                onChange={(e) => setOrderNotes(e.target.value)}
                placeholder="e.g. Leave with building doorman or include a handwritten gift card."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#ff5b36]"
              />
            </div>
          </div>

          {/* RIGHT: STICKY ORDER SUMMARY */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-3xl bg-[#121622] border border-white/10 space-y-6 sticky top-24">
              <h3 className="font-display font-black text-xl text-white">
                Bag Summary ({cart.length} unique items)
              </h3>

              {/* Items Preview */}
              <div className="divide-y divide-white/5 max-h-60 overflow-y-auto space-y-3">
                {cart.map((item) => (
                  <div key={item.id} className="pt-3 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-14 object-cover rounded-lg bg-black border border-white/10"
                        />
                        <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#ff5b36] text-white text-[10px] font-bold flex items-center justify-center">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-white truncate max-w-[170px]">
                          {item.name}
                        </p>
                        <p className="text-[10px] text-slate-400 truncate">
                          {[
                            item.selectedSize,
                            item.selectedColor,
                            item.selectedFlavor,
                            item.selectedPack
                          ]
                            .filter(Boolean)
                            .join(' • ')}
                        </p>
                      </div>
                    </div>
                    <span className="font-mono font-bold text-white">
                      ${(item.unitPrice * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Coupon Code Input */}
              <div className="pt-3 border-t border-white/10">
                {appliedCoupon ? (
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-emerald-400" />
                      <span>
                        Promo <strong>{appliedCoupon.code}</strong> (-${cartDiscount})
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
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCodeInput}
                      onChange={(e) => setCouponCodeInput(e.target.value)}
                      placeholder="Promo code (e.g. KROMA15)"
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#ff5b36]"
                    />
                    <button
                      type="button"
                      onClick={handleApplyCoupon}
                      className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs"
                    >
                      Apply
                    </button>
                  </div>
                )}
              </div>

              {/* Cost Calculations */}
              <div className="space-y-2 pt-3 border-t border-white/10 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Subtotal</span>
                  <span className="font-mono font-bold text-white">${cartSubtotal.toFixed(2)}</span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount</span>
                    <span className="font-mono font-bold">-${cartDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-300">
                  <span>Shipping</span>
                  <span className="font-mono font-bold text-white">
                    {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="pt-3 border-t border-white/10 flex justify-between items-baseline">
                  <span className="font-display font-bold text-base text-white">Total Due</span>
                  <span className="font-display font-black text-2xl text-white">
                    ${finalOrderTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Place Order CTA */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 px-6 rounded-2xl bg-[#ff5b36] hover:bg-[#f04f29] disabled:opacity-50 text-white font-bold text-sm shadow-xl shadow-[#ff5b36]/25 transition-all flex items-center justify-center gap-2 active:scale-98"
              >
                {isProcessing ? (
                  <span>Securing Order & Discarding Cart...</span>
                ) : (
                  <>
                    <span>Place Order • ${finalOrderTotal.toFixed(2)}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Trust Callouts */}
              <div className="pt-2 text-[11px] text-slate-400 text-center space-y-1">
                <p className="flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>30-Day Risk Free Studio Guarantee</span>
                </p>
                <p>Tax invoice and tracking link sent immediately upon order placement.</p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
