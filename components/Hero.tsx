import React from 'react';
// components/Hero.tsx
 const Hero = () => {
  return (
    <section className="min-h-[calc(100vh-96px)] flex flex-col items-center justify-start pt-20 text-center px-8 relative overflow-hidden bg-white">
      <h1 className="text-5xl font-extrabold tracking-tight text-foreground mb-4">
        Find the best <span className="text-primary">Beauty</span> creators
      </h1>
      <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-10">
        The world&apos;s largest marketplace for Beauty & Lifestyle content creators.
      </p>
      
      {/* Search Bar Group */}
      <div className="max-w-3xl mx-auto relative flex items-center">
        <input 
          type="text" 
          placeholder="Search by name, niche, or platform..." 
          className="w-full p-6 pl-12 rounded-2xl border border-gray-200 shadow-xl focus:ring-2 focus:ring-primary outline-none transition-all"
        />
        <button className="absolute right-3 bg-foreground text-white px-8 py-3 rounded-xl font-bold hover:opacity-90">
          Search
        </button>
      </div>

      {/* Filter Tags */}
      <div className="flex flex-wrap justify-center gap-3 mt-8">
        {["Skincare", "Makeup", "Haircare", "UGC", "Fragrance", "Wellness"].map((tag) => (
          <button key={tag} className="px-5 py-2 rounded-full border border-gray-200 text-sm font-medium hover:border-primary hover:text-primary transition-colors bg-white">
            {tag}
          </button>
        ))}
      </div>
    </section>
  );
};
export default Hero;