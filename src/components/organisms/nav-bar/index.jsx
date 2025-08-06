"use client";

import {
  Box,
  Flex,
  HStack,
  useBreakpointValue,
  Collapsible,
  Button,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { COMPANY_NAME, ROUTES } from "@/config";
import { Link } from "@/components/atoms";
import NavBarActions from "./navBarActions";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const isDesktop = useBreakpointValue({ base: false, md: true });

  return (
    <Box
      as="nav"
      role="navigation"
      w="100vw"
      bgGradient="linear-gradient(90deg,rgba(234, 194, 185, 1) 0%, rgba(250, 220, 217, 1) 80%)"
      px={{ base: 4, sm: 4, md: 8 }}
      py={3}
      zIndex={10}
      position="relative"
    >
      <Flex align="center" justify="space-between">
        <HStack gap={8}>
          <HStack gap={0}>
            {!isDesktop && (
              <Button
                onClick={() => setIsOpen(!isOpen)}
                variant="ghost"
                size="sm"
                aria-label="Toggle menu"
                px={0}
                justifyContent={"start"}
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </Button>
            )}
            <Link
              href="/"
              fontWeight="bold"
              textStyle="xl"
              textDecoration="none"
              color="text-black"
              transform={isDesktop ? "none" : "translateX(-10px)"}
              _hover={{ textDecoration: "underline" }}
            >
              {COMPANY_NAME}
            </Link>
          </HStack>
          {isDesktop && (
            <HStack gap={10}>
              {ROUTES.map((route) => (
                <Link
                  key={route.name}
                  href={route.path}
                  textStyle="sm"
                  color="gray.700"
                  textDecoration="none"
                  _hover={{ textDecoration: "underline" }}
                >
                  {route.name}
                </Link>
              ))}
            </HStack>
          )}
        </HStack>

        <NavBarActions />
      </Flex>

      {!isDesktop && (
        <Collapsible.Root open={isOpen}>
          <Collapsible.Content>
            <Wrap
              gap="16px"
              pt={4}
              px={2}
              justify="center"
              align="center"
              flexDir={"row"}
              justifyContent={"space-between"}
              w="full"
            >
              {ROUTES.map((route) => (
                <WrapItem key={route.name} textAlign="center" w={"fit"}>
                  <Link
                    href={route.path}
                    textStyle="sm"
                    color="gray.700"
                    textDecoration="none"
                    w="100%"
                    _hover={{ textDecoration: "underline" }}
                  >
                    {route.name}
                  </Link>
                </WrapItem>
              ))}
            </Wrap>
          </Collapsible.Content>
        </Collapsible.Root>
      )}
    </Box>
  );
}
