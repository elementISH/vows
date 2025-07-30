"use client";

import { Button, Drawer, Heading } from "@/components/atoms";
import { ShoppingBasket as BasketIcon } from "lucide-react";
import { Box } from "@chakra-ui/react";
import QuantityBubble from "./quantityBubble";
import CartItems from "./cartItems";
import CartFooter from "./cartFooter";
import { useState } from "react";

export default function ShoppingBasket() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <Drawer
      isOpen={drawerOpen}
      onOpenChange={setDrawerOpen}
      size={{ base: "full", sm: "sm", md: "md", lg: "md", xl: "md" }}
      title={
        <Heading
          heading="Shopping Basket"
          headingStyles={{ textStyle: "2xl" }}
          subheading="Review your items and checkout"
          subheadingStyles={{ textStyle: "sm", fontWeight: "500" }}
        />
      }
      trigger={
        <Box position="relative">
          <Button icon rounded="full" variant="outline">
            <BasketIcon />
          </Button>
          <QuantityBubble />
        </Box>
      }
      footer={<CartFooter onOpenChange={setDrawerOpen} />}
    >
      <CartItems />
    </Drawer>
  );
}
