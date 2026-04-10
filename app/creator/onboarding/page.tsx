"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { 
  Loader2, 
  Globe, 
  Users, 
  Eye, 
  Briefcase, 
  Wrench, 
  Plus, 
  X, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";
import Image from "next/image";

export default function CreatorOnboarding() {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const router = useRouter();
  
  const [step, setStep] = useState<"syncing" | "socials" | "success">("syncing");
  const [creatorId, setCreatorId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Social form state
  const [formState, setFormState] = useState({
    social_link: "",
    followers: 0,
    total_views: 0,
    brand_colabs: 0,
    tools_used: [] as string[]
  });
  const [newTool, setNewTool] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Step 1: Sync Basic Profile
  useEffect(() => {
    async function completeBasicSync() {
      if (!isLoaded || !isSignedIn || step !== "syncing") return;

      const pendingData = localStorage.getItem("pending_creator_data");
      
      if (!pendingData) {
        console.log("No pending data found, redirecting to dashboard...");
        router.push("/creator/dashboard/profile");
        return;
      }

      try {
        const token = await getToken();
        const data = JSON.parse(pendingData);

        const response = await fetch("/api/v1/creators/profile", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(data)
        });

        if (response.ok) {
          const result = await response.json();
          const actualId = result.creator_id || result.data?.creator_id;
          
          if (actualId) {
            setCreatorId(actualId);
            setStep("socials");
            localStorage.removeItem("pending_creator_data");
          } else {
            // Fallback if ID is missing but response is OK
            console.warn("Creator ID not returned from sync, proceeding to dashboard.");
            router.push("/creator/dashboard/profile");
          }
        } else {
          console.error("Failed to update basic profile");
          router.push("/creator/dashboard/profile");
        }
      } catch (error) {
        console.error("Error during onboarding sync:", error);
        router.push("/creator/dashboard/profile");
      }
    }

    completeBasicSync();
  }, [isLoaded, isSignedIn, getToken, router, step]);

  const addTool = () => {
    if (newTool.trim() && !formState.tools_used.includes(newTool.trim())) {
      setFormState(prev => ({
        ...prev,
        tools_used: [...prev.tools_used, newTool.trim()]
      }));
      setNewTool("");
    }
  };

  const removeTool = (toolToRemove: string) => {
    setFormState(prev => ({
      ...prev,
      tools_used: prev.tools_used.filter(t => t !== toolToRemove)
    }));
  };

  const handleSocialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!creatorId) return;

    setIsSubmitting(true);
    try {
      const token = await getToken();
      const payload = {
        creator_id: creatorId,
        ...formState
      };

      const response = await fetch('/api/v1/creators/social-links', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setStep("success");
        setTimeout(() => {
          router.push("/creator/dashboard/profile");
        }, 2000);
      } else {
        alert("Ops! Something went wrong while saving socials.");
      }
    } catch (error) {
      console.error("Social sync error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (step === "syncing") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-6">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="flex justify-center">
            <Loader2 className="w-12 h-12 text-purple-600 animate-spin" />
          </div>
          <h1 className="text-2xl font-black text-slate-900">Finalizing Registration</h1>
          <p className="text-slate-500 font-medium">Syncing your personal details with the Getsa backend...</p>
        </div>
      </div>
    );
  }

  if (step === "socials") {
    return (
      <div className="min-h-screen bg-white md:bg-slate-50 flex items-center justify-center p-0 md:p-6">
        <div className="max-w-xl w-full bg-white rounded-none md:rounded-[2.5rem] shadow-none md:shadow-2xl md:shadow-purple-100 overflow-hidden">
          <div className="bg-slate-900 md:bg-gradient-to-r md:from-slate-900 md:to-purple-900 p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
            <div className="relative z-10">
              <span className="inline-block px-3 py-1 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">Stage 2: Metrics</span>
              <h2 className="text-3xl font-black mb-2">Build Your Media Kit</h2>
              <p className="text-slate-400 font-medium text-sm">Help brands find you by sharing your reach and tools.</p>
            </div>
          </div>

          <form onSubmit={handleSocialSubmit} className="p-8 space-y-8">
            <div className="space-y-6">
              <OnboardingInput 
                icon={Globe} 
                label="Primary Platform Link" 
                name="social_link" 
                value={formState.social_link} 
                placeholder="https://instagram.com/yourname"
                onChange={(v: any) => setFormState(p => ({ ...p, social_link: v }))} 
              />

              <div className="grid grid-cols-2 gap-4">
                <OnboardingInput 
                  icon={Users} 
                  label="Followers" 
                  type="number" 
                  value={formState.followers.toString()} 
                  onChange={(v: string) => setFormState(p => ({ ...p, followers: parseInt(v) || 0 }))} 
                />
                <OnboardingInput 
                  icon={Eye} 
                  label="Total Views (30d)" 
                  type="number" 
                  value={formState.total_views.toString()} 
                  onChange={(v: string) => setFormState(p => ({ ...p, total_views: parseInt(v) || 0 }))} 
                />
              </div>

              <OnboardingInput 
                icon={Briefcase} 
                label="Brand Comms (60d)" 
                type="number" 
                value={formState.brand_colabs.toString()} 
                onChange={(v: string) => setFormState(p => ({ ...p, brand_colabs: parseInt(v) || 0 }))} 
              />

              <div className="space-y-3">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Wrench className="w-3 h-3" />
                  Tools / Creative Software
                </label>
                <div className="flex flex-wrap gap-2">
                  {formState.tools_used.map(tool => (
                    <span key={tool} className="flex items-center gap-1.5 px-3 py-1 bg-purple-50 text-purple-700 text-xs font-bold rounded-lg border border-purple-100">
                      {tool}
                      <button type="button" onClick={() => removeTool(tool)}>
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={newTool} 
                    onChange={(e) => setNewTool(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTool())}
                    placeholder="e.g. Photoshop" 
                    className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all font-medium"
                  />
                  <button type="button" onClick={addTool} className="p-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors">
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting || !formState.social_link}
              className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-slate-800 transition-all disabled:opacity-50 shadow-xl shadow-slate-200"
            >
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Complete Setup
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (step === "success") {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center space-y-6">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-600 animate-bounce">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-black text-slate-900">You're All Set!</h1>
          <p className="text-slate-500 font-medium">Redirecting you to your premium dashboard...</p>
        </div>
      </div>
    );
  }

  return null;
}

function OnboardingInput({ icon: Icon, label, name, type = "text", value, onChange, placeholder }: any) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
        <Icon className="w-3 h-3 text-purple-600" />
        {label}
      </label>
      <input 
        type={type}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required
        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all font-medium"
      />
    </div>
  );
}
