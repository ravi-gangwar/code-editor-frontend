"use client";
import React from "react";
import Link from "next/link";
import { User, LogOut, Menu, X } from "lucide-react";
import { Button } from "@radix-ui/themes";
import { ROUTES } from "@/constants/constants";
import { ThemeToggle } from "../ThemeToggle";

interface MobileNavProps {
  isOpen: boolean;
  onToggle: () => void;
  userInfo: { name: string; email: string } | null;
  isOnAuthPage: boolean;
  onLogout: () => void;
}

export default function MobileNav({
  isOpen,
  onToggle,
  userInfo,
  isOnAuthPage,
  onLogout,
}: MobileNavProps) {
  return (
    <>
      <div className="md:hidden flex items-center">
        <Button variant="ghost" onClick={onToggle}>
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-gray-200 dark:bg-dark-900 border-t border-gray-300 dark:border-gray-700 px-4 py-3">
          <div className="flex items-center justify-between">
            {userInfo ? (
              <div className="flex items-center gap-3 flex-1">
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    {userInfo?.name || "User"}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => {
                    onLogout();
                    onToggle();
                  }}
                  className="flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </Button>
              </div>
            ) : !isOnAuthPage ? (
              <Link
                href={ROUTES.AUTH.LOGIN}
                onClick={onToggle}
                className="px-4 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                Login
              </Link>
            ) : null}
            <ThemeToggle />
          </div>
        </div>
      )}
    </>
  );
}

