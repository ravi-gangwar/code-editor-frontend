"use client";
import React from "react";
import { X, RotateCcw } from "lucide-react";

interface OutputPanelProps {
  output: string | null;
  isLoading?: boolean;
  hasError?: boolean;
  onClose: () => void;
  onRetry?: () => void;
}

export default function OutputPanel({ 
  output, 
  isLoading = false, 
  hasError = false,
  onClose, 
  onRetry 
}: OutputPanelProps) {
  return (
    <div className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#252526]">
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 dark:border-gray-800">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
          Output
        </h3>
        <div className="flex items-center gap-2">
          {hasError && onRetry && (
            <button
              onClick={onRetry}
              className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Try Again
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-[#2d2d2d] rounded transition-colors"
          >
            <X className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </div>
      <div className="p-4 max-h-64 overflow-auto">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="flex flex-col items-center gap-3">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Running code...</p>
            </div>
          </div>
        ) : hasError ? (
          <div className="flex items-center justify-center py-8">
            <p className="text-sm text-red-600 dark:text-red-400">
              Execution failed. Please try again.
            </p>
          </div>
        ) : output !== null ? (
          <pre className="text-sm text-gray-900 dark:text-gray-100 whitespace-pre-wrap font-mono">
            {output}
          </pre>
        ) : null}
      </div>
    </div>
  );
}

