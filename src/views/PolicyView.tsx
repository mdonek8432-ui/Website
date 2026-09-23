import React from 'react';
import { useStore } from '../context/StoreContext';
import { ShieldCheck, Truck, RotateCcw, FileText, ArrowRight } from 'lucide-react';

interface PolicyViewProps {
  type: 'shipping' | 'returns' | 'privacy' | 'terms';
}

export const PolicyView: React.FC<PolicyViewProps> = ({ type }) => {
  const { navigateTo } = useStore();

  const configs = {
    shipping: {
      title: 'Worldwide Shipping & Delivery Logistics',
      subtitle: 'Carbon-neutral tracked courier services dispatched within 24 hours.',
      icon: Truck,
      content: [
        {
          heading: 'Fulfillment & Handling Timelines',
          text: 'All studio orders placed Monday through Friday prior to 2:00 PM EST are inspected, packaged in recycled matte mailers, and transferred to the courier hub on the same business day.'
        },
        {
          heading: 'Domestic & International Rates',
          text: 'Orders over $75 qualify for complimentary Standard Express shipping (3–5 business days). Priority Air (1–2 business days) is available at checkout for $12.95. International delivery covers 50+ countries via DHL Express with all customs duties prepaid.'
        },
        {
          heading: 'Real-Time Tracking & Proof of Delivery',
          text: 'An automated dispatch notification with your carrier tracking number is emailed immediately. Real-time SMS status updates can be toggled on inside your customer profile.'
        }
      ]
    },
    returns: {
      title: '30-Day Unconditional Studio Guarantee',
      subtitle: 'Wear it. Carry it. Savor it. Zero hassle exchanges or refunds.',
      icon: RotateCcw,
      content: [
        {
          heading: 'The 30-Day Tactile Guarantee',
          text: 'We want you to feel complete confidence in your silhouettes and botanical drops. You may wear and test your pieces for up to 30 calendar days from the delivery timestamp.'
        },
        {
          heading: 'Prepaid Return Labels',
          text: 'Initiate a return directly from the My Orders dashboard in your customer account. A prepaid digital return label is generated instantly for drop-off at any certified shipping location.'
        },
        {
          heading: 'Rapid Processing & Instant Store Credit',
          text: 'Refunds are returned to your original payment method (Credit card, PayPal, or Bank Transfer) within 3 business days of receipt at our Brooklyn atelier.'
        }
      ]
    },
    privacy: {
      title: 'Studio Privacy & Data Protection Policy',
      subtitle: 'Your personal data is encrypted, confidential, and never sold.',
      icon: ShieldCheck,
      content: [
        {
          heading: 'Information We Collect',
          text: 'We collect order fulfillment data strictly necessary to manufacture, package, and deliver your purchases: contact details, shipping addresses, and payment gateway tokens.'
        },
        {
          heading: '256-Bit SSL Financial Safeguards',
          text: 'KROMA never stores raw credit card credentials on local servers. All transactional processing is handled through PCI-DSS Level 1 compliant gateway tokenization.'
        },
        {
          heading: 'No Third-Party Data Brokers',
          text: 'We never sell, rent, or lease customer profiles to advertisers or third-party marketing firms.'
        }
      ]
    },
    terms: {
      title: 'Terms of Studio Service',
      subtitle: 'Standard conditions governing orders, digital purchases, and warranties.',
      icon: FileText,
      content: [
        {
          heading: 'Product Availability & Small-Batch Drops',
          text: 'Due to our small-batch production philosophy, certain limited colorways and seasonal flavor botanicals are capped at strict inventory counts.'
        },
        {
          heading: 'Pricing & Promotional Codes',
          text: 'Prices are listed in USD. Promo codes must be entered prior to order completion and cannot be applied retroactively to previous transactions.'
        },
        {
          heading: 'Warranty & Material Integrity',
          text: 'All bags feature a 2-year studio craftsmanship warranty covering stitching, hardware, and zipper mechanisms.'
        }
      ]
    }
  };

  const current = configs[type] || configs.shipping;
  const Icon = current.icon;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-[#ff5b36]/10 text-[#ff5b36] flex items-center justify-center">
          <Icon className="w-6 h-6" />
        </div>
        <span className="text-[11px] uppercase font-mono tracking-widest text-[#ff5b36] font-bold">
          Studio Legal & Operational Documentation
        </span>
        <h1 className="font-display font-black text-3xl sm:text-4xl text-white">
          {current.title}
        </h1>
        <p className="text-sm text-slate-300">{current.subtitle}</p>
      </div>

      <div className="space-y-6">
        {current.content.map((item, idx) => (
          <div
            key={idx}
            className="p-6 rounded-3xl bg-[#121622] border border-white/10 space-y-2"
          >
            <h3 className="font-display font-bold text-base text-white">{item.heading}</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{item.text}</p>
          </div>
        ))}
      </div>

      <div className="pt-4 flex justify-between items-center text-xs text-slate-400 border-t border-white/10">
        <span>Updated: February 2026</span>
        <button
          onClick={() => navigateTo('contact')}
          className="text-[#ff5b36] hover:underline font-bold flex items-center gap-1"
        >
          <span>Have questions? Contact Support</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
