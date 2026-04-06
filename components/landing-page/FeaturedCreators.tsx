import React from 'react';
import Link from "next/link";
import CreatorCard from "@/components/CreatorCard";

const FeaturedCreators = () => {
  const creators = [
    { id: 1, name: "Sophia Rose", niche: "Skincare & Minimalist Beauty", price: "250", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=500" },
    { id: 2, name: "Marcus Vane", niche: "Luxury Lifestyle & Fragrance", price: "400", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=500" },
    { id: 3, name: "Elena K.", niche: "High-End Makeup Artistry", price: "320", image: "https://images.unsplash.com/photo-1594465919760-441fe5908ab0?q=80&w=500" },
    { id: 4, name: "Jordan Bloom", niche: "Wellness & Organic Living", price: "180", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=500" },
    { id: 5, name: "Lila Chen", niche: "K-Beauty & Skincare Reviews", price: "220", image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=500" },
    { id: 6, name: "Ethan Cross", niche: "Men's Grooming & Lifestyle", price: "200", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=500" },  
    { id: 7, name: "Maya Patel", niche: "Sustainable Fashion & Beauty", price: "270", image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=500" },
    { id: 8, name: "Leo Martinez", niche: "Tech-Infused Beauty & Gadgets", price: "350", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=500" },
    { id: 9, name: "Ava Thompson", niche: "Celebrity Beauty & Red Carpet", price: "500", image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=500" },
    { id: 10, name: "Noah Lee", niche: "Fitness & Beauty Crossover", price: "230", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=500" },
    { id: 11, name: "Isabella Garcia", niche: "Boho-Chic & Festival Beauty", price: "190", image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=500" },
    { id: 12, name: "Mason Reed", niche: "Avant-Garde & Artistic Makeup", price: "400", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=500" },
  ];

  return (
      <section className="max-w-7xl mx-auto px-8 py-24 animate-fade-in-up">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="space-y-3">
            <span className="text-primary font-bold tracking-widest uppercase text-sm">Top Rated</span>
            <h2 className="text-4xl md:text-5xl font-black text-foreground">Featured Creators</h2>
            <p className="text-foreground/50 text-xl font-medium max-w-lg">Top trending beauty influencers this week driving massive ROI.</p>
          </div>
          <Link href="/explore" className="group flex items-center gap-2 bg-neutral py-4 px-8 rounded-full font-bold text-lg text-foreground hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:text-white transition-all shadow-sm cursor-pointer border border-foreground/5 active:scale-95">
            View All 
            <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {creators.map((creator, i) => (
            <div key={creator.id} style={{ animationDelay: `${i * 0.15}s` }} className="animate-fade-in-up">
              <CreatorCard 
                name={creator.name}
                niche={creator.niche}
                price={+creator.price}
                image={creator.image}
              />
            </div>
          ))}
        </div>
      </section>
  );
};

export default FeaturedCreators;
