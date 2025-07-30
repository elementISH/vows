"use client";

import {
  Popover,
  Button,
  Portal,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Input,
  HStack,
} from "@chakra-ui/react";
import { useState } from "react";

export default function CustomSizePopover({ onSubmit }) {
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");

  return (
    <Popover>
      <PopoverTrigger>
        <Button size="sm" variant="outline" rounded="full">
          Add Size
        </Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent>
          <PopoverBody>
            <HStack gap={2} mb={2}>
              <Input
                placeholder="Length"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                size="sm"
              />
              <Input
                placeholder="Width"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                size="sm"
              />
            </HStack>
            <Button
              size="sm"
              w="full"
              onClick={() => onSubmit({ length, width })}
            >
              Save
            </Button>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
}
