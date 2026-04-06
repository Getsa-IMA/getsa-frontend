'use client';

import React from 'react';
import { Rocket } from 'lucide-react';

export default function CreatorDashboardPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] p-8 text-center animate-in fade-in duration-1000">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-getsa-purple/20 blur-3xl rounded-full scale-150 animate-pulse-slow" />
        <div className="relative p-8 rounded-full bg-getsa-purple/10 text-getsa-purple ring-1 ring-getsa-purple/20">
          <Rocket size={48} strokeWidth={2.5} className="animate-bounce-slow" />
        </div>
      </div>
      
      <div className="space-y-4 max-w-2xl px-6 relative z-10">
        <h1 className="text-5xl font-black text-gray-900 tracking-tight leading-none italic uppercase">
          Coming <span className="text-getsa-purple">Soon</span>
        </h1>
        <p className="text-gray-500 font-semibold text-lg leading-relaxed">
          We're building something incredible. Your powerful analytics and campaign tools will be live shortly. Stay tuned!
        </p>
      </div>

      <div className="mt-12 flex gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="w-2.5 h-2.5 rounded-full bg-getsa-purple/20 animate-pulse" style={{ animationDelay: `${i * 200}ms` }} />
        ))}
      </div>
    </div>
  );
}
