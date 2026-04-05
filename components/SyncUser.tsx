'use client';

import { useUser, useAuth } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { syncUserWithBackend } from "@/lib/services/user";

export default function SyncUser() {
  const { user, isLoaded, isSignedIn } = useUser();
  const { getToken } = useAuth();
  const pathname = usePathname();
  const syncRef = useRef(false);

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !user || syncRef.current) return;

    // Check if already synced in this session to avoid redundant calls
    if (sessionStorage.getItem(`synced_${user.id}`)) {
      syncRef.current = true;
      return;
    }

    const performSync = async () => {
      // Determine tenant based on path
      let tenant = "creator"; // Default
      
      if (pathname.startsWith("/brand")) {
        tenant = "brand";
      } else if (pathname.startsWith("/creator")) {
        tenant = "creator";
      }

      console.log("Getting token for user sync...");
      const token = await getToken();

      const { success } = await syncUserWithBackend({
        email: user.primaryEmailAddress?.emailAddress || "",
        tenant: tenant,
      }, token || undefined);

      if (success) {
        syncRef.current = true;
        sessionStorage.setItem(`synced_${user.id}`, "true");
      }
    };

    performSync();
  }, [isLoaded, isSignedIn, user, pathname, getToken]);

  return null;
}
