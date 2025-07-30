"use client";

import {
  Popover,
  Button,
  Portal,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";

export default function CustomColorPopover({ onSubmit }) {
  const [hex, setHex] = useState("");

  return (
    <Popover>
      <PopoverTrigger>
        <Button size="sm" variant="outline" rounded="full">
          Add Color
        </Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent>
          <PopoverBody>
            <Input
              placeholder="#HEX"
              value={hex}
              onChange={(e) => setHex(e.target.value)}
              size="sm"
              mb={2}
            />
            <Button
              size="sm"
              w="full"
              onClick={() => {
                if (hex) onSubmit(hex);
              }}
            >
              Save
            </Button>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
}
