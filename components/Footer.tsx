"use client";

import Link from "next/link";
import Image from "next/image";
import { 
  Mail, 
  MessagesSquare,
  Heart
} from "lucide-react";

const navigation = {
  sections: [
    {
      id: "platform",
      name: "Platform",
      items: [
        { name: "Find Influencers", href: "/creators" },
        { name: "Brand Solutions", href: "/brand" },
        { name: "How it Works", href: "/#how-it-works" },
        { name: "Pricing", href: "/pricing" },
      ],
    },
    {
      id: "categories",
      name: "Categories",
      items: [
        { name: "Fashion", href: "/category/fashion" },
        { name: "Beauty", href: "/category/beauty" },
        { name: "Lifestyle", href: "/category/lifestyle" },
        { name: "Tech", href: "/category/tech" },
      ],
    },
    {
      id: "resources",
      name: "Resources",
      items: [
        { name: "Help Center", href: "/help" },
        { name: "Success Stories", href: "/stories" },
        { name: "Creator Tips", href: "/blog" },
        { name: "Brand Guide", href: "/guide" },
      ],
    },
    {
      id: "company",
      name: "Company",
      items: [
        { name: "About Us", href: "/about" },
        { name: "Contact", href: "/contact" },
        { name: "Terms", href: "/terms" },
        { name: "Privacy", href: "/privacy" },
      ],
    },
  ],
};

const iconStyles = `hover:-translate-y-1 border border-dotted border-gray-200 rounded-xl p-2.5 transition-all duration-300 hover:border-[#A832A8] hover:text-[#A832A8] hover:bg-[#A832A8]/5`;

const Footer = () => {
  return (
    <footer className="w-full bg-white border-t border-gray-100 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-50 rounded-full blur-3xl opacity-30 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-50 rounded-full blur-3xl opacity-30 translate-y-1/2 pointer-events-none" />

      {/* Top Section: About & Logo */}
      <div className="relative mx-auto max-w-7xl px-8 pt-20 pb-12 flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="flex-1 max-w-2xl text-center md:text-left space-y-6">
          <Link href="/" className="inline-block transform transition-transform hover:scale-105">
            <Image 
              src="/logo.jpeg" 
              alt="Getsa Logo" 
              width={120} 
              height={40} 
              className="object-contain"
            />
          </Link>
          <p className="text-gray-500 text-sm leading-6 max-w-xl">
            Getsa is the ultimate marketplace connecting dynamic creators with forward-thinking brands. 
            We're on a mission to simplify influencer marketing, making it accessible, transparent, and 
            highly effective for everyone. Whether you're a creator looking to grow or a brand aiming 
            to scale, Getsa provides the tools and network you need to succeed in the digital economy.
          </p>
        </div>
      </div>

      {/* Navigation Middle Section */}
      <div className="mx-auto max-w-7xl px-8 pb-16">
        <div className="border-b border-dotted border-gray-200 mb-16"></div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {navigation.sections.map((section) => (
            <div key={section.id} className="space-y-6">
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-[#1A2433]">
                {section.name}
              </h3>
              <ul className="space-y-4">
                {section.items.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-gray-500 transition-colors hover:text-[#A832A8]"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-b border-dotted border-gray-200 mt-16"></div>
      </div>

      {/* Social Links & Theme Section */}
      <div className="mx-auto max-w-7xl px-8 pb-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link aria-label="Mail" href="mailto:hello@getsa.in" className={iconStyles}>
              <Mail strokeWidth={1.5} className="h-5 w-5" />
            </Link>
            <Link aria-label="Twitter" href="#" className={iconStyles}>
              <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </Link>
            <Link aria-label="Instagram" href="#" className={iconStyles}>
              <svg className="h-5 w-5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </Link>
            <Link aria-label="LinkedIn" href="#" className={iconStyles}>
              <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554V15.034c0-1.291-.023-2.952-1.8-2.952-1.8 0-2.078 1.406-2.078 2.859v5.511h-3.556V9.002h3.413v1.561h.049c.475-.9 1.636-1.85 3.367-1.85 3.601 0 4.267 2.37 4.267 5.455v6.284zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9.002h3.564v11.45zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </Link>
            <Link aria-label="YouTube" href="#" className={iconStyles}>
              <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505a3.017 3.017 0 00-2.122 2.136C0 8.055 0 12 0 12s0 3.945.501 5.814a3.017 3.017 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.945 24 12 24 12s0-3.945-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </Link>
            <Link aria-label="Facebook" href="#" className={iconStyles}>
              <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </Link>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-100 rounded-full text-xs font-bold text-gray-600">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              Platform Status: Operational
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Footer */}
      <div className="mx-auto max-w-7xl px-8 pb-12 border-t border-gray-50 pt-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-gray-400 font-medium">
          <div className="flex flex-wrap items-center justify-center gap-1">
            <span>&copy; {new Date().getFullYear()}</span>
            <span>Made with</span>
            <Heart className="h-3.5 w-3.5 text-[#E91E63] fill-[#E91E63] animate-pulse mx-1" />
            <span>in India by</span>
            <Link href="/" className="font-bold text-[#1A2433] hover:text-[#A832A8] transition-colors">
              Getsa Team
            </Link>
          </div>
          
          <div className="flex items-center gap-8">
            <Link href="/terms" className="hover:text-gray-600">Terms of Service</Link>
            <Link href="/privacy" className="hover:text-gray-600">Privacy Policy</Link>
            <Link href="/cookies" className="hover:text-gray-600">Cookie Settings</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;