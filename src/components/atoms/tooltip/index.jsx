"use client";

import React, { forwardRef, useState } from "react";
import { Tooltip as ChakraTooltip, Portal } from "@chakra-ui/react";

const Tooltip = forwardRef(function Tooltip(props, ref) {
  const {
    children,
    content,
    showArrow = false,
    disabled = false,
    portalled = true,
    portalRef,
    contentProps = {},
    isOpen,
    onOpenChange,
    ...rest
  } = props;

  if (disabled) return children;
  const [internalOpen, setInternalOpen] = useState(false);
  const open = isOpen ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;
  return (
    <ChakraTooltip.Root
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
      {...rest}
    >
      <ChakraTooltip.Trigger asChild>{children}</ChakraTooltip.Trigger>

      <Portal disabled={!portalled} container={portalRef}>
        <ChakraTooltip.Positioner>
          <ChakraTooltip.Content ref={ref} {...contentProps}>
            {showArrow && (
              <ChakraTooltip.Arrow>
                <ChakraTooltip.ArrowTip />
              </ChakraTooltip.Arrow>
            )}
            {content}
          </ChakraTooltip.Content>
        </ChakraTooltip.Positioner>
      </Portal>
    </ChakraTooltip.Root>
  );
});

Tooltip.displayName = "Tooltip";
export default Tooltip;
