"use client";

import React, { useState } from 'react';

const FAQSection = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    { q: "What is in Influencer Marketing?", a: "It involves brands collaborating with creators to produce authentic, engaging content that reaches targeted audiences, driving both brand awareness and sales." },
    { q: "How Does Influencer Marketing Work?", a: "Brands find creators that match their audience, agree on deliverables, and the creator posts content. You track the performance via our real-time dashboard." },
    { q: "How much does it cost?", a: "Pricing varies heavily by the creator's niche and audience size, but our platform supports budgets ranging from $100 UGC videos to $10k+ elite influencer campaigns." },
  ];

  return (
      <section className="max-w-4xl mx-auto px-8 py-32 animate-fade-in-up">
        <div className="text-center mb-16">
          <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">Got Questions?</span>
          <h2 className="text-4xl md:text-5xl font-black text-foreground">Frequently Asked Questions</h2>
        </div>
        
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`border-2 rounded-[2rem] transition-all duration-300 overflow-hidden ${openFaq === index ? 'border-primary shadow-lg shadow-primary/10 bg-white' : 'border-transparent bg-neutral hover:bg-neutral/70'}`}
            >
              <button 
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full flex justify-between items-center p-8 text-left group"
              >
                <span className={`text-xl font-bold transition-colors pr-4 ${openFaq === index ? 'text-primary' : 'text-foreground group-hover:text-primary'}`}>{faq.q}</span>
                <span className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-all duration-300 ${openFaq === index ? 'bg-gradient-to-r from-primary to-secondary text-white transform rotate-180 shadow-md' : 'bg-white text-foreground shadow-sm'}`}>
                  {openFaq === index ? "−" : "+"}
                </span>
              </button>
              <div 
                className={`px-8 text-lg font-medium text-foreground/60 transition-all duration-500 ease-in-out ${openFaq === index ? 'pb-8 max-h-[500px] opacity-100' : 'max-h-0 opacity-0 pb-0'}`}
              >
                {faq.a}
              </div>
            </div>
          ))}
        </div>
      </section>
  );
};

export default FAQSection;
