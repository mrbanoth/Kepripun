import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, ChevronDown } from 'lucide-react';
import { PRICING_FAQS, PRICING_PLANS } from '../data';

export function PricingPage() {
  const [billing, setBilling] = useState<'annual' | 'monthly'>('annual');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="max-w-[1160px] mx-auto px-5 sm:px-8 py-14 sm:py-20 space-y-16">
      {/* Header + Billing Toggle */}
      <div className="text-center max-w-[620px] mx-auto space-y-5">
        <p className="text-[13.5px] font-medium text-[#6153CC]">Transparent Pricing</p>
        <h1 className="font-display text-[36px] sm:text-[48px] font-bold tracking-tight text-[#1F2128] leading-[1.12] [text-wrap:balance]">
          Simple plans that grow with your conversations.
        </h1>
        <p className="text-[16px] text-[#6F7382]">
          Every plan includes zero-download guest joins and end-to-end room encryption.
        </p>

        <div className="inline-flex items-center gap-1 p-1.5 rounded-full bg-[#F3F3FA] border border-[#E8E8F2]">
          <button
            type="button"
            onClick={() => setBilling('monthly')}
            className={`px-5 py-2 rounded-full text-[13.5px] font-medium transition-colors cursor-pointer ${
              billing === 'monthly'
                ? 'bg-white text-[#1F2128] shadow-sm'
                : 'text-[#6F7382] hover:text-[#1F2128]'
            }`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setBilling('annual')}
            className={`px-5 py-2 rounded-full text-[13.5px] font-medium transition-colors cursor-pointer ${
              billing === 'annual'
                ? 'bg-[#6153CC] text-white shadow-sm'
                : 'text-[#6F7382] hover:text-[#1F2128]'
            }`}
          >
            Annual (Save 21%)
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {PRICING_PLANS.map((plan) => {
          const price = billing === 'annual' ? plan.annualPrice : plan.monthlyPrice;
          const isHighlighted = !!plan.highlighted;

          return (
            <div
              key={plan.id}
              className={`rounded-[28px] p-7 sm:p-8 flex flex-col justify-between gap-8 ${
                isHighlighted
                  ? 'bg-[#6153CC] text-white shadow-[0_20px_48px_rgba(97,83,204,0.24)]'
                  : 'bg-white border border-[#EBEBF3] text-[#1F2128]'
              }`}
            >
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="font-display text-[22px] font-bold">{plan.name}</h2>
                    <span
                      className={`text-[12.5px] font-medium ${
                        isHighlighted ? 'text-white/80' : 'text-[#6153CC]'
                      }`}
                    >
                      {plan.participantCap}
                    </span>
                  </div>
                  <p
                    className={`text-[14.5px] leading-relaxed ${
                      isHighlighted ? 'text-white/85' : 'text-[#6F7382]'
                    }`}
                  >
                    {plan.tagline}
                  </p>
                </div>

                <div className="flex items-baseline gap-1.5">
                  <span className="font-display text-[44px] font-bold tracking-tight tabular-nums">
                    ${price}
                  </span>
                  <span
                    className={`text-[14px] ${
                      isHighlighted ? 'text-white/75' : 'text-[#7D8190]'
                    }`}
                  >
                    {price === 0 ? 'forever' : '/ host / month'}
                  </span>
                </div>

                <ul className="space-y-3 pt-2">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5 text-[14.5px]">
                      <Check
                        className={`w-4 h-4 mt-1 shrink-0 ${
                          isHighlighted ? 'text-[#CFC7FE]' : 'text-[#6153CC]'
                        }`}
                      />
                      <span className={isHighlighted ? 'text-white/95' : 'text-[#3E414E]'}>
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                to={plan.id === 'personal' ? '/meeting/new' : '/signup'}
                className={`w-full py-3.5 px-6 rounded-full text-center text-[14.5px] font-semibold transition-colors ${
                  isHighlighted
                    ? 'bg-white text-[#4F41B8] hover:bg-[#F4F2FF]'
                    : 'bg-[#F4F2FF] text-[#4F41B8] hover:bg-[#6153CC] hover:text-white'
                }`}
              >
                {plan.ctaLabel}
              </Link>
            </div>
          );
        })}
      </div>

      {/* FAQ Accordion */}
      <section className="max-w-[760px] mx-auto pt-4 space-y-6">
        <h2 className="font-display text-[26px] sm:text-[32px] font-bold text-[#1F2128] text-center">
          Frequently asked questions
        </h2>

        <div className="divide-y divide-[#EFEFF6] border-y border-[#EFEFF6]">
          {PRICING_FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={faq.question} className="py-5">
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 text-left cursor-pointer"
                >
                  <span className="font-display text-[16.5px] font-semibold text-[#1F2128]">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#6F7382] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#6153CC]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <p className="mt-3 text-[15px] leading-relaxed text-[#565A69] pr-8">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
