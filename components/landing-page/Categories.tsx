'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import DotGrid from '@/components/ui/DotGrid';

const fashionImages = [
  'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&fit=crop',
  'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=800&fit=crop',
  'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=800&fit=crop',
];

const beautyImages = [
  'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?q=80&w=800&fit=crop',
  'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=800&fit=crop',
  'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=800&fit=crop',
];

function RotatingImages({ images }: { images: string[] }) {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % images.length);
        setFade(true);
      }, 400);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="grid grid-cols-2 gap-3 h-full">
      {/* Main large image */}
      <div className="col-span-2 relative rounded-2xl overflow-hidden h-52">
        <Image
          src={images[current]}
          alt="category"
          fill
          className={`object-cover transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}
          sizes="600px"
        />
      </div>
      {/* Two small thumbnails */}
      {[images[(current + 1) % images.length], images[(current + 2) % images.length]].map((src, i) => (
        <div key={i} className="relative rounded-xl overflow-hidden h-28">
          <Image
            src={src}
            alt="category thumb"
            fill
            className="object-cover opacity-70"
            sizes="300px"
          />
        </div>
      ))}
    </div>
  );
}

const Categories = () => {
  return (
    <section className="relative bg-white overflow-hidden">

      {/* DotGrid background */}
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
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-white/50 via-white/20 to-white/50 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-16">

        {/* Section headline */}
        <div className="mb-14 text-center">
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#A832A8] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A832A8]" />
            Our Categories
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
            Find creators by niche
          </h2>
        </div>

        {/* ── FASHION ── text left, images right */}
        <div className="flex flex-col lg:flex-row items-center gap-10 mb-20">
          {/* Left: text */}
          <div className="flex-1 space-y-5">
            <span className="text-xs font-bold tracking-widest uppercase text-[#D93A85]">01 — Fashion</span>
            <h3 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight">
              Hire top fashion<br />influencers
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed max-w-sm">
              Connect with curated fashion creators who drive real engagement.
              From streetwear to haute couture — find your perfect brand voice.
            </p>
            <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#D93A85] to-[#A832A8] text-white text-sm font-semibold shadow hover:shadow-md hover:opacity-95 transition-all active:scale-95">
              Explore Fashion Creators
              <span>→</span>
            </button>
          </div>

          {/* Right: rotating images */}
          <div className="flex-1 w-full max-w-md">
            <RotatingImages images={fashionImages} />
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-20" />

        {/* ── BEAUTY ── images left, text right */}
        <div className="flex flex-col-reverse lg:flex-row items-center gap-10">
          {/* Left: rotating images */}
          <div className="flex-1 w-full max-w-md">
            <RotatingImages images={beautyImages} />
          </div>

          {/* Right: text */}
          <div className="flex-1 flex flex-col items-center lg:items-end space-y-5 text-center lg:text-right">
            <span className="text-xs font-bold tracking-widest uppercase text-[#A832A8]">02 — Beauty</span>
            <h3 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight">
              Partner with beauty<br />product creators
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed max-w-sm lg:ml-auto">
              Skincare, makeup, fragrance and more. Work with authentic beauty
              creators that convert followers into loyal customers.
            </p>
            <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#D93A85] to-[#A832A8] text-white text-sm font-semibold shadow hover:shadow-md hover:opacity-95 transition-all active:scale-95">
              Explore Beauty Creators
              <span>→</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Categories;
