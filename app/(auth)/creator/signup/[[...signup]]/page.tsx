"use client";

import { SignUp } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CheckCircle2, Sparkles, TrendingUp, Zap, ArrowRight, User, MapPin, Phone, Layout } from "lucide-react";

export default function CreatorSignUp() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    phone: "",
    description: "Fashion"
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const goToNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("pending_creator_data", JSON.stringify(formData));
    setStep(2);
  };

  return (
    <div className="flex h-screen bg-white overflow-hidden font-sans">
      
      {/* Left Side: Branding & Info (Visible on Desktop) */}
      <div className="hidden lg:grid lg:w-1/2 relative bg-[#1A2433] p-10 text-white overflow-hidden">
        {/* Abstract Background Ornaments */}
        <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[80%] h-[80%] rounded-full bg-gradient-to-br from-[#A832A8] to-[#7038D1] blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-gradient-to-tr from-[#E91E63] to-[#A832A8] blur-[100px]" />
        </div>

        <div className="relative z-10 flex flex-col h-full justify-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[10px] font-bold tracking-widest uppercase text-[#A832A8]">
                <Sparkles className="w-3 h-3" />
                Creator Program
              </span>
              <h1 className="text-3xl xl:text-4xl font-black leading-tight tracking-tight max-w-sm">
                Turn your influence into <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A832A8] via-[#7038D1] to-[#E91E63]">explosive growth.</span>
              </h1>
              <p className="text-gray-400 text-sm max-w-xs leading-relaxed">
                Connect with the world's most innovative brands and land campaigns that resonate.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5">
              <FeatureItem 
                icon={Zap} 
                title="Direct Partnerships" 
                desc="Work directly with brand owners and marketing heads."
              />
              <FeatureItem 
                icon={TrendingUp} 
                title="Boost Your Visibility" 
                desc="Get featured in front of thousands of potential brand partners."
              />
              <FeatureItem 
                icon={CheckCircle2} 
                title="Secure Payments" 
                desc="Milestone-based payments ensure you get paid on time."
              />
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-white/10 flex items-center gap-4 opacity-70">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-7 h-7 rounded-full border-2 border-[#1A2433] overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <p className="text-xs font-medium">Joined by 10k+ creators</p>
          </div>
        </div>
      </div>

      {/* Right Side: SignUp Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-10 bg-gray-50/50 overflow-y-auto">
        <div className="w-full max-w-sm animate-fade-in-up">
          
          {step === 1 ? (
            <div className="bg-white p-8 rounded-2xl shadow-xl shadow-purple-500/5 border border-white">
              <div className="mb-8">
                <h2 className="text-2xl font-black text-gray-900 mb-2">Tell us about yourself</h2>
                <p className="text-gray-500 text-sm font-medium">Help us personalize your experience</p>
              </div>

              <form onSubmit={goToNextStep} className="space-y-5">
                <div className="space-y-1">
                  <label className="text-gray-600 font-bold text-[10px] uppercase tracking-wider block ml-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      required
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#A832A8] focus:ring-1 focus:ring-[#A832A8] text-sm transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-gray-600 font-bold text-[10px] uppercase tracking-wider block ml-1">City</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      required
                      type="text"
                      name="city"
                      placeholder="New York"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#A832A8] focus:ring-1 focus:ring-[#A832A8] text-sm transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-gray-600 font-bold text-[10px] uppercase tracking-wider block ml-1">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      required
                      type="tel"
                      name="phone"
                      placeholder="1234567890"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#A832A8] focus:ring-1 focus:ring-[#A832A8] text-sm transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-gray-600 font-bold text-[10px] uppercase tracking-wider block ml-1">Category</label>
                  <div className="relative">
                    <Layout className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 font-bold" />
                    <select
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg appearance-none focus:outline-none focus:border-[#A832A8] focus:ring-1 focus:ring-[#A832A8] text-sm transition-all"
                    >
                      <option value="Fashion">Fashion</option>
                      <option value="Beauty">Beauty</option>
                      <option value="influencer">Influencer</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-4 bg-gradient-to-r from-[#A832A8] to-[#7038D1] text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-lg shadow-purple-500/20"
                >
                  Next
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          ) : (
            <>
              <div className="clerk-signup-container shadow-xl shadow-purple-500/5 rounded-2xl overflow-hidden border border-white">
                <SignUp 
                  path="/creator/signup"
                  signInUrl="/sign-in" 
                  forceRedirectUrl="/creator/onboarding"
                  appearance={{
                    elements: {
                      rootBox: "w-full mx-auto scale-90 sm:scale-95 origin-top",
                      card: "w-full shadow-none border-none p-0",
                      headerTitle: "text-xl font-black text-[#1A2433]",
                      headerSubtitle: "text-gray-500 font-medium text-sm",
                      socialButtonsBlockButton: "rounded-lg border-gray-200 hover:bg-gray-50 transition-all font-semibold h-9 text-sm",
                      formButtonPrimary: "bg-gradient-to-r from-[#A832A8] to-[#7038D1] hover:opacity-90 transition-opacity rounded-lg py-2 text-sm font-bold h-10",
                      footer: "bg-gray-50/50 border-t border-gray-100 py-4",
                      formFieldInput: "rounded-lg border-gray-200 focus:border-[#A832A8] focus:ring-[#A832A8] h-9 text-sm",
                      formFieldLabel: "text-gray-600 font-bold text-[10px] uppercase tracking-wider mb-1",
                      dividerLine: "bg-gray-100",
                      dividerText: "text-gray-400 text-[9px] font-bold uppercase tracking-widest",
                      identityPreviewText: "text-[#1A2433] font-bold text-sm",
                      formResendCodeLink: "text-[#A832A8] hover:text-[#7038D1] font-bold",
                    }
                  }}
                />
              </div>

              <div className="mt-4 text-center">
                <button 
                  onClick={() => setStep(1)}
                  className="text-xs font-bold text-gray-500 hover:text-[#A832A8] transition-colors"
                >
                  ← Go back
                </button>
              </div>
            </>
          )}

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-[10px] leading-relaxed">
              By joining, you agree to our <Link href="/terms" className="text-gray-600 underline font-medium">Terms</Link> and <Link href="/privacy" className="text-gray-600 underline font-medium">Privacy Policy</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureItem({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <div className="flex gap-4 group">
      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#A832A8]/20 transition-colors duration-300">
        <Icon className="w-4 h-4 text-[#A832A8]" />
      </div>
      <div className="space-y-0.5">
        <h4 className="font-bold text-base">{title}</h4>
        <p className="text-gray-400 text-xs leading-relaxed max-w-[240px]">{desc}</p>
      </div>
    </div>
  );
}

