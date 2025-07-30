"use client";

import { useState, useEffect, useRef } from "react";
import {
  Box,
  Flex,
  HStack,
  Icon,
  Text,
  VStack,
  Dialog,
  Portal,
  CloseButton,
  useBreakpointValue,
  Show,
} from "@chakra-ui/react";
import { ColorSelector, SizeSelector } from "@/components/molecules";
import ProductInfo from "./product-info";
import ProductCarousel from "./product-carousel";
import {
  Button,
  Tag,
  Tooltip,
  Divider,
  QuantitySelector,
} from "@/components/atoms";
import { CircleQuestionMark, Minus, Palette, Plus, X } from "lucide-react";
import { toast } from "sonner";
import { useBeforeUnload } from "@/utils/hooks";
import VariationSelector from "./variationSelector";
import { useRouter, usePathname } from "next/navigation";
import { ShoppingBasket } from "..";
import { getAvailableStock } from "@/utils/functions";
import ProductOptions from "./product-options";

const COLOR_IMAGES = {
  "#B28C86": ["/test_image.png", "/test_category.png"],
  "#F4C6C6": ["/test_category.png", "/test_image.png"],
  "#FFFFFF": ["/test_category.png", "/test_image.png"],
};

const MOCK_STOCK = {
  "#B28C86": { "x-small": 5, small: 3, medium: 10, large: 2 },
  "#F4C6C6": { "x-small": 1, small: 1, medium: 2, large: 0 },
  "#FFFFFF": { "x-small": 0, small: 2, medium: 3, large: 1 },
};

const EMPTY_VARIATION = {
  color: null,
  size: null,
  quantity: 1,
  saved: false,
};

export default function ProductDetails() {
  const router = useRouter();
  const pathname = usePathname();

  const [variations, setVariations] = useState([EMPTY_VARIATION]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showDeleteDialogIndex, setShowDeleteDialogIndex] = useState(null);
  const [showMinTooltip, setShowMinTooltip] = useState(false);
  const [showMaxTooltip, setShowMaxTooltip] = useState(false);

  const [pendingRoute, setPendingRoute] = useState(null);
  const [showNavConfirmDialog, setShowNavConfirmDialog] = useState(false);

  const current = variations[activeIndex];
  const { color, size, quantity, saved } = current || EMPTY_VARIATION;

  const hasUnsavedChanges = variations.some(
    (item) => !item.saved && (item.color !== null || item.size !== null)
  );
  console.log(hasUnsavedChanges);
  const updateActive = (updates) => {
    const updated = [...variations];
    updated[activeIndex] = {
      ...updated[activeIndex],
      ...updates,
      saved: false,
    };

    const selColor = updates.color ?? updated[activeIndex].color;
    const selSize = updates.size ?? updated[activeIndex].size;

    if (selColor && selSize) {
      const stock = MOCK_STOCK[selColor]?.[selSize] ?? 1;
      if (updated[activeIndex].quantity > stock) {
        updated[activeIndex].quantity = stock;
        setShowMaxTooltip(true);
        toast.info(`Stock limit: max ${stock} items for size ${selSize}`);
      }
    }

    setVariations(updated);
  };

  const handleAddVariation = () => {
    setVariations([...variations, { ...EMPTY_VARIATION }]);
    setActiveIndex(variations.length);
  };

  const handleConfirmDeleteVariation = () => {
    const updated = variations.filter((_, i) => i !== showDeleteDialogIndex);
    if (updated.length === 0) {
      updated.push({ ...EMPTY_VARIATION });
    }
    setVariations(updated);
    setActiveIndex(Math.max(0, showDeleteDialogIndex - 1));
    setShowDeleteDialogIndex(null);
    toast.success("Variation removed");
  };

  const handleAddToCart = () => {
    if (!color || !size) {
      toast.warning("Select color and size first");
      return;
    }

    const stock = MOCK_STOCK[color]?.[size] ?? 0;
    if (quantity > stock) {
      toast.error(`Max available for this size is ${stock}`);
      updateActive({ quantity: stock });
      setShowMaxTooltip(true);
      return;
    }

    const updated = [...variations];
    updated[activeIndex].saved = true;
    setVariations(updated);
    toast.success("Saved");
  };

  const handleQuantityChange = (direction) => {
    if (direction === "inc") {
      const stock = color && size ? MOCK_STOCK[color]?.[size] ?? 999 : 999;
      if (quantity < stock) {
        updateActive({ quantity: quantity + 1 });
        setShowMaxTooltip(false);
      } else {
        setShowMaxTooltip(true);
      }
    } else if (direction === "dec") {
      if (quantity > 1) {
        updateActive({ quantity: quantity - 1 });
        setShowMinTooltip(false);
      } else {
        setShowMinTooltip(true);
      }
    }
  };

  useBeforeUnload(() => hasUnsavedChanges);

  useEffect(() => {
    const originalPush = router.push;
    router.push = (...args) => {
      const [url] = args;
      if (url === pathname) return;
      if (hasUnsavedChanges) {
        setPendingRoute(() => () => originalPush(...args));
        setShowNavConfirmDialog(true);
        return;
      }
      originalPush(...args);
    };
    return () => {
      router.push = originalPush;
    };
  }, [hasUnsavedChanges, pathname, router]);

  useEffect(() => {
    const handleClick = (e) => {
      const anchor = e.target.closest("a[href]");
      if (!anchor || anchor.target === "_blank") return;
      const href = anchor.getAttribute("href");
      if (!href?.startsWith("/") || href === pathname) return;

      if (hasUnsavedChanges) {
        e.preventDefault();
        setPendingRoute(() => () => router.push(href));
        setShowNavConfirmDialog(true);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [hasUnsavedChanges, pathname, router]);

  const confirmAndNavigate = () => {
    if (pendingRoute) {
      pendingRoute();
      setPendingRoute(null);
      setShowNavConfirmDialog(false);
    }
  };
  const swapDetails = useBreakpointValue({
    base: false,
    mid: true,
    midL: false,
  });
  const isMobile = useBreakpointValue({ base: true, md: false });

  const editRef = useRef(null);
  return (
    <Flex
      direction={{ base: "column", midL: "row" }}
      gap={10}
      w="full"
      h="full"
    >
      <Flex alignItems={"start"} gap={8} direction={{ base: "row" }} flex={1}>
        <Box
          flex={1}
          w="full"
          maxW={{ base: "50%", midL: "100%" }}
          minW={{ base: "100%", mid: "50%", midL: "100%" }}
        >
          <ProductCarousel
            images={COLOR_IMAGES[color ?? Object.keys(COLOR_IMAGES)[0]]}
          />
        </Box>
        <Show when={swapDetails}>
          <Box maxW={"fit"}>
            <ProductInfo isMobile editEl={editRef} />
          </Box>
        </Show>
      </Flex>

      <VStack
        align="stretch"
        maxW={{ base: "100%", lg: "50%" }}
        flex={1}
        w="full"
        gap={4}
      >
        <Show when={!swapDetails} fallback={<Divider />}>
          <Box maxW={"fit"}>
            <ProductInfo />
          </Box>
        </Show>
        <ProductOptions
          COLOR_IMAGES={COLOR_IMAGES}
          activeIndex={activeIndex}
          color={color}
          editRef={editRef}
          getAvailableStock={getAvailableStock}
          handleAddToCart={handleAddToCart}
          handleAddVariation={handleAddVariation}
          quantity={quantity}
          saved={saved}
          setActiveIndex={setActiveIndex}
          size={size}
          setShowDeleteDialogIndex={setShowDeleteDialogIndex}
          updateActive={updateActive}
          variations={variations}
        />

        <Dialog.Root
          open={showNavConfirmDialog}
          onOpenChange={setShowNavConfirmDialog}
        >
          <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.Title>Unsaved Changes</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                  You have unsaved changes. Do you want to discard them and
                  leave this page?
                </Dialog.Body>
                <Dialog.Footer>
                  <Dialog.ActionTrigger asChild>
                    <Button onClick={() => setShowNavConfirmDialog(false)}>
                      Cancel
                    </Button>
                  </Dialog.ActionTrigger>
                  <Button
                    onClick={confirmAndNavigate}
                    variant="outline"
                    colorScheme="red"
                  >
                    Discard Changes
                  </Button>
                </Dialog.Footer>
                <Dialog.CloseTrigger asChild>
                  <CloseButton size="sm" />
                </Dialog.CloseTrigger>
              </Dialog.Content>
            </Dialog.Positioner>
          </Portal>
        </Dialog.Root>
        <Dialog.Root
          open={showDeleteDialogIndex !== null}
          onOpenChange={(e) => {
            if (!e.open) setShowDeleteDialogIndex(null);
          }}
          lazyMount={false} // Important: force mount
        >
          <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.Title>Confirm Deletion</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                  Are you sure you want to delete this variation?
                </Dialog.Body>
                <Dialog.Footer>
                  <Dialog.ActionTrigger asChild>
                    <Button onClick={() => setShowDeleteDialogIndex(null)}>
                      Cancel
                    </Button>
                  </Dialog.ActionTrigger>
                  <Button onClick={handleConfirmDeleteVariation}>Delete</Button>
                </Dialog.Footer>
                <Dialog.CloseTrigger asChild>
                  <CloseButton size="sm" />
                </Dialog.CloseTrigger>
              </Dialog.Content>
            </Dialog.Positioner>
          </Portal>
        </Dialog.Root>
      </VStack>
    </Flex>
  );
}
