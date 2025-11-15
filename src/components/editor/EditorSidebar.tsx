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
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-12 bg-white dark:bg-[#1e1e1e] border-l border-gray-200 dark:border-gray-800 flex-col items-center py-4 gap-4 flex-shrink-0">
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

      {/* Mobile Bottom Bar */}
      <aside className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-[#1e1e1e] border-t border-gray-200 dark:border-gray-800 flex items-center justify-around py-2 px-2 z-10 safe-area-inset-bottom">
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="flex flex-col items-center gap-1 p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white active:bg-gray-100 dark:active:bg-[#2d2d2d] rounded transition-colors"
          title="Settings"
        >
          <Settings className="w-5 h-5" />
          <span className="text-xs">Settings</span>
        </button>
        <button
          onClick={handleDownload}
          className="flex flex-col items-center gap-1 p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white active:bg-gray-100 dark:active:bg-[#2d2d2d] rounded transition-colors"
          title="Download"
        >
          <Download className="w-5 h-5" />
          <span className="text-xs">Download</span>
        </button>
        <button
          onClick={handleNewFile}
          className="flex flex-col items-center gap-1 p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white active:bg-gray-100 dark:active:bg-[#2d2d2d] rounded transition-colors"
          title="New File"
        >
          <Plus className="w-5 h-5" />
          <span className="text-xs">New</span>
        </button>
        <button
          onClick={() => setShowInfo(!showInfo)}
          className="flex flex-col items-center gap-1 p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white active:bg-gray-100 dark:active:bg-[#2d2d2d] rounded transition-colors"
          title="Info"
        >
          <Info className="w-5 h-5" />
          <span className="text-xs">Info</span>
        </button>
      </aside>
    </>
  );
}

