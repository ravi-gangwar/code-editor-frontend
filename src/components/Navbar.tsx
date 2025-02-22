"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Code2, User, Menu, X, LogOut } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { removeItem } from "@/lib/localStorage";
import { useRouter } from "next/navigation";
import { useGetUserQuery } from "@/slices/rtk-query/apis";
import { token } from "@/constants/constants";
import { useSelector, useDispatch } from "react-redux";
import { logout, selectUser } from "@/slices/user";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { Button, Flex } from "@radix-ui/themes";

const Navbar = () => {
  const dispatch = useDispatch();
  useGetUserQuery();
  const userInfo = useSelector(selectUser);
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    removeItem(token);
    dispatch(logout());
    router.push("/auth/login");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 w-full bg-white dark:bg-dark-900 shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center"
          >
            <Link href="/" className="flex items-center space-x-2">
              <Code2 className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                CodeEditor
              </span>
            </Link>
          </motion.div>
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            {userInfo ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-2"
                  >
                    <User className="w-6 h-6" />
                    <span>{userInfo?.name || "User"}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="px-4 py-2 rounded-md text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Login
                </Link>
                <Link
                  href="/auth/signup"
                  className="px-4 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
          <div className="md:hidden flex items-center">
            <Button variant="ghost" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
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
              <Button variant="ghost" onClick={handleLogout} className="w-full">
                <LogOut className="w-4 h-4 mr-2" /> Logout
              </Button>
            </div>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="block px-4 py-2 rounded-md text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400"
              >
                Login
              </Link>
              <Link
                href="/auth/signup"
                className="block px-4 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}
        </Flex>
      )}
    </nav>
  );
};

export default Navbar;
