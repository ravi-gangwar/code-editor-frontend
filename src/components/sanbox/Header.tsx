import React, { useState } from "react";
import Select from "../Select";
import {
  Badge,
  Button,
  Dialog,
  Flex,
  IconButton,
  Text,
} from "@radix-ui/themes";
import ExecutionButton from "./ExecutionButton";
import { TExecutionResponse } from "@/types";
import { Share2, Copy, MessageCircle, Instagram } from "lucide-react";

type THeader = {
  executionRes: TExecutionResponse | null;
};

function Header({ executionRes }: THeader) {
  const [open, setOpen] = useState(false);
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
  };

  const handleWhatsAppShare = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(currentUrl)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleInstagramShare = () => {
    // Instagram doesn't have a direct share URL, but we can open Instagram
    window.open("https://instagram.com", "_blank");
  };

  return (
    <header className="bg-muted p-3 border-b flex flex-wrap items-center justify-between dark:bg-dark-600">
      <Select />
      <>
        <div className="flex flex-col md:flex-row md:items-center md:gap-2 w-full md:w-auto mt-2 md:mt-0">
          {/* Memory & Time Row */}
          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger>
              <IconButton color="indigo" radius="full">
                <Share2 size={15} />
              </IconButton>
            </Dialog.Trigger>

            <Dialog.Content style={{ maxWidth: 450 }}>
              <Dialog.Title>Live share</Dialog.Title>
              <Dialog.Description size="2" mb="4">
                Share your code with friends and colleagues
              </Dialog.Description>

              <Flex direction="row" gap="3">
                <Button
                  onClick={handleWhatsAppShare}
                  className="flex items-center gap-2"
                  variant="soft"
                >
                  <MessageCircle color="green" size={20} />
                </Button>

                <Button
                  onClick={handleInstagramShare}
                  className="flex items-center gap-2"
                  variant="soft"
                >
                  <Instagram color="red" size={20} />
                </Button>

                <Button
                  onClick={handleCopy}
                  className="flex items-center gap-2"
                  variant="soft"
                >
                  <Copy size={20} />
                  <Text>Copy Link</Text>
                </Button>
              </Flex>

              <Flex gap="3" mt="4" justify="center">
                <Dialog.Close>
                  <Button variant="soft" color="gray">
                    Close
                  </Button>
                </Dialog.Close>
              </Flex>
            </Dialog.Content>
          </Dialog.Root>

          <Flex className="gap-2 items-center justify-center md:justify-start">
            <Badge className="text-sm">
              Memory: {executionRes?.memoryUsage ?? "0MB"}
            </Badge>
            <Badge className="text-sm">
              Time: {executionRes?.executionTime ?? "0ms"}
            </Badge>
          </Flex>

          {/* Execute & Submit Buttons in One Row */}
          <Flex className="gap-2 items-center justify-center md:justify-start mt-2 md:mt-0">
            <ExecutionButton />
          </Flex>
        </div>
      </>
    </header>
  );
}

export default Header;
