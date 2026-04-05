import React from 'react';
import DotGrid from '@/components/ui/DotGrid';

const HeroSection = () => {
  const categories = ["All", "Skincare", "Makeup", "Haircare", "UGC", "Fragrance", "Wellness"];

  return (
    <section className="relative pt-28 md:pt-32 pb-6 px-4 md:px-8 flex flex-col items-center text-center space-y-7 overflow-hidden min-h-[82vh] justify-center bg-white">

      {/* DotGrid background — fills entire section */}
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

      {/* Soft fade overlay so content stays readable */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-white/60 via-white/40 to-white/70 pointer-events-none" />

      {/* Badge */}
      <div className="relative z-10 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#A832A8]/20 bg-white/70 backdrop-blur-sm animate-fade-in-up">
        <span className="w-1.5 h-1.5 rounded-full bg-[#A832A8] animate-pulse" />
        <span className="text-xs font-semibold tracking-widest uppercase text-[#A832A8]">
          The #1 Platform for Brands &amp; Creators
        </span>
      </div>

      {/* Headline */}
      <div className="space-y-3 max-w-4xl relative z-10 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-gray-900 leading-[1.1]">
          Find the perfect
        </h1>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1]">
          <span className="bg-gradient-to-r from-[#D93A85] to-[#A832A8] bg-clip-text text-transparent">
            Creators &amp; Influencers
          </span>
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-gray-500 max-w-2xl mx-auto font-normal leading-relaxed pt-2">
          The elite marketplace for authentic brand partnerships that drive real conversions and explosive growth.
        </p>
      </div>

      {/* Search Bar */}
      <div className="w-full max-w-2xl relative group z-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#D93A85] to-[#A832A8] rounded-full blur opacity-20 group-hover:opacity-35 transition duration-700 pointer-events-none" />
        <div className="relative flex items-center bg-white/90 backdrop-blur-sm rounded-full shadow-md border border-gray-100 pl-5 pr-1.5 py-1.5">
          <svg className="w-4 h-4 text-gray-400 shrink-0 mr-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search by niche, platform, or creator..."
            className="flex-1 bg-transparent outline-none text-sm text-gray-800 placeholder:text-gray-400 font-medium py-2 min-w-0"
          />
          <button className="shrink-0 bg-gradient-to-r from-[#D93A85] to-[#A832A8] text-white px-5 py-2 rounded-full font-semibold text-sm shadow hover:shadow-md hover:opacity-95 transition-all active:scale-95 whitespace-nowrap">
            Search
          </button>
        </div>
      </div>

      {/* Category Tags */}
      <div className="flex flex-wrap justify-center gap-2 relative z-10 animate-fade-in-up" style={{ animationDelay: '0.35s' }}>
        {categories.map((tag) => (
          <button
            key={tag}
            className="px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 text-xs font-semibold text-gray-600 hover:border-[#A832A8]/60 hover:text-[#A832A8] hover:shadow-sm transition-all duration-200"
          >
            {tag}
          </button>
        ))}
      </div>

    </section>
  );
};

export default HeroSection;
