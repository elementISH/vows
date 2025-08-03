"use client";

import {
  Button,
  CloseButton,
  Drawer as ChakraDrawer,
  Portal,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function Drawer({
  trigger,
  title,
  children,
  footer,
  size = "xs",
  isOpen,
  bodyStyles = {},
  onOpenChange,
}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = isOpen ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;

  const fallbackTrigger = (
    <Button onClick={() => setOpen(true)}>Open Drawer</Button>
  );

  const fallbackTitle = "Drawer Title";
  const fallbackContent = <p>This is drawer content.</p>;
  const fallbackFooter = <Button onClick={() => setOpen(false)}>Close</Button>;

  return (
    <ChakraDrawer.Root
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
      size={size}
    >
      <ChakraDrawer.Trigger asChild>
        {trigger || fallbackTrigger}
      </ChakraDrawer.Trigger>

      <Portal>
        <ChakraDrawer.Backdrop />
        <ChakraDrawer.Positioner>
          <ChakraDrawer.Content
            display="flex"
            flexDirection="column"
            maxH="100vh"
          >
            <ChakraDrawer.Header>
              <ChakraDrawer.Title>{title || fallbackTitle}</ChakraDrawer.Title>
            </ChakraDrawer.Header>

            <ChakraDrawer.Body
              flex="1"
              overflowY="auto"
              px={6}
              py={2}
              {...bodyStyles}
            >
              {children || fallbackContent}
            </ChakraDrawer.Body>

            <ChakraDrawer.Footer px={0}>
              {footer || fallbackFooter}
            </ChakraDrawer.Footer>

            <ChakraDrawer.CloseTrigger asChild>
              <CloseButton size="md" me={4} />
            </ChakraDrawer.CloseTrigger>
          </ChakraDrawer.Content>
        </ChakraDrawer.Positioner>
      </Portal>
    </ChakraDrawer.Root>
  );
}
