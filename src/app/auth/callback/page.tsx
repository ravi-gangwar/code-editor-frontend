"use client";
import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { token, ROUTES } from "@/constants/constants";
import { setItem } from "@/lib/localStorage";
import { toast } from "sonner";
import { setUser } from "@/slices/user";

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const tokenParam = searchParams.get("token");
    const emailParam = searchParams.get("email");
    const nameParam = searchParams.get("name");
    const error = searchParams.get("error");
    const redirectTo = searchParams.get("redirect");

    if (error) {
      toast.error(error || "Authentication failed");
      router.push(ROUTES.AUTH.LOGIN);
      return;
    }

    if (tokenParam) {
      // Store token in localStorage
      setItem(token, tokenParam);
      
      // Set user info in Redux store
      if (emailParam && nameParam) {
        dispatch(
          setUser({
            token: tokenParam,
            userInfo: {
              email: decodeURIComponent(emailParam),
              name: decodeURIComponent(nameParam),
            },
          })
        );
      } else {
        // If email/name not provided, just set token
        dispatch(
          setUser({
            token: tokenParam,
            userInfo: null,
          })
        );
      }
      
      toast.success("Successfully authenticated!");
      
      // Redirect to intended destination or home
      if (redirectTo) {
        router.push(decodeURIComponent(redirectTo));
      } else {
        router.push(ROUTES.HOME);
      }
    } else {
      toast.error("No token received");
      router.push(ROUTES.AUTH.LOGIN);
    }
  }, [searchParams, router, dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-900">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-300">Completing authentication...</p>
      </div>
    </div>
  );
}

