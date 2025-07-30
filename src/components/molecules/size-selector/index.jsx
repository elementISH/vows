"use client";

import { useEffect, useRef, useState } from "react";
import { Flex } from "@chakra-ui/react";
import { Tag, ScrollControls } from "@/components/atoms";

export default function SizeSelector({
  sizes = [],
  selectedSize,
  onChange,
  canExtend = false,
  renderExtend = () => null,
  noSelection = false,
}) {
  const scrollRef = useRef();
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
      left: dir === "left" ? -80 : 80,
      behavior: "smooth",
    });
  };

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
  }, [sizes]);

  return (
    <Flex align="center" w="full" gap={2}>
      <ScrollControls
        type="prev"
        onClick={() => scroll("left")}
        isVisible={showButtons}
        isDisabled={!canScrollLeft}
      />

      <Flex
        ref={scrollRef}
        overflowX="auto"
        gap={2}
        flex="1"
        scrollbar="hidden"
      >
        {sizes.map((size, i) => (
          <Tag
            key={i}
            rounded="full"
            px={4}
            bg={
              !noSelection && selectedSize === size ? "rose.100" : "transparent"
            }
            color="primary"
            fontWeight="600"
            flexShrink={0}
            shadowColor="rose.400"
            cursor={noSelection ? "grab" : "pointer"}
            onClick={() => {
              if (noSelection) return;
              onChange(size);
            }}
          >
            {size}
          </Tag>
        ))}

        {canExtend && <Flex flexShrink={0}>{renderExtend()}</Flex>}
      </Flex>

      <ScrollControls
        type="next"
        onClick={() => scroll("right")}
        isVisible={showButtons}
        isDisabled={!canScrollRight}
      />
    </Flex>
  );
}
