import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock } from 'lucide-react';

export const ContactView: React.FC = () => {
  const { showNotification } = useStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Product Question');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showNotification('Thank you! Our studio team will reply within 24 hours.', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="max-w-2xl space-y-3">
        <span className="text-[11px] uppercase font-mono tracking-widest text-[#ff5b36] font-bold">
          Studio Concierge
        </span>
        <h1 className="font-display font-black text-3xl sm:text-5xl text-white">
          Contact Our Design Team
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Have questions regarding silhouette sizing, fabric GSM, custom batch orders, or international
          delivery? We're here to assist.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Contact Form */}
        <div className="lg:col-span-7 p-8 rounded-3xl bg-[#121622] border border-white/10 space-y-6">
          {submitted ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white">Inquiry Received</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                A studio representative has been notified and will reply to <strong>{email}</strong>{' '}
                within 24 hours.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="text-xs text-[#ff5b36] hover:underline font-bold"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-300 font-medium block mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jordan Brooks"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#ff5b36]"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-300 font-medium block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jordan@example.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#ff5b36]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">Topic</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-[#171c2a] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#ff5b36]"
                >
                  <option value="Product Question">Product Sizing or Material Question</option>
                  <option value="Order Tracking">Order Status & Courier Dispatch</option>
                  <option value="Returns">Returns & 30-Day Exchange</option>
                  <option value="Press">Press & Brand Collaboration</option>
                  <option value="Wholesale">Wholesale & Stockist Inquiries</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">Message</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can our studio assist you today?"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#ff5b36]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#ff5b36] hover:bg-[#f04f29] text-white font-bold text-xs shadow-lg transition-colors flex items-center justify-center gap-2"
              >
                <span>Transmit Message</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>

        {/* Right: Studio Coordinates */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-[#121622] border border-white/10 space-y-4">
            <h3 className="font-display font-bold text-base text-white">Direct Coordinates</h3>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#ff5b36] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">Concierge Email</p>
                  <p className="text-slate-400">concierge@kromastudio.design</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#2656d6] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">Telephone Support</p>
                  <p className="text-slate-400">+1 (800) 492-5766 (Mon–Fri, 9am–6pm EST)</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">Design Atelier</p>
                  <p className="text-slate-400">742 Evergreen Studio St, DUMBO, Brooklyn, NY 11201</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-[#121622] border border-white/10 space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-xs">
              <Clock className="w-4 h-4 text-[#ff5b36]" />
              <span>Studio Dispatch Operations</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Warehouse fulfillment operates Monday through Saturday. Orders placed before 2:00 PM EST
              ship out same day.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
