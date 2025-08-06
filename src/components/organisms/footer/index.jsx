"use client";
import {
  Box,
  Flex,
  VStack,
  Text,
  HStack,
  Stack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Divider, Image, Link, Select } from "@/components/atoms";
import { Facebook, Instagram } from "lucide-react";
import { COMPANY_NAME, COMPANY_ROUTES } from "@/config";

const LANGUAGE_OPTIONS = [
  {
    label: "English",
    id: "en",
    icon: "/flags/english.svg",
  },
  {
    label: "Arabic",
    id: "ar",
    icon: "/flags/arabic.svg",
  },
];

const CATEGORY_LINKS = [
  { label: "Suits", href: "/categories/suits" },
  { label: "Accessories", href: "/categories/accessories" },
  { label: "Bundles", href: "/categories/bundles" },
  { label: "Shop All", href: "/shop" },
];

export default function Footer() {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box bg="rose.100" px={{ base: 4, sm: 4, md: 8 }} py={{ base: 8, md: 12 }}>
      <Stack
        direction={{ base: "column", md: "row" }}
        w="full"
        gap={{ base: 10, md: 12 }}
        justify="space-between"
        align="start"
      >
        <VStack align="start" gap={4} w={{ base: "100%", md: "40%" }}>
          <VStack gap={2} alignItems={{ base: "start", sm: "start" }}>
            <Text fontWeight="bold" textStyle="lg">
              {COMPANY_NAME}
            </Text>
            <Text textStyle="sm" color="fg.muted" maxW="30rem">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Consectetur, ducimus eaque itaque iure dignissimos aut.
            </Text>
          </VStack>

          <Select
            items={LANGUAGE_OPTIONS}
            itemToString={(item) => item.label}
            itemToValue={(item) => item.id}
            placeholder="Select Language"
            cleanText
            width="200px"
            size="sm"
            defaultValue={["en"]}
            leftElement={
              <Image
                src={LANGUAGE_OPTIONS[0].icon}
                alt={LANGUAGE_OPTIONS[0].label}
                chakraProps={{ boxSize: 4, rounded: "sm" }}
                nextProps={{ width: 20, height: 14, unoptimized: true }}
              />
            }
            switchAsSelect
            renderItem={(item) => (
              <HStack>
                <Image
                  src={item.icon}
                  alt={item.label}
                  chakraProps={{ boxSize: 4, rounded: "sm" }}
                  nextProps={{ width: 20, height: 14 }}
                />
                <Text textStyle="sm">{item.label}</Text>
              </HStack>
            )}
            rootProps={{
              onValueChange: (selected) => console.log(selected.value),
            }}
          />
        </VStack>

        <Flex
          align={{ base: "start", md: "flex-end" }}
          justify={{ base: "start", md: "flex-end" }}
          gap={{ base: 8, md: 16 }}
          w="full"
          flex={1}
        >
          <VStack align="start" gap={2}>
            <Text fontWeight="bold" textStyle="md">
              Company
            </Text>
            {COMPANY_ROUTES.map(({ name, path }) => (
              <Link
                key={path}
                href={path}
                textStyle="sm"
                textDecoration="none"
                color="fg.muted"
              >
                {name}
              </Link>
            ))}
          </VStack>

          <VStack align="start" gap={2}>
            <Text fontWeight="bold" textStyle="md">
              Categories
            </Text>
            {CATEGORY_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                textStyle="sm"
                textDecoration="none"
                color="fg.muted"
              >
                {label}
              </Link>
            ))}
          </VStack>
        </Flex>
      </Stack>

      <Divider my={10} color="fg.muted/20" />

      <Flex
        direction={{ base: "column", md: "row" }}
        align={{ base: "flex-start", md: "center" }}
        justify="space-between"
        gap={{ base: 6, md: 4 }}
        wrap="wrap"
      >
        <Text
          textStyle="sm"
          color="fg.muted"
          textAlign={{ base: "left", md: "initial" }}
        >
          Copyright © 2025 {COMPANY_NAME}. All rights reserved.
        </Text>

        <Flex
          align={{ base: "flex-start", sm: "center" }}
          gap={{ base: 2, sm: 6 }}
        >
          <Text textStyle="sm">support@{COMPANY_NAME.toLowerCase()}.com</Text>
          <HStack gap={2}>
            <Link
              href="https://instagram.com"
              color="text-black"
              _hover={{ color: "primary", transition: "color 0.2s ease-in" }}
            >
              <Instagram size={20} strokeWidth={1.5} />
            </Link>
            <Link
              href="https://facebook.com"
              color="text-black"
              _hover={{ color: "primary", transition: "color 0.2s ease-in" }}
            >
              <Facebook size={20} strokeWidth={1.5} />
            </Link>
          </HStack>
        </Flex>
      </Flex>
    </Box>
  );
}
