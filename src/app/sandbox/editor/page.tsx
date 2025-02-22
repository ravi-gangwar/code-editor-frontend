"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import TabsComponent from "@/components/sanbox/ExecutionTabs";
import { Box } from "@radix-ui/themes";
import MultiTab from "@/components/sanbox/MultiTab";
import { executionResponse, setIsActive } from "@/slices/editor";
import { useDispatch, useSelector } from "react-redux";
import useUserActivity from "@/hooks/useUserActivity";
import { AppDispatch } from "@/app/store";
import InActivityIndicator from "@/components/sanbox/InActivityIndicator";
import { SegmentedControl } from "@radix-ui/themes";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import useSocketActions from "@/hooks/useSocketActions";
import { useSearchParams } from "next/navigation";
import useSocket from "@/hooks/useSocket";
import Header from "@/components/sanbox/Header";
// Dynamically load MonacoEditor
const MonacoEditor = dynamic(() => import("@/components/MonacoEditor"), {
  ssr: false,
  loading: () => (
    <div className="h-[600px] w-full animate-pulse bg-gray-200 dark:bg-gray-800 rounded-lg" />
  ),
});

export default function Page() {
  const dp = useDispatch<AppDispatch>();
  const executionRes = useSelector(executionResponse);
  const isSmallScreen = useMediaQuery("(max-width: 1024px)");
  const [activeTab, setActiveTab] = useState<"editor" | "output">("editor");
  const socket = useSocket();
  const { joinRoom, leaveRoom } = useSocketActions({ socket });
  // get room id from url
  const searchParams = useSearchParams();
  const session = searchParams.get("session");

  useEffect(() => {
    if (!session || session === "undefined") return;
    joinRoom(session as string);

    return () => {
      leaveRoom(session as string);
    };
  }, [session, socket]);
  // Detect inactivity after 30 secs
  useUserActivity(30, () => {
    dp(setIsActive(true));
  });

  return (
    <div className="min-h-screen mt-16 bg-white dark:bg-dark-900 flex flex-col">
      <InActivityIndicator />
      {isSmallScreen ? (
        <SegmentedControl.Root
          className="border-b dark:border-dark-700 mb-2"
          defaultValue="editor"
          onValueChange={(value) => setActiveTab(value as "editor" | "output")}
        >
          <SegmentedControl.Item value="editor">Editor</SegmentedControl.Item>
          <SegmentedControl.Item value="output">Output</SegmentedControl.Item>
        </SegmentedControl.Root>
      ) : null}
      <Header executionRes={executionRes} />
      <main className="flex flex-col lg:flex-row flex-grow">
        {isSmallScreen ? (
          activeTab === "editor" ? (
            <Box className="w-full min-h-full">
              <MultiTab />
              <MonacoEditor />
            </Box>
          ) : (
            <section className="w-full flex flex-col overflow-auto gap-4 bg-white dark:bg-dark-600 max-h-[85vh] p-3">
              <TabsComponent output={executionRes?.output || ""} />
            </section>
          )
        ) : (
          <>
            <Box className="w-full lg:w-3/5 min-h-[500px] border-r dark:border-dark-700">
              <MultiTab />
              <MonacoEditor />
            </Box>
            <section className="w-full lg:w-2/5 flex flex-col overflow-auto gap-4 bg-white dark:bg-dark-600 max-h-[85vh] p-3">
              <TabsComponent output={executionRes?.output || ""} />
            </section>
          </>
        )}
      </main>
    </div>
  );
}
