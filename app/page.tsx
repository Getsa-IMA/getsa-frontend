import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral flex flex-col items-center justify-center p-8 space-y-12">
      <div className="max-w-4xl w-full text-center space-y-6">
        <div className="flex justify-center mb-8">
          <div className="relative w-24 h-24 bg-primary rounded-full flex items-center justify-center animate-bounce shadow-xl shadow-primary/20">
            <span className="text-white text-4xl font-bold">G</span>
            <div className="absolute -top-1 -right-1 w-8 h-8 bg-secondary rounded-full flex items-center justify-center border-4 border-neutral text-[10px] font-bold text-white uppercase tracking-tighter">New</div>
          </div>
        </div>
        
        <h1 className="text-6xl font-black tracking-tight text-foreground sm:text-7xl">
          Welcome to <span className="text-primary">Getsa</span>
        </h1>
        <p className="text-2xl text-foreground font-medium max-w-2xl mx-auto opacity-70 leading-relaxed">
          The all-in-one platform connecting world-class <span className="text-secondary font-bold">brands</span> with elite <span className="text-primary font-bold">creators</span>.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
        <Link 
          href="/creator"
          className="group relative p-10 rounded-[2rem] bg-white border-2 border-primary/5 shadow-2xl hover:shadow-primary/20 transition-all duration-500 overflow-hidden"
        >
          <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/[0.02] transition-colors duration-500" />
          <div className="relative z-10">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
              <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-4">I am a Creator</h2>
            <p className="text-lg text-foreground/60 leading-relaxed mb-8">Access exclusive brand deals, analytics, and growth tools designed for modern creators.</p>
            <div className="flex items-center text-primary font-bold gap-2 group-hover:gap-4 transition-all duration-300">
              Get Started <span className="text-2xl">&rarr;</span>
            </div>
          </div>
        </Link>
        
        <Link 
          href="/brand"
          className="group relative p-10 rounded-[2rem] bg-white border-2 border-secondary/5 shadow-2xl hover:shadow-secondary/20 transition-all duration-500 overflow-hidden"
        >
          <div className="absolute inset-0 bg-secondary/0 group-hover:bg-secondary/[0.02] transition-colors duration-500" />
          <div className="relative z-10">
            <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
              <svg className="w-8 h-8 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-4">I am a Brand</h2>
            <p className="text-lg text-foreground/60 leading-relaxed mb-8">Discover top-tier talent and launch high-impact campaigns with ease and scale.</p>
            <div className="flex items-center text-secondary font-bold gap-2 group-hover:gap-4 transition-all duration-300">
              Explore More <span className="text-2xl">&rarr;</span>
            </div>
          </div>
        </Link>
      </div>

      <div className="pt-8 flex flex-col items-center gap-4">
        <p className="text-foreground/40 font-mono text-sm tracking-widest uppercase">Trusted by 1000+ Partners</p>
        <div className="flex gap-8 opacity-20 filter grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
          <div className="w-24 h-8 bg-foreground/20 rounded-lg animate-pulse" />
          <div className="w-24 h-8 bg-foreground/20 rounded-lg animate-pulse delay-75" />
          <div className="w-24 h-8 bg-foreground/20 rounded-lg animate-pulse delay-150" />
        </div>
      </div>
    </main>
  );
}
