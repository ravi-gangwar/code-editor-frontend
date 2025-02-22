import React from "react";
import { Tabs } from "@radix-ui/themes";
import Output from "./Output";
import Submissions from "./Submissions";

const tabs = ["Output", "Submissions"];

function TabsComponent({ output }: { output: string }) {
  return (
    <div className="bg-card flex-grow">
      <Tabs.Root defaultValue="output">
        <Tabs.List className="w-full">
          {tabs.map((item: string) => {
            return (
              <Tabs.Trigger key={item} value={item.toLowerCase()}>
                <p className="dark:text-white text-black">{item}</p>
              </Tabs.Trigger>
            );
          })}
        </Tabs.List>

        <Tabs.Content value="output">
          <Output output={output} />
        </Tabs.Content>

        <Tabs.Content value="submissions">
          <Submissions />
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}

export default TabsComponent;
