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

    // If user is not authenticated and auth is required
    if (requireAuth && !user && !userData) {
      const currentPath = typeof window !== 'undefined' ? window.location.pathname + window.location.search : '/';
      const intendedDestination = redirectTo || searchParams.get('redirect') || currentPath;
      
      router.push(`/auth/login?redirect=${encodeURIComponent(intendedDestination)}`);
      return;
    }

    // If user is authenticated and we're on login/signup page, redirect to intended destination or home
    if (user || userData) {
      const intendedDestination = searchParams.get('redirect');
      if (intendedDestination) {
        router.push(decodeURIComponent(intendedDestination));
      } else if (window.location.pathname.startsWith('/auth/')) {
        // If on auth pages and no redirect specified, go to home
        router.push('/');
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