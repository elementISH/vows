"use client";

import {
  Box,
  Text,
  VStack,
  HStack,
  Input,
  NumberInput,
  Popover,
  Portal,
} from "@chakra-ui/react";
import { ColorSelector, SizeSelector } from "@/components/molecules";
import { Tag, Tooltip, Button, Divider } from "@/components/atoms";
import { CircleQuestionMark, Palette, Plus } from "lucide-react";

const SIZES = ["x-small", "small", "medium", "large"];

export default function ProductConfigurator({
  variant,
  updateVariant,
  maxQuantity = 10,
}) {
  const update = (field, value) =>
    updateVariant(variant.id, { ...variant, [field]: value });

  return (
    <VStack gap={6} align="stretch">
      {/* Color */}
      <VStack align="start" w="full" gap={3}>
        <Text>Choose your style</Text>
        <ColorSelector
          colors={["#B28C86", "#F4C6C6", "#FFFFFF"]}
          selectedColor={variant.color}
          onChange={(val) => update("color", val)}
          canExtend
          renderExtend={() => (
            <Popover.Root>
              <Popover.Trigger asChild>
                <Box
                  w="28px"
                  h="28px"
                  rounded="full"
                  bg="bg-color"
                  border="2px dashed"
                  borderColor="primary"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  cursor="pointer"
                >
                  <Plus size="18" color="var(--chakra-colors-primary)" />
                </Box>
              </Popover.Trigger>
              <Portal>
                <Popover.Positioner>
                  <Popover.Content>
                    <Popover.Body>
                      <Popover.Title fontWeight="medium">
                        Add Custom Color
                      </Popover.Title>
                      <Input
                        placeholder="Hex code"
                        size="sm"
                        onChange={(e) => update("color", e.target.value.trim())}
                      />
                    </Popover.Body>
                  </Popover.Content>
                </Popover.Positioner>
              </Portal>
            </Popover.Root>
          )}
        />
      </VStack>

      {/* Size */}
      <VStack align="start" w="full" gap={3}>
        <Text display="flex" gap={2} alignItems="center">
          Choose your size{" "}
          <Tooltip content="View size chart" showArrow>
            <CircleQuestionMark
              size={18}
              color="var(--chakra-colors-fg-muted)"
              cursor={"pointer"}
            />
          </Tooltip>
        </Text>
        <SizeSelector
          sizes={SIZES}
          selectedSize={variant.size}
          onChange={(val) => update("size", val)}
          canExtend
          renderExtend={() => (
            <Popover.Root>
              <Popover.Trigger asChild>
                <Tag
                  px={4}
                  bg="bg-color"
                  rounded="full"
                  border="2px dashed"
                  borderColor="primary"
                  color="primary"
                  cursor="pointer"
                >
                  <Plus size="18" color="var(--chakra-colors-primary)" />
                </Tag>
              </Popover.Trigger>
              <Portal>
                <Popover.Positioner>
                  <Popover.Content>
                    <Popover.Body>
                      <Popover.Title fontWeight="medium">
                        Add Custom Size
                      </Popover.Title>
                      <HStack gap={2}>
                        <Input
                          placeholder="Length"
                          size="sm"
                          onChange={(e) =>
                            update("customSize", {
                              ...(variant.customSize || {}),
                              length: e.target.value,
                            })
                          }
                        />
                        <Input
                          placeholder="Width"
                          size="sm"
                          onChange={(e) =>
                            update("customSize", {
                              ...(variant.customSize || {}),
                              width: e.target.value,
                            })
                          }
                        />
                      </HStack>
                    </Popover.Body>
                  </Popover.Content>
                </Popover.Positioner>
              </Portal>
            </Popover.Root>
          )}
        />
      </VStack>

      {/* Customization Button (UI only for now) */}
      <VStack align="start" w="full" gap={3}>
        <Text>Get creative</Text>
        <Button variant="outline" textStyle="sm" rounded="2xl">
          <Palette
            strokeWidth={2}
            color="var(--chakra-colors-primary)"
            size={16}
          />
          Add custom text, choose patterns and more
        </Button>
      </VStack>

      <Divider />

      {/* Quantity */}
      <VStack align="start" w="full" gap={2}>
        <Text textStyle="sm" color="fg.muted">
          Quantity:
        </Text>
        <NumberInput.Root
          defaultValue="0"
          value={variant.quantity}
          onChange={(val) => update("quantity", parseInt(val) || 1)}
          max={maxQuantity}
          min={1}
          maxW="100px"
          size="sm"
        >
          <NumberInput.Control />
          <NumberInput.Input />
        </NumberInput.Root>
      </VStack>

      {/* Add to Cart (renamed variant tab label handles it) */}
    </VStack>
  );
}
