// atoms/PopoverMenu.jsx
"use client";

import { Popover as ChakraPopover, Portal } from "@chakra-ui/react";
import { useState } from "react";

export default function Popover({
  trigger,
  children,
  buttonProps = {},
  contentProps = {},
  bodyProps = {},
}) {
  const [open, setOpen] = useState(false);

  return (
    <ChakraPopover.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
      <ChakraPopover.Trigger asChild>{trigger}</ChakraPopover.Trigger>
      <Portal>
        <ChakraPopover.Positioner>
          <ChakraPopover.Content {...contentProps}>
            <ChakraPopover.Arrow />
            <ChakraPopover.Body {...bodyProps}>{children}</ChakraPopover.Body>
          </ChakraPopover.Content>
        </ChakraPopover.Positioner>
      </Portal>
    </ChakraPopover.Root>
  );
}
