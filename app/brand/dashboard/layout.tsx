import React from 'react';
import BrandSidebar from '@/components/brand/BrandSidebar';
import BrandNavbar from '@/components/brand/BrandNavbar';

export default function BrandDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50/50">
      <BrandSidebar className="z-30 shrink-0" />
      <main className="flex-1 flex flex-col min-w-0">
        <BrandNavbar />
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
