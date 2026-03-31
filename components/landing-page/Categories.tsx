import React from 'react';

const Categories = () => {
  const productCategories = [
    { 
      name: "Fashion & Lifestyle", 
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800" 
    },
    { 
      name: "Beauty Products", 
      image: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?q=80&w=800" 
    },
  ];

  return (
      <section className="max-w-7xl mx-auto px-8 py-24 relative">
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary/5 rounded-full filter blur-[100px] -z-10"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full filter blur-[100px] -z-10"></div>

        <div className="flex flex-col items-center mb-16 text-center animate-fade-in-up">
          <span className="text-secondary font-bold tracking-widest uppercase text-sm mb-2">Explore Niches</span>
          <h2 className="text-4xl md:text-5xl font-black text-foreground">Trending Categories</h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-primary to-secondary mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {productCategories.map((cat, i) => (
            <div 
              key={cat.name} 
              className="group relative h-[450px] rounded-[2.5rem] overflow-hidden cursor-pointer shadow-xl hover:shadow-2xl hover:shadow-primary/20 transition-all duration-700 hover:-translate-y-2 animate-fade-in-up"
              style={{ animationDelay: `${i * 0.2 + 0.2}s` }}
            >     
              <img 
                src={cat.image} 
                alt={cat.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-in-out"
                loading="lazy"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
              <div className="absolute inset-0 border-[3px] border-white/10 rounded-[2.5rem] pointer-events-none group-hover:border-primary/50 transition-colors duration-500"></div>
              
              <div className="absolute bottom-0 left-0 w-full p-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight drop-shadow-lg mb-3">
                  {cat.name}
                </h3>
                <div className="flex items-center text-white/90 font-bold text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  <span className="bg-gradient-to-r from-[#F8B4D9] to-white bg-clip-text text-transparent group-hover:text-white transition-colors">Explore Creators</span>
                  <span className="ml-2 bg-white text-primary rounded-full w-8 h-8 flex items-center justify-center group-hover:translate-x-3 transition-transform duration-500">&rarr;</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
  );
};

export default Categories;
