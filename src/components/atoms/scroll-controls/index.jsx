// atoms/ScrollControls.jsx
"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/atoms";

function ScrollPrev({
  onClick,
  isVisible,
  isDisabled = false,
  size = "2xs",
  ...props
}) {
  if (!isVisible) return null;
  return (
    <Button
      icon
      size={size}
      variant="outline"
      rounded="full"
      onClick={onClick}
      disabled={isDisabled}
      p={0}
      aria-label="Scroll left"
      {...props}
    >
      <ChevronLeft size={8} />
    </Button>
  );
}

function ScrollNext({
  onClick,
  isVisible,
  isDisabled = false,
  size = "2xs",
  ...props
}) {
  if (!isVisible) return null;
  return (
    <Button
      icon
      size={size}
      variant="outline"
      rounded="full"
      onClick={onClick}
      p={0}
      disabled={isDisabled}
      aria-label="Scroll right"
      {...props}
    >
      <ChevronRight size={8} />
    </Button>
  );
}
export default function ScrollControls({
  type,
  onClick,
  isVisible,
  isDisabled,
  size,
  nextProps = {},
  prevProps = {},
}) {
  if (type == "next")
    return (
      <ScrollNext
        onClick={onClick}
        isVisible={isVisible}
        isDisabled={isDisabled}
        size={size}
        {...nextProps}
      />
    );
  if (type == "prev")
    return (
      <ScrollPrev
        onClick={onClick}
        isVisible={isVisible}
        isDisabled={isDisabled}
        size={size}
        {...prevProps}
      />
    );
  return null;
}
