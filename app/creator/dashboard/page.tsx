'use client';

import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  User,
  FileText,
  Tag,
  Palette,
  MapPin,
  Users,
  Heart,
  MessageCircle,
  Camera,
  Save,
  Sparkles
} from 'lucide-react';

interface FormData {
  handle: string;
  bio: string;
  niche_tags: string[];
  tone_labels: string[];
  country: string;
  followers: number;
  avg_likes: number;
  avg_comments: number;
  captions: string[];
}

export default function CreatorDashboardPage() {
  const [formData, setFormData] = useState<FormData>({
    handle: '',
    bio: '',
    niche_tags: [],
    tone_labels: [],
    country: '',
    followers: 0,
    avg_likes: 0,
    avg_comments: 0,
    captions: ['', '', '']
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'niche_tags' || name === 'tone_labels') {
      setFormData(prev => ({
        ...prev,
        [name]: value.split(',').map(tag => tag.trim()).filter(tag => tag)
      }));
    } else if (name.startsWith('caption')) {
      const index = parseInt(name.split('_')[1]);
      setFormData(prev => ({
        ...prev,
        captions: prev.captions.map((cap, i) => i === index ? value : cap)
      }));
    } else if (name === 'followers' || name === 'avg_likes' || name === 'avg_comments') {
      setFormData(prev => ({
        ...prev,
        [name]: parseInt(value) || 0
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    // Here you would typically send the data to your backend
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-slate-200 shadow-sm mb-6">
          <Sparkles className="w-5 h-5 text-[#A832A8]" />
          <span className="text-sm font-medium text-slate-600">Coming Soon</span>
        </div>
        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          Dashboard Features
        </h1>
        <p className="text-slate-600 max-w-md mx-auto">
          We're working hard to bring you amazing dashboard features. Stay tuned for updates!
        </p>
      </div>
    </div>
  );
}
