"use client";

import {
  Popover,
  HStack,
  ColorPicker,
  Box,
  Icon,
  parseColor,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { Button, Tooltip } from "@/components/atoms";
import { Check, Plus } from "lucide-react";
import { rgbaToHex } from "@/utils/functions";

export default function CustomColorPopover({
  selected,
  value = "#D59D9A",
  onChange,
  onSubmit,
}) {
  const [color, setColor] = useState(value || "#f87171");
  const [isSaved, setIsSaved] = useState(!!value);
  // const colorInput = useRef(null);
  useEffect(() => {
    if (value) {
      setColor(value);
      setIsSaved(true);
    }
  }, [value]);

  const handleSave = () => {
    // console.log(colorInput?.current?.value);
    const hex = rgbaToHex(color);
    console.log(hex);
    setIsSaved(true);
    onChange?.(hex);
    onSubmit?.(hex);
  };

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        {isSaved ? (
          <Box
            boxSize="28px"
            rounded="full"
            bg={color}
            border="2px solid"
            borderColor={selected === color ? "primary" : "rose.100"}
            position="relative"
            flexShrink={0}
            cursor="pointer"
          >
            {selected === color && (
              <Box
                position="absolute"
                w="70%"
                h="70%"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                rounded="full"
                bg="rose.50/20"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Icon as={Check} boxSize={4} color="rose.500" strokeWidth={3} />
              </Box>
            )}
          </Box>
        ) : (
          <Box
            boxSize="28px"
            rounded="full"
            bg="bg-color"
            border="2px dashed"
            borderColor="primary"
            position="relative"
            flexShrink={0}
            cursor="pointer"
          >
            <Plus
              size={16}
              color="var(--chakra-colors-primary)"
              style={{ margin: "auto", marginTop: "5px" }}
            />
          </Box>
        )}
      </Popover.Trigger>

      <Popover.Positioner>
        <Popover.Content>
          <Popover.Arrow>
            <Popover.ArrowTip />
          </Popover.Arrow>
          <Popover.CloseTrigger />
          <Popover.Body p={3}>
            <ColorPicker.Root
              defaultValue={parseColor(color)}
              onValueChangeEnd={(e) => {
                console.log(e);
                setColor(e.valueAsString);
              }}
              maxW="200px"
            >
              <ColorPicker.HiddenInput />
              <ColorPicker.Label>Color</ColorPicker.Label>
              <ColorPicker.Control>
                <ColorPicker.Input />
                <ColorPicker.Trigger />
              </ColorPicker.Control>
              <ColorPicker.Positioner>
                <ColorPicker.Content bg="#111111">
                  <ColorPicker.Area />
                  <ColorPicker.Sliders />
                </ColorPicker.Content>
              </ColorPicker.Positioner>
            </ColorPicker.Root>

            <HStack mt={2} gap={2}>
              <Popover.CloseTrigger asChild>
                <Button size="sm" w="full" onClick={handleSave}>
                  Save
                </Button>
              </Popover.CloseTrigger>
            </HStack>
          </Popover.Body>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  );
}
