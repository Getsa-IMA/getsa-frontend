"use client";

import React, { useState } from "react";

// export const metadata = {
//   title: "Getsa - Brand Portal",
//   description: "Hire creators and scale your brand with high-quality UGC.",
// };



export default function BrandPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      q: "How do I know if creators have real followers?",
      a: "All creators are manually vetted and performance-checked to ensure authenticity and engagement quality.",
    },
    {
      q: "Can I request revisions?",
      a: "Yes, you can request revisions before approving content to ensuusere it matches your expectations.",
    },
    {
      q: "Is payment secure ?",
      a: "Funds are held in escrow and only released once you approve the content.",
    },
  ];

  return (
    <main className="bg-neutral text-foreground">
      
      {/* ================= HERO SECTION ================= */}
      <section className="min-h-screen flex items-center justify-center px-6 py-16">
        <div className="max-w-7xl w-full grid md:grid-cols-2 gap-12 items-center">
          
          {/* Left */}
          <div className="space-y-6">
            <h1 className="text-5xl sm:text-6xl font-bold leading-tight">
              Hire Pre-Vetted <span className="text-secondary">Influencers</span> in Seconds
            </h1>

            <p className="text-lg opacity-80 max-w-xl">
              Discover high-quality creators across India. Launch campaigns,
              manage content, and pay securely — all in one place.
            </p>

            <div className="flex gap-4">
              <button className="px-6 py-3 rounded-xl bg-secondary text-white font-semibold shadow-lg hover:scale-105 transition">
                Find Influencers
              </button>
              <button className="px-6 py-3 rounded-xl border border-primary/20 hover:bg-primary/5 transition">
                Post a Campaign
              </button>
            </div>
          </div>

          {/* Right (Mock Dashboard Card) */}
          <div className="bg-white rounded-3xl shadow-xl p-6 border border-primary/10 hover:scale-[1.02] transition">
            <div className="h-40 bg-gradient-to-r from-primary via-secondary to-tertiary rounded-xl mb-4 opacity-80" />
            <p className="font-semibold">Campaign Dashboard</p>
            <p className="text-sm opacity-70">Track creators, content & ROI in real-time</p>
          </div>
        </div>
      </section>

      {/* ================= SOCIAL PROOF ================= */}
      <section className="py-10 text-center">
        <p className="text-sm opacity-60 mb-6">Trusted by 100+ brands</p>
        <div className="flex justify-center gap-8 opacity-50 flex-wrap">
          {["BrandOne", "BrandTwo", "BrandThree", "BrandFour"].map((b, i) => (
            <div key={i} className="px-4 py-2 border rounded-lg">
              {b}
            </div>
          ))}
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>

        <div className="grid md:grid-cols-4 gap-8 text-center">
          {[
            "Search & Filter",
            "Hire or Create Campaign",
            "Secure Escrow Payment",
            "Receive Content",
          ].map((step, i) => (
            <div key={i} className="space-y-3">
              <div className="w-12 h-12 mx-auto bg-secondary/10 rounded-full flex items-center justify-center font-bold">
                {i + 1}
              </div>
              <p className="font-medium">{step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= VALUE PROPS ================= */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6">
          {[
            "Vetted Creators",
            "Escrow Security",
            "No Hidden Fees",
            "Regional Targeting",
          ].map((item, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl border shadow-sm hover:shadow-lg transition"
            >
              <h3 className="font-semibold mb-2">{item}</h3>
              <p className="text-sm opacity-70">
                High-quality and reliable platform features for your campaigns.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FEATURED CREATORS ================= */}
      <section className="py-20 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          Featured Creators
        </h2>

        <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[1, 2, 3, 4].map((c) => (
            <div
              key={c}
              className="p-4 bg-white rounded-2xl shadow hover:scale-105 transition"
            >
              <div className="h-32 bg-primary/10 rounded-xl mb-3" />
              <p className="font-semibold">Creator {c}</p>
              <p className="text-sm opacity-70">Lifestyle • 50K followers</p>
              <p className="text-secondary font-bold mt-2">₹5,000</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="py-20 px-6 bg-neutral">
        <h2 className="text-3xl font-bold text-center mb-12">
          What Brands Say
        </h2>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {["Amazing ROI!", "Super easy to use", "Best platform"].map((t, i) => (
            <div key={i} className="p-6 bg-white rounded-2xl shadow">
              <p className="italic">"{t}"</p>
              <p className="mt-4 font-semibold">Brand Manager</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="py-20 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">FAQs</h2>

        {faqs.map((faq, i) => (
          <div key={i} className="border-b py-4">
            <button
              onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
              className="w-full text-left font-medium flex justify-between"
            >
              {faq.q}
              <span>{openFAQ === i ? "-" : "+"}</span>
            </button>
            {openFAQ === i && (
              <p className="mt-2 text-sm opacity-70">{faq.a}</p>
            )}
          </div>
        ))}
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="py-20 text-center bg-gradient-to-r from-primary via-secondary to-tertiary text-white">
        <h2 className="text-4xl font-bold mb-4">
          Start Your First Campaign Today
        </h2>
        <p className="mb-6 opacity-90">
          Join hundreds of brands scaling with creators.
        </p>
        <button className="px-8 py-4 bg-white text-black rounded-xl font-semibold hover:scale-105 transition">
          Get Started for Free
        </button>
      </section>

    </main>
  );
}




















// import React from 'react';

// export const metadata = {
//   title: 'Getsa - Brand Portal',
//   description: 'Discover creators and scale your brand reach with our innovative platform.',
// };

// export default function BrandPage() {
//   return (
//     <main className="min-h-screen bg-neutral flex flex-col items-center justify-center p-8 space-y-8 animate-in slide-in-from-bottom duration-700">
//       <div className="max-w-3xl w-full text-center space-y-4">
//         <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
//           Scale Your <span className="text-secondary underline decoration-tertiary decoration-4">Brand</span>
//         </h1>
//         <p className="text-xl text-foreground font-medium max-w-2xl mx-auto opacity-80 leading-relaxed">
//           Welcome to the Brand Portal. The ultimate destination for modern companies and their growth story.
//         </p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl pt-8">
//         <div className="p-8 rounded-3xl bg-white border border-primary/10 shadow-xl shadow-primary/5 hover:scale-[1.02] transition-transform duration-300">
//           <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
//             <div className="w-4 h-4 bg-primary rounded-full" />
//           </div>
//           <h2 className="text-2xl font-bold text-foreground font-serif italic italic-shadow">Brand Strategy</h2>
//           <p className="mt-2 text-foreground/70">Refine your messaging and connect with the right audience segments.</p>
//         </div>
        
//         <div className="p-8 rounded-3xl bg-secondary text-white shadow-xl shadow-secondary/20 hover:scale-[1.02] transition-transform duration-300 cursor-pointer">
//           <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
//             <div className="w-4 h-4 bg-white rounded-full" />
//           </div>
//           <h2 className="text-2xl font-bold">Campaign Launch</h2>
//           <p className="mt-2 text-white/80">Schedule your next major product release and track real-time engagement.</p>
//         </div>
//       </div>

//       <div className="h-2 w-32 bg-tertiary/30 rounded-full mt-12 bg-gradient-to-r from-primary via-secondary to-tertiary animate-pulse" />
//     </main>
//   );
// }
