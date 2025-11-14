"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import EditorHeader from "@/components/editor/EditorHeader";
import EditorSidebar from "@/components/editor/EditorSidebar";
import OutputModal from "@/components/editor/OutputModal";
import { useCodeRunMutation } from "@/slices/rtk-query/apis";
import { DEFAULT_CODE_TEMPLATES, DEFAULT_LANGUAGE } from "@/constants/constants";
import { toast } from "sonner";

const MonacoEditor = dynamic(() => import("@/components/editor/SimpleMonacoEditor"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full animate-pulse bg-white dark:bg-[#1e1e1e]" />
  ),
});

export default function EditorPage() {
  const params = useParams();
  const id = params.id as string;
  const [selectedLanguage, setSelectedLanguage] = useState(DEFAULT_LANGUAGE);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [runCode] = useCodeRunMutation();
  const [isInitialized, setIsInitialized] = useState(false);
  const [lastLanguage, setLastLanguage] = useState<string | null>(null);

  // Load saved code or initialize with default
  useEffect(() => {
    if (isInitialized) return;
    
    const savedCode = localStorage.getItem(`code-${id}`);
    const savedLang = localStorage.getItem(`lang-${id}`);
    
    if (savedCode) {
      setCode(savedCode);
      if (savedLang) {
        setSelectedLanguage(savedLang);
        setLastLanguage(savedLang);
      } else {
        setLastLanguage(DEFAULT_LANGUAGE);
      }
      setIsInitialized(true);
      return;
    }

    setCode(DEFAULT_CODE_TEMPLATES[DEFAULT_LANGUAGE]);
    setLastLanguage(DEFAULT_LANGUAGE);
    setIsInitialized(true);
  }, [id, isInitialized]);

  // Update code when language changes (only if code matches the previous language's default)
  useEffect(() => {
    if (!isInitialized || !lastLanguage) return;
    
    // Only proceed if language actually changed
    if (selectedLanguage === lastLanguage) return;
    
    // Get the default code for the previous language
    const previousDefault = DEFAULT_CODE_TEMPLATES[lastLanguage];
    const currentDefault = DEFAULT_CODE_TEMPLATES[selectedLanguage];
    
    // Check if current code matches the previous language's default (allowing for minor whitespace differences)
    const normalizedCurrentCode = code.trim();
    const normalizedPreviousDefault = previousDefault?.trim() || "";
    
    // If code matches the previous language's default, update to new language's default
    if (normalizedCurrentCode === normalizedPreviousDefault && currentDefault) {
      setCode(currentDefault);
    }
    
    // Update last language
    setLastLanguage(selectedLanguage);
  }, [selectedLanguage, isInitialized, lastLanguage, code]);

  const handleRun = async () => {
    if (!code.trim()) {
      toast.error("Please write some code first");
      return;
    }

    try {
      setIsRunning(true);
      setHasError(false);
      setOutput(null);
      setIsModalOpen(false);
      
      const response = await runCode({
        code,
        lang: selectedLanguage.toLowerCase(),
      }).unwrap();

      // Check if response has error field
      if (response && response.error) {
        const errorMessage = response.error || "Execution failed";
        setHasError(true);
        setOutput(errorMessage);
        setIsModalOpen(true);
        toast.error(errorMessage);
      } 
      // Check if response has output field
      else if (response && response.output !== undefined) {
        setOutput(response.output || "No output");
        setHasError(false);
        setIsModalOpen(true);
      }
    } catch (error: unknown) {
      const errorMessage = (error as { data?: { message?: string; error?: string }; message?: string })?.data?.message || 
                          (error as { data?: { message?: string; error?: string }; message?: string })?.data?.error || 
                          (error as { data?: { message?: string; error?: string }; message?: string })?.message || 
                          "Execution failed";
      setHasError(true);
      setOutput(errorMessage);
      setIsModalOpen(true);
      toast.error(errorMessage);
    } finally {
      setIsRunning(false);
    }
  };

  const handleSave = () => {
    // Save code to localStorage or backend
    localStorage.setItem(`code-${id}`, code);
    localStorage.setItem(`lang-${id}`, selectedLanguage);
    toast.success("Code saved!");
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard!");
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `code.${selectedLanguage === 'javascript' ? 'js' : selectedLanguage === 'python' ? 'py' : selectedLanguage}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Code downloaded!");
  };

  return (
    <div className="h-screen bg-white dark:bg-[#1e1e1e] flex flex-col overflow-hidden">
      {/* Top Header */}
      <EditorHeader
        selectedLanguage={selectedLanguage}
        onLanguageChange={setSelectedLanguage}
        onSave={handleSave}
        onShare={handleShare}
        onRun={handleRun}
        isRunning={isRunning}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex min-h-0">
        {/* Editor */}
        <div className="flex-1 relative min-h-0">
          <MonacoEditor
            language={selectedLanguage}
            value={code}
            onChange={setCode}
          />
        </div>

        {/* Right Sidebar */}
        <EditorSidebar onDownload={handleDownload} />
      </div>

      {/* Output Modal */}
      <OutputModal
        isOpen={isModalOpen}
        output={output}
        hasError={hasError}
        onClose={() => {
          setIsModalOpen(false);
          setOutput(null);
          setHasError(false);
        }}
        onRetry={handleRun}
      />
    </div>
  );
}

