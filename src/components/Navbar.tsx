"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { useGetUserQuery, api } from "@/slices/rtk-query/apis";
import { logout, selectUser, selectToken } from "@/slices/user";
import { removeItem } from "@/lib/localStorage";
import { token as tokenConstant, ROUTES } from "@/constants/constants";
import NavbarLogo from "./navbar/NavbarLogo";
import DesktopNav from "./navbar/DesktopNav";
import MobileNav from "./navbar/MobileNav";

const Navbar = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const userInfo = useSelector(selectUser);
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Only fetch user data if we have a token
  useGetUserQuery(undefined, {
    skip: !token,
  });

  const isOnAuthPage = pathname?.startsWith(ROUTES.AUTH.BASE);
  const isOnEditorPage = pathname && pathname !== ROUTES.HOME && !pathname.startsWith(ROUTES.AUTH.BASE) && !pathname.startsWith(ROUTES.SANDBOX);

  const handleLogout = () => {
    removeItem(tokenConstant);
    dispatch(logout());
    dispatch(api.util.resetApiState());
    router.push(ROUTES.AUTH.LOGIN);
  };

  // Hide navbar on editor page
  if (isOnEditorPage) {
    return null;
  }

  return (
    <nav className="fixed top-0 left-0 right-0 w-full bg-gray-200 dark:bg-dark-900 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <NavbarLogo />
          <DesktopNav
            userInfo={userInfo}
            isOnAuthPage={isOnAuthPage}
            onLogout={handleLogout}
          />
          <MobileNav
            isOpen={isMenuOpen}
            onToggle={() => setIsMenuOpen(!isMenuOpen)}
            userInfo={userInfo}
            isOnAuthPage={isOnAuthPage}
            onLogout={handleLogout}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
