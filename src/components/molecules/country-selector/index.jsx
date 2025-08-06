"use client";

import {
  Box,
  InputGroup,
  Select as ChakraSelect,
  createListCollection,
  Portal,
} from "@chakra-ui/react";
import { useState } from "react";
import { COUNTRY_CODES } from "@/config";
import { Input } from "@/components/atoms";

const defaultCountry = COUNTRY_CODES.find((c) => c.code === "EG");

// Create collection with code as the value and label as code string
const collection = createListCollection({
  items: COUNTRY_CODES,
  itemToString: (item) => item.code, // Show code like EG, CY
  itemToValue: (item) => item.code, // Used for controlled value matching
});

function CountrySelect({ onChange, defaultCode }) {
  const [value, setValue] = useState([
    defaultCode || defaultCountry?.code || COUNTRY_CODES[0].code,
  ]);

  const handleChange = (e) => {
    setValue(e.value);
    onChange?.(e);
  };

  return (
    <ChakraSelect.Root
      collection={collection}
      value={value}
      onValueChange={handleChange}
      variant={"solid"}
      width="4rem"
      positioning={{ placement: "bottom", flip: true }}
    >
      <ChakraSelect.HiddenSelect />
      <ChakraSelect.Control>
        <ChakraSelect.Trigger cursor="pointer">
          <ChakraSelect.ValueText placeholder="-" />
        </ChakraSelect.Trigger>
        <ChakraSelect.IndicatorGroup>
          <ChakraSelect.Indicator />
        </ChakraSelect.IndicatorGroup>
      </ChakraSelect.Control>

      <Portal>
        <ChakraSelect.Positioner>
          <ChakraSelect.Content
            maxH="18rem"
            overflowY="auto"
            width="100vw"
            maxW="18rem"
          >
            {collection.items.map((item) => (
              <ChakraSelect.Item item={item} key={item.code} textStyle="md">
                {item.name} ({item.dial_code})
                <ChakraSelect.ItemIndicator />
              </ChakraSelect.Item>
            ))}
          </ChakraSelect.Content>
        </ChakraSelect.Positioner>
      </Portal>
    </ChakraSelect.Root>
  );
}

export default function CountrySelector({ inputProps, onChange, defaultCode }) {
  const [selectedCode, setSelectedCode] = useState([
    defaultCode || defaultCountry?.code || COUNTRY_CODES[0].code,
  ]);
  const selectedCountry = COUNTRY_CODES.find((c) => c.code === selectedCode[0]);

  return (
    <Input
      ps={14}
      name="phone"
      type="number"
      placeholder="10 123 4567"
      id="phoneInput"
      startElementProps={{
        px: 4,
        textStyle: "md",
      }}
      startElement={
        <Box textStyle="md" fontWeight="semibold" minW="2rem">
          {selectedCountry?.dial_code ?? "+000"}
        </Box>
      }
      endElement={
        <CountrySelect
          onChange={(e) => {
            setSelectedCode(e.value);
            onChange?.(e);
          }}
          defaultCode={defaultCode}
        />
      }
      endElementProps={{ px: 0 }}
      {...inputProps}
    />
  );
}
