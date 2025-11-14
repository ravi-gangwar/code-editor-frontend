"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Code2, Save, Share2, Play } from "lucide-react";
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
}

export default function EditorHeader({
  selectedLanguage,
  onLanguageChange,
  onSave,
  onShare,
  onRun,
  isRunning,
}: EditorHeaderProps) {
  const [expiresIn] = useState("24 hours");
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
    <header className="bg-white dark:bg-[#1e1e1e] border-b border-gray-200 dark:border-gray-800 px-6 py-3 flex items-center justify-between flex-shrink-0">
      <div className="flex items-center gap-4">
        <Code2 className="w-5 h-5 text-gray-900 dark:text-white" />
        <span className="text-gray-900 dark:text-white font-semibold text-lg">CodeEditor</span>
        <LanguageSelector
          selectedLanguage={selectedLanguage}
          onLanguageChange={onLanguageChange}
        />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600 dark:text-gray-400">Expires in {expiresIn}</span>
        <ThemeToggle />
        <button
          onClick={handleShare}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-[#2d2d2d] hover:bg-gray-200 dark:hover:bg-[#3d3d3d] text-gray-900 dark:text-white rounded-md text-sm font-medium transition-colors"
        >
          <Share2 className="w-4 h-4" />
          Share
        </button>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium transition-colors"
        >
          <Save className="w-4 h-4" />
          Save
        </button>
        <button
          onClick={onRun}
          disabled={isRunning}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-md text-sm font-medium transition-colors disabled:cursor-not-allowed"
        >
          {isRunning ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Running...</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              <span>Run</span>
            </>
          )}
        </button>
        {!userInfo && (
          <Link
            href={ROUTES.AUTH.LOGIN}
            className="px-4 py-2 bg-gray-100 dark:bg-[#2d2d2d] hover:bg-gray-200 dark:hover:bg-[#3d3d3d] text-gray-900 dark:text-white rounded-md text-sm font-medium transition-colors"
          >
            Log In
          </Link>
        )}
      </div>
    </header>
  );
}

