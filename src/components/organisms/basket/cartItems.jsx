"use client";

import {
  Box,
  Flex,
  Text,
  VStack,
  HStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Trash2, Pencil } from "lucide-react";
import {
  Button,
  Divider,
  FormatColor,
  Image,
  Link,
  QuantitySelector,
} from "@/components/atoms";
import { useState } from "react";
import { getAvailableStock } from "@/utils/functions";

const sampleItems = [
  {
    id: 1,
    title: "Wedding Tuxedo Wedding Tuxedo",
    size: "x-small",
    color: "#B28C86",
    image: "/test_image.png",
    quantity: 2,
    price: 12000,
    discountPrice: 24000,
  },
  {
    id: 2,
    title: "Formal Shoes",
    size: "4x-large",
    color: "#F4C6C6",
    image: "/test_image.png",
    quantity: 1,
    price: 12000,
  },
];

const formatter = new Intl.NumberFormat("en-EG", {
  style: "currency",
  currency: "EGP",
  maximumFractionDigits: 0,
});

export default function CartItems({ switchActions = false }) {
  return (
    <VStack
      maxH="100%"
      overflowY="auto"
      pr={2}
      align="stretch"
      gap={1}
      w="full"
      scrollbar={"hidden"}
    >
      {sampleItems.map((item) => (
        <CartItem key={item.id} item={item} switchActions={switchActions} />
      ))}
    </VStack>
  );
}

function CartItem({ item, switchActions }) {
  const [quantity, setQuantity] = useState(item.quantity);

  // Responsive values
  const direction = useBreakpointValue({ base: "column", md: "row" });
  const imageSize = useBreakpointValue({ base: "64px", md: "80px" });
  const titleTextStyle = useBreakpointValue({ base: "sm", md: "md" });
  const detailTextStyle = useBreakpointValue({ base: "xs", md: "sm" });
  const priceTextStyle = useBreakpointValue({ base: "sm", md: "md" });
  const showBottomSection = useBreakpointValue({ base: true, md: false });

  const InfoSection = (
    <Flex
      align={direction === "column" ? "flex-start" : "center"}
      direction={"row"}
      flex={1}
      gap={4}
      w="full"
    >
      <Image
        src={item.image}
        alt={item.title}
        chakraProps={{
          boxSize: imageSize,
          rounded: "2xl",
          flexShrink: 0,
          border: "0.5px solid",
          borderColor: "rose.400",
        }}
        nextProps={{ width: 250, height: 250 }}
      />

      {/* Text & Quantity */}
      <VStack align="start" gap={1} flex={1} minW={0} w="full">
        <Text
          fontWeight="semibold"
          isTruncated
          maxW="100%"
          textStyle={titleTextStyle}
        >
          {item.title}
        </Text>
        <Text
          color="gray.600"
          isTruncated
          maxW="100%"
          textStyle={detailTextStyle}
        >
          {item.size}, <FormatColor value={item.color} ghost />
        </Text>

        {/* Inline Quantity/Actions for md+ */}
        {!showBottomSection &&
          (switchActions ? (
            <HStack gap={2}>
              <Button
                variant="ghost"
                size="xs"
                textStyle="xs"
                color="fg.muted"
                px={0}
                _hover={{ bg: "transparent" }}
                asChild
              >
                <Link color="fg.muted" textDecoration="none" href="/product/0">
                  <Pencil size={12} /> Edit
                </Link>
              </Button>
              <Divider
                vertical
                height="2px"
                width={"1rem"}
                color="gray.400"
                rounded="full"
              />
              <Button
                icon
                size="xs"
                variant="ghost"
                aria-label="Remove item"
                color="red.500"
                padding={0}
                minW="auto"
                w="auto"
                h="auto"
                _hover={{ bg: "transparent" }}
              >
                <Trash2 size={14} />
              </Button>
            </HStack>
          ) : (
            <QuantitySelector
              quantity={quantity}
              onChange={setQuantity}
              stock={getAvailableStock(item.color, item.size)}
              size="xs"
              boxSize={8}
            />
          ))}
        {showBottomSection && switchActions && (
          <QuantitySelector
            quantity={quantity}
            onChange={setQuantity}
            stock={getAvailableStock(item.color, item.size)}
            size="xs"
            boxSize={8}
          />
        )}
      </VStack>
    </Flex>
  );

  const BottomSection = (
    <HStack
      align="start"
      mt={2}
      w="full"
      display={showBottomSection ? "flex" : "none"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Text
        fontWeight="bold"
        color={item?.discountPrice ? "primary" : "text-black"}
        textStyle={priceTextStyle}
        css={
          item?.discountPrice && {
            textDecoration: "underline wavy",
            textDecorationThickness: "2px",
            textDecorationSkipInk: "none",
            textUnderlineOffset: "20%",
          }
        }
      >
        {formatter.format(item.price)}
      </Text>

      {switchActions ? (
        <HStack gap={2}>
          <Button
            variant="ghost"
            size="xs"
            textStyle="xs"
            px={0}
            color="fg.muted"
            _hover={{ bg: "transparent" }}
            asChild
          >
            <Link color="fg.muted" textDecoration="none" href="/product/0">
              <Pencil size={12} /> Edit
            </Link>
          </Button>
          <Divider
            vertical
            height="2px"
            width={"1rem"}
            color="gray.400"
            rounded="full"
          />
          <Button
            icon
            size="xs"
            variant="ghost"
            aria-label="Remove item"
            color="red.500"
            padding={0}
            minW="auto"
            w="auto"
            h="auto"
            _hover={{ bg: "transparent" }}
          >
            <Trash2 size={14} />
          </Button>
        </HStack>
      ) : (
        <QuantitySelector
          quantity={quantity}
          onChange={setQuantity}
          stock={getAvailableStock(item.color, item.size)}
          size="xs"
          boxSize={8}
        />
      )}
    </HStack>
  );

  const RightSection = !showBottomSection && (
    <VStack align="end" justifyContent="space-between" height="stretch">
      <Box>
        <Text
          fontWeight="bold"
          color={item?.discountPrice ? "primary" : "text-black"}
          textStyle={priceTextStyle}
          css={
            item?.discountPrice && {
              textDecoration: "underline wavy",
              textDecorationThickness: "2px",
              textDecorationSkipInk: "none",
              textUnderlineOffset: "20%",
            }
          }
        >
          {formatter.format(item.price)}
        </Text>
      </Box>

      {!switchActions ? (
        <HStack gap={2}>
          <Button
            variant="ghost"
            size="xs"
            textStyle="xs"
            px={0}
            color="fg.muted"
            _hover={{ bg: "transparent" }}
            asChild
          >
            <Link color="fg.muted" textDecoration="none" href="/product/0">
              <Pencil size={12} /> Edit
            </Link>
          </Button>
          <Divider
            vertical
            height="2px"
            width={"1rem"}
            color="gray.400"
            rounded="full"
          />
          <Button
            icon
            size="xs"
            variant="ghost"
            aria-label="Remove item"
            color="red.500"
            padding={0}
            minW="auto"
            w="auto"
            h="auto"
            _hover={{ bg: "transparent" }}
          >
            <Trash2 size={14} />
          </Button>
        </HStack>
      ) : (
        <QuantitySelector
          quantity={quantity}
          onChange={setQuantity}
          stock={getAvailableStock(item.color, item.size)}
          size="xs"
          boxSize={8}
        />
      )}
    </VStack>
  );

  return (
    <Flex direction={direction} gap={2} w="full" pb={4}>
      {InfoSection}
      {BottomSection}
      {RightSection}
    </Flex>
  );
}
