"use client";
import React from "react";
import { ThemeToggle } from "../ThemeToggle";
import UserDropdown from "./UserDropdown";
import AuthButtons from "./AuthButtons";

interface DesktopNavProps {
  userInfo: { name: string; email: string } | null;
  isOnAuthPage: boolean;
  onLogout: () => void;
}

export default function DesktopNav({ userInfo, isOnAuthPage, onLogout }: DesktopNavProps) {
  return (
    <div className="hidden md:flex items-center space-x-4">
      <ThemeToggle />
      {userInfo ? (
        <UserDropdown userName={userInfo.name} onLogout={onLogout} />
      ) : !isOnAuthPage ? (
        <AuthButtons />
      ) : null}
    </div>
  );
}

