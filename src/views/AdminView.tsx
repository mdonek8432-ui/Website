import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  DollarSign,
  Package,
  TrendingUp,
  Tag,
  Plus,
  Trash2,
  CheckCircle2,
  Truck,
  RotateCcw,
  ShoppingBag,
  Clock
} from 'lucide-react';
import { Coupon } from '../types';

export const AdminView: React.FC = () => {
  const {
    products,
    updateProductStock,
    orders,
    updateOrderStatus,
    coupons,
    addCoupon,
    deleteCoupon,
    resetData,
    showNotification
  } = useStore();

  const [activeSection, setActiveSection] = useState<'overview' | 'products' | 'orders' | 'coupons'>('overview');

  // New Coupon Form
  const [newCode, setNewCode] = useState('');
  const [newDiscountType, setNewDiscountType] = useState<'percentage' | 'fixed'>('percentage');
  const [newAmount, setNewAmount] = useState(15);
  const [newMinSpend, setNewMinSpend] = useState(0);

  // Business metrics calculation
  const totalRevenue = orders.reduce((acc, o) => acc + o.total, 0);
  const averageOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0;
  const lowStockCount = products.filter((p) => p.stock < 10).length;

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode.trim()) return;

    const coupon: Coupon = {
      code: newCode.trim().toUpperCase(),
      discountType: newDiscountType,
      value: newAmount,
      minSpend: newMinSpend > 0 ? newMinSpend : undefined,
      description: `${newDiscountType === 'percentage' ? `${newAmount}% off` : `$${newAmount} off`} studio promotion`,
      isActive: true
    };

    addCoupon(coupon);
    setNewCode('');
    setNewAmount(15);
    setNewMinSpend(0);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#ff5b36] font-bold">
            Studio Backoffice
          </span>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-white mt-0.5">
            Store Management Console
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              if (window.confirm('Reset all store data to clean studio defaults?')) {
                resetData();
              }
            }}
            className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-semibold border border-white/10 transition-colors"
          >
            Reset Demo Data
          </button>
        </div>
      </div>

      {/* KPI METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-[#121622] border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Gross Revenue</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="font-display font-black text-2xl text-white">${totalRevenue.toFixed(2)}</p>
          <span className="text-[10px] text-emerald-400 font-semibold">+18.4% vs last cycle</span>
        </div>

        <div className="p-5 rounded-3xl bg-[#121622] border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Total Orders</span>
            <ShoppingBag className="w-4 h-4 text-[#ff5b36]" />
          </div>
          <p className="font-display font-black text-2xl text-white">{orders.length}</p>
          <span className="text-[10px] text-slate-400 font-semibold">Processed live</span>
        </div>

        <div className="p-5 rounded-3xl bg-[#121622] border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Average Order (AOV)</span>
            <TrendingUp className="w-4 h-4 text-[#2656d6]" />
          </div>
          <p className="font-display font-black text-2xl text-white">
            ${averageOrderValue.toFixed(2)}
          </p>
          <span className="text-[10px] text-slate-400 font-semibold">Per checkout session</span>
        </div>

        <div className="p-5 rounded-3xl bg-[#121622] border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Active Catalog</span>
            <Package className="w-4 h-4 text-amber-400" />
          </div>
          <p className="font-display font-black text-2xl text-white">{products.length} Items</p>
          <span className="text-[10px] text-amber-400 font-semibold">
            {lowStockCount} items low in stock
          </span>
        </div>
      </div>

      {/* Nav Tabs */}
      <div className="flex gap-2 border-b border-white/10 pb-3">
        {[
          { id: 'overview', label: 'Order Fulfillment' },
          { id: 'products', label: 'Catalog Inventory' },
          { id: 'coupons', label: 'Marketing Promo Codes' }
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveSection(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSection === tab.id
                ? 'bg-[#ff5b36] text-white shadow-lg shadow-[#ff5b36]/20'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* SECTION 1: ORDERS FULFILLMENT */}
      {activeSection === 'overview' && (
        <div className="rounded-3xl bg-[#121622] border border-white/10 overflow-hidden">
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <h3 className="font-display font-bold text-sm text-white">
              Customer Orders Queue ({orders.length})
            </h3>
          </div>

          <div className="divide-y divide-white/5 overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 font-mono">
                  <th className="py-3 px-4">Order ID</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Items</th>
                  <th className="py-3 px-4">Total</th>
                  <th className="py-3 px-4">Payment</th>
                  <th className="py-3 px-4">Fulfillment Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-200">
                {orders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-white/[0.02]">
                    <td className="py-3 px-4 font-mono font-bold text-white">{ord.id}</td>
                    <td className="py-3 px-4 font-semibold text-white">
                      {ord.customer.fullName}
                    </td>
                    <td className="py-3 px-4 text-slate-400">{ord.date}</td>
                    <td className="py-3 px-4 text-slate-300">
                      {ord.items.reduce((acc, i) => acc + i.quantity, 0)} pcs
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-white">
                      ${ord.total.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 capitalize text-slate-400">
                      {ord.paymentMethod.replace('_', ' ')}
                    </td>
                    <td className="py-3 px-4">
                      <select
                        value={ord.status}
                        onChange={(e) => updateOrderStatus(ord.id, e.target.value as any)}
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border focus:outline-none ${
                          ord.status === 'Delivered'
                            ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                            : ord.status === 'Shipped'
                            ? 'bg-[#2656d6]/20 text-blue-300 border-[#2656d6]/30'
                            : 'bg-amber-400/20 text-amber-300 border-amber-400/30'
                        }`}
                      >
                        <option value="Processing" className="bg-[#121622] text-white">
                          Processing
                        </option>
                        <option value="Shipped" className="bg-[#121622] text-white">
                          Shipped
                        </option>
                        <option value="Delivered" className="bg-[#121622] text-white">
                          Delivered
                        </option>
                        <option value="Cancelled" className="bg-[#121622] text-white">
                          Cancelled
                        </option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SECTION 2: CATALOG INVENTORY */}
      {activeSection === 'products' && (
        <div className="rounded-3xl bg-[#121622] border border-white/10 overflow-hidden">
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <h3 className="font-display font-bold text-sm text-white">
              Catalog Items & Stock Levels ({products.length})
            </h3>
          </div>

          <div className="divide-y divide-white/5">
            {products.map((p) => (
              <div
                key={p.id}
                className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/[0.01]"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={p.images[0]}
                    alt={p.name}
                    className="w-12 h-14 object-cover rounded-xl bg-black border border-white/10 shrink-0"
                  />
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#ff5b36]">
                      {p.category} • SKU: {p.sku}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-white">{p.name}</h4>
                    <p className="text-xs font-mono text-slate-400">${p.price}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">Stock Count:</span>
                    <input
                      type="number"
                      value={p.stock}
                      onChange={(e) => updateProductStock(p.id, Number(e.target.value))}
                      className="w-16 bg-black/40 border border-white/10 rounded-lg px-2 py-1 text-xs font-mono text-white text-center"
                    />
                  </div>

                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                      p.stock > 0
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-rose-500/20 text-rose-400'
                    }`}
                  >
                    {p.stock > 0 ? 'Active' : 'Out of Stock'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 3: COUPONS */}
      {activeSection === 'coupons' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Create Coupon Form */}
          <div className="lg:col-span-5 p-6 rounded-3xl bg-[#121622] border border-white/10 space-y-4">
            <h3 className="font-display font-bold text-sm text-white flex items-center gap-2">
              <Tag className="w-4 h-4 text-[#ff5b36]" />
              Create Marketing Promo Code
            </h3>

            <form onSubmit={handleCreateCoupon} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 font-medium block mb-1">Coupon Code</label>
                <input
                  type="text"
                  required
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value)}
                  placeholder="e.g. FLASH25"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white uppercase font-mono focus:outline-none focus:border-[#ff5b36]"
                />
              </div>

              <div>
                <label className="text-slate-300 font-medium block mb-1">Discount Type</label>
                <select
                  value={newDiscountType}
                  onChange={(e) => setNewDiscountType(e.target.value as 'percentage' | 'fixed')}
                  className="w-full bg-[#171c2a] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#ff5b36]"
                >
                  <option value="percentage">Percentage Discount (%)</option>
                  <option value="fixed">Fixed Dollar Amount ($)</option>
                </select>
              </div>

              <div>
                <label className="text-slate-300 font-medium block mb-1">
                  Discount Amount ({newDiscountType === 'percentage' ? '%' : '$'})
                </label>
                <input
                  type="number"
                  min={1}
                  max={newDiscountType === 'percentage' ? 100 : 200}
                  value={newAmount}
                  onChange={(e) => setNewAmount(Number(e.target.value))}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-[#ff5b36]"
                />
              </div>

              <div>
                <label className="text-slate-300 font-medium block mb-1">
                  Minimum Order Spend ($) (Optional)
                </label>
                <input
                  type="number"
                  min={0}
                  value={newMinSpend}
                  onChange={(e) => setNewMinSpend(Number(e.target.value))}
                  placeholder="0 = No minimum"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-[#ff5b36]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#ff5b36] hover:bg-[#f04f29] text-white font-bold text-xs shadow-lg transition-colors flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Publish Promo Code</span>
              </button>
            </form>
          </div>

          {/* Active Coupons List */}
          <div className="lg:col-span-7 rounded-3xl bg-[#121622] border border-white/10 overflow-hidden">
            <div className="p-5 border-b border-white/10">
              <h3 className="font-display font-bold text-sm text-white">Active Store Coupons</h3>
            </div>

            <div className="divide-y divide-white/5">
              {coupons.map((c) => (
                <div
                  key={c.code}
                  className="p-4 sm:p-5 flex items-center justify-between gap-4 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-sm text-white bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
                        {c.code}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                        {c.discountType === 'percentage' ? `${c.value}% OFF` : `$${c.value} OFF`}
                      </span>
                    </div>
                    <p className="text-slate-400">{c.description}</p>
                    {c.minSpend && (
                      <p className="text-[10px] text-slate-500">Min spend: ${c.minSpend}</p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => deleteCoupon(c.code)}
                    className="p-2 rounded-lg text-slate-500 hover:text-rose-400 transition-colors"
                    title="Deactivate coupon"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
