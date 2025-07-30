import { Box } from "@chakra-ui/react";

export default function DotButton({ selected, onClick }) {
  return (
    <Box
      as="button"
      w={selected ? "10px" : "8px"}
      h={selected ? "10px" : "8px"}
      bg={selected ? "primary" : "gray.300"}
      borderRadius="full"
      transition="all 0.2s ease"
      onClick={onClick}
      _hover={{ bg: "primary" }}
    />
  );
}
