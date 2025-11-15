"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Code2, Save, Share2, Play, Menu, X } from "lucide-react";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { selectUser } from "@/slices/user";
import { ROUTES } from "@/constants/constants";
import LanguageSelector from "./LanguageSelector";
import { ThemeToggle } from "../ThemeToggle";

interface EditorHeaderProps {
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
  onSave?: () => void;
  onShare?: () => void;
  onRun: () => void;
  isRunning: boolean;
  isConnected?: boolean;
  connectionCount?: number;
}

export default function EditorHeader({
  selectedLanguage,
  onLanguageChange,
  onSave,
  onShare,
  onRun,
  isRunning,
  isConnected = false,
  connectionCount = 0,
}: EditorHeaderProps) {
  const [expiresIn] = useState("24 hours");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const userInfo = useSelector(selectUser);

  const handleSave = () => {
    if (onSave) {
      onSave();
    } else {
      toast.success("Code saved!");
    }
  };

  const handleShare = () => {
    if (onShare) {
      onShare();
    } else {
      const url = window.location.href;
      navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard!");
    }
  };

  return (
    <>
      <header className="bg-white dark:bg-[#1e1e1e] border-b border-gray-200 dark:border-gray-800 px-3 sm:px-6 py-2 sm:py-3 flex items-center justify-between flex-shrink-0">
        {/* Left Section */}
        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
          <Code2 className="w-5 h-5 text-gray-900 dark:text-white flex-shrink-0" />
          <span className="text-gray-900 dark:text-white font-semibold text-base sm:text-lg hidden sm:inline">
            CodeEditor
          </span>
          <div className="flex-shrink-0">
            <LanguageSelector
              selectedLanguage={selectedLanguage}
              onLanguageChange={onLanguageChange}
            />
          </div>
        </div>

        {/* Desktop Right Section */}
        <div className="hidden md:flex items-center gap-3 lg:gap-4">
          {/* Connection Status Indicator */}
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${
                isConnected ? "bg-green-500" : "bg-gray-400"
              }`}
              title={isConnected ? "Connected" : "Disconnected"}
            />
            {isConnected && connectionCount > 0 && (
              <span className="text-xs text-gray-600 dark:text-gray-400">
                {connectionCount} {connectionCount === 1 ? "user" : "users"}
              </span>
            )}
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-400 hidden lg:inline">
            Expires in {expiresIn}
          </span>
          <ThemeToggle />
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-3 lg:px-4 py-2 bg-gray-100 dark:bg-[#2d2d2d] hover:bg-gray-200 dark:hover:bg-[#3d3d3d] text-gray-900 dark:text-white rounded-md text-sm font-medium transition-colors"
          >
            <Share2 className="w-4 h-4" />
            <span className="hidden lg:inline">Share</span>
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-3 lg:px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium transition-colors"
          >
            <Save className="w-4 h-4" />
            <span className="hidden lg:inline">Save</span>
          </button>
          <button
            onClick={onRun}
            disabled={isRunning}
            className="flex items-center gap-2 px-3 lg:px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-md text-sm font-medium transition-colors disabled:cursor-not-allowed"
          >
            {isRunning ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span className="hidden lg:inline">Running...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                <span className="hidden lg:inline">Run</span>
              </>
            )}
          </button>
          {!userInfo && (
            <Link
              href={ROUTES.AUTH.LOGIN}
              className="px-3 lg:px-4 py-2 bg-gray-100 dark:bg-[#2d2d2d] hover:bg-gray-200 dark:hover:bg-[#3d3d3d] text-gray-900 dark:text-white rounded-md text-sm font-medium transition-colors"
            >
              <span className="hidden lg:inline">Log In</span>
              <span className="lg:hidden">Login</span>
            </Link>
          )}
        </div>

        {/* Mobile Right Section */}
        <div className="flex md:hidden items-center gap-2">
          {/* Connection Status Indicator - Mobile */}
          <div className="flex items-center">
            <div
              className={`w-2 h-2 rounded-full ${
                isConnected ? "bg-green-500" : "bg-gray-400"
              }`}
              title={isConnected ? "Connected" : "Disconnected"}
            />
          </div>
          <ThemeToggle />
          <button
            onClick={onRun}
            disabled={isRunning}
            className="flex items-center gap-1 px-2 py-1.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-md text-xs font-medium transition-colors disabled:cursor-not-allowed"
          >
            {isRunning ? (
              <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Play className="w-3 h-3" />
            )}
            <span className="hidden min-[375px]:inline">Run</span>
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#2d2d2d] rounded transition-colors"
            aria-label="Menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-[#1e1e1e] border-b border-gray-200 dark:border-gray-800 px-3 py-3 flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
            {isConnected && connectionCount > 0 && (
              <span>
                {connectionCount} {connectionCount === 1 ? "user" : "users"} connected
              </span>
            )}
            <span>Expires in {expiresIn}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                handleShare();
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-[#2d2d2d] hover:bg-gray-200 dark:hover:bg-[#3d3d3d] text-gray-900 dark:text-white rounded-md text-sm font-medium transition-colors flex-1 min-w-[120px]"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
            <button
              onClick={() => {
                handleSave();
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium transition-colors flex-1 min-w-[120px]"
            >
              <Save className="w-4 h-4" />
              Save
            </button>
            {!userInfo && (
              <Link
                href={ROUTES.AUTH.LOGIN}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center px-3 py-2 bg-gray-100 dark:bg-[#2d2d2d] hover:bg-gray-200 dark:hover:bg-[#3d3d3d] text-gray-900 dark:text-white rounded-md text-sm font-medium transition-colors flex-1 min-w-[120px]"
              >
                Log In
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}

