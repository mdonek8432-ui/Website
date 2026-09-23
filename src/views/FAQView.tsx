import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const FAQView: React.FC = () => {
  const { navigateTo } = useStore();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What makes KROMA 280 GSM t-shirts different from standard tees?',
      a: 'Standard commercial t-shirts weigh between 140 and 180 GSM (grams per square meter) and frequently stretch, pill, or twist after three washes. KROMA tees are woven from custom-milled 280 GSM combed organic Aegean cotton with double-needle ribbed collar binding. This produces a heavyweight structural drape that keeps its crisp silhouette indefinitely.'
    },
    {
      q: 'How do I use the Sensory Flavor Drops?',
      a: 'Our flavor drops are zero-calorie, zero-sugar cold-extracted botanical concentrates. Gently dispense 3 to 5 drops directly into a glass of chilled sparkling water, still water, matcha, or cocktails. Each 30ml amber bottle yields approximately 60 distinct servings.'
    },
    {
      q: 'What is your 30-Day Happiness & Return policy?',
      a: 'We offer an unconditional 30-day wear-and-test period on all apparel, caps, and bags. If the fit, texture, or aesthetic doesn’t exceed your expectations, initiate a prepaid return label directly from your account dashboard for an instant exchange or 100% full refund.'
    },
    {
      q: 'What are the dimensions and laptop capacity of the Modular Utility Sling?',
      a: 'The Modular Utility Sling measures 31cm × 19cm × 9cm (5.5L capacity). It comfortably accommodates an iPad Pro 11-inch or iPad Mini, Kindle Paperwhite, compact 35mm camera, phone, sunglasses in hardcase, keys on the magnetic clip, and standard 500ml water flask.'
    },
    {
      q: 'Do you offer Cash on Delivery (COD) and international shipping?',
      a: 'Yes! We ship internationally to over 50 countries via DHL Express. Cash on Delivery is available in eligible urban territories at checkout without extra processing fees.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-3">
        <span className="text-[11px] uppercase font-mono tracking-widest text-[#ff5b36] font-bold">
          Studio Knowledge Base
        </span>
        <h1 className="font-display font-black text-3xl sm:text-5xl text-white">
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
          Everything you need to know regarding materials, sizing, sensory drops, and worldwide
          fulfillment.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="rounded-2xl bg-[#121622] border border-white/10 overflow-hidden transition-colors"
            >
              <button
                type="button"
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-display font-bold text-sm sm:text-base text-white hover:text-[#ff5b36] transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-[#ff5b36]' : 'text-slate-400'
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 pt-3 animate-in fade-in duration-150">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 text-center space-y-3">
        <p className="font-bold text-white text-sm">Still have an unanswered question?</p>
        <p className="text-xs text-slate-400">
          Our studio team is online and responds to inquiries within a few hours.
        </p>
        <button
          type="button"
          onClick={() => navigateTo('contact')}
          className="px-6 py-2.5 rounded-xl bg-white text-slate-900 font-bold text-xs hover:bg-[#ff5b36] hover:text-white transition-colors inline-flex items-center gap-2"
        >
          <span>Contact Studio Concierge</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
