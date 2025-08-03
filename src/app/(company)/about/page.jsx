"use client";

import {
  Box,
  Heading,
  Stack,
  Text,
  SimpleGrid,
  Icon,
  VStack,
} from "@chakra-ui/react";
import { PageWrapper } from "@/components/organisms";
import { HeartHandshake, LockKeyhole, Sparkles } from "lucide-react";
import { COMPANY_NAME } from "@/config";
import { Button, Link } from "@/components/atoms";

const values = [
  {
    icon: HeartHandshake,
    title: "Transparency",
    description:
      "Clear pricing, honest service, and full control over your shopping experience.",
  },
  {
    icon: LockKeyhole,
    title: "Security",
    description: (
      <>
        We partner with{" "}
        <Box as="strong" color="rose.500" display="inline">
          Paymob
        </Box>{" "}
        to ensure every transaction is encrypted and protected.
      </>
    ),
  },
  {
    icon: Sparkles,
    title: "Personalization",
    description:
      "Tailor your wedding shop to your vision make it truly yours with curated categories and unique finds.",
  },
];

export default function AboutPage() {
  return (
    <PageWrapper
      px={{ base: 4, md: 8 }}
      py={{ base: 8, md: 12 }}
      maxW="6xl"
      mx="auto"
    >
      <Stack gap={{ base: 10, md: 12 }}>
        {/* Hero Section */}
        <Box textAlign="center">
          <Heading as="h1" size="2xl" mb={4}>
            About{" "}
            <Box as="strong" color="rose.500" display="inline">
              {COMPANY_NAME}
            </Box>
          </Heading>
          <Text textStyle={{ base: "md", md: "lg" }} color="gray.600">
            Your trusted wedding marketplace, personalized, beautiful, and
            secure.
          </Text>
        </Box>

        {/* Mission Statement */}
        <Box>
          <Heading as="h2" size="lg" mb={3}>
            Our Mission
          </Heading>
          <Text color="gray.700" textStyle={{ base: "sm", md: "md" }}>
            At{" "}
            <Box as="strong" color="rose.500" display="inline">
              {COMPANY_NAME}
            </Box>
            , we’re dedicated to making wedding planning elegant, effortless,
            and affordable. Our platform brings together curated wedding
            essentials from decor to dresses and even accessories, all under one
            seamless and secure digital roof.
          </Text>
        </Box>

        {/* Values Section */}
        <Box>
          <Heading as="h2" size="lg" mb={6}>
            What We Stand For
          </Heading>
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            gap={{ base: 4, md: 6 }}
          >
            {values.map(({ icon, title, description }, idx) => (
              <Box
                bg="rose.50"
                p={6}
                rounded="xl"
                key={idx}
                gridColumn={{
                  base: "auto", // default on mobile
                  md: idx === 2 ? "span 2" : "auto",
                  lg: "auto",
                }}
              >
                <Stack direction="row" align="center" gap={2} mb={4}>
                  <Icon as={icon} w={6} h={6} color="rose.500" />
                  <Heading as="h2" size="md">
                    {title}
                  </Heading>
                </Stack>

                <Text color="gray.600" textStyle="sm">
                  {description}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </Box>

        {/* Platform Capabilities */}
        <Box>
          <Heading as="h2" size="lg" mb={4}>
            Built for Couples, Backed by Technology
          </Heading>
          <Text color="gray.700" textStyle={{ base: "sm", md: "md" }}>
            <Box as="strong" color="rose.500" display="inline">
              {COMPANY_NAME}
            </Box>{" "}
            is more than a store, it’s a fully-integrated platform that gives
            you the power to browse, purchase, and customize wedding essentials
            all from the comfort of your home. Whether you're a bride, groom, or
            planner, we empower you with modern tools and elegant designs to
            make your wedding truly unforgettable.
          </Text>
        </Box>

        {/* Closing */}
        <VStack textAlign="center">
          <Text textStyle="sm" color="gray.500">
            Thank you for choosing{" "}
            <Box as="strong" color="rose.500" display="inline">
              {COMPANY_NAME}
            </Box>
            . Let's make memories together.
          </Text>

          <Link
            textDecoration="none"
            _hover={{
              textDecoration: "underline",
              textUnderlineOffset: "4px",
            }}
            textStyle="sm"
            href={"/shop"}
          >
            go back to shop
          </Link>
        </VStack>
      </Stack>
    </PageWrapper>
  );
}
