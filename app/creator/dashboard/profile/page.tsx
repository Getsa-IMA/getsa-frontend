'use client';

import React, { useState } from 'react';
import { useUser, useAuth } from '@clerk/nextjs';
import {
  Camera,
  Video,
  Mail,
  Phone,
  MapPin,
  Edit3,
  Check,
  X,
  Eye,
  Users,
  BarChart,
  MessageCircle,
  Link2,
  Loader2
} from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { saveProfile, ProfileData } from '@/lib/services/user';
import { useProfile } from '@/lib/context/ProfileContext';

export default function ProfilePage() {
  const { user } = useUser();
  const { getToken } = useAuth();
  const { profileData, profileExists, isLoading, setProfileData, setProfileExists, invalidate } = useProfile();

  const [isEditing, setIsEditing] = useState(false);
  const [isFirstTimeEditing, setIsFirstTimeEditing] = useState(false);
  const [tempData, setTempData] = useState({ ...profileData });
  const [isSaving, setIsSaving] = useState(false);

  // ─── Loading State ───────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-gray-400">
          <Loader2 className="w-8 h-8 animate-spin" />
          <p className="text-sm font-medium">Loading profile…</p>
        </div>
      </div>
    );
  }

  // ─── No Profile Yet ──────────────────────────────────────────
  const handleStartEditing = () => {
    const startData = {
      ...profileData,
      fullName: profileData.fullName || user?.fullName || '',
      imageUrl: profileData.imageUrl || user?.imageUrl || '',
    };
    setTempData(startData);
    setProfileExists(true);
    setIsEditing(true);
    setIsFirstTimeEditing(true);
  };

  if (!profileExists) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4 sm:p-6">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 sm:p-8 text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Edit3 className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Your profile is incomplete</h2>
            <p className="text-gray-600 mb-6 text-sm sm:text-base">
              Complete your creator profile to get started.
            </p>
            <button
              onClick={handleStartEditing}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm sm:text-base"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── Handlers ────────────────────────────────────────────────
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
        imageUrl: profileData.imageUrl || user?.imageUrl || '',
      });
      setIsFirstTimeEditing(false);
    } else {
      setTempData({ ...profileData });
      if (isFirstTimeEditing) {
        setProfileExists(false);
        setIsFirstTimeEditing(false);
      }
    }
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const token = await getToken();
      if (!token) {
        console.error('No authentication token available');
        return;
      }

      const profilePayload: ProfileData = {
        fullName: tempData.fullName,
        phone: tempData.phone,
        city: tempData.city,
        state: tempData.state,
        whatsapp: tempData.whatsapp,
        instagramLink: tempData.instagramLink || '',
        instagramFollowers: tempData.instagramFollowers,
        youtubeSubscribers: tempData.youtubeSubscribers,
        views30Days: tempData.views30Days,
        tools: tempData.tools,
        genderMen: tempData.genderMen,
        genderWomen: tempData.genderWomen,
        genderOther: tempData.genderOther,
        age18to24: tempData.age18to24,
        age25to34: tempData.age25to34,
        age45to54: tempData.age45to54,
        age55to64: tempData.age55to64,
      };

      const result = await saveProfile(profilePayload, token);

      if (result.success) {
        // Update context cache with new data (no re-fetch needed)
        setProfileData({ ...tempData });
        setIsEditing(false);
        setIsFirstTimeEditing(false);
        console.log('Profile saved and context cache updated.');
      } else {
        console.error('Failed to save profile:', result.error);
      }
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setIsSaving(false);
    }
  };

  // ─── Profile View / Edit ─────────────────────────────────────
  return (
    <div className="min-h-screen bg-white">
      <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 md:p-10 space-y-8 sm:space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">

        {/* Header */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 pb-6 sm:pb-8 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border border-gray-200 shadow-sm group mx-auto sm:mx-0">
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
                  <Camera className="text-white w-5 h-5 sm:w-6 sm:h-6 drop-shadow-md" />
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                </label>
              )}
            </div>
            <div className="space-y-1 text-center sm:text-left">
              {isEditing ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={tempData.fullName}
                    onChange={(e) => setTempData({ ...tempData, fullName: e.target.value })}
                    className="bg-white border border-gray-300 rounded-md px-3 py-2 text-lg sm:text-xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 w-full max-w-xs sm:w-64 mx-auto sm:mx-0"
                    placeholder="Your Name"
                  />
                </div>
              ) : (
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                  {profileData.fullName || user?.fullName || 'Creator Name'}
                </h1>
              )}
              <p className="text-getsa-purple font-medium text-sm">Professional Creator</p>
            </div>
          </div>

          <div className="flex justify-center sm:justify-end w-full sm:w-auto mt-4 sm:mt-0">
            {isEditing ? (
              <button
                onClick={handleEditToggle}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-md font-medium text-sm transition-all duration-200 w-full sm:w-auto bg-gray-100 text-gray-600 hover:bg-gray-200"
              >
                <X size={16} />
                <span>Cancel</span>
              </button>
            ) : (
              <button
                onClick={handleEditToggle}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-md font-medium text-sm transition-all duration-200 w-full sm:w-auto border border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50 shadow-sm"
              >
                <Edit3 size={16} />
                <span>Edit Profile</span>
              </button>
            )}
          </div>
        </header>

        <div className="space-y-10 sm:space-y-14">
          {/* Social Reach */}
          <section>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 sm:mb-6">Social Reach</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 lg:gap-20">
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
                    className="bg-white border border-gray-300 rounded-md px-3 py-2 text-lg sm:text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all w-full"
                    placeholder="e.g. 12.5K"
                  />
                ) : (
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">{profileData.instagramFollowers}</p>
                )}
              </div>

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
                    className="bg-white border border-gray-300 rounded-md px-3 py-2 text-lg sm:text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all w-full"
                    placeholder="e.g. 5.2K"
                  />
                ) : (
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">{profileData.youtubeSubscribers}</p>
                )}
              </div>
            </div>
          </section>

          {/* Audience Analytics */}
          <section>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 sm:mb-6">Audience Analytics</h3>
            <div className="space-y-6 sm:space-y-8">
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
                    className="bg-white border border-gray-300 rounded-md px-3 py-2 text-lg sm:text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all w-full max-w-xs"
                    placeholder="e.g. 150.2K"
                  />
                ) : (
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">{profileData.views30Days}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10 pt-4 border-t border-gray-50">
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
                        <div key={key} className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">{labels[key]}</span>
                          {isEditing ? (
                            <div className="flex items-center gap-1">
                              <input
                                type="number"
                                value={tempData[key]}
                                onChange={(e) => setTempData({ ...tempData, [key]: e.target.value })}
                                className="bg-white border border-gray-300 rounded-md px-2 py-1 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 w-16 text-right"
                              />
                              <span className="text-sm text-gray-400">%</span>
                            </div>
                          ) : (
                            <span className="text-sm font-semibold text-gray-900">{profileData[key]}%</span>
                          )}
                        </div>
                      );
                    })}
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
                        <div key={key} className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">{labels[key]}</span>
                          {isEditing ? (
                            <div className="flex items-center gap-1">
                              <input
                                type="number"
                                value={tempData[key]}
                                onChange={(e) => setTempData({ ...tempData, [key]: e.target.value })}
                                className="bg-white border border-gray-300 rounded-md px-2 py-1 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 w-16 text-right"
                              />
                              <span className="text-sm text-gray-400">%</span>
                            </div>
                          ) : (
                            <span className="text-sm font-semibold text-gray-900">{profileData[key]}%</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Tools */}
          <section>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 sm:mb-6">Creative Toolkit</h3>
            <div className="space-y-4">
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
                  <div className="flex flex-col sm:flex-row gap-2 max-w-sm">
                    <input
                      type="text"
                      id="new-tool"
                      placeholder="Add a tool (e.g. Photoshop)"
                      className="flex-1 bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
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
                      className="px-4 py-2 rounded-md bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors w-full sm:w-auto"
                    >
                      Add
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {profileData.tools.map((tool, i) => (
                    <span key={i} className="px-3 py-1.5 bg-gray-50 rounded-md border border-gray-200 text-gray-700 text-sm font-medium">
                      {tool}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Personal Details */}
          <section>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 sm:mb-6">Personal Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 sm:gap-y-8 gap-x-6 sm:gap-x-12">

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-gray-400">
                  <Mail size={16} />
                  <span className="text-sm">Email Address</span>
                </div>
                <p className="text-base font-medium text-gray-900 break-all">{user?.primaryEmailAddress?.emailAddress || 'Not linked'}</p>
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
                    className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    placeholder="+91 9876543210"
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
                    className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    placeholder="e.g. Kolkata"
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
                    className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    placeholder="e.g. West Bengal"
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
                    className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    placeholder="+91 9876543210"
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
                    className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-blue-600"
                    placeholder="https://instagram.com/username"
                  />
                ) : (
                  <a href={profileData.instagramLink} target="_blank" rel="noopener noreferrer" className="text-base font-medium text-blue-600 hover:text-blue-800 hover:underline break-all block">
                    {profileData.instagramLink}
                  </a>
                )}
              </div>

            </div>
          </section>
        </div>

        {/* Save Button */}
        {isEditing && (
          <div className="pt-6 sm:pt-8 border-t border-gray-100 flex justify-center sm:justify-end">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors shadow-sm w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Check size={18} />}
              <span>{isSaving ? 'Saving…' : 'Save Changes'}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
