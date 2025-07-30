"use client";

import { Button, Heading, SnakeSvg } from "@/components/atoms";
import { CategoryCard, Section } from "@/components/molecules";
import {
  Box,
  HStack,
  Stack,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";

export default function CtaSection() {
  const isMobile = useBreakpointValue({ base: true, xl: false });
  const headingText = "Your Wedding Starts Here";

  const subheadingText = useBreakpointValue({
    base: "Explore curated collections, all in one place!",
    md: "Explore curated collections, thoughtful details, and everything in between, all in one place!",
  });
  return (
    <Section
      wrapperStyles={{
        bg: "rose.100",
        rounded: "4xl",
        position: "relative",
        overflow: "hidden",
        py: { base: 6, xl: 32 },
        pb: { base: 6, xl: 52 },
        px: { base: 4, sm: 0 },
        mb: 12,
      }}
    >
      {/* Desktop: Left SVG + Card */}
      {!isMobile && (
        <VStack
          position="absolute"
          left={0}
          top={0}
          px={8}
          align="start"
          gap={0}
          zIndex={1}
        >
          <Box transform="scaleX(-1) translateX(-6.5rem)">
            <SnakeSvg />
          </Box>
          <Box transform="scale(0.7) rotate(-10deg) translateY(-8rem)">
            <CategoryCard />
          </Box>
        </VStack>
      )}

      {/* Desktop: Right SVG + Card */}
      {!isMobile && (
        <VStack
          position="absolute"
          right={0}
          top={0}
          px={8}
          align="end"
          gap={0}
          zIndex={1}
        >
          <Box transform="scaleX(1) translateX(-6.5rem)">
            <SnakeSvg />
          </Box>
          <Box transform="scale(0.7) rotate(10deg) translateY(-8rem)">
            <CategoryCard />
          </Box>
        </VStack>
      )}

      {/* Central heading */}

      <Heading
        heading={headingText}
        headingStyles={{
          textStyle: {
            base: "2xl",
            sm: "4xl",
            md: "4xl",
            lg: "5xl",
            xl: "6xl",
          },
          fontWeight: "bold",
          textAlign: "center",
          lineHeight: "shorter",
        }}
        subheading={subheadingText}
        subheadingStyles={{
          textStyle: {
            base: "sm",
            sm: "lg",
            md: "lg",
            lg: "xl",
          },
          maxW: {
            base: "90%",
            sm: "85%",
            md: "70%",
            lg: "60%",
          },
          textAlign: "center",
          mt: 2,
        }}
        wrapperStyles={{
          alignItems: "center",
          zIndex: 2,
        }}
      />

      <Button
        rounded="full"
        fontWeight="bold"
        size="lg"
        width={{ base: "100%", sm: "auto" }}
        textStyle={{
          base: "md",
          sm: "lg",
          md: "xl",
          lg: "2xl",
        }}
        px={{ base: 4, sm: 24, md: 12, lg: 20, xl: 24 }}
      >
        Shop Now
      </Button>

      {/* Mobile: Two cards side-by-side below heading */}
      {/* {isMobile && (
        <HStack gap={4} justify="center" mt={8}>
          <CategoryCard
            rootStyles={{ transform: "scale(0.9) rotate(-5deg)" }}
          />
          <CategoryCard rootStyles={{ transform: "scale(0.9) rotate(5deg)" }} />
        </HStack>
      )} */}
    </Section>
  );
}
