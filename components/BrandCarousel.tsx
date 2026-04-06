"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";


const brands = [
  {
    name: "Amazon",
    logo: "https://logo.clearbit.com/amazon.com",
  },
  {
    name: "Flipkart",
    logo: "https://logo.clearbit.com/flipkart.com",
  },
  {
    name: "Myntra",
    logo: "https://logo.clearbit.com/myntra.com",
  },
  {
    name: "Nykaa",
    logo: "https://logo.clearbit.com/nykaa.com",
  },
  {
    name: "Zomato",
    logo: "https://logo.clearbit.com/zomato.com",
  },
  {
    name: "Swiggy",
    logo: "https://logo.clearbit.com/swiggy.com",
  },
];

export default function BrandCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollAmount = 0;

    const interval = setInterval(() => {
      scrollAmount += 1;
      scrollContainer.scrollLeft = scrollAmount;

      if (scrollAmount >= scrollContainer.scrollWidth / 2) {
        scrollAmount = 0;
      }
    }, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-neutral text-center">
      <h2 className="text-lg font-medium opacity-70 mb-8">
        Trusted by{" "}
        <span className="font-bold text-foreground">100+ Brands</span>
      </h2>

      <div className="relative">
        {/* LEFT FADE */}
        <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-neutral to-transparent z-10" />

        {/* RIGHT FADE */}
        <div className="absolute right-0 top-0 h-full w-20 bg-linear-to-l from-neutral to-transparent z-10" />

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-hidden whitespace-nowrap px-6"
        >
          {[...brands, ...brands].map((brand, i) => (
            <div
              key={i}
              className="min-w-45 bg-white rounded-2xl shadow px-6 py-4 flex items-center justify-center hover:scale-105 transition"
            >
              <Image
                src={brand.logo}
                alt={brand.name}
                width={120}
                height={40}
                className="object-contain grayscale hover:grayscale-0 transition duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}