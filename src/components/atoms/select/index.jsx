"use client";

import {
  Box,
  Select as ChakraSelect,
  HStack,
  Portal,
  Text,
  createListCollection,
  useSelectContext,
} from "@chakra-ui/react";
import { Image } from "@/components/atoms";

export default function Select({
  items,
  itemToString = (item) => item.label,
  itemToValue = (item) => item.id,
  leftElement = null,
  switchAsSelect = false,
  placeholder = "Select an option",
  defaultValue = [],
  width = "240px",
  size = "sm",
  renderItem,
  rootProps = {},
  cleanText = false,
  selectorProps = {},
}) {
  const collection = createListCollection({
    items,
    itemToString,
    itemToValue,
  });

  const SelectValue = () => {
    const select = useSelectContext();
    const selected = select.selectedItems?.[0];
    if (!selected) return <ChakraSelect.ValueText placeholder={placeholder} />;

    const dynamicLeftElement =
      switchAsSelect && selected.icon ? (
        <Image
          src={selected.icon}
          alt={itemToString(selected)}
          chakraProps={{ boxSize: 4, rounded: "sm" }}
          nextProps={{ width: 16, height: 16 }}
        />
      ) : (
        leftElement
      );

    return (
      <ChakraSelect.ValueText>
        <HStack>
          {dynamicLeftElement}
          <Text>{itemToString(selected)}</Text>
        </HStack>
      </ChakraSelect.ValueText>
    );
  };

  return (
    <ChakraSelect.Root
      collection={collection}
      size={size}
      width={width}
      defaultValue={defaultValue}
      positioning={{ sameWidth: true }}
      {...rootProps}
    >
      <ChakraSelect.HiddenSelect />
      {!cleanText && <ChakraSelect.Label>{placeholder}</ChakraSelect.Label>}
      <ChakraSelect.Control>
        <Box
          bg={"white"}
          rounded="lg"
          overflow={"hidden"}
          border={"2px solid"}
          borderColor={"rose.200"}
          asChild
          {...selectorProps}
        >
          <ChakraSelect.Trigger cursor="pointer">
            <SelectValue />
          </ChakraSelect.Trigger>
        </Box>
        <ChakraSelect.IndicatorGroup>
          <ChakraSelect.Indicator />
        </ChakraSelect.IndicatorGroup>
      </ChakraSelect.Control>
      <Portal>
        <ChakraSelect.Positioner>
          <ChakraSelect.Content>
            {collection.items.map((item) => (
              <ChakraSelect.Item
                key={itemToValue(item)}
                item={item}
                justifyContent="flex-start"
                textStyle="md"
              >
                {renderItem ? (
                  renderItem(item)
                ) : (
                  <HStack>
                    {item.icon && (
                      <Image
                        src={item.icon}
                        alt={itemToString(item)}
                        chakraProps={{ boxSize: 4, rounded: "sm" }}
                        nextProps={{ width: 16, height: 16 }}
                      />
                    )}
                    <Text>{itemToString(item)}</Text>
                  </HStack>
                )}
                <ChakraSelect.ItemIndicator />
              </ChakraSelect.Item>
            ))}
          </ChakraSelect.Content>
        </ChakraSelect.Positioner>
      </Portal>
    </ChakraSelect.Root>
  );
}
