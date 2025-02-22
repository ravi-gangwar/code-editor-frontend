"use client";
import React from "react";
import Editor from "@monaco-editor/react";
import { useDispatch, useSelector } from "react-redux";
import { Activelanguage, setContent, tabs } from "@/slices/editor";
import { useTheme } from "@/context/useContext";
import useSocket from "@/hooks/useSocket";
import useSocketActions from "@/hooks/useSocketActions";
import { useSearchParams } from "next/navigation";
const MonacoEditor: React.FC = () => {
  const dp = useDispatch();
  const language = useSelector(Activelanguage);
  const tab = useSelector(tabs);
  const content = tab.find((lang) => lang.language === language)?.content || "";
  const { theme } = useTheme();
  const socket = useSocket();
  const { sendMessage } = useSocketActions({ socket });
  const searchParams = useSearchParams();
  const roomId = searchParams.get("session");

  const onChange = (text: string | undefined) => {
    sendMessage(text ?? "", roomId as string);
    dp(setContent(text ?? ""));
  };

  return (
    <Editor
      height="80vh"
      width="100%"
      language={language.toLowerCase()}
      theme={theme === "dark" ? "vs-dark" : "vs"}
      value={content}
      onChange={onChange}
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        lineNumbers: "on",
        roundedSelection: false,
        scrollBeyondLastLine: false,
        readOnly: false,
      }}
      className="rounded-lg"
    />
  );
};

export default MonacoEditor;
