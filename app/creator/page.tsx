'use client';

import { useUser } from '@clerk/nextjs';
import { Camera, Video, Monitor, User as UserIcon, Mail, MessageCircle, DollarSign, Users, ArrowLeft, Send } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function CreatorOnboarding() {
  const { user, isLoaded } = useUser();
  const [profilePic, setProfilePic] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-[#A832A8] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const userEmail = user?.primaryEmailAddress?.emailAddress || '';
  const userName = user?.fullName || '';

  return (
    <main className="relative min-h-screen bg-white overflow-x-hidden font-sans">
      
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-purple-50/50 via-white to-pink-50/50" />

      {/* Main Form Content */}
      <div className="relative z-10 w-full min-h-screen py-12 px-6 md:px-12 lg:px-24">
        
        {/* Back Link */}
        <div className="mb-12">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-gray-900 hover:text-[#A832A8] transition-colors group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="border-b-2 border-gray-900 group-hover:border-[#A832A8]">Exit Onboarding</span>
          </Link>
        </div>

        {/* Header - Bright and Impactful */}
        <div className="mb-16 md:mb-24">
           <h1 className="text-5xl md:text-7xl lg:text-8xl font-[900] text-gray-900 leading-[0.95] tracking-tight mb-8">
              JOIN THE <br />
              <span className="bg-gradient-to-r from-[#D93A85] to-[#A832A8] bg-clip-text text-transparent italic">CREATOR LAB.</span>
           </h1>
           <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-12">
             <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-gray-100 w-fit">
                <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                <span className="text-[10px] uppercase tracking-widest font-black text-gray-900">Registration Live</span>
             </div>
             <p className="max-w-md text-base md:text-lg font-bold text-gray-800 leading-relaxed">
                Connect with the world's most elite brands. Launch your next big project and reach millions.
             </p>
           </div>
        </div>

        {/* Form Structure */}
        <form className="max-w-6xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            
            {/* Left Section: Details */}
            <div className="space-y-16">
              
              {/* Identity Section */}
              <div className="space-y-10">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full" />
                   <span className="text-xs font-black text-gray-900 uppercase tracking-widest">01 — Identity</span>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-8">
                  <label className="relative cursor-pointer group shrink-0">
                     <div className={`w-32 h-32 md:w-40 md:h-40 rounded-[2.5rem] border-4 border-gray-100 overflow-hidden flex items-center justify-center bg-gray-50 transition-all ${profilePic ? 'border-[#A832A8]' : 'hover:border-[#A832A8] shadow-lg shadow-black/5'}`}>
                       {profilePic ? (
                         <img src={profilePic} alt="profile" className="w-full h-full object-cover" />
                       ) : (
                         <Camera className="w-10 h-10 text-gray-300" />
                       )}
                     </div>
                     <div className="absolute bottom-2 right-2 w-10 h-10 rounded-2xl bg-black text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Camera className="w-4 h-4" />
                     </div>
                     <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                  </label>
                  <div className="space-y-3 text-center sm:text-left">
                     <h4 className="font-black text-gray-900 text-xl tracking-tight">Profile Canvas</h4>
                     <p className="text-sm text-gray-700 font-medium leading-relaxed max-w-[220px]">
                       Upload a high-resolution photo for brands to recognize your influence.
                     </p>
                  </div>
                </div>

                {/* Main Fields */}
                <div className="grid grid-cols-1 gap-10 pt-4">
                  <div className="space-y-2 group">
                    <span className="text-[11px] font-black text-gray-900 uppercase tracking-widest ml-1">Full Name</span>
                    <input type="text" defaultValue={userName} placeholder="John Doe" className="w-full bg-white border-2 border-gray-100 rounded-2xl px-6 py-4 text-lg font-bold text-gray-900 focus:border-[#A832A8] outline-none transition-all placeholder:text-gray-300 shadow-sm" />
                  </div>
                  <div className="space-y-2 group">
                    <span className="text-[11px] font-black text-gray-900 uppercase tracking-widest ml-1">Working Email</span>
                    <input type="email" value={userEmail} readOnly className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-6 py-4 text-lg font-bold text-gray-500 outline-none cursor-not-allowed shadow-sm" />
                  </div>
                  <div className="space-y-2 group">
                    <span className="text-[11px] font-black text-gray-900 uppercase tracking-widest ml-1">WhatsApp number</span>
                    <input type="tel" placeholder="+91 9831209756" className="w-full bg-white border-2 border-gray-100 rounded-2xl px-6 py-4 text-lg font-bold text-gray-900 focus:border-[#A832A8] outline-none transition-all placeholder:text-gray-300 shadow-sm" />
                  </div>
                </div>
              </div>

              {/* Socials Section */}
              <div className="space-y-10">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full" />
                   <span className="text-xs font-black text-gray-900 uppercase tracking-widest">02 — Social Footprint</span>
                </div>
                <div className="grid grid-cols-1 gap-10">
                   <div className="space-y-2">
                    <span className="text-[11px] font-black text-gray-900 uppercase tracking-widest ml-1">Followers Count</span>
                    <input type="text" placeholder="150K" className="w-full bg-white border-2 border-gray-100 rounded-2xl px-6 py-4 text-lg font-bold text-gray-900 focus:border-[#A832A8] outline-none transition-all placeholder:text-gray-300 shadow-sm" />
                  </div>
                  <div className="space-y-2 group">
                    <span className="text-[11px] font-black text-gray-900 uppercase tracking-widest ml-1">Instagram Link</span>
                    <input type="text" placeholder="instagram.com/johndoe" className="w-full bg-white border-2 border-gray-100 rounded-2xl px-6 py-4 text-lg font-bold text-gray-900 focus:border-[#D93A85] outline-none transition-all placeholder:text-gray-300 shadow-sm" />
                  </div>
                  <div className="space-y-2 group">
                    <span className="text-[11px] font-black text-gray-900 uppercase tracking-widest ml-1">YT Link (optional)</span>
                    <input type="text" placeholder="youtube.com/@johndoe" className="w-full bg-white border-2 border-gray-100 rounded-2xl px-6 py-4 text-lg font-bold text-gray-900 focus:border-red-500 outline-none transition-all placeholder:text-gray-300 shadow-sm" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section: Pricing & Submit */}
            <div className="space-y-16">
              
              {/* Pricing Section */}
              <div className="space-y-10">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full" />
                   <span className="text-xs font-black text-gray-900 uppercase tracking-widest">03 — Rate Card</span>
                </div>
                
                <div className="space-y-6">
                  {['Post', 'Reel', 'Story'].map((label) => (
                    <div key={label} className="p-8 rounded-3xl bg-white border-4 border-gray-50 flex items-center justify-between shadow-xl shadow-black/[0.02] hover:border-[#A832A8]/20 transition-all lg:hover:scale-[1.02] active:scale-95 group">
                      <div className="space-y-1">
                        <h5 className="font-black text-gray-900 text-xl tracking-tight">{label} Charge</h5>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{label === 'Post' ? 'Fixed Image' : label === 'Reel' ? 'Viral Video' : '24h Promo'}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-black text-gray-900">₹</span>
                        <input type="number" placeholder="00" className="w-24 bg-gray-50 rounded-xl px-4 py-3 text-2xl font-black text-[#A832A8] outline-none border-0" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Button Section */}
              <div className="pt-10 space-y-8">
                <button 
                  type="submit" 
                  className="w-full group bg-gray-900 text-white rounded-[2rem] p-8 flex flex-col items-center justify-center gap-4 hover:bg-black transition-all shadow-2xl relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#D93A85] via-[#A832A8] to-[#7038D1]" />
                  <span className="text-2xl font-black tracking-tight uppercase">Submit Profile</span>
                  <div className="flex items-center gap-4 text-sm font-bold text-white/70 group-hover:text-white transition-colors">
                    <span>COMPLETE REGISTRATION</span>
                    <Send className="w-4 h-4 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" />
                  </div>
                </button>
                <div className="flex gap-4">
                   <div className="w-1.5 h-auto bg-[#A832A8] rounded-full shrink-0" />
                   <p className="text-xs font-bold text-gray-700 leading-relaxed uppercase tracking-wide">
                     By proceeding, you verify all data provided is accurate for high-tier brand evaluation and direct WhatsApp collaboration.
                   </p>
                </div>
              </div>

            </div>

          </div>

        </form>
      </div>

    </main>
  );
}
