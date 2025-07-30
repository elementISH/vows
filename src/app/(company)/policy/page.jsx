"use client";

import { Box, Heading, Stack, Text, Icon } from "@chakra-ui/react";
import { PageWrapper } from "@/components/organisms";
import {
  CreditCard,
  FileUser,
  ShieldUser,
  TruckElectric,
  Undo,
} from "lucide-react";
import { Divider, Link } from "@/components/atoms";
import { COMPANY_NAME } from "@/config";

const sections = [
  {
    icon: CreditCard,
    title: "Secure Payments via Paymob",
    content: `${COMPANY_NAME} integrates with Paymob to ensure secure and seamless payment processing. All transactions are encrypted and follow PCI-DSS standards. We accept major credit/debit cards and local (Egyptian) wallet solutions. Your payment information is never stored on our servers.`,
  },
  {
    icon: TruckElectric,
    title: "Shipping & Fulfillment",
    content: (
      <>
        Orders are processed within 1–3 business days. Shipping timelines depend
        on product availability and destination. Custom or handmade wedding
        items may require extra processing time. You'll receive tracking details
        as soon as your order ships and you are always welcome to{" "}
        <Link href={"/contact"} stopOutlineOnFocus textDecoration="none">
          contact us
        </Link>{" "}
        regarding any questions you may have.
      </>
    ),
  },
  {
    icon: Undo,
    title: "Returns & Refunds",
    content:
      "If you’re not fully satisfied, return your item within 7 days of delivery. Items must be unused and in original packaging. Refunds are issued after inspection, to the original payment method.",
  },
  {
    icon: ShieldUser,
    title: "Privacy & Data Security",
    content:
      "We value your privacy. Personal data like your name and shipping address are used strictly for order fulfillment and communication. We never sell or share your data. Payments are handled through Paymob’s secure platform.",
  },
  {
    icon: FileUser,
    title: "Terms of Use",
    content: `By using our website and placing an order, you agree to our terms and policies. ${COMPANY_NAME} reserves the right to modify policy terms at any time. Please check this page periodically for updates.`,
  },
];

export default function PolicyPage() {
  return (
    <PageWrapper
      px={{ base: 4, md: 8 }}
      py={{ base: 8, md: 12 }}
      maxW="6xl"
      mx="auto"
    >
      <Stack gap={{ base: 4, md: 8 }}>
        {/* Intro */}
        <Box textAlign="center">
          <Heading as="h1" size="2xl" mb={4}>
            Store Policies
          </Heading>
          <Text
            textStyle={{ base: "md", md: "lg" }}
            color="gray.600"
            maxW="3xl"
            mx="auto"
          >
            Welcome to{" "}
            <Box as="strong" color="rose.500" display="inline">
              {COMPANY_NAME}
            </Box>{" "}
            your trusted wedding e-shop. Please review our store policies to
            ensure a seamless experience.
          </Text>
        </Box>

        {/* Policy Sections */}
        {sections.map((section, index) => (
          <Box
            key={index}
            border="1px solid"
            borderColor="rose.100"
            borderRadius="xl"
            p={{ base: 6, md: 8 }}
            bg="rose.50"
          >
            <Stack gap={4}>
              <Stack direction="row" align="center" gap={4}>
                <Icon as={section.icon} w={6} h={6} color="rose.500" />
                <Heading as="h2" size="md">
                  {section.title}
                </Heading>
              </Stack>
              <Text textStyle="md" color="gray.700" lineHeight="1.7">
                {section.content}
              </Text>
            </Stack>
          </Box>
        ))}

        {/* Closing */}
        <Box textAlign="center" pt={8}>
          <Divider mb={4} />
          <Text fontSize="sm" color="gray.500">
            Last updated: July 30, 2025
          </Text>
        </Box>
      </Stack>
    </PageWrapper>
  );
}
