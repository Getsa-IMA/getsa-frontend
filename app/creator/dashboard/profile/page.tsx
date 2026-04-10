"use client";

import React, { useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import {
  User,
  Mail,
  MapPin,
  Calendar,
  Globe,
  Edit,
  ArrowRight,
  ShieldCheck,
  Users,
  Eye,
  Briefcase,
  Tag,
  Wrench,
  Plus,
  X,
  Loader2,
  CheckCircle2,
  Phone
} from 'lucide-react';

import { useProfile } from '@/lib/context/ProfileContext';
import { cn } from '@/lib/utils';

export default function ProfilePage() {
  const { getToken } = useAuth();
  const { profileData, isLoading: isProfileLoading } = useProfile();
  
  // State for update flow
  const [activeModal, setActiveModal] = useState<'none' | 'selection' | 'profile' | 'social' | 'package'>('none');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoadingSocial, setIsLoadingSocial] = useState(true);
  
  const [socialData, setSocialData] = useState<any>(null);
  const [packages, setPackages] = useState<any[]>([]);

  const [formState, setFormState] = useState({
    social_link: "",
    followers: 0,
    total_views: 0,
    brand_colabs: 0,
    tools_used: [] as string[]
  });

  const [profileForm, setProfileForm] = useState({
    name: "",
    city: "",
    phone: "",
    description: ""
  });

  const [packageForm, setPackageForm] = useState({
    type: "reel",
    price: 0
  });

  const categories = ["Fashion", "Tech", "Lifestyle", "Gaming", "Food", "Travel", "Fitness", "Beauty"];
  const [newTool, setNewTool] = useState("");

  // Populate profile form when data arrives
  React.useEffect(() => {
    if (profileData) {
      setProfileForm({
        name: profileData.fullName || "",
        city: profileData.city || "",
        phone: profileData.phone || "",
        description: profileData.description || ""
      });
    }
  }, [profileData]);

  // Fetch social links and packages
  React.useEffect(() => {
    const fetchAdditionalData = async () => {
      const cid = profileData.creator_id;
      console.log(`[ProfilePage] Attempting fetch for creator_id:`, cid);
      
      if (!cid) {
        if (!isProfileLoading) console.warn("[ProfilePage] Profile loaded but no creator_id found. Check ProfileContext mapping.");
        return;
      }

      try {
        const [sRes, pRes] = await Promise.all([
          fetch(`/api/v1/creators/social-links/${cid}`),
          fetch(`/api/v1/creators/packages/${cid}`)
        ]);

        if (sRes.ok) {
          const sData = await sRes.json();
          console.log(`[ProfilePage] Social data response:`, sData);
          
          let extracted = sData;
          if (Array.isArray(sData)) {
            extracted = sData[0];
          } else if (sData.data) {
            extracted = Array.isArray(sData.data) ? sData.data[0] : sData.data;
          }

          if (extracted && (extracted.social_link || extracted.followers)) {
            const normalized = {
              ...extracted,
              followers: Number(extracted.followers) || 0,
              total_views: Number(extracted.total_views) || 0,
              brand_colabs: Number(extracted.brand_colabs) || 0
            };
            console.log(`[ProfilePage] Normalized socialData:`, normalized);
            setSocialData(normalized);
            setFormState({
              social_link: normalized.social_link || "",
              followers: normalized.followers,
              total_views: normalized.total_views,
              brand_colabs: normalized.brand_colabs,
              tools_used: normalized.tools_used || []
            });
          }
        }

        if (pRes.ok) {
          const pData = await pRes.json();
          setPackages(Array.isArray(pData) ? pData : (pData.data || []));
        }
      } catch (error) {
        console.error("Error fetching creator sub-data:", error);
      } finally {
        setIsLoadingSocial(false);
      }
    };

    if (!isProfileLoading) fetchAdditionalData();
  }, [profileData.creator_id, isProfileLoading]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ 
      ...prev, 
      [name]: name === 'social_link' ? value : parseInt(value) || 0 
    }));
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({ ...prev, [name]: value }));
  };

  const addTool = () => {
    if (newTool.trim() && !formState.tools_used.includes(newTool.trim())) {
      setFormState(prev => ({ ...prev, tools_used: [...prev.tools_used, newTool.trim()] }));
      setNewTool("");
    }
  };

  const removeTool = (toolToRemove: string) => {
    setFormState(prev => ({ ...prev, tools_used: prev.tools_used.filter(t => t !== toolToRemove) }));
  };

  const handleSubmitSocials = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const token = await getToken();
      const payload = { creator_id: profileData.creator_id, ...formState };
      const response = await fetch('/api/v1/creators/social-links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        setShowSuccess(true);
        setSocialData(payload);
        setTimeout(() => { setActiveModal('none'); setShowSuccess(false); }, 2000);
      }
    } catch (error: any) { console.error(error); } finally { setIsSubmitting(false); }
  };

  const handleSubmitProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const token = await getToken();
      const response = await fetch('/api/v1/creators/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(profileForm)
      });
      if (response.ok) {
        setShowSuccess(true);
        setTimeout(() => { setActiveModal('none'); setShowSuccess(false); window.location.reload(); }, 2000);
      }
    } catch (error: any) { console.error(error); } finally { setIsSubmitting(false); }
  };

  const handleSubmitPackage = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const token = await getToken();
      
      // Check if package type already exists
      const existingPackage = packages.find(pkg => pkg.type === packageForm.type);
      
      const payload = { 
        creator_id: profileData.creator_id, 
        ...packageForm 
      };

      let response;
      if (existingPackage) {
        // UPDATE existing package
        // The ID might be package_id or id depending on backend convention
        const packageId = existingPackage.package_id || existingPackage.id;
        console.log(`[ProfilePage] Updating existing package: ${packageId}`);
        response = await fetch(`/api/v1/creators/packages/${packageId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify(packageForm)
        });
      } else {
        // CREATE new package
        console.log(`[ProfilePage] Creating new package of type: ${packageForm.type}`);
        response = await fetch('/api/v1/creators/packages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify(payload)
        });
      }

      if (response && response.ok) {
        setShowSuccess(true);
        const pRes = await fetch(`/api/v1/creators/packages/${profileData.creator_id}`);
        if (pRes.ok) {
          const pData = await pRes.json();
          setPackages(Array.isArray(pData) ? pData : (pData.data || []));
        }
        setTimeout(() => { setActiveModal('none'); setShowSuccess(false); }, 2000);
      } else {
        const err = await response?.text();
        console.error("Package operation failed:", err);
        alert(`Operation failed: ${err}`);
      }
    } catch (error: any) { 
      console.error(error); 
    } finally { 
      setIsSubmitting(false); 
    }
  };

  if (isProfileLoading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-purple-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 sm:p-8 md:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Header - Mobile friendly */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 mb-6 relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-tr from-[#A832A8] to-[#7038D1] flex items-center justify-center text-white text-3xl sm:text-4xl font-black shadow-xl shadow-purple-200">
              {profileData.fullName?.charAt(0) || 'U'}
            </div>
            
            <div className="flex-1 text-center md:text-left max-w-full md:max-w-[70%]">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-2">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900">{profileData.fullName || 'User'}</h1>
                <span className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-bold rounded-full border border-green-100">Verified</span>
              </div>
              <p className="text-slate-500 font-medium mb-4">{profileData.description || 'Content Creator'}</p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                <div className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {profileData.city || 'Global'}</div>
                <div className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Joined {profileData.created_at ? new Date(profileData.created_at).getFullYear() : '2026'}</div>
              </div>
            </div>

            <button 
              onClick={() => setActiveModal('selection')}
              className="w-full md:w-auto px-6 py-3 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
            >
              <Edit className="w-4 h-4" /> Manage
            </button>
          </div>
        </div>

        {/* Metrics - 2 per row on mobile */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <MetricCard icon={Users} label="Followers" value={socialData?.followers?.toLocaleString() || '0'} color="bg-purple-50 text-purple-600" />
          <MetricCard icon={Eye} label="Views" value={socialData?.total_views?.toLocaleString() || '0'} color="bg-blue-50 text-blue-600" />
          <MetricCard icon={Briefcase} label="Collabs" value={socialData?.brand_colabs || '0'} color="bg-pink-50 text-pink-600" />
          <MetricCard icon={ShieldCheck} label="Status" value="Active" color="bg-green-50 text-green-600" />
        </div>

        {/* Packages Section */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Tag className="w-5 h-5 text-purple-600" /> Packages
            </h3>
            <button 
              onClick={() => setActiveModal('package')}
              className="text-xs font-black uppercase text-purple-600 hover:text-purple-700 underline underline-offset-4"
            >
              + Add New
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {packages.length > 0 ? packages.map((pkg, i) => (
              <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between group">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase mb-1">1x {pkg.type}</p>
                  <p className="text-xl font-black text-slate-900">₹{parseFloat(pkg.price).toLocaleString()}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-purple-600 group-hover:text-white transition-all">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            )) : (
              <div className="col-span-full py-10 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 text-center">
                <p className="text-sm font-medium text-slate-400 uppercase tracking-widest">No Packages Listed</p>
              </div>
            )}
          </div>
        </div>

        {/* Links & Contact */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Contact Info</p>
             <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-purple-500" />
                  <span className="text-sm font-bold text-slate-700">{profileData.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-purple-500" />
                  <span className="text-sm font-bold text-slate-700">{profileData.phone || 'Not provided'}</span>
                </div>
             </div>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Online Presence</p>
             {socialData?.social_link ? (
               <a href={socialData.social_link} target="_blank" className="flex items-center justify-between p-3 bg-purple-50 rounded-2xl hover:bg-purple-100 transition-all group">
                 <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-purple-600" />
                    <span className="text-sm font-black text-purple-900">Visit Profile</span>
                 </div>
                 <ArrowRight className="w-4 h-4 text-purple-400 group-hover:translate-x-1 transition-transform" />
               </a>
             ) : (
               <button onClick={() => setActiveModal('social')} className="w-full p-3 border-2 border-dashed border-slate-200 rounded-2xl text-xs font-bold text-slate-400 hover:border-purple-300 hover:text-purple-600 transition-all">
                 Link Social Account
               </button>
             )}
          </div>
        </div>
      </div>

      {/* Selection Modal */}
      {activeModal === 'selection' && (
        <ModalWrapper onClose={() => setActiveModal('none')}>
          <div className="p-8">
            <h3 className="text-2xl font-black text-slate-900 mb-6">Manage Profile</h3>
            <div className="space-y-3">
              <SelectionOption icon={User} title="Core Details" sub="Name, City, Category" onClick={() => setActiveModal('profile')} />
              <SelectionOption icon={Globe} title="Social Reach" sub="Stats & Handle" onClick={() => setActiveModal('social')} />
              <SelectionOption icon={Tag} title="Packages" sub="Set Your Prices" onClick={() => setActiveModal('package')} />
            </div>
          </div>
        </ModalWrapper>
      )}

      {/* Package Modal */}
      {activeModal === 'package' && (
        <ModalWrapper onClose={() => setActiveModal('none')}>
          {showSuccess ? <SuccessView title="Price Set" sub="Your package is now live on your profile." /> : (
            <form onSubmit={handleSubmitPackage} className="p-8 space-y-6">
              <ModalHeaderNew title="Add Package" sub="Set your service rates" />
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Type</label>
                  <select value={packageForm.type} onChange={e => setPackageForm(p => ({ ...p, type: e.target.value }))} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold">
                    <option value="reel">Instagram Reel</option>
                    <option value="post">Static Post</option>
                    <option value="story">Story Slide</option>
                  </select>
                </div>
                <FormInputNew icon={Briefcase} label="Price (₹)" type="number" value={packageForm.price} onChange={(e: any) => setPackageForm(p => ({ ...p, price: e.target.value }))} />
              </div>
              <ModalFooterNew isSubmitting={isSubmitting} onCancel={() => setActiveModal('selection')} />
            </form>
          )}
        </ModalWrapper>
      )}

      {/* Core Profile Modal */}
      {activeModal === 'profile' && (
        <ModalWrapper onClose={() => setActiveModal('none')}>
          <form onSubmit={handleSubmitProfile} className="p-8 space-y-6">
            <ModalHeaderNew title="Basic Info" sub="Update your identity" />
            <div className="space-y-4">
              <FormInputNew icon={User} label="Name" value={profileForm.name} onChange={(e: { target: { value: any; }; }) => setProfileForm(p => ({ ...p, name: e.target.value }))} />
              <FormInputNew icon={MapPin} label="City" value={profileForm.city} onChange={(e: { target: { value: any; }; }) => setProfileForm(p => ({ ...p, city: e.target.value }))} />
              <FormInputNew icon={Phone} label="Phone" value={profileForm.phone} onChange={(e: { target: { value: any; }; }) => setProfileForm(p => ({ ...p, phone: e.target.value }))} />
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Category</label>
                <select value={profileForm.description} onChange={e => setProfileForm(p => ({ ...p, description: e.target.value }))} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold">
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <ModalFooterNew isSubmitting={isSubmitting} onCancel={() => setActiveModal('selection')} />
          </form>
        </ModalWrapper>
      )}

      {/* Social Modal */}
      {activeModal === 'social' && (
        <ModalWrapper onClose={() => setActiveModal('none')}>
          <form onSubmit={handleSubmitSocials} className="p-8 space-y-6">
            <ModalHeaderNew title="Social Stats" sub="Update your reach" />
            <div className="space-y-4">
              <FormInputNew icon={Globe} label="Link" value={formState.social_link} onChange={(e: { target: { value: any; }; }) => setFormState(p => ({ ...p, social_link: e.target.value }))} />
              <div className="grid grid-cols-2 gap-3">
                <FormInputNew icon={Users} label="Followers" type="number" value={formState.followers} onChange={(e: { target: { value: string; }; }) => setFormState(p => ({ ...p, followers: parseInt(e.target.value) || 0 }))} />
                <FormInputNew icon={Eye} label="Views" type="number" value={formState.total_views} onChange={(e: { target: { value: string; }; }) => setFormState(p => ({ ...p, total_views: parseInt(e.target.value) || 0 }))} />
              </div>
              <FormInputNew icon={Briefcase} label="Collabs" type="number" value={formState.brand_colabs} onChange={(e: { target: { value: string; }; }) => setFormState(p => ({ ...p, brand_colabs: parseInt(e.target.value) || 0 }))} />
              <div className="space-y-3">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Tools</p>
                <div className="flex flex-wrap gap-2">{formState.tools_used.map(t => <span key={t} className="px-2 py-1 bg-purple-50 text-purple-600 text-[10px] font-bold rounded-lg border border-purple-100 flex items-center gap-1">{t} <button type="button" onClick={() => removeTool(t)}><X className="w-3 h-3" /></button></span>)}</div>
                <div className="flex gap-2">
                  <input value={newTool} onChange={e => setNewTool(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTool())} className="flex-1 p-2 bg-slate-50 rounded-xl text-xs border border-slate-200" placeholder="e.g. Photoshop" />
                  <button type="button" onClick={addTool} className="p-2 bg-slate-900 text-white rounded-xl"><Plus className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
            <ModalFooterNew isSubmitting={isSubmitting} onCancel={() => setActiveModal('selection')} />
          </form>
        </ModalWrapper>
      )}
    </div>
  );
}

// Minimalist Sub-components
function MetricCard({ icon: Icon, label, value, color }: any) {
  return (
    <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm text-center">
      <div className={cn("inline-flex w-10 h-10 rounded-xl items-center justify-center mb-3", color)}>
        <Icon className="w-5 h-5" />
      </div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter mb-1">{label}</p>
      <p className="text-lg font-black text-slate-900 leading-none">{value}</p>
    </div>
  );
}

function ModalWrapper({ children, onClose }: any) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={onClose} />
      <div className="relative bg-white w-full max-w-lg rounded-[2rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {children}
      </div>
    </div>
  );
}

function SelectionOption({ icon: Icon, title, sub, onClick }: any) {
  return (
    <button onClick={onClick} className="w-full flex items-center gap-4 p-4 bg-slate-50 border border-slate-100 rounded-3xl hover:bg-purple-600 hover:text-white transition-all group">
      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-900 group-hover:bg-purple-500 group-hover:text-white transition-all">
        <Icon className="w-6 h-6" />
      </div>
      <div className="text-left">
        <p className="font-black text-slate-900 leading-tight group-hover:text-white">{title}</p>
        <p className="text-[10px] font-bold text-slate-400 group-hover:text-white/80 uppercase">{sub}</p>
      </div>
    </button>
  );
}

function ModalHeaderNew({ title, sub }: any) {
  return (
    <div className="mb-6">
      <h3 className="text-2xl font-black text-slate-900 tracking-tight">{title}</h3>
      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{sub}</p>
    </div>
  );
}

function ModalFooterNew({ isSubmitting, onCancel }: any) {
  return (
    <div className="flex gap-3 pt-4 border-t border-slate-100">
      <button type="button" onClick={onCancel} className="flex-1 py-4 text-xs font-black uppercase text-slate-400 hover:text-slate-900 transition-colors">Back</button>
      <button type="submit" disabled={isSubmitting} className="flex-[2] py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-2">
        {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Confirm'}
      </button>
    </div>
  );
}

function FormInputNew({ icon: Icon, label, name, type = "text", value, onChange }: any) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5"><Icon className="w-3 h-3" /> {label}</label>
      <input type={type} name={name} value={value} onChange={onChange} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-purple-500/20 transition-all outline-none" required />
    </div>
  );
}

function SuccessView({ title, sub }: any) {
  return (
    <div className="p-12 text-center animate-in zoom-in-95 duration-300">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-6"><CheckCircle2 className="w-10 h-10" /></div>
      <h3 className="text-2xl font-black text-slate-900 mb-2 uppercase tracking-tighter">{title}</h3>
      <p className="text-sm font-medium text-slate-500 uppercase tracking-widest leading-none">{sub}</p>
    </div>
  );
}
