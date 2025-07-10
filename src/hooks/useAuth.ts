import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { selectUser } from '@/slices/user';
import { useGetUserQuery } from '@/slices/rtk-query/apis';

export const useAuth = (requireAuth: boolean = false, redirectTo?: string) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const user = useSelector(selectUser);
  const { data: userData, isLoading, error } = useGetUserQuery();

  useEffect(() => {
    if (isLoading) return;

    if (requireAuth && !user && !userData) {
      const currentPath = typeof window !== 'undefined' ? window.location.pathname + window.location.search : '/';
      const intendedDestination = redirectTo || searchParams.get('redirect') || currentPath;
      
      router.push(`/auth/login?redirect=${encodeURIComponent(intendedDestination)}`);
      return;
    }

    if (user || userData) {
      const intendedDestination = searchParams.get('redirect');
      if (intendedDestination) {
        router.push(decodeURIComponent(intendedDestination));
      }
    }
  }, [user, userData, isLoading, requireAuth, redirectTo, router, searchParams]);

  return {
    user: user || userData,
    isLoading,
    isAuthenticated: !!(user || userData),
    error
  };
}; 