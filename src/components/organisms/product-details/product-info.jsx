"use client";

import {
  VStack,
  HStack,
  Text,
  Stack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Button, Heading } from "@/components/atoms";
import { Star } from "lucide-react";
import { FormatNumber } from "@chakra-ui/react";

export default function ProductInfo({ isMobile = false, editEl }) {
  const starCount = 4.2;
  const rating = 30;
  const price = 1499;
  const originalPrice = 1999;

  return (
    <VStack align="start" gap={4}>
      {/* Category + Title + Ratings */}
      <VStack align="start" gap={2} w="full">
        <Text
          textStyle={{ base: "sm", md: "md", lg: "lg" }}
          color="gray.500"
          textTransform="uppercase"
        >
          accessories
        </Text>

        <Heading
          heading="Formal Navy Wedding Suit"
          headingStyles={{
            textStyle: { base: "2xl", md: "2xl", lg: "3xl", xl: "4xl" },
            fontWeight: "bold",
            lineHeight: 1.2,
          }}
        />

        <HStack gap={1} mt={1} wrap="wrap">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={18}
              color={"#FFC229"}
              fill={
                i < Math.round(starCount)
                  ? "#FFC229"
                  : "var(--chakra-colors-bg-color)"
              }
            />
          ))}
          <Text textStyle="sm" color="fg.muted" ms={2}>
            {starCount} ({rating} ratings)
          </Text>
        </HStack>
      </VStack>

      {/* Pricing */}
      <HStack gap={3} align="baseline" mt={1}>
        <Text
          textStyle={{ base: "lg", md: "xl", lg: "2xl" }}
          fontWeight="bold"
          color="primary"
        >
          <FormatNumber value={price} style="currency" currency="EGP" />
        </Text>
        <Text
          textStyle={{ base: "sm", md: "md" }}
          color="text-black"
          textDecoration="line-through"
        >
          <FormatNumber value={originalPrice} style="currency" currency="EGP" />
        </Text>
      </HStack>

      {/* Description */}
      <Text
        textStyle={{ base: "sm", md: "sm", xl: "md" }}
        color="fg.muted"
        maxW={{ base: "100%", lg: "80%" }}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus luctus
        eros. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque
        penatibus et magnis.
      </Text>
      {isMobile && (
        <Button
          rounded={"full"}
          px="8"
          onClick={() => editEl?.current?.scrollIntoView(true)}
        >
          Start customizing
        </Button>
      )}
    </VStack>
  );
}
