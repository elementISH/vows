import { Flex, Text } from "@chakra-ui/react";

export default function QuantityBubble() {
  const quantity = 3;
  if (quantity <= 0) return null;
  return (
    <>
      {quantity > 0 && (
        <Flex
          pointerEvents={"none"}
          position="absolute"
          bottom={-1}
          right={-1}
          bg="red.400"
          color="white"
          boxSize="5"
          rounded="full"
          align="center"
          justify="center"
          textStyle="xs"
          fontWeight="bold"
        >
          <Text lineHeight="none">{quantity}</Text>
        </Flex>
      )}
    </>
  );
}
