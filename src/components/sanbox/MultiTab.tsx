"use client";
import React from "react";
import { Flex, Tabs } from "@radix-ui/themes";
import { useDispatch, useSelector } from "react-redux";
import { Activelanguage, setLanguage, tabs } from "@/slices/editor";
import useSocket from "@/hooks/useSocket";
import useSocketActions from "@/hooks/useSocketActions";
import { useSearchParams } from "next/navigation";

function MultiTab() {
  const dp = useDispatch();
  const allTabs = useSelector(tabs);
  const activeLanguage = useSelector(Activelanguage);

  const socket = useSocket();
  const { setLanguage: setLanguageSocket } = useSocketActions({ socket });
  const searchParams = useSearchParams();
  const roomId = searchParams.get("session");

  const handleLanguageChange = (lng: string) => {
    dp(setLanguage(lng));
    if (roomId) {
      setLanguageSocket(lng, roomId as string);
    }
  };

  return (
    <Tabs.Root value={activeLanguage} onValueChange={handleLanguageChange}>
      <Tabs.List className="flex dark:bg-[#1e1e1e] bg-white text-white">
        {allTabs.map((tab) => (
          <Tabs.Trigger
            key={tab.language}
            value={tab.language}
            className={`flex cursor-pointer items-center px-3 py-1 text-sm font-medium ${
              activeLanguage === tab.language
                ? "bg-[#2d2d2d] text-white border-2 border-blue-500"
                : "bg-[#1e1e1e] text-gray-400 hover:text-white"
            }`}
          >
            <Flex className="cursor-pointer dark:text-white text-black text-center">
              <p className="mx-2">{tab.name}</p>
            </Flex>
          </Tabs.Trigger>
        ))}
      </Tabs.List>
    </Tabs.Root>
  );
}

export default MultiTab;

