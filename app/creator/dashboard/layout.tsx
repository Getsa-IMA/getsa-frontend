import React from 'react';
import Sidebar from '@/components/creator/Sidebar';
import SyncUser from '@/components/SyncUser';
import { ProfileProvider } from '@/lib/context/ProfileContext';

export default function CreatorDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProfileProvider>
      <div className="flex min-h-screen bg-gray-50/50">
        <SyncUser />
        <Sidebar className="z-30" />
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <div className="flex-1 overflow-y-auto">
            {children}
          </div>
        </main>
      </div>
    </ProfileProvider>
  );
}
