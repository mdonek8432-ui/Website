import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  Package,
  User,
  MapPin,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Clock
} from 'lucide-react';

export const AccountView: React.FC = () => {
  const { user, orders, products, navigateTo, addToCart } = useStore();
  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'rewards' | 'settings'>('orders');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Account Profile Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#121622] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#ff5b36] to-[#2656d6] flex items-center justify-center text-white font-display font-black text-2xl shadow-xl">
            {user.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display font-black text-2xl text-white">{user.name}</h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#ff5b36]/20 text-[#ff5b36] border border-[#ff5b36]/30 uppercase tracking-wider">
                {user.membershipTier} Member
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">{user.email}</p>
          </div>
        </div>

        {/* Member Perks Highlight */}
        <div className="flex items-center gap-6 text-xs bg-black/40 px-5 py-3 rounded-2xl border border-white/5">
          <div>
            <span className="text-slate-400 text-[10px] uppercase font-bold block">Studio Points</span>
            <span className="font-display font-black text-lg text-white">480 pts</span>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div>
            <span className="text-slate-400 text-[10px] uppercase font-bold block">Orders Placed</span>
            <span className="font-display font-black text-lg text-white">{orders.length}</span>
          </div>
        </div>
      </div>

      {/* Account Navigation Tabs */}
      <div className="flex gap-2 border-b border-white/10 pb-3 overflow-x-auto">
        {[
          { id: 'orders', label: `My Orders (${orders.length})`, icon: Package },
          { id: 'addresses', label: 'Saved Addresses', icon: MapPin },
          { id: 'rewards', label: 'VIP Perks & Rewards', icon: Sparkles },
          { id: 'settings', label: 'Account Preferences', icon: User }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-[#ff5b36] text-white shadow-lg shadow-[#ff5b36]/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: ORDER HISTORY */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-[#121622] border border-white/10 space-y-3">
              <Package className="w-10 h-10 text-slate-500 mx-auto" />
              <h3 className="text-base font-bold text-white">No orders yet</h3>
              <p className="text-xs text-slate-400">
                You haven't placed any orders with KROMA Studio yet.
              </p>
              <button
                type="button"
                onClick={() => navigateTo('shop', { category: 'all' })}
                className="px-6 py-2.5 rounded-xl bg-[#ff5b36] text-white text-xs font-bold"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            orders.map((ord) => (
              <div
                key={ord.id}
                className="rounded-3xl bg-[#121622] border border-white/10 overflow-hidden space-y-4 p-6"
              >
                {/* Order Top Summary */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/5">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-white text-sm">{ord.id}</span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          ord.status === 'Delivered'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'bg-amber-400/20 text-amber-300'
                        }`}
                      >
                        {ord.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">
                      Placed on {ord.date} • Carrier: DHL Express (#{ord.trackingNumber})
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-display font-black text-white text-lg">
                      ${ord.total.toFixed(2)}
                    </span>
                    <button
                      type="button"
                      onClick={() => navigateTo('order-confirmation', { orderId: ord.id })}
                      className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-semibold flex items-center gap-1 transition-colors"
                    >
                      <span>Receipt</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Ordered Items Preview */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {ord.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.02] border border-white/5"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-14 object-cover rounded-xl shrink-0 bg-black"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-white truncate">{item.name}</p>
                        <p className="text-[11px] text-slate-400">
                          Qty: {item.quantity} • ${item.unitPrice}
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            const matchedProduct = products.find((p) => p.id === item.productId);
                            if (matchedProduct) {
                              addToCart(
                                matchedProduct,
                                {
                                  size: item.selectedSize,
                                  color: item.selectedColor,
                                  flavor: item.selectedFlavor,
                                  pack: item.selectedPack
                                },
                                1,
                                true
                              );
                            }
                          }}
                          className="text-[10px] text-[#ff5b36] hover:underline font-bold mt-1 block"
                        >
                          Buy Again
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB 2: SAVED ADDRESSES */}
      {activeTab === 'addresses' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl bg-[#121622] border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Default Shipping Address
              </span>
              <span className="text-[10px] font-bold bg-[#ff5b36]/20 text-[#ff5b36] px-2 py-0.5 rounded-full">
                Primary
              </span>
            </div>
            <div className="text-xs text-slate-300 space-y-1 pt-2">
              <p className="font-bold text-white">Alex Turner</p>
              <p>742 Evergreen Studio St, Apt 4B</p>
              <p>Brooklyn, NY 11201</p>
              <p>United States</p>
              <p className="text-slate-400 pt-1">+1 (555) 382-9912</p>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-[#121622] border border-dashed border-white/20 flex flex-col items-center justify-center text-center space-y-2 py-10 cursor-pointer hover:bg-white/[0.02] transition-colors">
            <MapPin className="w-6 h-6 text-slate-400" />
            <p className="text-xs font-bold text-white">Add A New Delivery Address</p>
            <p className="text-[11px] text-slate-500">Save an office, studio, or secondary residence</p>
          </div>
        </div>
      )}

      {/* TAB 3: VIP PERKS */}
      {activeTab === 'rewards' && (
        <div className="p-8 rounded-3xl bg-[#121622] border border-white/10 space-y-6">
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-amber-400" />
            <h3 className="font-display font-black text-xl text-white">
              KROMA Sensory Circle Perks
            </h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed max-w-xl">
            As a <strong>Black Tier Member</strong>, you earn 10 points per dollar spent, enjoy
            complimentary express worldwide shipping, and receive priority invitations to private
            batch drops 2 hours before general public release.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10">
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
              <p className="text-xs font-bold text-white">VIP Promo Code</p>
              <p className="font-mono text-sm font-bold text-[#ff5b36]">KROMA15</p>
              <p className="text-[10px] text-slate-400">15% off any seasonal drop</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
              <p className="text-xs font-bold text-white">Free Air Dispatch</p>
              <p className="font-mono text-sm font-bold text-emerald-400">FREESHIP</p>
              <p className="text-[10px] text-slate-400">No minimum basket requirement</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
              <p className="text-xs font-bold text-white">Next Tier</p>
              <p className="text-sm font-bold text-white">Diamond Studio</p>
              <p className="text-[10px] text-slate-400">20 more points to unlock bespoke tailoring</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: PREFERENCES */}
      {activeTab === 'settings' && (
        <div className="p-6 rounded-3xl bg-[#121622] border border-white/10 space-y-6 max-w-2xl">
          <h3 className="font-display font-bold text-base text-white">Notification Preferences</h3>
          <div className="space-y-4 text-xs">
            <label className="flex items-center justify-between p-3 rounded-xl bg-white/5 cursor-pointer">
              <div>
                <p className="font-bold text-white">Drop Alerts & Capsule Launches</p>
                <p className="text-slate-400 text-[11px]">Receive early notifications for limited apparel batches</p>
              </div>
              <input type="checkbox" defaultChecked className="accent-[#ff5b36] w-4 h-4" />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-white/5 cursor-pointer">
              <div>
                <p className="font-bold text-white">Real-Time SMS Delivery Tracking</p>
                <p className="text-slate-400 text-[11px]">Get text updates when your parcel is out for delivery</p>
              </div>
              <input type="checkbox" defaultChecked className="accent-[#ff5b36] w-4 h-4" />
            </label>
          </div>
        </div>
      )}
    </div>
  );
};
