import { Dialog, Button, Flex } from "@radix-ui/themes";
import { Info } from "lucide-react";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { isActive, setIsActive } from "@/slices/editor";
import { AppDispatch } from "@/app/store";

function InActivityIndicator() {
  const active = useSelector(isActive);
  const dp = useDispatch<AppDispatch>();
  if (!active) return null;
  return (
    <Dialog.Root
      onOpenChange={() => dp(setIsActive(false))}
      defaultOpen={active}
    >
      <Dialog.Content maxWidth="400px">
        <Flex direction="column" align="center" gap="3">
          <Flex align="center" justify="center" direction="column" gap="2">
            <Info className="text-orange-500" size={40} />
            <Dialog.Title className="text-orange-500">
              Security Alert
            </Dialog.Title>
          </Flex>

          <Dialog.Description size="2" mb="4" className="text-gray-600">
            You are not active! This is a reminder to stay engaged.
          </Dialog.Description>

          <Flex gap="3" justify="end">
            <Dialog.Close>
              <Button
                variant="soft"
                color="gray"
                onClick={() => dp(setIsActive(false))}
              >
                Dismiss
              </Button>
            </Dialog.Close>
          </Flex>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}

export default InActivityIndicator;
