'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { 
  User, 
  Package, 
  ChevronLeft, 
  ChevronRight,
  LayoutDashboard,
  Menu,
  Home
} from 'lucide-react';
import { UserButton } from '@clerk/nextjs';
import { cn } from '@/lib/utils';

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const navItems = [
    {
      name: 'Dashboard',
      href: '/creator/dashboard',
      icon: LayoutDashboard,
    },
    {
      name: 'Profile',
      href: '/creator/dashboard/profile',
      icon: User,
    },
    {
      name: 'Package',
      href: '/creator/dashboard/package',
      icon: Package,
    },
  ];

  return (
    <aside
      className={cn(
        "relative flex flex-col bg-white border-r border-gray-100 transition-all duration-300 ease-in-out h-screen sticky top-0 overflow-hidden",
        isCollapsed ? "w-20" : "w-64",
        className
      )}
    >
      {/* Header / Logo Area */}
      <div className="p-4 flex items-center justify-between h-20">
        {!isCollapsed && (
          <Link href="/" className="flex items-center gap-2 px-2">
            <Image
              src="/getsa_logo.jpeg"
              alt="Getsa Logo"
              width={80}
              height={24}
              className="object-contain"
              priority
            />
          </Link>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-xl hover:bg-gray-50 text-gray-400 hover:text-getsa-purple transition-colors ml-auto"
        >
          {isCollapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 space-y-1 mt-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center px-3 py-3 text-sm font-semibold rounded-2xl transition-all duration-200",
                isActive
                  ? "bg-getsa-purple/5 text-getsa-purple shadow-sm shadow-getsa-purple/5"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <Icon
                className={cn(
                  "w-5 h-5 transition-colors",
                  isActive ? "text-getsa-purple" : "text-gray-400 group-hover:text-gray-600",
                  !isCollapsed && "mr-3"
                )}
              />
              {!isCollapsed && <span>{item.name}</span>}
              
              {isActive && !isCollapsed && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-getsa-purple" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Profile Area */}
      <div className="p-4 border-t border-gray-50 bg-gray-50/50">
        <div className={cn(
          "flex items-center p-2 rounded-2xl transition-all duration-300",
          isCollapsed ? "justify-center" : "gap-3"
        )}>
          <UserButton afterSignOutUrl="/" />
          {!isCollapsed && (
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-bold text-gray-900 truncate">My Account</span>
              <span className="text-xs text-gray-500 truncate">Manage settings</span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
