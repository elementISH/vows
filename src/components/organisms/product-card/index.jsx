"use client";

import {
  Box,
  VStack,
  Text,
  HStack,
  FormatNumber,
  useBreakpointValue,
  Stack,
  Show,
  Flex,
} from "@chakra-ui/react";
import { ColorSelector, SizeSelector } from "@/components/molecules";
import {
  Link,
  WishlistButton,
  Image,
  Divider,
  Button,
  Heading,
} from "@/components/atoms";
import { useState } from "react";

export default function ProductCard({
  id,
  image,
  title,
  colors = [],
  sizes = [],
  price,
  originalPrice,
  imageProps = {},
}) {
  const [liked, setLiked] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);

  const handleLike = () => setLiked(!liked);

  const imageHeight = useBreakpointValue({
    base: "200px",
    sm: "240px",
    md: "280px",
    lg: "300px",
  });

  return (
    <Box
      display="flex"
      flexDirection="column"
      rounded="xl"
      overflow="hidden"
      height="100%"
      bg="rose.50"
      w={{ base: "3xs", sm: "2xs", md: "xs" }}
    >
      <Box position="relative" minH={imageHeight} maxH={imageHeight}>
        <Link href={`/product/${id}`}>
          <Image
            src={image}
            alt={title}
            nextProps={imageProps}
            chakraProps={{
              w: "full",
              h: "100%",
              objectFit: "cover",
              cursor: "pointer",
            }}
          />
        </Link>
        <Box position="absolute" bottom={2} left={2} zIndex={2}>
          <WishlistButton onClick={handleLike} isFilled={liked} />
        </Box>

        <Box
          position="absolute"
          bottom={2}
          right={2}
          px={3}
          py={1}
          rounded="md"
          zIndex={2}
          bg="rgba(255, 255, 255, 0.2)"
          style={{
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
          }}
        >
          <Link href={`/product/${id}`} textStyle="xs" fontWeight="bold">
            View details
          </Link>
        </Box>
      </Box>

      <VStack gap={3} align="start" flex="1" p={4}>
        <Heading size="sm" noOfLines={1}>
          {title}
        </Heading>

        <ColorSelector
          colors={colors}
          selectedColor={selectedColor}
          onChange={setSelectedColor}
        />
        <Show when={imageHeight >= "240px"}>
          <VStack align="start" gap={1} pt={2} w="full">
            <Text textStyle="xs" color="fg.muted">
              Available in:
            </Text>
            <SizeSelector sizes={sizes} noSelection />
          </VStack>
        </Show>
      </VStack>

      <Divider />
      <Box mt="auto">
        <Stack
          justify="space-between"
          align="top"
          px={4}
          py={3}
          direction={{ base: "column" }}
        >
          <Flex minH="3rem" direction={"column"} alignItems={"start"}>
            <Text fontWeight="bold" textStyle={{ base: "md", md: "lg" }}>
              <FormatNumber
                value={price}
                style="currency"
                currency="EGP"
                maximumFractionDigits={2}
              />
            </Text>

            {originalPrice && originalPrice > price && (
              <Text
                textStyle="xs"
                color="fg.muted"
                textDecoration="line-through"
              >
                <FormatNumber
                  value={originalPrice}
                  style="currency"
                  currency="EGP"
                  maximumFractionDigits={2}
                />
              </Text>
            )}
          </Flex>

          <Button
            size="sm"
            textStyle="sm"
            rounded="full"
            px={5}
            minW="90px"
            asChild
          >
            <Link
              href={`/product/${id}`}
              textDecoration="none"
              color="text-white"
              textStyle="sm"
            >
              Customize
            </Link>
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
