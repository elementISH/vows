import { Link as ChakraLink } from "@chakra-ui/react";
import NextLink from "next/link";
export default function Link({
  href,
  children,
  stopOutlineOnFocus,
  nextProps = {},
  ...props
}) {
  return (
    <ChakraLink
      asChild
      color="rose.400"
      textDecoration="underline"
      whiteSpace="nowrap"
      _focus={
        stopOutlineOnFocus && {
          outline: "none",
        }
      }
      {...props}
    >
      <NextLink href={href} {...nextProps}>
        {children}
      </NextLink>
    </ChakraLink>
  );
}
