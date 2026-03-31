import React from 'react';

const Testimonials = () => {
  return (
      <section className="bg-neutral py-32 px-8 relative overflow-hidden">
        {/* Decorative Grid or Gradients */}
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-gradient-to-b from-primary/5 to-transparent rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-in-up">
            <span className="text-secondary font-bold tracking-widest uppercase text-sm mb-4 block">Proven Success</span>
            <h2 className="text-4xl md:text-5xl font-black text-foreground leading-[1.2]">
              330,000+ Brands Work With <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Influencers</span> on Glocal
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Layla", role: "Influencer & Founder", text: "I've used Glocal from both sides! It's extremely user-friendly and has led to great relationships." },
              { name: "Myriam", role: "Founder of BBeyond", text: "Best platform to connect with influencers and content creators. I've signed up for many, but this is the easiest." },
              { name: "Courtney", role: "Marketer", text: "Great way to generate content. Super easy for us to search for relevant influencers and pay them." }
            ].map((t, i) => (
              <div key={i} className="bg-white p-10 rounded-[3rem] shadow-xl shadow-primary/5 border border-primary/10 space-y-6 hover:-translate-y-2 hover:shadow-2xl hover:shadow-secondary/20 transition-all duration-500 group animate-fade-in-up" style={{ animationDelay: `${i * 0.15 + 0.2}s` }}>
                <span className="bg-gradient-to-b from-primary to-secondary bg-clip-text text-transparent text-7xl font-serif leading-none opacity-50 block h-10 mb-8 transform group-hover:scale-110 transition-transform origin-top-left">“</span>
                <p className="text-lg font-medium text-foreground/80 leading-relaxed italic relative z-10">&quot;{t.text}&quot;</p>
                <div className="pt-8 border-t border-foreground/5 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-black text-xl shadow-inner border-2 border-white">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-xl">{t.name}</p>
                    <p className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent text-sm font-bold">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
  );
};

export default Testimonials;
