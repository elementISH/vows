import { VStack, HStack, Text } from "@chakra-ui/react";
import { ColorSelector, SizeSelector } from "@/components/molecules";
import { Palette } from "lucide-react";
import { Divider, QuantitySelector, Button } from "@/components/atoms";
import VariationSelector from "./variationSelector";
import { CustomizationPanel, ShoppingBasket } from "@/components/organisms";
import CustomSizePopover from "./custom-size-popover";
import CustomColorPopover from "./custom-color-popover";
import SizeChartTrigger from "./size-chart-trigger";

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
  customSize,
  onCustomSizeChange,
  customColor,
  onCustomColorChange,
}) {
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
            <CustomColorPopover
              selected={color}
              value={customColor}
              onChange={onCustomColorChange}
              onSubmit={(color) => updateActive({ color })}
            />
          )}
        />
      </VStack>

      {/* Size Picker & Quantity */}
      <VStack align="start" w="full" gap={4}>
        <VStack align="start" w="full" gap={3}>
          <Text display="flex" gap={2} alignItems="center">
            Choose your size
            <SizeChartTrigger chart={null} />
          </Text>

          <SizeSelector
            sizes={["x-small", "small", "medium", "large"]}
            selectedSize={size}
            onChange={(s) => updateActive({ size: s })}
            canExtend
            renderExtend={() => (
              <CustomSizePopover
                selected={size}
                value={customSize}
                onChange={onCustomSizeChange}
                onSubmit={({ length, width }) =>
                  updateActive({ size: `${length}x${width}` })
                }
              />
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
            boxSize={9}
          />
        </VStack>
      </VStack>

      {/* Customization CTA */}
      <VStack align="start" w="full" gap={3}>
        <Text textStyle="md">Get creative</Text>
        <CustomizationPanel />
      </VStack>

      <Divider />

      {/* Bottom Actions & Variations */}
      <VStack w="full" alignItems="start" gap={4} justifyContent="start" pt={2}>
        <HStack gap={{ base: 2 }} w="full" justifyContent={"flex-start"}>
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
