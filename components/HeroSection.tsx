"use client";

import { RocketIcon, ArrowRightIcon, PhoneCallIcon } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative mx-auto w-full max-w-6xl px-6 pt-32 pb-24">

      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(40%_60%_at_50%_0%,rgba(0,0,0,0.08),transparent)]" />

      {/* Top Badge */}
      <div className="flex justify-center mb-6">
        <div className="flex items-center gap-2 px-4 py-1 rounded-full border text-sm bg-white shadow-sm">
          <RocketIcon className="w-3 h-3 text-gray-500" />
          <span className="text-gray-600">New features launched</span>
          <ArrowRightIcon className="w-3 h-3 ml-1" />
        </div>
      </div>

      {/* Heading */}
      <h1 className="text-center text-5xl md:text-6xl font-bold tracking-tight leading-tight">
        Hire Pre-Vetted <br />
        <span className="text-secondary">Influencers</span> in Seconds
      </h1>

      {/* Subtext */}
      <p className="mt-6 text-center text-lg text-gray-600 max-w-xl mx-auto">
        Discover top creators across India. Launch campaigns, manage content,
        and pay securely — all in one place.
      </p>

      {/* Buttons */}
      <div className="mt-8 flex justify-center gap-4 flex-wrap">
        <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-secondary text-white font-semibold shadow hover:scale-105 transition">
          <PhoneCallIcon className="w-4 h-4" />
          Book a Call
        </button>

        <button className="flex items-center gap-2 px-6 py-3 rounded-full border border-primary/20 hover:bg-primary/5 transition">
          Get Started
          <ArrowRightIcon className="w-4 h-4" />
        </button>
      </div>

      {/* Mock Dashboard */}
      <div className="mt-16 bg-white rounded-3xl shadow-xl border p-6 max-w-3xl mx-auto">
        <div className="h-40 rounded-xl bg-gradient-to-r from-primary via-secondary to-tertiary opacity-80 mb-4" />
        <p className="font-semibold">Campaign Dashboard</p>
        <p className="text-sm text-gray-500">
          Track creators, content & ROI in real-time
        </p>
      </div>
    </section>
  );
}