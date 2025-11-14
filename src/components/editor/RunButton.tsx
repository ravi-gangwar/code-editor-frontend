"use client";
import React from "react";
import { Play } from "lucide-react";
import { useCodeExecuteMutation } from "@/slices/rtk-query/apis";
import { Execution } from "@/constants/constants";
import { toast } from "sonner";

interface RunButtonProps {
  code: string;
  language: string;
  onOutput: (output: string) => void;
  isRunning: boolean;
  setIsRunning: (isRunning: boolean) => void;
}

export default function RunButton({
  code,
  language,
  onOutput,
  isRunning,
  setIsRunning,
}: RunButtonProps) {
  const [executeCode] = useCodeExecuteMutation();

  const handleRun = async () => {
    if (!code.trim()) {
      toast.error("Please write some code first");
      return;
    }

    try {
      setIsRunning(true);
      const response = await executeCode({
        code,
        language: language.toLowerCase(),
        type: Execution,
      }).unwrap();

      if (response) {
        const outputText = response.output || "No output";
        onOutput(outputText);
      }
    } catch (error: unknown) {
      const errorMessage = (error as { data?: { message?: string }; message?: string })?.data?.message || 
                          (error as { data?: { message?: string }; message?: string })?.message || 
                          "Execution failed";
      onOutput(`Error: ${errorMessage}`);
      toast.error(errorMessage);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <button
      onClick={handleRun}
      disabled={isRunning}
      className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-md font-medium transition-colors disabled:cursor-not-allowed"
    >
      <Play className="w-4 h-4" />
      {isRunning ? "Running..." : "Run"}
    </button>
  );
}

