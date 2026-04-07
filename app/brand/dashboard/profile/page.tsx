'use client';

import React from 'react';
import { Building2, Sparkles } from 'lucide-react';

export default function BrandProfilePage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-slate-200 shadow-sm mb-6">
          <Sparkles className="w-5 h-5 text-[#A832A8]" />
          <span className="text-sm font-medium text-slate-600">Coming Soon</span>
        </div>
        <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <Building2 className="w-8 h-8 text-getsa-purple" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-3">Brand Profile</h1>
        <p className="text-slate-500 max-w-sm mx-auto text-sm">
          Your brand profile setup is coming soon. Stay tuned!
        </p>
      </div>
    </div>
  );
}
