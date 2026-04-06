"use client";

import { useState } from "react";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  const faqs = [
    {
      q: "How do I know if creators have real followers?",
      a: "All creators are manually vetted and checked for engagement quality.",
    },
    {
      q: "Can I request revisions?",
      a: "Yes, revisions are allowed before approval.",
    },
    {
      q: "Is payment secure?",
      a: "Funds are held in escrow and released after approval.",
    },
  ];

  return (
    <section className="py-20 px-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-10">FAQs</h2>

      {faqs.map((faq, i) => (
        <div key={i} className="border-b py-4">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex justify-between font-medium"
          >
            {faq.q}
            <span>{open === i ? "-" : "+"}</span>
          </button>

          {open === i && (
            <p className="mt-2 text-sm text-gray-600">{faq.a}</p>
          )}
        </div>
      ))}
    </section>
  );
}