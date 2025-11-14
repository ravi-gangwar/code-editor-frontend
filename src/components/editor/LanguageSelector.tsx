"use client";
import React from "react";
import { ChevronDown } from "lucide-react";
import { SUPPORTED_LANGUAGES } from "@/constants/constants";

interface LanguageSelectorProps {
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}

export default function LanguageSelector({
  selectedLanguage,
  onLanguageChange,
}: LanguageSelectorProps) {
  return (
    <div className="relative">
      <select
        value={selectedLanguage}
        onChange={(e) => onLanguageChange(e.target.value)}
        className="appearance-none bg-gray-100 dark:bg-[#2d2d2d] border border-gray-300 dark:border-gray-700 rounded-md px-4 py-2 pr-10 text-sm font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
      >
        {SUPPORTED_LANGUAGES.map((lang) => (
          <option key={lang.value} value={lang.value}>
            {lang.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-600 dark:text-gray-400 pointer-events-none" />
    </div>
  );
}

