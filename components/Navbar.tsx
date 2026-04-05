'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { X, User as UserIcon, Briefcase, LogOut } from 'lucide-react';
import { 
  UserButton, 
  SignUpButton, 
  SignInButton, 
  SignedIn, 
  SignedOut 
} from '@clerk/nextjs';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 bg-white/80 backdrop-blur-2xl border-b border-white/60 ${scrolled
          ? 'py-2 shadow-lg shadow-black/5'
          : 'py-4 shadow-sm shadow-black/[0.03]'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* Left side: Logo + Links */}
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Link href="/" className="group flex items-center gap-2 hover:opacity-85 transition-opacity duration-200">
              <Image
                src="/getsa_logo.jpeg"
                alt="Getsa Logo"
                width={50}
                height={15}
                className="object-contain"
                style={{ height: 'auto', width: 'auto' }}
                priority
              />
            </Link>

            {/* Nav Links */}
            <div className="hidden md:flex items-center gap-1">
              <Link
                href="/creator"
                className="relative px-4 py-2 text-sm font-semibold text-gray-700 rounded-xl hover:text-getsa-purple transition-colors duration-200 group"
              >
                Creators
                <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-getsa-gradient scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
              </Link>
              <Link
                href="/brand"
                className="relative px-4 py-2 text-sm font-semibold text-gray-700 rounded-xl hover:text-getsa-lavender transition-colors duration-200 group"
              >
                Brands
                <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-getsa-gradient scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
              </Link>
            </div>
          </div>

          {/* Right side: CTA Button */}
          <div className="flex items-center gap-3">
            {!isMounted ? (
              // Placeholder during hydration to prevent mismatch
              <div className="h-10 w-24 bg-gray-100/50 rounded-full animate-pulse" />
            ) : (
              <>
                <SignedOut>
                  <SignInButton mode="modal" fallbackRedirectUrl="/">
                    <button className="hidden md:inline-flex text-sm font-semibold text-gray-600 hover:text-getsa-purple transition-colors duration-200">
                      Log in
                    </button>
                  </SignInButton>
                  <button 
                    onClick={() => setShowJoinModal(true)}
                    className="relative inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold text-white overflow-hidden group transition-all duration-300 hover:scale-105 active:scale-95 shadow-md hover:shadow-getsa-purple/30 hover:shadow-lg"
                  >
                    <span className="absolute inset-0 bg-getsa-gradient transition-all duration-300" />
                    <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full" style={{ transition: 'opacity 0.3s, transform 0.6s' }} />
                    <span className="relative z-10">Join Now</span>
                    <svg className="relative z-10 w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </button>
                </SignedOut>
                
                <SignedIn>
                  <div className="flex items-center gap-4">
                    <Link href="/creator" className="text-sm font-bold text-gray-700 hover:text-[#A832A8]">Dashboard</Link>
                    <UserButton />
                  </div>
                </SignedIn>
              </>
            )}
          </div>

        </nav>
      </header>

      {/* Join Modal Overlay */}
      {showJoinModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in" onClick={() => setShowJoinModal(false)} />
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden animate-scale-in">
            <button onClick={() => setShowJoinModal(false)} className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors">
              <X className="w-5 h-5 text-gray-400" />
            </button>

            <div className="p-8 md:p-10">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-black text-gray-900 mb-2">Join Getsa</h3>
                <p className="text-gray-500 text-sm">Create an account to start your journey</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SignUpButton forceRedirectUrl="/creator" mode="modal">
                  <button className="group relative flex flex-col items-center text-center p-6 rounded-2xl border-2 border-gray-100 hover:border-[#A832A8]/30 transition-all duration-300 hover:shadow-xl hover:shadow-[#A832A8]/5">
                    <div className="w-14 h-14 rounded-full bg-[#A832A8]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-[#A832A8]">
                      <UserIcon className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-1 leading-tight">Join as<br />Creator</h4>
                  </button>
                </SignUpButton>

                <SignUpButton forceRedirectUrl="/brand" mode="modal">
                  <button className="group relative flex flex-col items-center text-center p-6 rounded-2xl border-2 border-gray-100 hover:border-[#D93A85]/30 transition-all duration-300 hover:shadow-xl hover:shadow-[#D93A85]/5">
                    <div className="w-14 h-14 rounded-full bg-[#D93A85]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-[#D93A85]">
                      <Briefcase className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-1 leading-tight">Join as<br />Brand</h4>
                  </button>
                </SignUpButton>
              </div>
            </div>

            <div className="bg-gray-50 p-6 text-center border-t border-gray-100">
              <p className="text-xs text-gray-400">Trusted by over 10,000+ top brand partners.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;

