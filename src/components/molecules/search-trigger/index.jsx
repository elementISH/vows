"use client";

import { useState, useMemo } from "react";
import { Button, Input } from "@/components/atoms";
import { MOCK_ITEMS } from "@/config";
import {
  Box,
  Dialog,
  Portal,
  Text,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Search } from "lucide-react";
import Fuse from "fuse.js";

function highlight(text, query) {
  if (!query) return text;
  const regex = new RegExp(`(${query})`, "gi");
  return text.split(regex).map((part, idx) =>
    regex.test(part) ? (
      <Box as="mark" key={idx} bg="#FFC22960" color="text-black">
        {part}
      </Box>
    ) : (
      part
    )
  );
}

const fuse = new Fuse(MOCK_ITEMS, {
  keys: ["name", "description", "type"],
  includeScore: true,
  threshold: 0.4,
});

export default function SearchTrigger() {
  const [query, setQuery] = useState("");
  const isFullButton = useBreakpointValue({ base: false, sm: true });

  const filtered = useMemo(() => {
    if (!query) return MOCK_ITEMS.filter((item) => item.type === "Category");
    const results = fuse.search(query);
    return results.map((res) => res.item);
  }, [query]);

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        {isFullButton ? (
          <Button variant="outline" rounded="full" pe={8}>
            <Search size={18} />
            <Box as="span" color="fg.muted/70" ms={2}>
              Search products...
            </Box>
          </Button>
        ) : (
          <Button variant="outline" rounded="full" p={2}>
            <Search size={18} />
          </Button>
        )}
      </Dialog.Trigger>

      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content maxW="lg" mx={4} bg="white" rounded="xl">
            <Dialog.Context>
              {() => (
                <>
                  <Dialog.Body px={2} pb={1} pt={3}>
                    <Input
                      autoFocus
                      placeholder="Search for products, categories..."
                      textStyle="md"
                      bg="transparent"
                      rounded="lg"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                    />
                    <VStack
                      align="start"
                      gap={2}
                      mt={6}
                      maxH="md"
                      overflow={"auto"}
                      py={2}
                      pe={2}
                      className="customScroll"
                    >
                      {filtered.length > 0 ? (
                        filtered.map((item, idx) => (
                          <Box
                            key={idx}
                            cursor={"pointer"}
                            w="full"
                            p={3}
                            borderWidth={1}
                            borderColor="rose.200"
                            rounded="md"
                          >
                            <Text fontWeight="bold" color={"rose.500"}>
                              {highlight(item.name, query)}
                            </Text>
                            <Text textStyle="sm" color="gray.600">
                              {highlight(item.description, query)}
                            </Text>
                            <Text
                              textStyle="xs"
                              mt={1}
                              color="gray.500"
                              fontStyle="italic"
                            >
                              {item.type}
                            </Text>
                          </Box>
                        ))
                      ) : query ? (
                        <Text color="gray.500" mx="auto">
                          No results found.
                        </Text>
                      ) : null}
                    </VStack>
                  </Dialog.Body>
                </>
              )}
            </Dialog.Context>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
