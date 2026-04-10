"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function CreatorDashboardPage() {
  const router = useRouter();

  useEffect(() => {
    // Automatically redirect to the profile page as it's the primary dashboard view
    router.replace("/creator/dashboard/profile");
  }, [router]);

  return (
    <div className="flex h-full items-center justify-center p-12">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-10 h-10 text-purple-600 animate-spin" />
        <p className="font-bold text-slate-400 uppercase tracking-widest text-xs">Loading Dashboard...</p>
      </div>
    </div>
  );
}
