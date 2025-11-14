"use client";
import React from "react";
import { X, RotateCcw } from "lucide-react";

interface OutputModalProps {
  isOpen: boolean;
  output: string | null;
  hasError?: boolean;
  onClose: () => void;
  onRetry?: () => void;
}

export default function OutputModal({ 
  isOpen,
  output, 
  hasError = false,
  onClose, 
  onRetry 
}: OutputModalProps) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 dark:bg-black/70"
      onClick={onClose}
    >
      <div 
        className="mx-4 w-full max-w-3xl max-h-[80vh] rounded-lg bg-white dark:bg-[#1e1e1e] shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Output
          </h2>
          <div className="flex items-center gap-3">
            {hasError && onRetry && (
              <button
                onClick={onRetry}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Try Again
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-[#2d2d2d] rounded-md transition-colors"
            >
              <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {hasError && output ? (
            <div className="bg-red-50 dark:bg-red-900/20 rounded-md p-4 border border-red-200 dark:border-red-800">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">!</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-red-800 dark:text-red-400 mb-2">
                    Error
                  </h3>
                  <pre className="text-sm text-red-700 dark:text-red-300 whitespace-pre-wrap font-mono overflow-x-auto">
                    {output}
                  </pre>
                </div>
              </div>
            </div>
          ) : output !== null ? (
            <div className="bg-gray-50 dark:bg-[#252526] rounded-md p-4 border border-gray-200 dark:border-gray-800">
              <pre className="text-sm text-gray-900 dark:text-gray-100 whitespace-pre-wrap font-mono overflow-x-auto">
                {output}
              </pre>
            </div>
          ) : (
            <div className="flex items-center justify-center py-12">
              <p className="text-sm text-gray-500 dark:text-gray-400">No output</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

