'use client';

import React, { useState } from 'react';
import { Search, Filter, SlidersHorizontal, Sparkles } from 'lucide-react';
import { FreelancerProfileCard } from '@/components/freelancer-profile-card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// Mock data for creators
const MOCK_CREATORS = [
  {
    id: 1,
    name: "Sarah Jenkins",
    title: "Lifestyle & Travel Creator",
    avatarSrc: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    bannerSrc: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=400&fit=crop",
    rating: 4.9,
    duration: "5 Days",
    rate: "$150/post",
    tools: (
      <>
        <span className="w-5 h-5 flex items-center justify-center bg-blue-100 rounded text-[10px] font-bold text-blue-700">Ps</span>
        <span className="w-5 h-5 flex items-center justify-center bg-orange-100 rounded text-[10px] font-bold text-orange-700">Lr</span>
      </>
    )
  },
  {
    id: 2,
    name: "David Chen",
    title: "Tech Reviewer & YouTuber",
    avatarSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    bannerSrc: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop",
    rating: 4.8,
    duration: "7 Days",
    rate: "$500/video",
    tools: (
        <>
          <span className="w-5 h-5 flex items-center justify-center bg-indigo-100 rounded text-[10px] font-bold text-indigo-700">Pr</span>
          <span className="w-5 h-5 flex items-center justify-center bg-purple-100 rounded text-[10px] font-bold text-purple-700">Ae</span>
        </>
      )
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    title: "Fashion & Beauty Influencer",
    avatarSrc: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
    bannerSrc: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=400&fit=crop",
    rating: 5.0,
    duration: "3 Days",
    rate: "$300/story",
    tools: (
        <>
          <span className="w-5 h-5 flex items-center justify-center bg-pink-100 rounded text-[10px] font-bold text-pink-700">In</span>
          <span className="w-5 h-5 flex items-center justify-center bg-blue-100 rounded text-[10px] font-bold text-blue-700">Ca</span>
        </>
      )
  },
  {
    id: 4,
    name: "Marcus Thorne",
    title: "Fitness Coach & Athlete",
    avatarSrc: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    bannerSrc: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=400&fit=crop",
    rating: 4.7,
    duration: "10 Days",
    rate: "$200/hr",
    tools: (
        <>
          <span className="w-5 h-5 flex items-center justify-center bg-red-100 rounded text-[10px] font-bold text-red-700">Fi</span>
          <span className="w-5 h-5 flex items-center justify-center bg-emerald-100 rounded text-[10px] font-bold text-emerald-700">He</span>
        </>
      )
  },
  {
    id: 5,
    name: "Aisha Khan",
    title: "Food Photographer & Critic",
    avatarSrc: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop",
    bannerSrc: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=400&fit=crop",
    rating: 4.9,
    duration: "4 Days",
    rate: "$250/shoot",
    tools: (
        <>
          <span className="w-5 h-5 flex items-center justify-center bg-amber-100 rounded text-[10px] font-bold text-amber-700">Fo</span>
          <span className="w-5 h-5 flex items-center justify-center bg-cyan-100 rounded text-[10px] font-bold text-cyan-700">Li</span>
        </>
      )
  },
  {
    id: 6,
    name: "Liam O'Brian",
    title: "Cinematographer & Director",
    avatarSrc: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop",
    bannerSrc: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&h=400&fit=crop",
    rating: 4.9,
    duration: "14 Days",
    rate: "$800/project",
    tools: (
        <>
          <span className="w-5 h-5 flex items-center justify-center bg-zinc-100 rounded text-[10px] font-bold text-zinc-700">Re</span>
          <span className="w-5 h-5 flex items-center justify-center bg-slate-100 rounded text-[10px] font-bold text-slate-700">Da</span>
        </>
      )
  }
];

export default function FindCreatorsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCreators = MOCK_CREATORS.filter(creator => 
    creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    creator.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50/30 p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Find Creators</h1>
            <p className="text-gray-500 text-sm sm:text-base">Discover the perfect creators for your brand campaigns.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input 
                placeholder="Search by name or niche..." 
                className="pl-10 bg-white border-gray-200 focus:ring-getsa-purple/20 focus:border-getsa-purple"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" className="gap-2 hidden sm:flex">
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters</span>
            </Button>
          </div>
        </div>

        {/* Categories / Quick Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {['All', 'Lifestyle', 'Tech', 'Fashion', 'Fitness', 'Food', 'Travel', 'Cinematography'].map((category) => (
            <button
              key={category}
              className="px-4 py-1.5 rounded-full bg-white border border-gray-200 text-sm font-medium text-gray-600 hover:border-getsa-purple/50 hover:text-getsa-purple transition-all whitespace-nowrap"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grid Section */}
        {filteredCreators.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredCreators.map((creator) => (
              <FreelancerProfileCard
                key={creator.id}
                name={creator.name}
                title={creator.title}
                avatarSrc={creator.avatarSrc}
                bannerSrc={creator.bannerSrc}
                rating={creator.rating}
                duration={creator.duration}
                rate={creator.rate}
                tools={creator.tools}
                onGetInTouch={() => console.log(`Contacting ${creator.name}`)}
                onBookmark={() => console.log(`Bookmarked ${creator.name}`)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-gray-300" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">No creators found</h3>
            <p className="text-gray-500">Try adjusting your search or filters.</p>
          </div>
        )}

        {/* Load More? */}
        {filteredCreators.length > 0 && (
          <div className="flex justify-center pt-8">
            <Button variant="outline" className="px-8 py-6 rounded-xl border-gray-200 text-gray-600 hover:bg-gray-50">
              Load More Creators
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
