"use client";
import React from "react";
import Link from "next/link";
import { User, LogOut, Menu, X } from "lucide-react";
import { Button, Flex } from "@radix-ui/themes";
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
        <Flex
          direction="row-reverse"
          align="center"
          justify="between"
          className="md:hidden px-4 pt-2 pb-3"
        >
          <ThemeToggle />
          {userInfo ? (
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <User className="w-8 h-8 text-gray-600 dark:text-gray-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  {userInfo?.name || "User"}
                </span>
              </div>
              <Button variant="ghost" onClick={onLogout} className="w-full">
                <LogOut className="w-4 h-4 mr-2" /> Logout
              </Button>
            </div>
          ) : !isOnAuthPage ? (
            <>
              <Link
                href={ROUTES.AUTH.LOGIN}
                className="block px-4 py-2 rounded-md text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400"
              >
                Login
              </Link>
              <Link
                href={ROUTES.AUTH.SIGNUP}
                className="block px-4 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                Sign Up
              </Link>
            </>
          ) : null}
        </Flex>
      )}
    </>
  );
}

