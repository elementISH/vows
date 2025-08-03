import { Button, Heading, Link } from "@/components/atoms";
import { Invoice, Section } from "@/components/molecules";
import { PageWrapper } from "@/components/organisms";
import { Box, Flex, VStack, DataList } from "@chakra-ui/react";
import { Crosshair } from "lucide-react";

export default function ThankYouPage() {
  return (
    <PageWrapper px={{ base: 4, sm: 4, md: 8 }}>
      <Section
        wrapperStyles={{
          alignItems: "start",
          justifyContent: "start",
          flexDirection: { base: "column", lg: "row" },
          gap: { base: 10, lg: 8 },
          width: "full",
        }}
      >
        {/* Left Side */}
        <VStack
          alignItems="start"
          justifyContent="start"
          gap={{ base: 6, md: 8 }}
          maxW={{ base: "100%", md: "50%" }}
          w="full"
        >
          <Heading
            heading="Thank you for your purchase!"
            subheading="Your order will be processed within 24 hours during working days. We will notify you once your order has been out for delivery"
            headingStyles={{
              textStyle: { base: "3xl", md: "5xl" },
              fontWeight: "bold",
            }}
            subheadingStyles={{
              textStyle: { base: "md", md: "xl" },
              color: "fg.muted",
            }}
          />

          <VStack alignItems="start" gap={6} w="full">
            <Heading
              heading="Shipping address"
              headingStyles={{
                textStyle: { base: "lg", md: "xl" },
                fontWeight: "semibold",
              }}
            />

            <DataList.Root
              orientation="horizontal"
              size="lg"
              w="full"
              maxW="100%"
              gap={{ base: 3, md: 5 }}
            >
              <DataList.Item alignItems="start">
                <DataList.ItemLabel fontWeight="bold">Name</DataList.ItemLabel>
                <DataList.ItemValue>Jane Doe</DataList.ItemValue>
              </DataList.Item>
              <DataList.Item alignItems="start">
                <DataList.ItemLabel fontWeight="bold">
                  Address
                </DataList.ItemLabel>
                <DataList.ItemValue>
                  32 lorem street, apartment 27, floor 9, unit 908
                </DataList.ItemValue>
              </DataList.Item>
              <DataList.Item alignItems="start">
                <DataList.ItemLabel fontWeight="bold">Phone</DataList.ItemLabel>
                <DataList.ItemValue>+200000000000</DataList.ItemValue>
              </DataList.Item>
              <DataList.Item alignItems="start">
                <DataList.ItemLabel fontWeight="bold">Email</DataList.ItemLabel>
                <DataList.ItemValue>lorem@ipsum.com</DataList.ItemValue>
              </DataList.Item>
            </DataList.Root>

            <Button
              rounded="full"
              size={{ base: "md", md: "lg" }}
              display="flex"
              px={{ base: 8, md: 6 }}
              w={{ base: "full", sm: "fit" }}
              maxW={"100%"}
              alignItems="center"
              gap={2}
              asChild
            >
              <Link href="/history" color="text-white" textDecoration="none">
                <Crosshair size={18} /> Track order
              </Link>
            </Button>
          </VStack>
        </VStack>

        {/* Right Side */}
        <Box flex={1} w="full" mt={{ base: 8, lg: 0 }}>
          <Box mx={{ base: "auto", lg: "0" }} maxW={{ base: "100%" }}>
            <Invoice />
          </Box>
        </Box>
      </Section>
    </PageWrapper>
  );
}
