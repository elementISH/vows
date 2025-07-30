"use client";

import {
  Card as ChakraCard,
  CardTitle,
  CardDescription,
  Box,
  Stack,
} from "@chakra-ui/react";
import { Image } from "@/components/atoms";

export default function Card({
  variant = "subtle",
  title,
  description,
  image,
  header,
  body,
  footer,
  bgImage,
  overlay = null,
  wrapperStyles = {},
  headerStyles = {},
  bodyStyles = {},
  footerStyles = {},
  titleStyles = {},
  descriptionStyles = {},
  rootStyles = {},
  ...props
}) {
  return (
    <ChakraCard.Root
      variant={variant}
      position="relative"
      overflow="hidden"
      rounded="2xl"
      {...props}
      {...rootStyles}
    >
      {bgImage && (
        <Box
          position="absolute"
          inset={0}
          zIndex={0}
          bgImage={`url(${bgImage})`}
          bgSize="cover"
          bgRepeat="no-repeat"
          bgPosition="center"
        />
      )}

      {overlay && bgImage && <>{overlay}</>}

      <Stack position="relative" zIndex={2} {...wrapperStyles}>
        {image && <Image src={image} alt="card image" />}
        {(header || title || description) && (
          <ChakraCard.Header {...headerStyles}>
            {header}
            {title && <CardTitle {...titleStyles}>{title}</CardTitle>}
            {description && (
              <CardDescription {...descriptionStyles}>
                {description}
              </CardDescription>
            )}
          </ChakraCard.Header>
        )}
        {body && <ChakraCard.Body {...bodyStyles}>{body}</ChakraCard.Body>}
        {footer && (
          <ChakraCard.Footer {...footerStyles}>{footer}</ChakraCard.Footer>
        )}
      </Stack>
    </ChakraCard.Root>
  );
}
