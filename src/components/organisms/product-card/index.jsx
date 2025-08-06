"use client";

import {
  Box,
  VStack,
  Text,
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
import { useShopState } from "@/utils/hooks";
import { toast } from "sonner";

export default function ProductCard({
  id,
  image,
  title,
  colors = [],
  sizes = [],
  price,
  originalPrice,
  isWishlisted,
  imageProps = {},
}) {
  const { addToWishlist, removeFromWishList } = useShopState();
  const [wishlisted, setWishListed] = useState(isWishlisted || false);
  const [selectedColor, setSelectedColor] = useState(null);

  const handleWishlist = async () => {
    if (!id) return;

    const previousState = wishlisted;
    setWishListed(!previousState);

    try {
      if (previousState) {
        await removeFromWishList(id);
      } else {
        await addToWishlist(id);
      }
    } catch (error) {
      setWishListed(previousState);
      toast.error("Failed to update wishlist. Try again.");
      console.error("Wishlist toggle failed:", error);
    }
  };

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
          <WishlistButton onClick={handleWishlist} isFilled={wishlisted} />
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
          <Link
            href={`/product/${id}`}
            textStyle="xs"
            fontWeight="bold"
            color="bg-color"
          >
            View details
          </Link>
        </Box>
      </Box>

      <VStack gap={3} align="start" flex="1" p={4}>
        <Heading
          heading={title}
          headingStyles={{
            size: "md",
            noOfLines: 1,
          }}
        />

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
