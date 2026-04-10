'use client';

import React from 'react';
import Image from 'next/image';

const steps = [
  {
    number: '01',
    title: 'Find Influencers ',
    description: 'Explore thousands of influencers based on your niche, budget, and goals.',
    bgColor: 'bg-[#A832A8]/10',
    textColor: 'text-[#A832A8]',
  },
  {
    number: '02',
    title: 'Check their Details',
    description: 'Choose the right influencer or gig, review details, and place your order instantly with secure payment.',
    bgColor: 'bg-[#7038D1]/10',
    textColor: 'text-[#7038D1]',
  },
  {
    number: '03',
    title: 'Select & Message Them',
    description: 'Message influencers directly to their instagram or whatsapp.',
    bgColor: 'bg-[#E91E63]/10',
    textColor: 'text-[#E91E63]',
  },
  {
    number: '04',
    title: 'Re-Hier',
    description: 'Re-hier another Micro creator for your brand.',
    bgColor: 'bg-green-50',
    textColor: 'text-green-600',
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Side: Content */}
          <div className="flex-1 w-full">
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="flex h-3 w-3 rounded-full bg-orange-500" />
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
                  How it Works 
                  <span className="inline-flex ml-2">
                    <span className="flex h-3 w-3 rounded-full bg-blue-500" />
                  </span>
                </h2>
              </div>
              <p className="text-gray-500 text-lg">
                Search, select, pay & launch your campaign in minutes
              </p>
            </div>

            <div className="space-y-4">
              {steps.map((step, index) => (
                <div 
                  key={index}
                  className="group flex items-start gap-6 p-6 rounded-3xl transition-all duration-300 hover:bg-neutral-50 border border-transparent hover:border-gray-100"
                >
                  <div className={`flex-shrink-0 w-20 h-20 rounded-2xl ${step.bgColor} flex items-center justify-center`}>
                    <span className={`text-3xl font-black ${step.textColor}`}>
                      {step.number}
                    </span>
                  </div>
                  <div className="pt-2">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-500 leading-relaxed max-w-md">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Image Collage */}
          <div className="flex-1 w-full">
            <div className="grid grid-cols-12 gap-4 h-[600px]">
              {/* Column 1 */}
              <div className="col-span-12 md:col-span-7 flex flex-col gap-4 h-full">
                <div className="grid grid-cols-2 gap-4 h-1/3">
                  <div className="relative rounded-2xl overflow-hidden shadow-sm">
                    <Image
                      src="https://i.pinimg.com/736x/c3/02/a1/c302a1192027acf14cb60be68bd81f9a.jpg"
                      alt="Photographer"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 20vw"
                    />
                  </div>
                  <div className="relative rounded-2xl overflow-hidden shadow-sm">
                    <Image
                      src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=400"
                      alt="Technology"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="relative h-1/3 rounded-2xl overflow-hidden shadow-sm">
                  <Image
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600"
                    alt="Meeting"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-1/3 rounded-2xl overflow-hidden shadow-sm">
                  <Image
                    src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=600"
                    alt="Collaboration"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Column 2 */}
              <div className="col-span-12 md:col-span-5 h-full">
                <div className="relative h-full rounded-2xl overflow-hidden shadow-sm">
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600"
                    alt="Creator"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
