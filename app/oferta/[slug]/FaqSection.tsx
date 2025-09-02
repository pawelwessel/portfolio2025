"use client";
import { useState } from "react";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  faqs: FaqItem[];
}

export default function FaqSection({ faqs }: FaqSectionProps) {
  const [active, setActive] = useState<number | null>(null);

  if (!faqs || faqs.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 pt-8 border-t border-[#2a2f3d]/50">
      <div className="mb-8">
        <span className="text-2xl lg:text-3xl font-bold text-white mb-2 font-gotham">
          Często zadawane pytania
        </span>
        <div className="w-16 h-0.5 bg-gradient-to-r from-[#B4FC2D] to-[#3EE7C0] rounded-full opacity-60" />
      </div>

      <div className="grid grid-cols-1 gap-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-[#1a1f2e]/60 backdrop-blur-sm border border-[#2a2f3d]/50 rounded-xl overflow-hidden transition-all duration-300 hover:border-[#B4FC2D]/30"
          >
            <button
              className="w-full text-left px-6 py-4 font-semibold text-gray-200 hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#B4FC2D]/30 focus:ring-inset"
              onClick={() => setActive(active === index ? null : index)}
              aria-expanded={active === index}
              aria-controls={`faq-answer-${index}`}
            >
              <div className="flex items-center justify-between">
                <span className="font-gotham">{faq.question}</span>
                <span
                  className={`ml-4 text-[#B4FC2D] transition-transform duration-300 ${
                    active === index ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </div>
            </button>
            {active === index && (
              <div
                id={`faq-answer-${index}`}
                className="px-6 pb-4 text-gray-300 leading-relaxed animate-fadeIn"
              >
                <div className="pt-2 border-t border-[#2a2f3d]/30">
                  {faq.answer}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
