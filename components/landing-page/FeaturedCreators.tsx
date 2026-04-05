'use client';

import React from 'react';
import { LayoutTemplate, Palette, Camera, Sparkles } from 'lucide-react';
import { FreelancerProfileCard } from '@/components/ui/freelancer-profile-card';
import DotGrid from '@/components/ui/DotGrid';

const ToolIcon = ({ icon: Icon }: { icon: React.ElementType }) => (
  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gray-100 text-gray-500">
    <Icon className="h-4 w-4" />
  </div>
);

const creators = [
  {
    id: 1,
    name: 'Sophia Rose',
    title: 'Skincare & Minimalist Beauty',
    followers: '284K followers',
    rating: 4.9,
    avatarSrc: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=200&h=200&fit=crop',
    bannerSrc: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=900&fit=crop',
    tools: [LayoutTemplate, Palette],
  },
  {
    id: 2,
    name: 'Marcus Vane',
    title: 'Luxury Lifestyle & Fragrance',
    followers: '512K followers',
    rating: 4.8,
    avatarSrc: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&fit=crop',
    bannerSrc: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=900&fit=crop',
    tools: [Camera, Sparkles],
  },
  {
    id: 3,
    name: 'Elena K.',
    title: 'High-End Makeup Artistry',
    followers: '193K followers',
    rating: 4.7,
    avatarSrc: 'https://images.unsplash.com/photo-1594465919760-441fe5908ab0?q=80&w=200&h=200&fit=crop',
    bannerSrc: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=900&fit=crop',
    tools: [Palette, Sparkles],
  },
  {
    id: 4,
    name: 'Jordan Bloom',
    title: 'Wellness & Organic Living',
    followers: '97K followers',
    rating: 4.6,
    avatarSrc: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&h=200&fit=crop',
    bannerSrc: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=900&fit=crop',
    tools: [LayoutTemplate, Camera],
  },
];

const FeaturedCreators = () => {
  return (
    <section className="relative bg-white pt-10 pb-20 overflow-hidden">

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

      {/* Fade overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-white/50 via-white/20 to-white/55 pointer-events-none" />

      {/* Cards */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {creators.map((creator, i) => (
            <div key={creator.id} style={{ animationDelay: `${i * 0.1}s` }} className="animate-fade-in-up">
              <FreelancerProfileCard
                name={creator.name}
                title={creator.title}
                avatarSrc={creator.avatarSrc}
                bannerSrc={creator.bannerSrc}
                rating={creator.rating}
                followers={creator.followers}
                tools={creator.tools.map((Icon, idx) => (
                  <ToolIcon key={idx} icon={Icon} />
                ))}
                onGetInTouch={() => console.log(`Contact ${creator.name}`)}
                onBookmark={() => console.log(`Bookmarked ${creator.name}`)}
              />
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default FeaturedCreators;
