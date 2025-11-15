"use client";

import dynamic from "next/dynamic";
import { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "next/navigation";
import EditorHeader from "@/components/editor/EditorHeader";
import EditorSidebar from "@/components/editor/EditorSidebar";
import OutputModal from "@/components/editor/OutputModal";
import { useCodeRunMutation } from "@/slices/rtk-query/apis";
import { DEFAULT_CODE_TEMPLATES, DEFAULT_LANGUAGE } from "@/constants/constants";
import { toast } from "sonner";
import { useSocketIO } from "@/hooks/useSocketIO";
import useSocketIOActions from "@/hooks/useSocketIOActions";

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
  
  // Refs to prevent infinite loops when receiving socket updates
  const isReceivingUpdateRef = useRef(false);
  const codeDebounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Socket.IO integration for real-time collaboration
  const { socket, isConnected, connectionCount } = useSocketIO({
    roomId: id,
    enabled: !!id,
    onCodeChange: (newCode: string) => {
      isReceivingUpdateRef.current = true;
      setCode(newCode);
      // Save to localStorage when receiving updates
      localStorage.setItem(`code-${id}`, newCode);
      setTimeout(() => {
        isReceivingUpdateRef.current = false;
      }, 100);
    },
    onLanguageChange: (newLanguage: string, providedCode?: string) => {
      isReceivingUpdateRef.current = true;
      setSelectedLanguage(newLanguage);
      setLastLanguage(newLanguage);
      
      // Use provided code if available, otherwise use default boilerplate
      const codeToUse = providedCode || DEFAULT_CODE_TEMPLATES[newLanguage] || "";
      if (codeToUse) {
        setCode(codeToUse);
        localStorage.setItem(`code-${id}`, codeToUse);
      }
      
      localStorage.setItem(`lang-${id}`, newLanguage);
      setTimeout(() => {
        isReceivingUpdateRef.current = false;
      }, 100);
    },
  });

  // Socket.IO actions
  const { broadcastCode, broadcastLanguage } = useSocketIOActions({ socket, isConnected });

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

  // Update code when language changes - always update boilerplate
  useEffect(() => {
    if (!isInitialized || !lastLanguage) return;
    
    // Only proceed if language actually changed
    if (selectedLanguage === lastLanguage) return;
    
    // Get the default code for the new language
    const currentDefault = DEFAULT_CODE_TEMPLATES[selectedLanguage];
    
    // Always update to the new language's default boilerplate
    if (currentDefault) {
      setCode(currentDefault);
    }
    
    // Broadcast language change if not receiving an update
    if (!isReceivingUpdateRef.current && isConnected) {
      // Include the new code (default boilerplate) with language change
      broadcastLanguage(selectedLanguage, currentDefault);
    }
    
    // Update last language
    setLastLanguage(selectedLanguage);
  }, [selectedLanguage, isInitialized, lastLanguage, isConnected, broadcastLanguage]);

  // Debounced code broadcasting
  const handleCodeChange = useCallback((newCode: string) => {
    setCode(newCode);
    
    // Clear existing timer
    if (codeDebounceTimerRef.current) {
      clearTimeout(codeDebounceTimerRef.current);
    }
    
    // Only broadcast if not receiving an update and socket is connected
    if (!isReceivingUpdateRef.current && isConnected) {
      // Debounce broadcasts to avoid too many messages
      codeDebounceTimerRef.current = setTimeout(() => {
        broadcastCode(newCode);
      }, 500); // 500ms debounce
    }
    
    // Save to localStorage
    localStorage.setItem(`code-${id}`, newCode);
  }, [id, isConnected, broadcastCode]);

  // Cleanup debounce timer on unmount
  useEffect(() => {
    return () => {
      if (codeDebounceTimerRef.current) {
        clearTimeout(codeDebounceTimerRef.current);
      }
    };
  }, []);

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
        onLanguageChange={(lang) => {
          setSelectedLanguage(lang);
          // Broadcast language change immediately with the new default code
          if (!isReceivingUpdateRef.current && isConnected) {
            const defaultCode = DEFAULT_CODE_TEMPLATES[lang];
            broadcastLanguage(lang, defaultCode);
          }
        }}
        onSave={handleSave}
        onShare={handleShare}
        onRun={handleRun}
        isRunning={isRunning}
        isConnected={isConnected}
        connectionCount={connectionCount}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex min-h-0 relative">
        {/* Editor */}
        <div className="flex-1 relative min-h-0 pb-16 md:pb-0">
          <MonacoEditor
            language={selectedLanguage}
            value={code}
            onChange={handleCodeChange}
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

