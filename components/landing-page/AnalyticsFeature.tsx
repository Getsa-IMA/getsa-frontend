import React from 'react';

const AnalyticsFeature = () => {
  return (
      <section className="max-w-7xl mx-auto px-8 py-32 flex flex-col lg:flex-row items-center gap-20 overflow-hidden relative">
        <div className="absolute -left-40 top-20 w-80 h-80 bg-primary/10 rounded-full blur-[120px] -z-10"></div>
        
        <div className="flex-1 space-y-8 animate-fade-in-up z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
            <span className="text-secondary font-bold text-sm tracking-widest uppercase">Real-Time Data</span>
          </div>
          
          <h2 className="text-5xl lg:text-6xl font-black text-foreground leading-[1.1]">
            Track performance <br/>
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">with precision.</span>
          </h2>
          
          <div className="space-y-8 pt-4">
            <div className="group flex gap-5">
              <div className="flex-shrink-0 w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </div>
              <div>
                <h4 className="text-2xl font-bold text-foreground mb-2">One-Click Tracking</h4>
                <p className="text-foreground/60 text-lg leading-relaxed">Monitor Instagram, TikTok, and YouTube content effortlessly from a single, unified dashboard.</p>
              </div>
            </div>
            <div className="group flex gap-5">
              <div className="flex-shrink-0 w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center text-secondary group-hover:scale-110 group-hover:bg-secondary group-hover:text-white transition-all duration-300 shadow-sm">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
              </div>
              <div>
                <h4 className="text-2xl font-bold text-foreground mb-2">Advanced Analytics</h4>
                <p className="text-foreground/60 text-lg leading-relaxed">Deep dive into content performance metrics, impressions, and ROI with beautiful visual reports.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 w-full relative z-10 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
           <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary rounded-[3rem] blur-2xl opacity-20 animate-pulse-slow"></div>
           <div className="relative bg-white/60 backdrop-blur-xl border border-white/50 rounded-[3rem] p-8 shadow-2xl">
              <div className="bg-white rounded-[2rem] p-6 shadow-xl border border-neutral/50 relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"></div>
                 <div className="flex justify-between items-center mb-8">
                   <div>
                     <p className="text-sm font-bold text-foreground/40 uppercase tracking-wider mb-1">Campaign Views</p>
                     <span className="text-3xl font-black text-slate-800">3.9M</span>
                   </div>
                   <div className="bg-green-100 text-green-600 font-bold px-4 py-2 rounded-full flex items-center text-sm shadow-sm border border-green-200">
                     <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
                     +24%
                   </div>
                 </div>
                 <div className="h-56 w-full flex items-end gap-3 md:gap-4">
                    {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                      <div key={i} className="flex-1 flex flex-col justify-end group cursor-pointer h-full relative">
                         <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs font-bold py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                           {h}k views
                         </div>
                         <div 
                           className={`w-full rounded-t-xl transition-all duration-500 ease-out group-hover:opacity-100 ${i === 3 ? 'bg-gradient-to-t from-primary to-secondary opacity-100 shadow-lg shadow-primary/30' : 'bg-primary/20 opacity-70 group-hover:bg-primary/40'}`}
                           style={{ height: `${h}%`, animation: `fade-in-up 0.8s ease-out ${i * 0.1}s forwards` }} 
                         />
                      </div>
                    ))}
                 </div>
              </div>

              {/* Decorative floating element */}
              <div className="absolute -right-6 -bottom-6 bg-white p-4 rounded-2xl shadow-xl border border-white/50 animate-float flex items-center gap-4 z-20">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white shadow-inner">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <div>
                  <p className="font-bold text-sm text-slate-800">Goal Reached</p>
                  <p className="text-xs text-slate-500 font-medium">10k+ Conversions</p>
                </div>
              </div>
           </div>
        </div>
      </section>
  );
};

export default AnalyticsFeature;
