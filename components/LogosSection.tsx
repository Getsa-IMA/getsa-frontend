"use client";

export default function LogosSection() {
  const logos = ["Amazon", "Flipkart", "Zomato", "Swiggy", "Nykaa"];

  return (
    <section className="py-12 text-center border-t">
      <p className="text-sm text-gray-500 mb-6">
        Trusted by 100+ brands
      </p>

      <div className="flex justify-center gap-8 flex-wrap opacity-60">
        {logos.map((logo, i) => (
          <div
            key={i}
            className="px-4 py-2 border rounded-lg text-sm bg-white"
          >
            {logo}
          </div>
        ))}
      </div>
    </section>
  );
}