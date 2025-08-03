"use client";

import { useNavigationGuard } from "@/site-config/navigation-guard";
import { Link as ChakraLink } from "@chakra-ui/react";
import NextLink from "next/link";
export default function Link({
  href,
  children,
  stopOutlineOnFocus = true,
  nextProps = {},
  ...props
}) {
  const { shouldBlock } = useNavigationGuard();
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
      <NextLink
        href={href}
        {...nextProps}
        onNavigate={(e) => {
          if (shouldBlock) e.preventDefault();
        }}
      >
        {children}
      </NextLink>
    </ChakraLink>
  );
}
