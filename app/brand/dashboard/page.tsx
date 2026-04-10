'use client';

import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function BrandDashboardPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/brand/dashboard/find-creators');
  }, [router]);

  return null;
}
