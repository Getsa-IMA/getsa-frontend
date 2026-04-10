'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, Home, Bell, Building2 } from 'lucide-react';
import { UserButton } from '@clerk/nextjs';

const BrandNavbar = () => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 h-16 shrink-0">
      <div className="h-full px-4 md:px-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-purple-50 text-getsa-purple">
              <Building2 size={18} />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 leading-none">Brand</span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-getsa-purple mt-1 leading-none">Console</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-getsa-purple rounded-full border-2 border-white"></span>
          </button>
          
          <div className="scale-90 sm:scale-100">
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default BrandNavbar;
