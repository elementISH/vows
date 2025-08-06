"use client";

import {
  Select as ChakraSelect,
  createListCollection,
  Portal,
  VStack,
  Text,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { COUNTRY_CODES } from "@/config";

const collection = createListCollection({
  items: COUNTRY_CODES,
  itemToString: (item) => item.code,
  itemToValue: (item) => item.code,
});

const DEFAULT_TIMEZONE = Intl.DateTimeFormat().resolvedOptions().timeZone;

const TIMEZONE_TO_COUNTRY = {
  "Africa/Cairo": "EG",
  "Asia/Riyadh": "SA",
  "Europe/Athens": "GR",
};

const defaultCountryCode = TIMEZONE_TO_COUNTRY[DEFAULT_TIMEZONE] || "EG";

export default function CountrySelect({ value, onChange }) {
  const [selected, setSelected] = useState([value || defaultCountryCode]);

  useEffect(() => {
    if (value && value !== selected[0]) {
      setSelected([value]);
    }
  }, [value]);

  const handleChange = (e) => {
    const newValue = e.value;
    setSelected(newValue);
    const selectedCountry = COUNTRY_CODES.find((c) => c.code === newValue[0]);
    onChange?.(selectedCountry);
  };

  return (
    <VStack align="start" w="full">
      <Text fontWeight="semibold">Country</Text>
      <ChakraSelect.Root
        collection={collection}
        value={selected}
        onValueChange={handleChange}
        variant="solid"
        width="full"
      >
        <ChakraSelect.HiddenSelect />
        <ChakraSelect.Control>
          <ChakraSelect.Trigger>
            <ChakraSelect.ValueText
              placeholder="Select country"
              cursor="pointer"
            />
          </ChakraSelect.Trigger>
          <ChakraSelect.IndicatorGroup>
            <ChakraSelect.Indicator />
          </ChakraSelect.IndicatorGroup>
        </ChakraSelect.Control>

        <Portal>
          <ChakraSelect.Positioner>
            <ChakraSelect.Content maxH="18rem" overflowY="auto" width="18rem">
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
    </VStack>
  );
}
