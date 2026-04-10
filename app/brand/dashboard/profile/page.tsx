'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { 
  Building2, 
  Sparkles, 
  Loader2, 
  Mail, 
  MapPin, 
  Phone, 
  FileText, 
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Plus,
  Globe,
  Users,
  ExternalLink,
  Edit2,
  X
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { API_BASE } from '@/lib/config';

interface BrandSocialLink {
  brand_social_id: number;
  brand_id: number;
  social_link: string;
  followers: number;
  created_at?: string;
}

interface BrandProfile {
  brand_id: number;
  clerk_id: string;
  name: string;
  city: string;
  phone: string;
  description: string;
  email: string;
  created_at: string;
  social_links?: BrandSocialLink[];
}

export default function BrandProfilePage() {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const [profile, setProfile] = useState<BrandProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSettingUp, setIsSettingUp] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    city: '',
    phone: '',
    description: ''
  });

  // Social Links State
  const [isSocialModalOpen, setIsSocialModalOpen] = useState(false);
  const [socialFormData, setSocialFormData] = useState({
    social_link: '',
    followers: ''
  });
  const [editingSocialId, setEditingSocialId] = useState<number | null>(null);

  const fetchProfile = async () => {
    if (!isLoaded || !isSignedIn) return;

    try {
      setLoading(true);
      const token = await getToken();
      const response = await fetch('/api/v1/brands/profile', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const result = await response.json();
      if (result.success && result.exists) {
        setProfile(result.data);
        // Fetch social links separately
        fetchSocialLinks(result.data.brand_id);
      } else {
        setProfile(null);
      }
    } catch (err) {
      console.error('Error fetching brand profile:', err);
      // Don't show error for 404/not found as that's expected for new users
    } finally {
      setLoading(false);
    }
  };

  const fetchSocialLinks = async (brandId: number) => {
    try {
      const response = await fetch(`/api/v1/brands/social-links/${brandId}`);
      if (response.ok) {
        const result = await response.json();
        // Assuming result is the array or { success: true, data: [...] }
        const links = Array.isArray(result) ? result : (result.data || []);
        setProfile(prev => prev ? { ...prev, social_links: links } : null);
      }
    } catch (err) {
      console.error('Error fetching social links:', err);
    }
  };

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      fetchProfile();
    }
  }, [isLoaded, isSignedIn]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const token = await getToken();
      // Use POST for initial setup, but given the user said "FILL" and "Updated Brand Name", 
      // I'll assume they might want to use the same route for both.
      // Usually POST is for creation.
      const response = await fetch('/api/v1/brands/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      if (result.success) {
        setProfile(result.data || result.brand); // Handle different response formats
        setIsSettingUp(false);
        // Refresh profile to be sure
        fetchProfile();
      } else {
        setError(result.message || 'Failed to save profile');
      }
    } catch (err) {
      console.error('Error saving profile:', err);
      setError('An error occurred while saving your profile.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const token = await getToken();
      const url = editingSocialId 
        ? `/api/v1/brands/social-links/${editingSocialId}`
        : '/api/v1/brands/social-links';
      
      const method = editingSocialId ? 'PUT' : 'POST';
      
      const body = editingSocialId 
        ? { social_link: socialFormData.social_link, followers: parseInt(socialFormData.followers) }
        : { 
            brand_id: profile.brand_id, 
            social_link: socialFormData.social_link, 
            followers: parseInt(socialFormData.followers) 
          };

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body)
      });

      const result = await response.json();
      if (response.ok) {
        fetchProfile();
        setIsSocialModalOpen(false);
        setSocialFormData({ social_link: '', followers: '' });
        setEditingSocialId(null);
      } else {
        setError(result.message || 'Failed to save social link');
      }
    } catch (err) {
      console.error('Social link error:', err);
      setError('An error occurred while saving the social link.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const openSocialModal = (social?: BrandSocialLink) => {
    if (social) {
      setEditingSocialId(social.brand_social_id);
      setSocialFormData({
        social_link: social.social_link,
        followers: social.followers.toString()
      });
    } else {
      setEditingSocialId(null);
      setSocialFormData({ social_link: '', followers: '' });
    }
    setIsSocialModalOpen(true);
  };

  if (!isLoaded || loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 text-getsa-purple animate-spin" />
          <p className="text-slate-400 font-medium text-sm animate-pulse">Loading brand profile...</p>
        </div>
      </div>
    );
  }

  if (isSettingUp) {
    return (
      <div className="min-h-screen bg-[#FDFCFD] p-6 md:p-12">
        <div className="max-w-2xl mx-auto">
          <button 
            onClick={() => setIsSettingUp(false)}
            className="mb-8 text-slate-500 hover:text-slate-900 flex items-center gap-2 text-sm font-medium transition-colors"
          >
            ← Back to Dashboard
          </button>

          <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-purple-100 overflow-hidden border border-slate-100/50">
            <div className="bg-getsa-navy p-10 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-getsa-purple/20 rounded-full -mr-16 -mt-16 blur-3xl"></div>
              <h2 className="text-3xl font-black flex items-center gap-3 relative z-10">
                <Building2 className="w-8 h-8 text-getsa-purple" />
                Brand Profile
              </h2>
              <p className="text-slate-400 mt-2 font-medium relative z-10">Complete your details to start collaborating with creators.</p>
            </div>

            <form onSubmit={handleSubmit} className="p-10 space-y-8">
              {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-2xl flex items-center gap-3 text-sm font-bold border border-red-100 animate-in fade-in slide-in-from-top-2">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                    <Sparkles className="w-3 h-3 text-getsa-purple" />
                    Brand Name
                  </label>
                  <input 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Acme Corp"
                    className="w-full px-5 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-getsa-purple/20 focus:border-getsa-purple transition-all font-semibold text-slate-900"
                    required
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                    <Mail className="w-3 h-3 text-getsa-purple" />
                    Business Email
                  </label>
                  <input 
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="hello@brand.com"
                    className="w-full px-5 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-getsa-purple/20 focus:border-getsa-purple transition-all font-semibold text-slate-900"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                    <MapPin className="w-3 h-3 text-getsa-purple" />
                    City / Location
                  </label>
                  <input 
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="e.g. London, UK"
                    className="w-full px-5 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-getsa-purple/20 focus:border-getsa-purple transition-all font-semibold text-slate-900"
                    required
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                    <Phone className="w-3 h-3 text-getsa-purple" />
                    Phone Number
                  </label>
                  <input 
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-5 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-getsa-purple/20 focus:border-getsa-purple transition-all font-semibold text-slate-900"
                    required
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                  <FileText className="w-3 h-3 text-getsa-purple" />
                  About Your Brand
                </label>
                <textarea 
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Tell creators what your brand does and what you're looking for in collaborators..."
                  className="w-full px-5 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-getsa-purple/20 focus:border-getsa-purple transition-all font-semibold text-slate-900 resize-none min-h-[120px]"
                  required
                />
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-slate-800 transition-all disabled:opacity-50 shadow-xl shadow-slate-200 group h-16"
              >
                {isSubmitting ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <>
                    Save & Continue
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center p-6 bg-[#FDFCFD]">
        <div className="max-w-lg w-full bg-white rounded-[3rem] shadow-2xl shadow-purple-100/50 border border-slate-100 p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-getsa-gradient"></div>
          <div className="w-24 h-24 bg-purple-50 rounded-[2rem] flex items-center justify-center mx-auto mb-8 rotate-3 hover:rotate-0 transition-transform duration-500">
            <Building2 className="w-12 h-12 text-getsa-purple" />
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-4">Complete Your Setup</h2>
          <p className="text-slate-500 mb-10 text-base font-medium leading-relaxed">
            Ready to connect with top-tier creators? Setup your brand profile to start launching high-impact campaigns today.
          </p>
          <button 
            onClick={() => setIsSettingUp(true)}
            className="w-full bg-getsa-gradient text-white py-5 rounded-2xl font-black flex items-center justify-center gap-3 hover:scale-[1.02] transition-all shadow-[0_10px_30px_-10px_rgba(168,50,168,0.4)] group"
          >
            Setup Brand Profile
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <div className="mt-10 flex items-center justify-center gap-8 border-t border-slate-50 pt-8">
            <div className="text-center">
              <p className="text-xl font-bold text-slate-900">100%</p>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Free for Brands</p>
            </div>
            <div className="w-px h-8 bg-slate-100"></div>
            <div className="text-center">
              <p className="text-xl font-bold text-slate-900">5k+</p>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Top Creators</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-12 bg-white min-h-screen text-slate-900 font-sans pb-24 md:pb-12">
      <div className="max-w-4xl mx-auto space-y-16">
        
        {/* Profile Header */}
        <section className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-slate-50 pb-12">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-8">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-slate-50 rounded-3xl flex items-center justify-center p-6 border border-slate-100 shadow-sm shrink-0">
               <Building2 className="w-full h-full text-slate-400" />
            </div>
            
            <div className="text-center md:text-left space-y-4">
              <div className="space-y-1">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <h1 className="text-2xl md:text-3xl font-black tracking-tight">{profile.name}</h1>
                  <CheckCircle2 className="w-4 h-4 text-getsa-purple" />
                </div>
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-1.5">
                    <MapPin className="w-3 h-3" />
                    {profile.city}
                  </span>
                  <div className="w-1 h-1 bg-slate-200 rounded-full"></div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-getsa-purple">Official Partner</span>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
                <button 
                  onClick={() => {
                    setFormData({
                      name: profile.name || '',
                      email: profile.email || '',
                      city: profile.city || '',
                      phone: profile.phone || '',
                      description: profile.description || ''
                    });
                    setIsSettingUp(true);
                  }}
                  className="px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-100"
                >
                  Edit Profile
                </button>
                <button 
                  onClick={() => openSocialModal()}
                  className="px-4 py-2 bg-white text-slate-900 border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all active:scale-95"
                >
                  Add Platform
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
          <div className="md:col-span-8 space-y-16">
            
            {/* About Section */}
            <section className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-1 h-3 bg-getsa-purple rounded-full"></div>
                <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">About Brand</h2>
              </div>
              <p className="text-sm font-medium leading-loose text-slate-600 max-w-2xl">
                {profile.description}
              </p>
            </section>

            {/* Social Presence */}
            <section className="space-y-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-3 bg-getsa-purple rounded-full"></div>
                  <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">Social Reach</h2>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {profile.social_links && profile.social_links.length > 0 ? (
                  profile.social_links.map((social) => (
                    <div key={social.brand_social_id} className="group p-5 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-between hover:bg-white hover:border-slate-200 hover:shadow-xl hover:shadow-slate-100 transition-all duration-300">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white rounded-xl border border-slate-100 flex items-center justify-center">
                          <Globe className="w-4 h-4 text-getsa-purple" />
                        </div>
                        <div>
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Followers</p>
                          <p className="text-sm font-black text-slate-900">{(social.followers / 1000).toFixed(1)}k</p>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <button onClick={() => openSocialModal(social)} className="p-2 text-slate-300 hover:text-slate-900 transition-colors">
                          <Edit2 className="w-3 h-3" />
                        </button>
                        <a href={social.social_link} target="_blank" rel="noopener noreferrer" className="p-2 text-slate-300 hover:text-slate-900 transition-colors">
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  ))
                ) : (
                  <button 
                    onClick={() => openSocialModal()}
                    className="col-span-full py-8 border border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-2 group hover:border-getsa-purple transition-colors"
                  >
                    <Plus className="w-4 h-4 text-slate-300 group-hover:text-getsa-purple" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-getsa-purple">Add first platform</span>
                  </button>
                )}
              </div>
            </section>
          </div>

          <div className="md:col-span-4 space-y-16">
            {/* Contact Details */}
            <section className="space-y-8">
              <div className="flex items-center gap-2">
                <div className="w-1 h-3 bg-getsa-purple rounded-full"></div>
                <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">Directory</h2>
              </div>
              
              <div className="space-y-6">
                <ContactItem icon={Mail} label="Email" value={profile.email} />
                <ContactItem icon={Phone} label="Phone" value={profile.phone} />
                <ContactItem icon={MapPin} label="Location" value={profile.city} />
              </div>
            </section>

            {/* CTA */}
            <div className="p-8 bg-getsa-navy rounded-[2rem] text-white space-y-4 shadow-xl shadow-purple-50 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-24 h-24 bg-getsa-purple/20 blur-2xl rounded-full"></div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Launchpad</p>
              <p className="text-sm font-bold leading-relaxed">Connect with 5,000+ verified creators.</p>
              <button className="w-full py-3 bg-getsa-purple text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-lg shadow-purple-900/20">
                New Campaign
              </button>
            </div>
          </div>
        </div>

        {/* Social Links Modal */}
        <AnimatePresence>
          {isSocialModalOpen && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-sm">
              <motion.div 
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: 10 }}
                className="bg-white w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden border border-slate-100"
              >
                <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-tight">{editingSocialId ? 'Update Platform' : 'Add Platform'}</h3>
                    <p className="text-[10px] font-medium text-slate-400 mt-0.5 uppercase tracking-widest">Social Presence</p>
                  </div>
                  <button onClick={() => setIsSocialModalOpen(false)} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
                    <X className="w-4 h-4 text-slate-400" />
                  </button>
                </div>
                
                <form onSubmit={handleSocialSubmit} className="p-8 space-y-6">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">URL</label>
                    <input 
                      type="url"
                      value={socialFormData.social_link}
                      onChange={(e) => setSocialFormData(p => ({ ...p, social_link: e.target.value }))}
                      placeholder="https://instagram.com/brand"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-getsa-purple transition-all text-xs font-bold"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Followers</label>
                    <input 
                      type="number"
                      value={socialFormData.followers}
                      onChange={(e) => setSocialFormData(p => ({ ...p, followers: e.target.value }))}
                      placeholder="0"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-getsa-purple transition-all text-xs font-bold"
                      required
                    />
                  </div>
                  
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-slate-900 text-white py-4 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all disabled:opacity-50 h-12"
                  >
                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : 'Confirm'}
                  </button>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}

function ContactItem({ icon: Icon, label, value }: { icon: any, label: string, value: string }) {
  return (
    <div className="flex items-center gap-4 group/item">
      <div className="w-9 h-9 bg-slate-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover/item:text-getsa-purple transition-colors">
        <Icon className="w-3.5 h-3.5" />
      </div>
      <div className="space-y-0.5">
        <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest leading-none">{label}</p>
        <p className="text-xs font-bold text-slate-600 truncate max-w-[150px]">{value}</p>
      </div>
    </div>
  );
}

