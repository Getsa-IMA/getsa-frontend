import React from 'react';

const HeroSection = () => {
  const categories = ["All", "Skincare", "Makeup", "Haircare", "UGC", "Fragrance", "Wellness"];

  return (
      <section className="relative pt-32 pb-20 px-8 flex flex-col items-center text-center space-y-10 overflow-hidden min-h-[85vh] justify-center bg-white">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse-slow"></div>
        <div className="absolute top-20 right-1/4 w-[28rem] h-[28rem] bg-secondary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse-slow" style={{ animationDelay: "2s" }}></div>

        <div className="space-y-6 max-w-5xl relative z-10 animate-fade-in-up">
          <div className="inline-block mb-4 px-5 py-2 rounded-full bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/20 shadow-sm backdrop-blur-sm">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-bold text-sm tracking-widest uppercase">
              The #1 Platform for Brands & Creators
            </span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-foreground leading-[1.1]">
            Find the perfect <br/>
            <span className="bg-gradient-to-r from-[#D93A85] to-[#A832A8] bg-clip-text text-transparent">
              Creators & Influencers
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-foreground/60 max-w-3xl mx-auto font-medium leading-relaxed mt-6">
            The elite marketplace for authentic brand partnerships that drive real conversions and explosive growth.
          </p>
        </div>

        {/* Search Bar Wrapper */}
        <div className="w-full max-w-4xl relative group z-10 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative flex items-center bg-white rounded-[2.5rem] shadow-2xl p-2 border border-foreground/5">
            <div className="pl-6 w-full">
              <input 
                type="text" 
                placeholder="Search by niche, platform, or creator name..." 
                className="w-full bg-transparent outline-none text-xl text-foreground placeholder:text-foreground/40 font-medium h-14"
              />
            </div>
            <button className="bg-gradient-to-r from-[#D93A85] to-[#A832A8] text-white px-10 h-16 rounded-[2rem] font-bold text-xl shadow-lg hover:shadow-primary/40 transition-all hover:-translate-y-1 ml-2 whitespace-nowrap active:scale-95">
              Find Creators
            </button>
          </div>
        </div>

        {/* Category Tags */}
        <div className="flex flex-wrap justify-center gap-3 relative z-10 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          {categories.map((tag) => (
            <button 
              key={tag} 
              className="px-6 py-2.5 rounded-full bg-white/80 backdrop-blur-md border border-foreground/5 text-sm font-bold text-foreground/70 hover:border-primary/50 hover:text-primary hover:shadow-md hover:-translate-y-1 transition-all"
            >
              {tag}
            </button>
          ))}
        </div>
      </section>
  );
};

export default HeroSection;
