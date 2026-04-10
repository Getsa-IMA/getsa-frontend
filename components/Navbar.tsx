'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { X, User as UserIcon, Briefcase, LogOut, Menu as MenuIcon, LayoutDashboard } from 'lucide-react';
import { 
  UserButton, 
  SignInButton, 
  SignedIn, 
  SignedOut,
  useUser
} from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useUser();

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
          
          {/* Left side: Logo */}
          <div className="flex items-center gap-8">
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
          </div>

          {/* Right side: CTA Button */}
          <div className="flex items-center gap-3">
            {!isMounted ? (
              <div className="h-10 w-24 bg-gray-100/50 rounded-full animate-pulse" />
            ) : (
              <>
                <SignedOut>
                  <div className="hidden md:flex items-center gap-3">
                    <SignInButton mode="modal" fallbackRedirectUrl="/">
                      <button className="text-sm font-semibold text-gray-600 hover:text-getsa-purple transition-colors duration-200 mr-2">
                        Log in
                      </button>
                    </SignInButton>
                    <button 
                      onClick={() => setShowJoinModal(true)}
                      className="relative inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold text-white overflow-hidden group transition-all duration-300 hover:scale-105 active:scale-95 shadow-md hover:shadow-getsa-purple/30 hover:shadow-lg"
                    >
                      <span className="absolute inset-0 bg-getsa-gradient transition-all duration-300" />
                      <span className="relative z-10">Join Now</span>
                      <svg className="relative z-10 w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </button>
                  </div>
                </SignedOut>
                
                <SignedIn>
                  <div className="flex items-center gap-4">
                    {(() => {
                      let dashboardUrl = "/creator/dashboard";
                      if (pathname.startsWith("/brand")) {
                        dashboardUrl = "/brand/dashboard";
                      } else if (user) {
                        const storedRole = localStorage.getItem(`user_role_${user.id}`);
                        if (storedRole === "brand") dashboardUrl = "/brand/dashboard";
                      }
                      return (
                        <Link href={dashboardUrl} className="hidden md:block text-sm font-bold text-gray-700 hover:text-[#A832A8]">
                          Dashboard
                        </Link>
                      );
                    })()}
                    <UserButton />
                  </div>
                </SignedIn>
                
                <button 
                   onClick={() => setIsMenuOpen(true)}
                   className="md:hidden p-2 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors"
                >
                   <MenuIcon size={24} />
                </button>
              </>
            )}
          </div>
        </nav>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <div className="fixed inset-0 z-[100] md:hidden">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="absolute inset-0 bg-black/20 backdrop-blur-md"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute top-0 right-0 w-[85%] max-w-sm h-full bg-white shadow-2xl flex flex-col"
            >
              <div className="p-6 flex items-center justify-between border-b border-gray-50">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-getsa-purple">Getsa Hub</span>
                <button onClick={() => setIsMenuOpen(false)} className="p-2 bg-slate-50 rounded-xl text-slate-400">
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 p-8 space-y-10">
                <div className="space-y-6">
                   <SignedOut>
                      <div className="space-y-4">
                        <SignInButton mode="modal">
                          <button className="w-full py-4 text-center font-black text-slate-900 border-2 border-slate-100 rounded-2xl hover:bg-slate-50 transition-all active:scale-95" onClick={() => setIsMenuOpen(false)}>
                            Log in
                          </button>
                        </SignInButton>
                        <button 
                          onClick={() => { setIsMenuOpen(false); setShowJoinModal(true); }}
                          className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black shadow-xl shadow-slate-200 hover:bg-slate-800 active:scale-95 transition-all flex items-center justify-center gap-3"
                        >
                          Join Now
                        </button>
                      </div>
                   </SignedOut>
                   
                   <SignedIn>
                      <div className="space-y-6">
                        {(() => {
                          let dashboardUrl = "/creator/dashboard";
                          if (pathname.startsWith("/brand")) {
                            dashboardUrl = "/brand/dashboard";
                          } else if (user) {
                            const storedRole = localStorage.getItem(`user_role_${user.id}`);
                            if (storedRole === "brand") dashboardUrl = "/brand/dashboard";
                          }
                          return (
                            <Link 
                              href={dashboardUrl} 
                              onClick={() => setIsMenuOpen(false)}
                              className="w-full flex items-center justify-center gap-3 py-5 bg-slate-900 text-white rounded-2xl font-black shadow-xl shadow-slate-200 hover:bg-slate-800 active:scale-95 transition-all"
                            >
                              <LayoutDashboard size={18} />
                              Go to Dashboard
                            </Link>
                          );
                        })()}
                        
                        <div className="flex flex-col items-center gap-4 pt-8 border-t border-slate-50">
                           <div className="p-1 bg-slate-50 rounded-full border border-slate-100">
                              <UserButton />
                           </div>
                           <div className="text-center">
                              <p className="text-sm font-black text-slate-900">{user?.fullName || 'My Account'}</p>
                              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">Manage Profile</p>
                           </div>
                        </div>
                      </div>
                   </SignedIn>
                </div>
              </div>

              <div className="p-8 border-t border-gray-50 bg-slate-50/50">
                 <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em] mb-4 text-center">Empowering authentic partnerships</p>
                 <Image src="/getsa_logo.jpeg" alt="Getsa Logo" width={50} height={15} className="grayscale opacity-20 mx-auto" />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Join Modal Overlay */}
      {showJoinModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in" onClick={() => setShowJoinModal(false)} />
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden animate-scale-in">
            <button onClick={() => setShowJoinModal(false)} className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors">
              <X className="w-5 h-5 text-gray-400" />
            </button>
            <div className="p-8 md:p-10">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-black text-gray-900 mb-2 font-display">Join Getsa</h3>
                <p className="text-gray-500 text-sm font-medium">Create an account to start your journey</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/creator/signup" onClick={() => setShowJoinModal(false)} className="w-full">
                  <button className="w-full group relative flex flex-col items-center text-center p-6 rounded-2xl border-2 border-gray-100 hover:border-[#A832A8]/30 transition-all duration-300 hover:shadow-xl hover:shadow-[#A832A8]/5">
                    <div className="w-14 h-14 rounded-full bg-[#A832A8]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-[#A832A8]"><UserIcon className="w-6 h-6" /></div>
                    <h4 className="font-bold text-gray-900 mb-1 leading-tight">Join as<br />Creator</h4>
                  </button>
                </Link>
                <Link href="/brand/signup" onClick={() => setShowJoinModal(false)} className="w-full">
                  <button className="w-full group relative flex flex-col items-center text-center p-6 rounded-2xl border-2 border-gray-100 hover:border-[#D93A85]/30 transition-all duration-300 hover:shadow-xl hover:shadow-[#D93A85]/5">
                    <div className="w-14 h-14 rounded-full bg-[#D93A85]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-[#D93A85]"><Briefcase className="w-6 h-6" /></div>
                    <h4 className="font-bold text-gray-900 mb-1 leading-tight">Join as<br />Brand</h4>
                  </button>
                </Link>
              </div>
            </div>
            <div className="bg-gray-50 p-6 text-center border-t border-gray-100">
              <p className="text-xs text-gray-400 font-medium">Trusted by over 10,000+ top brand partners.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
