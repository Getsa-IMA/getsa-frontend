import React from 'react';

export const metadata = {
  title: 'Getsa - Creator Portal',
  description: 'Manage your creator profile and explore partnership opportunities.',
};

export default function CreatorPage() {
  return (
    <main className="min-h-screen bg-neutral flex flex-col items-center justify-center p-8 space-y-8 animate-in fade-in duration-700">
      <div className="max-w-3xl w-full text-center space-y-4">
        <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
          Empowering <span className="text-primary italic">Creators</span>
        </h1>
        <p className="text-xl text-foreground font-medium max-w-2xl mx-auto opacity-80 leading-relaxed">
          Welcome to the Creator Portal. This is your space to grow, connect, and thrive in the modern ecosystem.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl pt-8">
        <div className="p-8 rounded-3xl bg-white border border-secondary/10 shadow-xl shadow-secondary/5 hover:scale-[1.02] transition-transform duration-300">
          <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center mb-6">
            <div className="w-4 h-4 bg-secondary rounded-full" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Creator Insights</h2>
          <p className="mt-2 text-foreground/70">Analyze your performance and understand your audience like never before.</p>
        </div>
        
        <div className="p-8 rounded-3xl bg-primary text-white shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform duration-300 cursor-pointer">
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
            <div className="w-4 h-4 bg-tertiary rounded-full" />
          </div>
          <h2 className="text-2xl font-bold">Start Creating</h2>
          <p className="mt-2 text-white/80">Launch your next big project and reach millions of potential followers.</p>
        </div>
      </div>

    </main>
  );
}
