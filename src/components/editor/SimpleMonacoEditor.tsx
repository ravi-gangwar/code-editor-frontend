"use client";
import React from "react";
import Editor from "@monaco-editor/react";
import { useTheme } from "@/context/useContext";

interface SimpleMonacoEditorProps {
  language: string;
  value: string;
  onChange: (value: string) => void;
}

export default function SimpleMonacoEditor({
  language,
  value,
  onChange,
}: SimpleMonacoEditorProps) {
  const { theme } = useTheme();
  const editorTheme = theme === "dark" ? "vs-dark" : "vs";
  const bgColor = theme === "dark" ? "bg-[#1e1e1e]" : "bg-white";

  const handleChange = (val: string | undefined) => {
    onChange(val || "");
  };

  return (
    <div className={`absolute inset-0 ${bgColor}`}>
      <Editor
        height="100%"
        width="100%"
        language={language}
        theme={editorTheme}
        value={value}
        onChange={handleChange}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: "on",
          roundedSelection: false,
          scrollBeyondLastLine: false,
          readOnly: false,
          automaticLayout: true,
          wordWrap: "on",
          tabSize: 2,
          formatOnPaste: true,
          formatOnType: true,
          padding: { top: 16, bottom: 16 },
          lineHeight: 22,
          fontFamily: "'Fira Code', 'Consolas', 'Monaco', 'Courier New', monospace",
        }}
      />
    </div>
  );
}

