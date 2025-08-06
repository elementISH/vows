"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/atoms";

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
