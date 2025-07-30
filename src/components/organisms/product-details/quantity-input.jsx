"use client";

import { Input } from "@chakra-ui/react";

export default function QuantityInput({ value, onChange }) {
  return (
    <Input
      type="number"
      size="xs"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      min={1}
      w="60px"
    />
  );
}
