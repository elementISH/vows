"use client";

import { useEffect, useRef, useState } from "react";
import { Box, Flex, HStack } from "@chakra-ui/react";
import { ScrollControls, Image } from "@/components/atoms";

export default function ThumbnailScroller({ images, selected, onSelect }) {
  const scrollRef = useRef();
  const thumbnailRefs = useRef([]);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    const atStart = el.scrollLeft <= 0;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;

    setCanScrollLeft(!atStart);
    setCanScrollRight(!atEnd);
    setShowButtons(el.scrollWidth > el.clientWidth + 1);
  };

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({
      left: dir === "left" ? -120 : 120,
      behavior: "smooth",
    });
  };

  // 🔄 Scroll selected thumbnail into view
  useEffect(() => {
    const container = scrollRef.current;
    const target = thumbnailRefs.current[selected];
    if (!container || !target) return;

    const containerRect = container.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    const offsetLeft = target.offsetLeft - container.offsetLeft;
    const targetCenter =
      offsetLeft - container.clientWidth / 2 + target.clientWidth / 2;

    container.scrollTo({
      left: targetCenter,
      behavior: "smooth",
    });
  }, [selected]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    checkScroll();
    el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [images]);

  return (
    <Box position="relative" w="full" mt={4}>
      <HStack
        ref={scrollRef}
        overflowX="auto"
        gap={2}
        flex="1"
        scrollbar="hidden"
        css={{
          scrollSnapType: "x mandatory",
          scrollBehavior: "smooth",
        }}
      >
        {images?.map((src, idx) => (
          <Box
            key={idx}
            ref={(el) => (thumbnailRefs.current[idx] = el)}
            onClick={() => onSelect(idx)}
            cursor="pointer"
            borderWidth="2px"
            borderColor={idx === selected ? "primary" : "transparent"}
            rounded="xl"
            overflow="hidden"
            flexShrink={0}
            css={{ scrollSnapAlign: "center" }}
          >
            <Image
              src={src}
              alt={`thumb-${idx}`}
              chakraProps={{ boxSize: "120px", objectFit: "cover" }}
              nextProps={{ width: 120, height: 120 }}
            />
          </Box>
        ))}
      </HStack>

      {/* Overlay Buttons */}
      <ScrollControls
        type="prev"
        onClick={() => scroll("left")}
        isVisible={showButtons}
        isDisabled={!canScrollLeft}
        size={"xs"}
        prevProps={{
          position: "absolute",
          left: 2,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 1,
        }}
      />

      <ScrollControls
        type="next"
        onClick={() => scroll("right")}
        isVisible={showButtons}
        isDisabled={!canScrollRight}
        size={"xs"}
        nextProps={{
          position: "absolute",
          right: 2,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 1,
        }}
      />
    </Box>
  );
}
