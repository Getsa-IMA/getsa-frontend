import React from 'react';
import { Package, Construction } from 'lucide-react';

export default function PackagePage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 min-h-[60vh] flex flex-col items-center justify-center text-center">
      <div className="space-y-6 max-w-md mx-auto">
        <div className="mx-auto w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-8 relative">
          <Package className="w-10 h-10 text-gray-400" />
          <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1.5 shadow-sm border border-gray-100">
            <Construction className="w-6 h-6 text-getsa-purple" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Packages Coming Soon</h1>
        <p className="text-gray-500 font-medium">
          We're building a powerful new way for you to manage and showcase your service packages. Check back soon!
        </p>
      </div>
    </div>
  );
}
