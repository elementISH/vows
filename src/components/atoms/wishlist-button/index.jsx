"use client";

import { useState } from "react";
import { Button } from "@/components/atoms";
import { Heart } from "lucide-react";
import { Box, useBreakpointValue } from "@chakra-ui/react";

export default function WishlistButton({ onClick, isFilled = false }) {
  const [animateHeart, setAnimateHeart] = useState(false);

  const size = useBreakpointValue({ base: "40px", sm: "44px", md: "42px" });
  const iconSize = useBreakpointValue({ base: 22, sm: 24, md: 26 });

  const handleClick = (e) => {
    setAnimateHeart(true);
    setTimeout(() => setAnimateHeart(false), 400);

    onClick?.(e);
  };

  return (
    <Box position="relative" display="inline-block">
      <Button
        icon
        onClick={handleClick}
        variant="outline"
        bg="white"
        rounded="full"
        minW={size}
        h={size}
        p={0}
        _hover={{ bg: "rose.50" }}
        zIndex={1}
      >
        <Box
          as="span"
          display="inline-flex"
          animation={animateHeart ? "heartPulse" : undefined}
        >
          <Heart
            fill={isFilled ? "#D75D6A" : "none"}
            color="#D75D6A"
            size={iconSize}
            style={{ transition: "fill 0.2s ease-in-out" }}
          />
        </Box>
      </Button>
    </Box>
  );
}
