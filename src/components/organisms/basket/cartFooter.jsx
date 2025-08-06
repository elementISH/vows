"use client";

import { Button, Link } from "@/components/atoms";
import {
  Box,
  Flex,
  FormatNumber,
  HStack,
  Text,
  VStack,
  Stack,
} from "@chakra-ui/react";
import { CreditCard, Share2, ShoppingBasket } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function CartFooter({ onOpenChange }) {
  const router = useRouter();
  const path = usePathname();
  const isShopOrProductPage =
    path?.startsWith("/shop") || path?.startsWith("/product");

  const handleContinueShopping = () => {
    if (isShopOrProductPage) return onOpenChange(false);
    router.push("/shop");
    onOpenChange(false);
  };

  return (
    <Flex
      flex={1}
      borderTop="1px solid"
      borderColor="primary"
      direction="column"
      gap={6}
      pt={4}
      px={{ base: 4, sm: 6, md: 8 }}
    >
      <VStack w="full" gap={2} align="stretch">
        <HStack justify="space-between" w="full">
          <Text textStyle="md">Subtotal</Text>
          <Text fontWeight="bold" textStyle="md">
            <FormatNumber value="37900" style="currency" currency="EGP" />
          </Text>
        </HStack>

        <HStack justify="space-between" w="full" color="primary">
          <Text textStyle="md">You saved</Text>
          <Text
            fontWeight="bold"
            textStyle="md"
            css={{
              textDecoration: "underline wavy",
              textDecorationThickness: "2px",
              textDecorationSkipInk: "none",
              textUnderlineOffset: "20%",
            }}
          >
            <FormatNumber value="2000" style="currency" currency="EGP" />
          </Text>
        </HStack>
      </VStack>

      <VStack w="full" gap={3}>
        <Button
          bg="primary"
          fontWeight="bold"
          w="full"
          rounded="xl"
          py={3}
          height="3rem"
          asChild
        >
          <Link color="text-white" textDecoration="none" href="/checkout">
            <Box w={6} h={6} asChild>
              <CreditCard strokeWidth={1.5} />
            </Box>
            Checkout
          </Link>
        </Button>

        <Stack
          direction={{ base: "column", sm: "row" }}
          gap={{ base: 3, sm: 4 }}
          w="full"
        >
          <Button
            bg="rose.50"
            flex={1}
            variant={"outline"}
            rounded="xl"
            py={3}
            height="3rem"
            onClick={handleContinueShopping}
          >
            <Box w={6} h={6} asChild>
              <ShoppingBasket strokeWidth={1.5} />
            </Box>
            Continue shopping
          </Button>
          <Button
            bg="rose.50"
            flex={1}
            variant={"outline"}
            rounded="xl"
            py={3}
            height="3rem"
            onClick={() =>
              navigator.share?.({
                title: "Cart",
                text: "Take a look at my cart now!",
                url: "https://test.com/",
              })
            }
          >
            <Box w={6} h={6} asChild>
              <Share2 strokeWidth={1.5} />
            </Box>
            Share basket
          </Button>
        </Stack>
      </VStack>
    </Flex>
  );
}
