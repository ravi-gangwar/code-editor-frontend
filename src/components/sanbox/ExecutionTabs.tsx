"use client";
import React from "react";
import { Tabs } from "@radix-ui/themes";

function TabsComponent({ output }: { output: string }) {
  return (
    <Tabs.Root defaultValue="output">
      <Tabs.List>
        <Tabs.Trigger value="output">Output</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="output">
        <div className="mt-4 p-4 bg-gray-100 dark:bg-dark-700 rounded-lg">
          <pre className="text-sm text-gray-900 dark:text-gray-100 whitespace-pre-wrap font-mono">
            {output || "No output yet"}
          </pre>
        </div>
      </Tabs.Content>
    </Tabs.Root>
  );
}

export default TabsComponent;

