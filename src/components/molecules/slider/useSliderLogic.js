"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

export function useSliderLogic({
  autoplay = false,
  snap = true,
  direction = "ltr",
  autoPlayDelay = 2,
  children = [],
  maxChildren = Infinity,
}) {
  const autoplayPlugin = useRef(
    Autoplay({ delay: autoPlayDelay * 1000, stopOnInteraction: true })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      direction,
      align: "start",
      skipSnaps: false,
      loop: false,
      dragFree: !snap,
    },
    autoplay ? [autoplayPlugin.current] : []
  );

  const [prevDisabled, setPrevDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(true);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevDisabled(!emblaApi.canScrollPrev());
    setNextDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  const safeChildren = children ?? [];
  const validChildren = Array.isArray(safeChildren)
    ? safeChildren
    : [safeChildren];
  const displayItems = validChildren.slice(0, maxChildren);
  const showEndElement = validChildren.length > maxChildren;

  return {
    emblaRef,
    scrollPrev,
    scrollNext,
    prevDisabled,
    nextDisabled,
    displayItems,
    showEndElement,
  };
}
