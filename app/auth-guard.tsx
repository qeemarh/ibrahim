'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is on passcode page
    if (pathname === '/passcode') {
      setIsAuthorized(true);
      setIsLoading(false);
      return;
    }

    // Check if unlocked for other pages
    const unlocked = localStorage.getItem('birthdayUnlocked');
    if (unlocked) {
      setIsAuthorized(true);
      setIsLoading(false);
    } else {
      // Redirect to passcode if not unlocked
      router.push('/passcode');
      setIsLoading(false);
    }
  }, [pathname, router]);

  if (isLoading) {
    return null;
  }

  if (!isAuthorized) {
    return null;
  }

  return <>{children}</>;
}
