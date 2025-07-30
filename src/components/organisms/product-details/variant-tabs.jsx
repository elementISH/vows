"use client";

import {
  Box,
  Flex,
  HStack,
  VStack,
  Text,
  Popover,
  Portal,
  NumberInput,
  PopoverContent,
  PopoverTrigger,
  PopoverBody,
  Input,
  Tabs,
} from "@chakra-ui/react";
import { Button, Divider } from "@/components/atoms";
import { ColorSelector, SizeSelector } from "@/components/molecules";
import { Plus, Trash2, ShoppingBag } from "lucide-react";
import { useState } from "react";

export default function ProductCustomizationPanel() {
  const [variants, setVariants] = useState([]);
  const [activeVariantId, setActiveVariantId] = useState(null);

  const activeVariant = variants.find((v) => v.id === activeVariantId);

  const isValid = (variant) => {
    const hasColor = variant.color || variant.customColor;
    const hasSize =
      variant.size ||
      (variant.customSize &&
        variant.customSize.length &&
        variant.customSize.width);
    return hasColor && hasSize;
  };

  const createEmptyVariant = () => ({
    id: Date.now(),
    color: null,
    size: null,
    quantity: 1,
    customColor: "",
    customSize: { length: "", width: "" },
  });

  const handleAddToCart = () => {
    if (!activeVariantId) {
      const newVariant = createEmptyVariant();
      setVariants([newVariant]);
      setActiveVariantId(newVariant.id);
      console.log("Created initial variant", newVariant);
    } else {
      console.log("Finalized Variant:", activeVariant);
    }
  };

  const updateVariant = (key, value) => {
    setVariants((prev) =>
      prev.map((v) => (v.id === activeVariantId ? { ...v, [key]: value } : v))
    );
    console.log("Updated", key, value);
  };

  const deleteVariant = (id) => {
    const filtered = variants.filter((v) => v.id !== id);
    setVariants(filtered);
    setActiveVariantId(filtered[0]?.id ?? null);
    console.log("Deleted variant", id);
  };

  const addNewVariant = () => {
    const newVariant = createEmptyVariant();
    setVariants([...variants, newVariant]);
    setActiveVariantId(newVariant.id);
    console.log("Added new variant", newVariant);
  };

  return (
    <Box w="full">
      <VStack align="start" gap={4}>
        <Text>Choose your style</Text>
        <ColorSelector
          colors={["#B28C86", "#F4C6C6", "#FFFFFF"]}
          selectedColor={activeVariant?.color}
          onChange={(val) => updateVariant("color", val)}
          canExtend
          renderExtend={() => (
            <Popover.Root>
              <Popover.Trigger asChild>
                <Button size="xs" variant="outline">
                  Custom Color
                </Button>
              </Popover.Trigger>
              <Portal>
                <Popover.Positioner>
                  <Popover.Content>
                    <Popover.Body>
                      <Input
                        placeholder="#HEX"
                        value={activeVariant?.customColor}
                        onChange={(e) =>
                          updateVariant("customColor", e.target.value)
                        }
                      />
                      <Button
                        onClick={() =>
                          console.log(
                            "Saved custom color",
                            activeVariant?.customColor
                          )
                        }
                        mt={2}
                        size="xs"
                      >
                        Save
                      </Button>
                    </Popover.Body>
                  </Popover.Content>
                </Popover.Positioner>
              </Portal>
            </Popover.Root>
          )}
        />
        <Text>Choose your size</Text>
        <SizeSelector
          sizes={["x-small", "small", "medium", "large"]}
          selectedSize={activeVariant?.size}
          onChange={(val) => updateVariant("size", val)}
          canExtend
          renderExtend={() => (
            <Popover.Root>
              <Popover.Trigger asChild>
                <Button size="xs" variant="outline">
                  Custom Size
                </Button>
              </Popover.Trigger>
              <Portal>
                <Popover.Positioner>
                  <Popover.Content>
                    <Popover.Body>
                      <HStack>
                        <Input
                          placeholder="Length"
                          type="number"
                          value={activeVariant?.customSize?.length}
                          onChange={(e) =>
                            updateVariant("customSize", {
                              ...activeVariant?.customSize,
                              length: e.target.value,
                            })
                          }
                        />
                        <Input
                          placeholder="Width"
                          type="number"
                          value={activeVariant?.customSize?.width}
                          onChange={(e) =>
                            updateVariant("customSize", {
                              ...activeVariant.customSize,
                              width: e.target.value,
                            })
                          }
                        />
                      </HStack>
                      <Button
                        onClick={() =>
                          console.log(
                            "Saved custom size",
                            activeVariant?.customSize
                          )
                        }
                        mt={2}
                        size="xs"
                      >
                        Save
                      </Button>
                    </Popover.Body>
                  </Popover.Content>
                </Popover.Positioner>
              </Portal>
            </Popover.Root>
          )}
        />
        <Text>Quantity</Text>
        <NumberInput.Root
          value={activeVariant?.quantity ?? 1}
          onChange={(val) => updateVariant("quantity", val)}
          width="100px"
        >
          <NumberInput.Control />
          <NumberInput.Input />
        </NumberInput.Root>
      </VStack>

      <Divider my={6} />

      {variants.length === 0 ? (
        <Button
          onClick={handleAddToCart}
          w="full"
          fontWeight="bold"
          rounded="full"
          disabled={!isValid({ ...activeVariant })}
        >
          Add to Cart
        </Button>
      ) : (
        <Tabs.Root
          value={activeVariantId}
          onValueChange={(id) => setActiveVariantId(id)}
        >
          <Tabs.List>
            {variants.map((v) => (
              <Tabs.Trigger
                key={v.id}
                value={v.id}
                display="flex"
                alignItems="center"
                gap={2}
              >
                <ShoppingBag size={16} />
                <Text>Item</Text>
                <Button
                  icon
                  size="xs"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteVariant(v.id);
                  }}
                >
                  <Trash2 size={14} />
                </Button>
              </Tabs.Trigger>
            ))}
            <Tabs.Trigger
              value="add"
              onClick={addNewVariant}
              display="flex"
              alignItems="center"
              gap={1}
            >
              <Plus size={16} />
            </Tabs.Trigger>
          </Tabs.List>
        </Tabs.Root>
      )}
    </Box>
  );
}
