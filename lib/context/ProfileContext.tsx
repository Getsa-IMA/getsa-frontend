'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth, useUser } from '@clerk/nextjs';

export interface ProfileState {
  description: string;
  creator_id: number | null;
  clerk_id: string;
  fullName: string;
  imageUrl: string;
  phone: string;
  city: string;
  state: string;
  whatsapp: string;
  instagramLink: string;
  instagramFollowers: string;
  youtubeSubscribers: string;
  views30Days: string;
  tools: string[];
  genderMen: string;
  genderWomen: string;
  genderOther: string;
  age18to24: string;
  age25to34: string;
  age35to44: string;
  age45to54: string;
  age55to64: string;
  age65plus: string;
  created_at: string;
  email: string;
}

interface ProfileContextValue {
  profileData: ProfileState;
  profileExists: boolean | null;
  isLoading: boolean;
  setProfileData: React.Dispatch<React.SetStateAction<ProfileState>>;
  setProfileExists: React.Dispatch<React.SetStateAction<boolean | null>>;
  invalidate: () => void; // Call this after saving to force a fresh fetch
}

const defaultProfile: ProfileState = {
  description: '',
  creator_id: null,
  clerk_id: '',
  fullName: '',
  imageUrl: '',
  phone: '',
  city: '',
  state: '',
  whatsapp: '',
  instagramLink: '',
  instagramFollowers: '',
  youtubeSubscribers: '',
  views30Days: '',
  tools: [],
  genderMen: '0',
  genderWomen: '0',
  genderOther: '0',
  age18to24: '0',
  age25to34: '0',
  age35to44: '0',
  age45to54: '0',
  age55to64: '0',
  age65plus: '0',
  created_at: '',
  email: '',
};

const ProfileContext = createContext<ProfileContextValue>({
  profileData: defaultProfile,
  profileExists: null,
  isLoading: true,
  setProfileData: () => {},
  setProfileExists: () => {},
  invalidate: () => {},
});

export const useProfile = () => useContext(ProfileContext);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const { getToken } = useAuth();
  const { user, isLoaded } = useUser();

  const [profileData, setProfileData] = useState<ProfileState>(defaultProfile);
  const [profileExists, setProfileExists] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasFetched, setHasFetched] = useState(false);

  const fetchProfile = useCallback(async () => {
    if (!isLoaded || !user) return;
    try {
      console.log('[ProfileContext] Fetching profile from API...');
      setIsLoading(true);
      const token = await getToken();
      const response = await fetch('/api/v1/creators/profile', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      console.log('[ProfileContext] Raw API data:', data);

      if (data.exists) {
        const mapped: ProfileState = {
          description: data.description || '',
          creator_id: data.creator_id || data.creatorId || data.id || null,
          clerk_id: data.clerk_id || '',
          fullName: data.full_name || data.fullName || data.name || '',
          imageUrl: data.image_url || data.imageUrl || '',
          phone: data.phone || '',
          city: data.city || '',
          state: data.state || '',
          whatsapp: data.whatsapp || '',
          instagramLink: data.instagram_link || data.instagramLink || '',
          instagramFollowers: data.instagram_followers || data.instagramFollowers || '',
          youtubeSubscribers: data.youtube_subscribers || data.youtubeSubscribers || '',
          views30Days: data.views_30days || data.views30Days || '',
          tools: Array.isArray(data.tools)
            ? data.tools
            : typeof data.tools === 'string'
            ? JSON.parse(data.tools)
            : [],
          genderMen: data.gender_men || data.genderMen || '0',
          genderWomen: data.gender_women || data.genderWomen || '0',
          genderOther: data.gender_other || data.genderOther || '0',
          age18to24: data.age_18to24 || data.age18to24 || '0',
          age25to34: data.age_25to34 || data.age25to34 || '0',
          age35to44: data.age_35to44 || data.age35to44 || '0',
          age45to54: data.age_45to54 || data.age45to54 || '0',
          age55to64: data.age_55to64 || data.age55to64 || '0',
          age65plus: data.age_65plus || data.age65plus || '0',
          created_at: data.created_at || '',
          email: data.email || '',
        };
        setProfileData(mapped);
        setProfileExists(true);
        console.log('[ProfileContext] Profile cached in memory.');
      } else {
        setProfileExists(false);
      }
    } catch (error) {
      console.error('[ProfileContext] Error fetching profile:', error);
      setProfileExists(false);
    } finally {
      setIsLoading(false);
      setHasFetched(true);
    }
  }, [isLoaded, user, getToken]);

  // Only fetch once per session (when user is loaded and we haven't fetched yet)
  useEffect(() => {
    if (isLoaded && user && !hasFetched) {
      fetchProfile();
    } else if (isLoaded && !user) {
      setIsLoading(false);
    }
  }, [isLoaded, user, hasFetched, fetchProfile]);

  // invalidate() resets hasFetched so next render triggers a fresh fetch
  const invalidate = useCallback(() => {
    console.log('[ProfileContext] Cache invalidated, will re-fetch on next visit.');
    setHasFetched(false);
  }, []);

  return (
    <ProfileContext.Provider
      value={{ profileData, profileExists, isLoading, setProfileData, setProfileExists, invalidate }}
    >
      {children}
    </ProfileContext.Provider>
  );
}
