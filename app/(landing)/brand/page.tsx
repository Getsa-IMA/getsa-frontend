import React from 'react';

export const metadata = {
  title: 'Getsa - Brand Portal',
  description: 'Discover creators and scale your brand reach with our innovative platform.',
};

export default function BrandPage() {
  return (
    <main className="min-h-screen bg-neutral flex flex-col items-center justify-center p-8 space-y-8 animate-in slide-in-from-bottom duration-700">
      <div className="max-w-3xl w-full text-center space-y-4">
        <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
          Scale Your <span className="text-secondary underline decoration-tertiary decoration-4">Brand</span>
        </h1>
        <p className="text-xl text-foreground font-medium max-w-2xl mx-auto opacity-80 leading-relaxed">
          Welcome to the Brand Portal. The ultimate destination for modern companies and their growth story.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl pt-8">
        <div className="p-8 rounded-3xl bg-white border border-primary/10 shadow-xl shadow-primary/5 hover:scale-[1.02] transition-transform duration-300">
          <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
            <div className="w-4 h-4 bg-primary rounded-full" />
          </div>
          <h2 className="text-2xl font-bold text-foreground font-serif italic italic-shadow">Brand Strategy</h2>
          <p className="mt-2 text-foreground/70">Refine your messaging and connect with the right audience segments.</p>
        </div>
        
        <div className="p-8 rounded-3xl bg-secondary text-white shadow-xl shadow-secondary/20 hover:scale-[1.02] transition-transform duration-300 cursor-pointer">
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
            <div className="w-4 h-4 bg-white rounded-full" />
          </div>
          <h2 className="text-2xl font-bold">Campaign Launch</h2>
          <p className="mt-2 text-white/80">Schedule your next major product release and track real-time engagement.</p>
        </div>
      </div>

      <div className="h-2 w-32 bg-tertiary/30 rounded-full mt-12 bg-gradient-to-r from-primary via-secondary to-tertiary animate-pulse" />
    </main>
  );
}
