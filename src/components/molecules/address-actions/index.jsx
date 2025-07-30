"use client";
import { useState, useEffect } from "react";
import { Box, VStack, HStack, Text, RadioCard } from "@chakra-ui/react";
import { Check, Trash2, Eye, MapPinHouse } from "lucide-react";
import { Button, Link } from "@/components/atoms";

export default function AddressActions({
  mode = "checkout", // 'empty', 'checkout', 'account'
  title = mode === "checkout"
    ? "Select delivery address"
    : "Your saved addresses",
  addresses = [],
  selectedId,
  onAdd,
  onSelect,
  onView,
  onDelete,
  notifyOnSelect = false,
  maxAddresses = 3,
}) {
  const [current, setCurrent] = useState(selectedId);

  useEffect(() => {
    if (!selectedId && addresses.length > 0) {
      const firstId = addresses[0].id;
      setCurrent(firstId);
      onSelect(firstId);
    } else {
      setCurrent(selectedId);
    }
  }, [selectedId, addresses.length]);

  const handleSelect = (id) => {
    setCurrent(id);
    onSelect(id);
    if (mode === "account" && notifyOnSelect) {
      // toast from sonner
      import("sonner").then(({ toast }) => {
        toast.success("Primary address updated");
      });
    }
  };

  if (mode === "empty" || addresses.length === 0) {
    return (
      <Box
        bg="rose.50"
        px={8}
        w="full"
        flex={1}
        rounded="2xl"
        p={6}
        height={"stretch"}
      >
        <VStack gap={4}>
          <Box bg="primary" p={4} rounded="full" color="text-white" w="fit">
            <MapPinHouse size={32} />
          </Box>
          <VStack gap={1}>
            <Text textStyle="lg" fontWeight="500" textAlign="center">
              No address saved
            </Text>
            {mode !== "account" && (
              <Text textAlign="center" color="fg.muted">
                Add an address to complete your orders
              </Text>
            )}
          </VStack>
          <Button minW={"2xs"} rounded={"xl"} onClick={onAdd}>
            Add new address
          </Button>
        </VStack>
      </Box>
    );
  }

  return (
    <Box
      bg="rose.50"
      px={2}
      w="full"
      flex={1}
      rounded="2xl"
      p={4}
      height={"stretch"}
    >
      <Text textStyle="lg" fontWeight="500" mb={4}>
        {title}
      </Text>
      <RadioCard.Root value={current} onValueChange={handleSelect} width="full">
        <VStack align="stretch" gap={1}>
          {addresses.map((addr, idx) => (
            <RadioCard.Item
              key={addr.id}
              value={addr.id}
              bg="transparent"
              cursor="pointer"
              _checked={{
                bg: "rose.100",
                borderColor: "primary",
                boxShadow: "none",
              }}
              _hover={{ bg: "rose.100" }}
              border="none"
              rounded="2xl"
              onClick={() => handleSelect(addr.id)}
            >
              <RadioCard.ItemHiddenInput />
              <RadioCard.ItemControl>
                <HStack justify="space-between" align="center" w="full">
                  <Text flex={1}>
                    {addr.street}, {addr.district}
                  </Text>
                  <HStack gap={2}>
                    {mode === "account" && (
                      <Trash2
                        cursor={"pointer"}
                        size={16}
                        color="#E53E3E"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(addr.id);
                        }}
                      />
                    )}
                    <Eye
                      cursor={"pointer"}
                      size={16}
                      onClick={(e) => {
                        e.stopPropagation();
                        onView(addr);
                      }}
                    />
                    {current === addr.id ? (
                      <Box
                        bg="primary"
                        color="white"
                        rounded="full"
                        p={1}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Check size={16} strokeWidth={3} />
                      </Box>
                    ) : (
                      <Box
                        bg="transparent"
                        boxSize="6"
                        rounded="full"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        border="2px solid"
                        borderColor="gray.400"
                      />
                    )}
                  </HStack>
                </HStack>
              </RadioCard.ItemControl>
            </RadioCard.Item>
          ))}

          {addresses.length < maxAddresses && (
            <Button
              variant="outline"
              borderStyle="dashed"
              onClick={onAdd}
              mt={2}
            >
              Add new address
            </Button>
          )}
        </VStack>
      </RadioCard.Root>
    </Box>
  );
}
