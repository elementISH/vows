"use client";

import { useState } from "react";
import { HStack, Text } from "@chakra-ui/react";
import { Minus, Plus } from "lucide-react";
import { Button, Tooltip } from "@/components/atoms";

export default function QuantitySelector({
  quantity,
  onChange,
  stock = Infinity,
  min = 1,
  disabled = false,
  size = "sm",
  boxSize = 8,
}) {
  const [showMinTooltip, setShowMinTooltip] = useState(false);
  const [showMaxTooltip, setShowMaxTooltip] = useState(false);

  const handleDecrement = () => {
    if (quantity > min) {
      onChange(quantity - 1);
      setShowMinTooltip(false);
    } else {
      setShowMinTooltip(true);
    }
  };

  const handleIncrement = () => {
    if (quantity < stock) {
      onChange(quantity + 1);
      setShowMaxTooltip(false);
    } else {
      setShowMaxTooltip(true);
    }
  };

  const textStyleMap = {
    xs: "sm",
    sm: "md",
    md: "lg",
    lg: "xl",
  };

  return (
    <HStack gap={2}>
      <Tooltip
        content={`Minimum ${min} item${min > 1 ? "s" : ""}`}
        open={showMinTooltip}
        onOpenChange={(e) => setShowMinTooltip(e.open)}
      >
        <Button
          icon
          variant="subtle"
          bg="rose.100"
          rounded="full"
          size={size}
          boxSize={boxSize}
          onClick={handleDecrement}
          disabled={disabled || quantity <= min}
        >
          <Minus size={16} />
        </Button>
      </Tooltip>

      <Text
        textStyle={textStyleMap[size] || "lg"}
        minW="3ch"
        textAlign="center"
      >
        {quantity}
      </Text>

      <Tooltip
        content="Max stock reached"
        open={showMaxTooltip}
        onOpenChange={(e) => setShowMaxTooltip(e.open)}
      >
        <Button
          icon
          variant="subtle"
          bg="primary"
          color="text-white"
          rounded="full"
          size={size}
          boxSize={boxSize}
          onClick={handleIncrement}
          disabled={disabled || quantity >= stock}
        >
          <Plus size={16} />
        </Button>
      </Tooltip>
    </HStack>
  );
}
