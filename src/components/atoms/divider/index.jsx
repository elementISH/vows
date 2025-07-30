"use client";

import { Box, Text, HStack, VStack } from "@chakra-ui/react";

export default function Divider({
  width = "100%",
  height = "1px",
  text,
  textColor = "fg.muted",
  color = "gray.200",
  vertical = false,
  ...props
}) {
  if (text) {
    const Line = (
      <Box
        flex="1"
        bg={color}
        {...(vertical ? { w: height } : { h: height })}
      />
    );
    const TextElement = (
      <Text
        textStyle="sm"
        color={textColor}
        whiteSpace="nowrap"
        transform={vertical ? "rotate(-90deg)" : "none"}
      >
        {text}
      </Text>
    );

    return vertical ? (
      <VStack height={width} align="center" justify="center" gap={4} {...props}>
        {Line}
        {TextElement}
        {Line}
      </VStack>
    ) : (
      <HStack width={width} align="center" justify="center" gap={4} {...props}>
        {Line}
        {TextElement}
        {Line}
      </HStack>
    );
  }

  return vertical ? (
    <Box height={width} width={height} bg={color} {...props} />
  ) : (
    <Box width={width} height={height} bg={color} {...props} />
  );
}
