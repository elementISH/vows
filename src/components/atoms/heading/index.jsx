"use client";

import { Heading as ChakraHeading, Stack, Text } from "@chakra-ui/react";
import { useRef, useLayoutEffect, useState, Fragment } from "react";
import { useHighlight } from "@chakra-ui/react";

export default function Heading({
  heading,
  highlight,
  subheading,
  underlineHighlighted,
  headingStyles = {},
  subheadingStyles = {},
  wrapperStyles = {},
}) {
  const headingRef = useRef(null);

  const renderHeading = () => {
    if (highlight) {
      const chunks = useHighlight({ text: heading, query: highlight });

      return chunks.map((chunk, index) =>
        chunk.match ? (
          <span
            key={index}
            style={{
              position: "relative",
              color: "var(--chakra-colors-primary)",
              display: "inline-block",
            }}
          >
            {chunk.text}
            {underlineHighlighted === "special" && underlineHighlighted}
          </span>
        ) : (
          <Fragment key={index}>{chunk.text}</Fragment>
        )
      );
    }

    return heading;
  };

  return (
    <Stack {...wrapperStyles}>
      <ChakraHeading
        ref={headingRef}
        {...headingStyles}
        fontFamily="inherit"
        position="relative"
        display="inline-block"
        lineHeight="1.2"
        wordBreak="break-word"
      >
        {renderHeading()}
      </ChakraHeading>

      {subheading && (
        <Text
          color="fg.muted"
          textStyle="md"
          {...subheadingStyles}
          fontFamily="inherit"
        >
          {subheading}
        </Text>
      )}
    </Stack>
  );
}
