"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/atoms";

/**
 * SliderButtons
 *
 * @param {Object} props
 * @param {() => void} props.scrollPrev - Function to scroll to previous slide
 * @param {() => void} props.scrollNext - Function to scroll to next slide
 * @param {boolean} props.prevDisabled - Disable prev button
 * @param {boolean} props.nextDisabled - Disable next button
 * @param {"ltr" | "rtl"} props.direction - Layout direction
 */
export function SliderButtons({
  scrollPrev,
  scrollNext,
  prevDisabled,
  nextDisabled,
  direction = "ltr",
}) {
  const isRTL = direction === "rtl";

  return (
    <>
      <Button
        icon
        aria-label="Next"
        onClick={scrollNext}
        disabled={nextDisabled}
        size="sm"
      >
        {isRTL ? <ChevronLeft /> : <ChevronRight />}
      </Button>
      <Button
        icon
        aria-label="Prev"
        onClick={scrollPrev}
        disabled={prevDisabled}
        size="sm"
      >
        {isRTL ? <ChevronRight /> : <ChevronLeft />}
      </Button>
    </>
  );
}
