import React from 'react';
import { useStore } from '../context/StoreContext';
import {
  CheckCircle2,
  Package,
  Truck,
  MapPin,
  CreditCard,
  Download,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

export const OrderConfirmationView: React.FC = () => {
  const { orders, selectedOrderId, navigateTo } = useStore();

  const order =
    orders.find((o) => o.id === selectedOrderId) || orders[0];

  if (!order) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">No Order Found</h2>
        <button
          onClick={() => navigateTo('home')}
          className="px-6 py-2.5 rounded-xl bg-[#ff5b36] text-white text-xs font-bold"
        >
          Return Home
        </button>
      </div>
    );
  }

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-10">
      {/* Success Hero Header */}
      <div className="text-center space-y-4">
        <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <span className="text-[11px] uppercase font-mono tracking-widest text-[#ff5b36] font-bold">
          Studio Order Confirmed
        </span>
        <h1 className="font-display font-black text-3xl sm:text-4xl text-white">
          Thank you, {order.customer.fullName}!
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
          We've received your order and our fulfillment studio is preparing your pieces. A
          confirmation email and live tracking updates have been sent to{' '}
          <strong className="text-white">{order.customer.email}</strong>.
        </p>
      </div>

      {/* Order Status & Tracking Banner */}
      <div className="p-6 rounded-3xl bg-[#121622] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <span className="font-mono text-xs text-slate-400">Order ID:</span>
            <span className="font-mono font-bold text-white text-sm">{order.id}</span>
          </div>
          <p className="text-xs text-slate-400">
            Placed on {order.date} • Estimated Delivery: {order.estimatedDelivery}
          </p>
          <div className="flex items-center gap-2 pt-1 text-xs text-emerald-400">
            <Truck className="w-4 h-4" />
            <span>Carrier: DHL Express (Tracking #{order.trackingNumber})</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrintReceipt}
            className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Invoice</span>
          </button>
          <button
            type="button"
            onClick={() => navigateTo('account')}
            className="px-4 py-2.5 rounded-xl bg-[#ff5b36] hover:bg-[#f04f29] text-white text-xs font-bold transition-colors"
          >
            Track in Account
          </button>
        </div>
      </div>

      {/* Order Details & Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Destination & Delivery Info */}
        <div className="p-6 rounded-3xl bg-[#121622] border border-white/10 space-y-4">
          <h3 className="font-display font-bold text-sm text-white flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#ff5b36]" />
            Delivery Destination
          </h3>
          <div className="text-xs text-slate-300 space-y-1">
            <p className="font-bold text-white">{order.customer.fullName}</p>
            <p>{order.customer.address}</p>
            <p>
              {order.customer.city}
              {order.customer.state ? `, ${order.customer.state}` : ''}{' '}
              {order.customer.postalCode}
            </p>
            <p>{order.customer.country}</p>
            <p className="text-slate-500 pt-1">Tel: {order.customer.phone}</p>
          </div>
        </div>

        {/* Payment & Shipping Speed */}
        <div className="p-6 rounded-3xl bg-[#121622] border border-white/10 space-y-4">
          <h3 className="font-display font-bold text-sm text-white flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-[#2656d6]" />
            Payment & Method
          </h3>
          <div className="text-xs text-slate-300 space-y-2">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">
                Payment Type:
              </span>
              <span className="font-semibold text-white capitalize">
                {order.paymentMethod.replace('_', ' ')}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">
                Shipping Carrier Speed:
              </span>
              <span className="font-semibold text-white capitalize">
                {order.shippingMethod}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Ordered Items Table */}
      <div className="rounded-3xl bg-[#121622] border border-white/10 overflow-hidden">
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <h3 className="font-display font-bold text-sm text-white flex items-center gap-2">
            <Package className="w-4 h-4 text-[#ff5b36]" />
            Items in Order ({order.items.length})
          </h3>
        </div>

        <div className="divide-y divide-white/5">
          {order.items.map((item) => (
            <div key={item.id} className="p-4 sm:p-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 min-w-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-18 rounded-xl object-cover bg-black border border-white/10 shrink-0"
                />
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    {[
                      item.selectedSize,
                      item.selectedColor,
                      item.selectedFlavor,
                      item.selectedPack
                    ]
                      .filter(Boolean)
                      .join(' • ')}
                  </p>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    Qty: {item.quantity} × ${item.unitPrice}
                  </p>
                </div>
              </div>

              <span className="font-mono font-bold text-white text-sm">
                ${(item.unitPrice * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        {/* Order Totals */}
        <div className="p-6 bg-black/40 border-t border-white/10 space-y-2 text-xs">
          <div className="flex justify-between text-slate-300">
            <span>Subtotal</span>
            <span className="font-mono font-bold text-white">${order.subtotal.toFixed(2)}</span>
          </div>
          {order.discountAmount > 0 && (
            <div className="flex justify-between text-emerald-400">
              <span>Discount</span>
              <span className="font-mono font-bold">-${order.discountAmount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between text-slate-300">
            <span>Shipping</span>
            <span className="font-mono font-bold text-white">
              {order.shippingCost === 0 ? 'FREE' : `$${order.shippingCost.toFixed(2)}`}
            </span>
          </div>
          <div className="pt-3 border-t border-white/10 flex justify-between items-baseline">
            <span className="font-display font-bold text-base text-white">Total Paid</span>
            <span className="font-display font-black text-2xl text-white">
              ${order.total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Action to continue shopping */}
      <div className="text-center pt-4">
        <button
          type="button"
          onClick={() => navigateTo('shop', { category: 'all' })}
          className="px-8 py-3.5 rounded-2xl bg-white text-slate-900 font-bold text-xs hover:bg-[#ff5b36] hover:text-white transition-all shadow-lg inline-flex items-center gap-2"
        >
          <span>Continue Shopping Studio Pieces</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
