"use client";

import { Box, Text, Card, Stack } from "@chakra-ui/react";
import { Heading } from "@/components/atoms";

export default function CardShell({
  topContent,
  heading,
  headingFollower,
  actions,
  children,
  footer,
  wrapperStyles = {},
  cardStyles = {},
  topLayerStyles = {},
  headingFollowerStyles = {},
  headingStyles = {},
}) {
  return (
    <Box
      border="1px solid"
      borderColor="rose.400"
      rounded="xl"
      roundedTop="2xl"
      bg="primary"
      {...wrapperStyles}
    >
      {topContent && <Box p={4}>{topContent}</Box>}

      <Card.Root variant="subtle" rounded="xl" roundedTop="2xl" {...cardStyles}>
        <Card.Body gap={2} p={4}>
          {(heading || headingFollower || actions) && (
            <Stack
              justifyContent="space-between"
              mb={4}
              direction={"row"}
              alignItems={"center"}
              {...topLayerStyles}
            >
              <Box display={"inline-block"} spaceX={2}>
                {heading && (
                  <Heading
                    heading={heading}
                    wrapperStyles={{
                      display: "inline-block",
                    }}
                    headingStyles={{
                      textStyle: "2xl",
                      fontWeight: "bold",
                      ...headingStyles,
                    }}
                  />
                )}
                {headingFollower && (
                  <Text
                    textStyle="sm"
                    color="fg.muted"
                    display={"inline-block"}
                    {...headingFollowerStyles}
                  >
                    {headingFollower}
                  </Text>
                )}
              </Box>
              {actions && <Box>{actions}</Box>}
            </Stack>
          )}

          {children}

          {footer && <Box pt={4}>{footer}</Box>}
        </Card.Body>
      </Card.Root>
    </Box>
  );
}
