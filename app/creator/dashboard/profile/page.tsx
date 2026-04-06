'use client';

import React, { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { 
  Camera, 
  Video, 
  Wrench, 
  Mail, 
  Phone, 
  MapPin, 
  Edit3, 
  Check, 
  X,
  Plus,
  Trash2,
  Eye,
  Users,
  BarChart,
  MessageCircle,
  Link2
} from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export default function ProfilePage() {
  const { user, isLoaded } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  
  const [profileData, setProfileData] = useState({
    instagramFollowers: '12.5K',
    youtubeSubscribers: '5.2K',
    tools: ['Adobe Premiere Pro', 'CapCut', 'Canva', 'Lightroom'],
    fullName: '',
    imageUrl: '',
    phone: '+91 9876543210',
    city: 'Kolkata',
    state: 'West Bengal',
    views30Days: '150.2K',
    genderMen: '40',
    genderWomen: '55',
    genderOther: '5',
    age18to24: '30',
    age25to34: '45',
    age45to54: '15',
    age55to64: '10',
    whatsapp: '+91 9876543210',
    instagramLink: 'https://instagram.com/creator',
  });

  const [tempData, setTempData] = useState({ ...profileData });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setTempData({ ...tempData, imageUrl: objectUrl });
    }
  };

  const handleEditToggle = () => {
    if (!isEditing) {
      setTempData({ 
        ...profileData,
        fullName: profileData.fullName || user?.fullName || '',
        imageUrl: profileData.imageUrl || user?.imageUrl || ''
      });
    } else {
      setTempData({ ...profileData });
    }
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setProfileData({ ...tempData });
    setIsEditing(false);
  };

  if (!isLoaded) return null;

  return (
    <div className="min-h-screen bg-white">
      <div className="w-full max-w-4xl mx-auto p-6 md:p-10 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-gray-100">
          <div className="flex items-center gap-6">
            <div className="relative w-24 h-24 rounded-full overflow-hidden border border-gray-200 shadow-sm group">
              {(() => {
                const currentSrc = isEditing 
                  ? (tempData.imageUrl || user?.imageUrl || '/placeholder-avatar.png')
                  : (profileData.imageUrl || user?.imageUrl || '/placeholder-avatar.png');
                  
                return currentSrc.startsWith('blob:') ? (
                  <img src={currentSrc} alt="Avatar" className={cn("w-full h-full object-cover transition-all", isEditing && "opacity-50")} />
                ) : (
                  <Image
                    src={currentSrc}
                    alt={profileData.fullName || user?.fullName || 'User'}
                    fill
                    className={cn("object-cover transition-all", isEditing && "opacity-50")}
                  />
                );
              })()}
              
              {isEditing && (
                <label className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 cursor-pointer hover:bg-black/30 transition-all z-10">
                  <Camera className="text-white w-6 h-6 drop-shadow-md" />
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                </label>
              )}
            </div>
            <div className="space-y-1">
              {isEditing ? (
                <div className="space-y-2">
                  <input 
                    type="text" 
                    value={tempData.fullName}
                    onChange={(e) => setTempData({ ...tempData, fullName: e.target.value })}
                    className="bg-white border border-gray-300 rounded-md px-3 py-1.5 text-xl font-bold focus:outline-none focus:ring-2 focus:ring-getsa-purple/20 focus:border-getsa-purple w-64"
                    placeholder="Your Name"
                  />
                </div>
              ) : (
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                  {profileData.fullName || user?.fullName || 'Creator Name'}
                </h1>
              )}
              <p className="text-getsa-purple font-medium text-sm">Professional Creator</p>
            </div>
          </div>
          
          <button 
            onClick={handleEditToggle}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-md font-medium text-sm transition-all duration-200",
              isEditing 
                ? "bg-gray-100 text-gray-600 hover:bg-gray-200" 
                : "border border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50 shadow-sm"
            )}
          >
            {isEditing ? <X size={16} /> : <Edit3 size={16} />}
            <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
          </button>
        </header>

        <div className="space-y-14">
          {/* Social Reach Group */}
          <section>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Social Reach</h3>
            <div className="flex flex-col sm:flex-row gap-8 sm:gap-20">
              
              {/* Instagram */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-500">
                  <Camera size={18} className="text-pink-600" />
                  <span className="text-sm font-medium">Instagram Followers</span>
                </div>
                {isEditing ? (
                  <input 
                    type="text" 
                    value={tempData.instagramFollowers}
                    onChange={(e) => setTempData({ ...tempData, instagramFollowers: e.target.value })}
                    className="bg-white border border-gray-300 rounded-md px-3 py-1.5 text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-getsa-purple/20 focus:border-getsa-purple transition-all w-48"
                  />
                ) : (
                  <p className="text-3xl font-bold text-gray-900 tracking-tight">
                    {profileData.instagramFollowers}
                  </p>
                )}
              </div>

              {/* YouTube */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-500">
                  <Video size={20} className="text-red-500" />
                  <span className="text-sm font-medium">YouTube Subscribers</span>
                </div>
                {isEditing ? (
                  <input 
                    type="text" 
                    value={tempData.youtubeSubscribers}
                    onChange={(e) => setTempData({ ...tempData, youtubeSubscribers: e.target.value })}
                    className="bg-white border border-gray-300 rounded-md px-3 py-1.5 text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-getsa-purple/20 focus:border-getsa-purple transition-all w-48"
                  />
                ) : (
                  <p className="text-3xl font-bold text-gray-900 tracking-tight">
                    {profileData.youtubeSubscribers}
                  </p>
                )}
              </div>

            </div>
          </section>

          {/* Audience Analytics */}
          <section>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Audience Analytics</h3>
            <div className="space-y-8">
              
              {/* Overall Views */}
              <div>
                <div className="flex items-center gap-2 text-gray-500 mb-3">
                  <Eye size={16} />
                  <span className="text-sm font-medium">Views (Past 30 Days)</span>
                </div>
                {isEditing ? (
                  <input 
                    type="text" 
                    value={tempData.views30Days}
                    onChange={(e) => setTempData({ ...tempData, views30Days: e.target.value })}
                    className="bg-white border border-gray-300 rounded-md px-3 py-1.5 text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-getsa-purple/20 focus:border-getsa-purple transition-all w-48"
                  />
                ) : (
                  <p className="text-3xl font-bold text-gray-900 tracking-tight">
                    {profileData.views30Days}
                  </p>
                )}
              </div>

              {/* Demographics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 pt-4 border-t border-gray-50">
                {/* Gender */}
                <div>
                  <div className="flex items-center gap-2 text-gray-500 mb-4">
                    <Users size={16} />
                    <span className="text-sm font-medium">Gender Demographics (%)</span>
                  </div>
                  <div className="space-y-3">
                    {(['genderMen', 'genderWomen', 'genderOther'] as const).map((key) => {
                      const labels = { genderMen: 'Men', genderWomen: 'Women', genderOther: 'Other' };
                      return (
                      <div key={key} className="flex items-center justify-between max-w-[240px]">
                        <span className="text-sm text-gray-600">{labels[key]}</span>
                        {isEditing ? (
                          <div className="flex items-center gap-1">
                            <input 
                              type="number" 
                              value={tempData[key]}
                              onChange={(e) => setTempData({ ...tempData, [key]: e.target.value })}
                              className="bg-white border border-gray-300 rounded-md px-2 py-1 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-getsa-purple/20 focus:border-getsa-purple w-16 text-right"
                            />
                            <span className="text-sm text-gray-400">%</span>
                          </div>
                        ) : (
                          <span className="text-sm font-semibold text-gray-900">
                            {profileData[key]}%
                          </span>
                        )}
                      </div>
                    )})}
                  </div>
                </div>

                {/* Age */}
                <div>
                  <div className="flex items-center gap-2 text-gray-500 mb-4">
                    <BarChart size={16} />
                    <span className="text-sm font-medium">Age Distribution (%)</span>
                  </div>
                  <div className="space-y-3">
                    {(['age18to24', 'age25to34', 'age45to54', 'age55to64'] as const).map((key) => {
                      const labels = { age18to24: '18 - 24', age25to34: '25 - 34', age45to54: '45 - 54', age55to64: '55 - 64' };
                      return (
                      <div key={key} className="flex items-center justify-between max-w-[240px]">
                        <span className="text-sm text-gray-600">{labels[key]}</span>
                        {isEditing ? (
                          <div className="flex items-center gap-1">
                            <input 
                              type="number" 
                              value={tempData[key]}
                              onChange={(e) => setTempData({ ...tempData, [key]: e.target.value })}
                              className="bg-white border border-gray-300 rounded-md px-2 py-1 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-getsa-purple/20 focus:border-getsa-purple w-16 text-right"
                            />
                            <span className="text-sm text-gray-400">%</span>
                          </div>
                        ) : (
                          <span className="text-sm font-semibold text-gray-900">
                            {profileData[key]}%
                          </span>
                        )}
                      </div>
                    )})}
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* Tools */}
          <section>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Creative Toolkit</h3>
            <div className="flex flex-wrap gap-2">
              {isEditing ? (
                <div className="w-full space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {tempData.tools.map((tool, index) => (
                      <div key={index} className="flex items-center gap-1.5 bg-gray-100 px-3 py-1.5 rounded-md text-sm font-medium text-gray-700">
                        <span>{tool}</span>
                        <button 
                          onClick={() => {
                            const newTools = tempData.tools.filter((_, i) => i !== index);
                            setTempData({ ...tempData, tools: newTools });
                          }}
                          className="text-gray-400 hover:text-red-500 ml-1"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2 max-w-sm">
                    <input 
                      type="text" 
                      id="new-tool"
                      placeholder="Add a tool (e.g. Photoshop)"
                      className="flex-1 bg-white border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-getsa-purple/20 focus:border-getsa-purple"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          const input = e.target as HTMLInputElement;
                          if (input.value.trim()) {
                            setTempData({ ...tempData, tools: [...tempData.tools, input.value.trim()] });
                            input.value = '';
                          }
                        }
                      }}
                    />
                    <button 
                      onClick={() => {
                        const input = document.getElementById('new-tool') as HTMLInputElement;
                        if (input.value.trim()) {
                          setTempData({ ...tempData, tools: [...tempData.tools, input.value.trim()] });
                          input.value = '';
                        }
                      }}
                      className="px-4 py-1.5 rounded-md bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                </div>
              ) : (
                profileData.tools.map((tool, i) => (
                  <span key={i} className="px-3 py-1.5 bg-gray-50 rounded-md border border-gray-200 text-gray-700 text-sm font-medium">
                    {tool}
                  </span>
                ))
              )}
            </div>
          </section>

          {/* Personal Details */}
          <section>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Personal Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-12">
              
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-gray-400">
                  <Mail size={16} />
                  <span className="text-sm">Email Address</span>
                </div>
                <p className="text-base font-medium text-gray-900">{user?.primaryEmailAddress?.emailAddress || 'Not linked'}</p>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-gray-400">
                  <Phone size={16} />
                  <span className="text-sm">Phone Number</span>
                </div>
                {isEditing ? (
                  <input 
                    type="text" 
                    value={tempData.phone}
                    onChange={(e) => setTempData({ ...tempData, phone: e.target.value })}
                    className="w-full max-w-xs bg-white border border-gray-300 rounded-md px-3 py-1.5 text-base focus:outline-none focus:ring-2 focus:ring-getsa-purple/20 focus:border-getsa-purple"
                  />
                ) : (
                  <p className="text-base font-medium text-gray-900">{profileData.phone}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-gray-400">
                  <MapPin size={16} />
                  <span className="text-sm">City</span>
                </div>
                {isEditing ? (
                  <input 
                    type="text" 
                    value={tempData.city}
                    onChange={(e) => setTempData({ ...tempData, city: e.target.value })}
                    className="w-full max-w-xs bg-white border border-gray-300 rounded-md px-3 py-1.5 text-base focus:outline-none focus:ring-2 focus:ring-getsa-purple/20 focus:border-getsa-purple"
                  />
                ) : (
                  <p className="text-base font-medium text-gray-900">{profileData.city}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-gray-400">
                  <MapPin size={16} />
                  <span className="text-sm">State / Region</span>
                </div>
                {isEditing ? (
                  <input 
                    type="text" 
                    value={tempData.state}
                    onChange={(e) => setTempData({ ...tempData, state: e.target.value })}
                    className="w-full max-w-xs bg-white border border-gray-300 rounded-md px-3 py-1.5 text-base focus:outline-none focus:ring-2 focus:ring-getsa-purple/20 focus:border-getsa-purple"
                  />
                ) : (
                  <p className="text-base font-medium text-gray-900">{profileData.state}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-gray-400">
                  <MessageCircle size={16} />
                  <span className="text-sm">WhatsApp Number</span>
                </div>
                {isEditing ? (
                  <input 
                    type="text" 
                    value={tempData.whatsapp}
                    onChange={(e) => setTempData({ ...tempData, whatsapp: e.target.value })}
                    className="w-full max-w-xs bg-white border border-gray-300 rounded-md px-3 py-1.5 text-base focus:outline-none focus:ring-2 focus:ring-getsa-purple/20 focus:border-getsa-purple"
                  />
                ) : (
                  <p className="text-base font-medium text-gray-900">{profileData.whatsapp}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-gray-400">
                  <Link2 size={16} />
                  <span className="text-sm">Instagram Profile Link</span>
                </div>
                {isEditing ? (
                  <input 
                    type="text" 
                    value={tempData.instagramLink}
                    onChange={(e) => setTempData({ ...tempData, instagramLink: e.target.value })}
                    className="w-full max-w-xs bg-white border border-gray-300 rounded-md px-3 py-1.5 text-base focus:outline-none focus:ring-2 focus:ring-getsa-purple/20 focus:border-getsa-purple text-blue-600"
                  />
                ) : (
                  <a href={profileData.instagramLink} target="_blank" rel="noopener noreferrer" className="text-base font-medium text-blue-600 hover:text-blue-800 hover:underline break-all max-w-xs block">
                    {profileData.instagramLink}
                  </a>
                )}
              </div>

            </div>
          </section>
        </div>

        {/* Save Button for editing */}
        {isEditing && (
          <div className="pt-8 border-t border-gray-100 flex justify-end">
            <button 
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-2.5 rounded-md bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors shadow-sm w-full sm:w-auto justify-center"
            >
              <Check size={18} />
              <span>Save Changes</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
