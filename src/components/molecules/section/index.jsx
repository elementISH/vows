"use client";
import { Heading } from "@/components/atoms";
import { HStack, VStack, useBreakpointValue } from "@chakra-ui/react";

export default function Section({
  heading = "",
  subheading = "",
  children,
  headingStyles = {},
  subheadingStyles = {},
  wrapperStyles = {},
  headingElement,
}) {
  const isVertical = useBreakpointValue({ base: true, md: !!headingElement });

  return (
    <VStack
      gap={8}
      py={12}
      as="section"
      justifyContent={"center"}
      alignItems={"center"}
      {...wrapperStyles}
    >
      {heading &&
        (isVertical ? (
          <>
            <Heading
              heading={heading}
              subheading={subheading}
              subheadingStyles={{
                ...subheadingStyles,
                textStyle: {
                  base: "sm",
                  sm: "lg",
                  md: "lg",
                  lg: "xl",
                },
                textAlign: "center",
              }}
              headingStyles={{
                ...headingStyles,
                textStyle: {
                  base: "2xl",
                  sm: "3xl",
                  md: "3xl",
                  lg: "4xl",
                  xl: "5xl",
                },
                fontWeight: "bold",
                textAlign: "center",
              }}
            />
            {headingElement}
          </>
        ) : (
          <HStack
            gap={4}
            justifyContent={"center"}
            alignItems={"center"}
            w="full"
          >
            <Heading
              heading={heading}
              subheading={subheading}
              subheadingStyles={{ ...subheadingStyles }}
              headingStyles={{
                ...headingStyles,
                textStyle: "4xl",
                fontWeight: "bold",
                textAlign: "center",
              }}
            />
            {headingElement}
          </HStack>
        ))}
      {children}
    </VStack>
  );
}
