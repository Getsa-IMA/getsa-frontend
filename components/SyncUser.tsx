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
    if (!isLoaded) {
      console.log("SyncUser: Still loading Clerk...");
      return;
    }

    if (!isSignedIn) {
      console.log("SyncUser: User not signed in");
      return;
    }

    if (!user) {
      console.log("SyncUser: No user object");
      return;
    }

    if (syncRef.current) {
      console.log("SyncUser: Already synced, skipping");
      return;
    }

    // Check if already synced in this session
    if (sessionStorage.getItem(`synced_${user.id}`)) {
      console.log("SyncUser: Already synced in session storage");
      syncRef.current = true;
      return;
    }

    const performSync = async () => {
      try {
        console.log("SyncUser: Starting sync for user", user.id);
        
        let tenant = "creator"; // Default
        if (pathname.startsWith("/brand")) {
          tenant = "brand";
        } else if (pathname.startsWith("/creator")) {
          tenant = "creator";
        }

        console.log("SyncUser: Getting Clerk token...");
        const token = await getToken();

        if (!token) {
          console.error("SyncUser: Failed to get Clerk token");
          return;
        }

        // Log token for Postman testing
        console.log('🔑 Clerk Token (use in Postman):', token);
        console.log('📋 Header: Authorization: Bearer ' + token);

        console.log("SyncUser: Calling backend with email:", user.primaryEmailAddress?.emailAddress, "tenant:", tenant);

        const { success, status, error } = await syncUserWithBackend({
          email: user.primaryEmailAddress?.emailAddress || "",
          tenant: tenant,
        }, token);

        if (success) {
          console.log("SyncUser: Successfully synced user!");
          syncRef.current = true;
          sessionStorage.setItem(`synced_${user.id}`, "true");
        } else {
          console.error("SyncUser: Backend sync failed", status, error);
        }
      } catch (err) {
        console.error("SyncUser: Error during sync", err);
      }
    };

    performSync();
  }, [isLoaded, isSignedIn, user, pathname, getToken]);


  return null;
}