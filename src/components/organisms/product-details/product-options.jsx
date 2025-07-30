import {
  VStack,
  HStack,
  Text,
  Box,
  useBreakpointValue,
} from "@chakra-ui/react";
import { ColorSelector, SizeSelector } from "@/components/molecules";
import { Plus, Palette, CircleQuestionMark } from "lucide-react";
import {
  Divider,
  QuantitySelector,
  Tooltip,
  Tag,
  Button,
} from "@/components/atoms";
import VariationSelector from "./variationSelector";
import { ShoppingBasket } from "@/components/organisms";

export default function ProductOptions({
  editRef,
  COLOR_IMAGES,
  color,
  size,
  quantity,
  updateActive,
  getAvailableStock,
  saved,
  handleAddToCart,
  variations,
  activeIndex,
  setActiveIndex,
  setShowDeleteDialogIndex,
  handleAddVariation,
}) {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <VStack ref={editRef} w="full" align="start" gap={6}>
      {/* Color Picker */}
      <VStack align="start" w="full" gap={3}>
        <Text textStyle="md">Choose your style</Text>
        <ColorSelector
          colors={Object.keys(COLOR_IMAGES)}
          selectedColor={color}
          onChange={(c) => updateActive({ color: c })}
          canExtend
          renderExtend={() => (
            <Tooltip content="Customize your own color!">
              <Box
                boxSize={{ base: "28px", sm: "28px" }}
                rounded="full"
                bg="bg-color"
                display="flex"
                alignItems="center"
                justifyContent="center"
                cursor="pointer"
                border="2px dashed"
                borderColor="primary"
                onClick={() => console.log("Add new color")}
              >
                <Plus size="18" color="var(--chakra-colors-primary)" />
              </Box>
            </Tooltip>
          )}
        />
      </VStack>

      {/* Size Picker & Quantity */}
      <VStack align="start" w="full" gap={4}>
        <VStack align="start" w="full" gap={3}>
          <Text display="flex" gap={2} alignItems="center">
            Choose your size
            <Tooltip content="View size chart">
              <CircleQuestionMark
                size={18}
                color="var(--chakra-colors-fg-muted)"
                cursor="pointer"
              />
            </Tooltip>
          </Text>

          <SizeSelector
            sizes={["x-small", "small", "medium", "large"]}
            selectedSize={size}
            onChange={(s) => updateActive({ size: s })}
            canExtend
            renderExtend={() => (
              <Tooltip content="Customize your own size!">
                <Tag
                  px={4}
                  bg="bg-color"
                  rounded="full"
                  border="2px dashed"
                  borderColor="primary"
                  boxShadow="none"
                  color="primary"
                  cursor="pointer"
                  onClick={() => console.log("Add new size")}
                >
                  <Plus size="18" color="var(--chakra-colors-primary)" />
                </Tag>
              </Tooltip>
            )}
          />
        </VStack>

        <VStack align="start" w="full" gap={2}>
          <Text textStyle="md">One for you, one for them?</Text>
          <QuantitySelector
            quantity={quantity}
            onChange={(q) => updateActive({ quantity: q })}
            stock={getAvailableStock(color, size)}
            size="sm"
            boxSize={10}
          />
        </VStack>
      </VStack>

      {/* Customization CTA */}
      <VStack align="start" w="full" gap={3}>
        <Text textStyle="md">Get creative</Text>
        <Button variant="outline" textStyle="sm" rounded="2xl" maxW={"full"}>
          <Palette strokeWidth={2} color="var(--chakra-colors-primary)" />
          <Text truncate>Add custom text, choose patterns and more</Text>
        </Button>
      </VStack>

      <Divider />

      {/* Bottom Actions & Variations */}
      <VStack w="full" alignItems="start" gap={4} justifyContent="start" pt={2}>
        <HStack gap={{ base: 2, md: 4 }} w="full" justifyContent={"flex-start"}>
          <Button
            disabled={!color || !size || saved}
            onClick={handleAddToCart}
            rounded="full"
            px={{ base: 0, sm: 24 }}
            flex={{ base: 1, sm: "unset" }}
            w={{ base: "fit", md: "auto" }}
          >
            {saved ? "Save Changes" : "Add to Cart"}
          </Button>
          <ShoppingBasket />
        </HStack>

        <VariationSelector
          variations={variations}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          setShowDeleteDialogIndex={setShowDeleteDialogIndex}
          handleAddVariation={handleAddVariation}
        />
      </VStack>
    </VStack>
  );
}
