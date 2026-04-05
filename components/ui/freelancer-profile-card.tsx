'use client';

import * as React from 'react';
import Image from 'next/image';
import { Bookmark, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FreelancerProfileCardProps {
  name: string;
  title: string;
  avatarSrc: string;
  bannerSrc: string;
  rating: number;
  followers: string;
  tools?: React.ReactNode[];
  onGetInTouch?: () => void;
  onBookmark?: () => void;
  className?: string;
}

export function FreelancerProfileCard({
  name,
  title,
  avatarSrc,
  bannerSrc,
  rating,
  followers,
  tools = [],
  onGetInTouch,
  onBookmark,
  className,
}: FreelancerProfileCardProps) {
  const [bookmarked, setBookmarked] = React.useState(false);

  return (
    <div
      className={cn(
        'relative w-full max-w-sm rounded-2xl overflow-hidden bg-white shadow-md border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1',
        className
      )}
    >
      {/* Banner */}
      <div className="relative h-28 w-full overflow-hidden">
        <Image
          src={bannerSrc}
          alt={`${name} banner`}
          fill
          className="object-cover"
          sizes="400px"
        />
        {/* Bookmark button */}
        <button
          onClick={() => {
            setBookmarked((b) => !b);
            onBookmark?.();
          }}
          className={cn(
            'absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-sm transition-all duration-200',
            bookmarked
              ? 'bg-[#A832A8] text-white'
              : 'bg-white/80 text-gray-600 hover:bg-white'
          )}
        >
          <Bookmark className="h-4 w-4" fill={bookmarked ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Avatar */}
      <div className="relative px-5 pb-5">
        <div className="relative -mt-10 mb-3 h-16 w-16 rounded-full ring-4 ring-white overflow-hidden shadow">
          <Image
            src={avatarSrc}
            alt={name}
            fill
            className="object-cover"
            sizes="64px"
          />
        </div>

        {/* Name & title */}
        <div className="mb-4">
          <h3 className="text-base font-bold text-gray-900 leading-tight">{name}</h3>
          <p className="text-xs text-gray-500 mt-0.5">{title}</p>
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-semibold text-gray-700">{rating.toFixed(1)}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-xs text-gray-400">👥</span>
            <span className="text-xs font-semibold text-gray-600">{followers}</span>
          </div>
        </div>

        {/* Tools row */}
        {tools.length > 0 && (
          <div className="flex items-center gap-2 mb-4">
            {tools.map((tool, i) => (
              <React.Fragment key={i}>{tool}</React.Fragment>
            ))}
          </div>
        )}

        {/* CTA */}
        <button
          onClick={onGetInTouch}
          className="w-full rounded-xl bg-gradient-to-r from-[#D93A85] to-[#A832A8] py-2.5 text-sm font-bold text-white shadow hover:shadow-md hover:opacity-95 transition-all active:scale-95"
        >
          Get in Touch
        </button>
      </div>
    </div>
  );
}
