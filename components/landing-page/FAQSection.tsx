'use client';

import React, { useState } from 'react';
import DotGrid from '@/components/ui/DotGrid';
import { ChevronDown } from 'lucide-react';

const FAQSection = () => {
    const [openFaq, setOpenFaq] = useState<number | null>(0);

    const faqs = [
        {
            q: "How will I get brand collaborations?",
            a: "Getsa will work hard to get you brands for FREE."
        },
        {
            q: "Should I hire influencers from the Getsa platform?",
            a: "No, we just help you find the right influencer for you. Hiring depends upon the brand/agency."
        },
        {
            q: "Should I need to pay anything?",
            a: "No, it's 100% FREE. No middleman fees needed."
        }
    ];

    return (
        <section className="relative bg-white pt-24 pb-28 overflow-hidden">
            {/* DotGrid support background overlay */}
            <div className="absolute inset-0 z-0">
                <DotGrid
                    dotSize={4}
                    gap={22}
                    baseColor="#e8e8f0"
                    activeColor="#A832A8"
                    proximity={120}
                    shockRadius={250}
                    shockStrength={5}
                    resistance={750}
                    returnDuration={1.5}
                />
            </div>

            {/* Soft fade overlay to keep text readable */}
            <div className="absolute inset-0 z-[1] bg-gradient-to-b from-white/60 via-white/40 to-white/70 pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto px-4 md:px-8">
                {/* Section header */}
                <div className="mb-14 text-center">
                    <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#A832A8] mb-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#A832A8]" />
                        Got Questions?
                    </span>
                    <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
                        Frequently Asked Questions
                    </h2>
                </div>

                {/* FAQ mapping */}
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`group border rounded-2xl transition-all duration-300 overflow-hidden ${
                                openFaq === index
                                    ? 'border-[#A832A8]/20 bg-white shadow-xl shadow-[#A832A8]/5'
                                    : 'border-gray-100 bg-white/10 hover:border-[#A832A8]/30 hover:bg-white/40'
                            }`}
                        >
                            <button
                                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                className="w-full flex justify-between items-center p-5 text-left transition-all duration-300"
                            >
                                <span className={`text-sm md:text-base font-bold transition-colors ${
                                    openFaq === index ? 'text-[#A832A8]' : 'text-gray-700'
                                }`}>
                                    {faq.q}
                                </span>
                                <div className={`flex items-center justify-center w-8 h-8 rounded-full border border-gray-100 transition-all duration-300 ${
                                    openFaq === index 
                                        ? 'bg-gradient-to-r from-[#D93A85] to-[#A832A8] text-white rotate-180 border-transparent shadow-md' 
                                        : 'bg-white text-gray-400 group-hover:border-[#A832A8]/30 group-hover:text-[#A832A8]'
                                }`}>
                                    <ChevronDown className="w-4 h-4" />
                                </div>
                            </button>
                            <div
                                className={`px-5 transition-all duration-300 ease-in-out ${
                                    openFaq === index 
                                        ? 'pb-5 max-h-[500px] opacity-100' 
                                        : 'max-h-0 opacity-0 overflow-hidden'
                                }`}
                            >
                                <p className="text-xs md:text-sm text-gray-500 leading-relaxed max-w-2xl border-t border-gray-50 pt-4">
                                    {faq.a}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default FAQSection;
