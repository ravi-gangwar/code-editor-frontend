"use client";
import React from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import GoogleOAuthButton from "@/components/auth/GoogleOAuthButton";

export default function Login() {
  // Prevent authenticated users from accessing login page
  const { isLoading: authLoading } = useAuth(false);

  // Show loading while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-900">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 dark:bg-dark-900 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8 bg-transparent dark:bg-black p-8"
      >
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Continue with your Google account
          </p>
        <GoogleOAuthButton text="Sign in with Google" />
      </motion.div>
    </div>
  );
}
