import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { selectUser, selectToken } from '@/slices/user';
import { useGetUserQuery } from '@/slices/rtk-query/apis';
import { ROUTES } from '@/constants/constants';

export const useAuth = (requireAuth: boolean = false, redirectTo?: string) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  
  // Only fetch user data if we have a token
  const { data: userData, isLoading, error } = useGetUserQuery(undefined, {
    skip: !token,
  });

  useEffect(() => {
    if (isLoading) return;

    const isAuthenticated = !!(user || userData);
    const isOnAuthPage = typeof window !== 'undefined' && window.location.pathname.startsWith(ROUTES.AUTH.BASE);

    // If user is not authenticated and auth is required
    if (requireAuth && !isAuthenticated) {
      const currentPath = typeof window !== 'undefined' ? window.location.pathname + window.location.search : '/';
      const intendedDestination = redirectTo || searchParams.get('redirect') || currentPath;
      
      router.push(`${ROUTES.AUTH.LOGIN}?redirect=${encodeURIComponent(intendedDestination)}`);
      return;
    }

    // If user is authenticated and we're on auth page, redirect to intended destination or home
    if (isAuthenticated && isOnAuthPage) {
      const intendedDestination = searchParams.get('redirect');
      if (intendedDestination) {
        router.push(decodeURIComponent(intendedDestination));
      } else {
        router.push(ROUTES.HOME);
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