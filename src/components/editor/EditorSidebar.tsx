"use client";
import React, { useState } from "react";
import { Settings, Download, Plus, Info } from "lucide-react";
import { toast } from "sonner";

interface EditorSidebarProps {
  onDownload?: () => void;
  onNewFile?: () => void;
}

export default function EditorSidebar({ onDownload, onNewFile }: EditorSidebarProps) {
  const [showSettings, setShowSettings] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const handleDownload = () => {
    if (onDownload) {
      onDownload();
    } else {
      toast.info("Download feature coming soon!");
    }
  };

  const handleNewFile = () => {
    if (onNewFile) {
      onNewFile();
    } else {
      toast.info("New file feature coming soon!");
    }
  };

  return (
    <aside className="w-12 bg-white dark:bg-[#1e1e1e] border-l border-gray-200 dark:border-gray-800 flex flex-col items-center py-4 gap-4 flex-shrink-0">
      <button
        onClick={() => setShowSettings(!showSettings)}
        className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#2d2d2d] rounded transition-colors"
        title="Settings"
      >
        <Settings className="w-5 h-5" />
      </button>
      <button
        onClick={handleDownload}
        className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#2d2d2d] rounded transition-colors"
        title="Download"
      >
        <Download className="w-5 h-5" />
      </button>
      <button
        onClick={handleNewFile}
        className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#2d2d2d] rounded transition-colors"
        title="New File"
      >
        <Plus className="w-5 h-5" />
      </button>
      <div className="flex-1" />
      <button
        onClick={() => setShowInfo(!showInfo)}
        className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#2d2d2d] rounded-full transition-colors"
        title="Info"
      >
        <Info className="w-4 h-4" />
      </button>
    </aside>
  );
}

