"use client";
import { Button, Image, Link } from "@/components/atoms";
import { CardShell, Section } from "@/components/molecules";
import { PageWrapper } from "@/components/organisms";
import {
  Box,
  Flex,
  FormatNumber,
  Grid,
  GridItem,
  HStack,
  Stack,
  Text,
  VStack,
  Wrap,
  WrapItem,
  useBreakpointValue,
} from "@chakra-ui/react";
import { BadgeQuestionMark, Info, RefreshCw, Star } from "lucide-react";
import { useState } from "react";

const orderStatusConfig = {
  outForDelivery: {
    icon: <Info strokeWidth={1.5} />,
    bg: "rose.100",
    text: "Order is out for delivery",
    action: null,
  },
  awaitingRating: {
    icon: (
      <Star
        fill="var(--chakra-colors-primary)"
        color="var(--chakra-colors-primary)"
        strokeWidth={1.5}
      />
    ),
    bg: "rose.100",
    text: "Rate your experience with this order",
    action: (
      <Button
        variant="ghost"
        color="rose.500"
        textDecor="underline"
        textDecorationThickness={1}
        textUnderlineOffset={2}
        p={0}
        height="fit"
        _hover={{ bg: "transparent" }}
      >
        rate now
      </Button>
    ),
  },
};

const OrderStatusBanner = ({ statusKey }) => {
  const config = orderStatusConfig[statusKey];
  if (!config) return null;
  return (
    <Stack
      gap={2}
      w="full"
      bg={config.bg}
      p={4}
      direction={{ base: "column", sm: "row" }}
      rounded="2xl"
      justifyContent="space-between"
    >
      <Stack direction={{ base: "row" }}>
        {config.icon} {config.text}
      </Stack>
      {config.action}
    </Stack>
  );
};

const orderInfo = [
  { title: "Date Ordered", value: "02 May 2025" },
  { title: "Order Number", value: "024125479856" },
  {
    title: "Amount Paid",
    value: <FormatNumber value="12000" style="currency" currency="EGP" />,
  },
  { title: "Payment Method", value: "Cash" },
];
const filters = [
  { label: "All", count: 3 },
  { label: "Active Orders", count: 1 },
  { label: "Past Orders", count: 2 },
];

const mockOrders = [
  {
    id: 1,
    statusKey: "awaitingRating",
    items: 3,
    info: [
      { title: "Date Ordered", value: "28 Jul 2025" },
      { title: "Order Number", value: "A00125" },
      {
        title: "Amount Paid",
        value: <FormatNumber value="4800" style="currency" currency="EGP" />,
      },
      { title: "Payment Method", value: "Card" },
    ],
  },
  {
    id: 2,
    statusKey: "awaitingRating",
    items: 2,
    info: [
      { title: "Date Ordered", value: "20 Jul 2025" },
      { title: "Order Number", value: "A00124" },
      {
        title: "Amount Paid",
        value: <FormatNumber value="6800" style="currency" currency="EGP" />,
      },
      { title: "Payment Method", value: "Cash" },
    ],
  },
  {
    id: 3,
    statusKey: "outForDelivery",
    items: 1,
    info: [
      { title: "Date Ordered", value: "15 Jul 2025" },
      { title: "Order Number", value: "A00123" },
      {
        title: "Amount Paid",
        value: <FormatNumber value="2500" style="currency" currency="EGP" />,
      },
      { title: "Payment Method", value: "Card" },
    ],
  },
];

export function OrderInfoSection() {
  const isLarge = useBreakpointValue({ base: false, mid: true });

  return isLarge ? (
    <HStack gap={2} align="stretch">
      {orderInfo.map((info, idx) => (
        <>
          <VStack key={idx} align="start" gap={1} minW="0" flex={1}>
            <Text
              textStyle={{ sm: "sm", md: "md" }}
              color="text-white"
              fontWeight={700}
            >
              {info.title}
            </Text>
            <Text fontWeight={600} textStyle={{ sm: "sm" }}>
              {info.value}
            </Text>
          </VStack>
          {idx !== orderInfo.length - 1 && (
            <Box
              borderRight={"1px solid"}
              borderColor={"rose.500"}
              bg="rose.500"
              h="auto"
              display={{ base: "none", sm: "block" }}
            />
          )}
        </>
      ))}
    </HStack>
  ) : (
    <Grid
      templateColumns={{ base: "repeat(2, 1fr)" }}
      gap={2}
      justifyItems={"center"}
    >
      {orderInfo.map((info, idx) => (
        <GridItem key={idx}>
          <VStack align="center" gap={1}>
            <Text textStyle="sm" color="text-white" fontWeight={700}>
              {info.title}
            </Text>
            <Text fontWeight={600} textStyle={"xs"}>
              {info.value}
            </Text>
          </VStack>
        </GridItem>
      ))}
    </Grid>
  );
}
export default function HistoryPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const chipTextStyle = useBreakpointValue({ base: "xs", sm: "sm", md: "md" });

  const filteredOrders = mockOrders.filter((order) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Active Orders")
      return order.statusKey !== "awaitingRating";
    if (activeFilter === "Past Orders")
      return order.statusKey === "awaitingRating";
    return true;
  });

  return (
    <PageWrapper px={{ base: 4, sm: 4, md: 8 }}>
      <Section heading="Your Orders">
        <Stack gap={4} w={"full"}>
          <Wrap justify="flex-start">
            {filters.map(({ label, count }) => {
              const isActive = activeFilter === label;
              return (
                <WrapItem key={label}>
                  <Button
                    variant={"outline"}
                    px={3}
                    bg={isActive ? "primary" : "transparent"}
                    color={isActive ? "text-white" : "text-black"}
                    rounded="full"
                    size="xs"
                    py={0}
                    fontWeight="medium"
                    textStyle={chipTextStyle}
                    onClick={() => setActiveFilter(label)}
                  >
                    <HStack gap={1}>
                      <Text>{count}</Text>
                      <Text>{label}</Text>
                    </HStack>
                  </Button>
                </WrapItem>
              );
            })}
          </Wrap>

          <Flex gap={8} flexDir={{ base: "column", lg: "row" }} w="full">
            <VStack w={"full"} gap={4}>
              {filteredOrders.map((order) => (
                <CardShell
                  key={order.id}
                  topContent={<OrderInfoSection info={order.info} />}
                  heading="Order items"
                  headingStyles={{
                    textStyle: { base: "lg", sm: "xl", md: "2xl", lg: "2xl" },
                  }}
                  headingFollower={
                    <Box
                      as="span"
                      textStyle={{ base: "xs", sm: "sm", md: "md" }}
                    >
                      {order.items} items
                    </Box>
                  }
                  actions={
                    <Button
                      variant="ghost"
                      color="rose.500"
                      textDecor="underline"
                      textDecorationThickness={1}
                      textUnderlineOffset={2}
                      px={0}
                      _hover={{ bg: "transparent" }}
                      asChild
                    >
                      <Link href="/thank-you">view invoice</Link>
                    </Button>
                  }
                  cardStyles={{
                    variant: "subtle",
                    roundedTop: "2xl",
                    bg: "#fff9f9",
                  }}
                  topLayerStyles={{
                    mb: 6,
                    direction: { base: "column", sm: "row" },
                    alignItems: { base: "start", sm: "center" },
                  }}
                  wrapperStyles={{ w: "full" }}
                  footer={
                    <HStack>
                      <Button minW="2xs" rounded="full" fontWeight="bold">
                        <RefreshCw /> Re-order
                      </Button>
                    </HStack>
                  }
                >
                  <>
                    {order.statusKey && (
                      <OrderStatusBanner statusKey={order.statusKey} />
                    )}
                    <VStack
                      gap={0}
                      maxH="300px"
                      overflowY="auto"
                      w="full"
                      mt={4}
                      pe={6}
                      className="customScroll"
                    >
                      {[...Array(order.items)].map((_, i) => (
                        <Flex
                          key={i}
                          align="flex-start"
                          justify="space-between"
                          gap={4}
                          w="full"
                          mt={4}
                          wrap="nowrap"
                          direction={{ base: "column", sm: "row" }}
                        >
                          <Flex
                            align="start"
                            flex={1}
                            gap={4}
                            wrap="nowrap"
                            direction={{ base: "row", md: "row" }}
                          >
                            <Image
                              src="/test_image.png"
                              alt="testing"
                              chakraProps={{
                                boxSize: { base: "60px", md: "70px" },
                                rounded: "2xl",
                                flexShrink: 0,
                                border: "0.5px solid",
                                borderColor: "rose.400",
                              }}
                              nextProps={{ width: 250, height: 250 }}
                            />
                            <VStack
                              align="start"
                              gap={1}
                              flex={1}
                              minW={0}
                              maxW="100%"
                            >
                              <Text
                                fontWeight="semibold"
                                lineClamp={2}
                                textStyle={{ base: "sm", mid: "md" }}
                              >
                                Wedding Day Emergency Kit
                              </Text>
                              <Text
                                color="gray.600"
                                lineClamp={1}
                                textStyle={{ base: "xs", mid: "sm" }}
                              >
                                x-large, Magenta Blue
                              </Text>
                            </VStack>
                          </Flex>
                          <VStack
                            align="end"
                            justify="center"
                            flexShrink={0}
                            minW="fit-content"
                            mt={{ base: 2, md: 0 }}
                          >
                            <Text
                              fontWeight="bold"
                              color="primary"
                              textStyle={{ base: "sm", mid: "md" }}
                            >
                              <FormatNumber
                                value="12000"
                                style="currency"
                                currency="EGP"
                              />
                            </Text>
                          </VStack>
                        </Flex>
                      ))}
                    </VStack>
                  </>
                </CardShell>
              ))}
            </VStack>
            <Box
              bg="rose.50"
              rounded="2xl"
              p={6}
              w={{ base: "full" }}
              h="fit"
              maxW={{ base: "full", lg: "xs", xl: "md" }}
              position={{ lg: "sticky" }}
              top={10}
            >
              <VStack gap={4}>
                <Box bg="primary" p={4} rounded="full" color="text-white">
                  <BadgeQuestionMark size={32} />
                </Box>
                <Text textStyle="lg" fontWeight="500" textAlign="center">
                  Having issues with your orders?
                </Text>
                <Button minW="2xs" rounded="xl" asChild>
                  <Link color="text-white" textDecoration="none" href="contact">
                    Contact us
                  </Link>
                </Button>
              </VStack>
            </Box>
          </Flex>
        </Stack>
      </Section>
    </PageWrapper>
  );
}
