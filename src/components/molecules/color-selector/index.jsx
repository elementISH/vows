"use client";

import { useEffect, useRef, useState } from "react";
import { Box, Flex, Icon } from "@chakra-ui/react";
import { Check } from "lucide-react";
import { ScrollControls } from "@/components/atoms";

export default function ColorSelector({
  colors = [],
  selectedColor,
  onChange,
  canExtend = false,
  renderExtend = () => null,
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
  }, [colors]);

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
        {colors.map((c, i) => (
          <Box
            key={i}
            boxSize={{ base: "28px", sm: "28px" }}
            rounded="full"
            bg={c}
            border="2px solid"
            borderColor={selectedColor === c ? "primary" : "rose.100"}
            position="relative"
            flexShrink={0}
            onClick={() => onChange(c)}
            cursor="pointer"
          >
            {selectedColor === c && (
              <Box
                position="absolute"
                w="70%"
                h="70%"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                rounded="full"
                bg="rose.50/20"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Icon
                  as={Check}
                  boxSize={4}
                  color="rose.500"
                  fontWeight="bold"
                  strokeWidth={3}
                />
              </Box>
            )}
          </Box>
        ))}

        {canExtend && <Box flexShrink={0}>{renderExtend()}</Box>}
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
