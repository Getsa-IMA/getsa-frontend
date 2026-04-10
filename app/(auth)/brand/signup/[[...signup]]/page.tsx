import { SignUp } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Sparkles, Building2, BarChart3, Users } from "lucide-react";

export default function BrandSignUp() {
  return (
    <div className="flex h-screen bg-white overflow-hidden font-sans">
      
      {/* Left Side: Branding & Info */}
      <div className="hidden lg:grid lg:w-1/2 relative bg-[#1A2433] p-10 text-white overflow-hidden">
        {/* Abstract Background Ornaments */}
        <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[80%] h-[80%] rounded-full bg-gradient-to-br from-[#7038D1] to-[#A832A8] blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-gradient-to-tr from-[#A832A8] to-[#E91E63] blur-[100px]" />
        </div>

        <div className="relative z-10 flex flex-col h-full">
          

          <div className="flex-1 space-y-8">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[10px] font-bold tracking-widest uppercase text-[#7038D1]">
                <Sparkles className="w-3 h-3" />
                Brand Partner Program
              </span>
              <h1 className="text-3xl xl:text-4xl font-black leading-tight tracking-tight max-w-sm">
                Scale your brand with <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7038D1] via-[#A832A8] to-[#E91E63]">authentic creators.</span>
              </h1>
              <p className="text-gray-400 text-sm max-w-xs leading-relaxed">
                Unlock access to top-tier creators who move the needle for your business.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5">
              <FeatureItem 
                icon={Building2} 
                title="Elite Network" 
                desc="Access thousands of verified creators across every niche imaginable."
              />
              <FeatureItem 
                icon={BarChart3} 
                title="Campaign Analytics" 
                desc="Deep insights into your campaign performance and ROI metrics."
              />
              <FeatureItem 
                icon={Users} 
                title="Targeted Reach" 
                desc="Find the perfect audience match for your products and services."
              />
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 flex items-center gap-4 opacity-70">
            <div className="flex -space-x-2">
              {[5, 6, 7, 8].map((i) => (
                <div key={i} className="w-7 h-7 rounded-full border-2 border-[#1A2433] overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?img=${i + 20}`} alt="Brand Logo" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <p className="text-xs font-medium">Trusted by 500+ leading brands</p>
          </div>
        </div>
      </div>

      {/* Right Side: SignUp Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-10 bg-gray-50/50">
        <div className="w-full max-w-sm animate-fade-in-up">
          <div className="lg:hidden mb-6 text-center">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/getsa_logo.jpeg"
                alt="Getsa Logo"
                width={80}
                height={24}
                className="object-contain"
              />
            </Link>
            <h2 className="text-xl font-black text-gray-900">Brand Signup</h2>
          </div>

          <div className="clerk-signup-container shadow-xl shadow-purple-500/5 rounded-2xl overflow-hidden border border-white">
            <SignUp 
              path="/brand/signup"
              signInUrl="/sign-in" 
              forceRedirectUrl="/brand/dashboard"
              appearance={{
                elements: {
                  rootBox: "w-full mx-auto scale-95 origin-top",
                  card: "w-full shadow-none border-none p-0",
                  headerTitle: "text-xl font-black text-[#1A2433]",
                  headerSubtitle: "text-gray-500 font-medium text-sm",
                  socialButtonsBlockButton: "rounded-lg border-gray-200 hover:bg-gray-50 transition-all font-semibold h-9 text-sm",
                  formButtonPrimary: "bg-gradient-to-r from-[#7038D1] to-[#A832A8] hover:opacity-90 transition-opacity rounded-lg py-2 text-sm font-bold h-10",
                  footer: "bg-gray-50/50 border-t border-gray-100 py-4",
                  formFieldInput: "rounded-lg border-gray-200 focus:border-[#7038D1] focus:ring-[#7038D1] h-9 text-sm",
                  formFieldLabel: "text-gray-600 font-bold text-[10px] uppercase tracking-wider mb-1",
                  dividerLine: "bg-gray-100",
                  dividerText: "text-gray-400 text-[9px] font-bold uppercase tracking-widest",
                  identityPreviewText: "text-[#1A2433] font-bold text-sm",
                  formResendCodeLink: "text-[#7038D1] hover:text-[#A832A8] font-bold",
                }
              }}
            />
          </div>

          <div className="mt-4 text-center">
            <p className="text-gray-400 text-[10px] leading-relaxed">
              By joining, you agree to our <Link href="/terms" className="text-gray-600 underline font-medium">Terms</Link> and <Link href="/privacy" className="text-gray-600 underline font-medium">Privacy Policy</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureItem({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <div className="flex gap-4 group">
      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#7038D1]/20 transition-colors duration-300">
        <Icon className="w-4 h-4 text-[#7038D1]" />
      </div>
      <div className="space-y-0.5">
        <h4 className="font-bold text-base">{title}</h4>
        <p className="text-gray-400 text-xs leading-relaxed max-w-[240px]">{desc}</p>
      </div>
    </div>
  );
}
