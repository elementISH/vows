"use client";
import { Divider, Heading, Image } from "@/components/atoms";
import {
  Box,
  Flex,
  FormatNumber,
  HStack,
  Stack,
  Text,
  useBreakpointValue,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";

export default function Invoice() {
  const isVertical = useBreakpointValue({
    base: true,
    sm: false,
    lg: true,
    xl: false,
  });
  return (
    <Flex justify="center" px={{ base: 2, md: 6 }}>
      <VStack gap={0} w="full">
        <Box w="calc(100% + 40px)" bg="primary" maxH={8} h={8} rounded="full" />
        <VStack gap={0} w="full" transform="translateY(-1rem)">
          <Box
            bg="rose.100"
            w="full"
            px={{ base: 4, md: 12 }}
            pt={8}
            pb={4}
            transform="translateY(2px)"
          >
            <Heading
              heading="Order Summary"
              headingStyles={{
                textStyle: { base: "xl", mid: "2xl" },
                fontWeight: "bold",
              }}
            />
            <Divider color="rose.500" my={4} />

            <Stack
              direction={{ base: "column", sm: "row", lg: "column", xl: "row" }}
              gap={{ base: 2 }}
              align="stretch"
            >
              <SummaryItem label="Date" value="02 May 2025" />
              <Box
                w={isVertical ? "full" : "0.5px"}
                h={isVertical ? "0.5px" : "auto"}
                bg="rose.500"
                alignSelf="stretch"
              />
              <SummaryItem label="Order Number" value="024125479856" />
              <Box
                w={isVertical ? "full" : "0.5px"}
                h={isVertical ? "0.5px" : "auto"}
                bg="rose.500"
                alignSelf="stretch"
              />
              <SummaryItem label="Payment Method" value="Cash" />
            </Stack>
          </Box>

          <CutoutDivider transform="translateY(1px)" />

          <Box bg="rose.100" w="full" px={{ base: 4, md: 12 }} pt="1px">
            <VStack
              gap={0}
              maxH="300px"
              overflowY="auto"
              w="full"
              mt={4}
              pe={6}
              className="customScroll"
            >
              {[0, 1, 2, 3, 4].map((_, i) => (
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
                    <VStack align="start" gap={1} flex={1} minW={0} maxW="100%">
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

            <Divider color="rose.500" my={6} />

            <VStack
              flex={1}
              w="full"
              textStyle={{ base: "sm", mid: "lg" }}
              gap={2}
            >
              <HStack justify="space-between" w="full">
                <Text>Subtotal (5 items)</Text>
                <Text fontWeight="bold">
                  <FormatNumber value="60000" style="currency" currency="EGP" />
                </Text>
              </HStack>

              <HStack justify="space-between" w="full">
                <Text>Shipping</Text>
                <Text fontWeight="bold">
                  <FormatNumber value="200" style="currency" currency="EGP" />
                </Text>
              </HStack>

              <HStack justify="space-between" w="full" color="primary">
                <Text>You saved</Text>
                <Text
                  fontWeight="bold"
                  css={{
                    textDecoration: "underline wavy",
                    textDecorationThickness: "2px",
                    textDecorationSkipInk: "none",
                    textUnderlineOffset: "20%",
                  }}
                >
                  <FormatNumber value="2000" style="currency" currency="EGP" />
                </Text>
              </HStack>

              <Divider color="rose.500" my={6} />

              <HStack
                justify="space-between"
                w="full"
                textStyle={{ base: "md", mid: "xl" }}
                mb={8}
              >
                <Text fontWeight="bold">Order Total</Text>
                <Text fontWeight="bold">
                  <FormatNumber value="58200" style="currency" currency="EGP" />
                </Text>
              </HStack>
            </VStack>
          </Box>

          <ZigzagDivider transform="translateY(-2px)" />
        </VStack>
      </VStack>
    </Flex>
  );
}

function SummaryItem({ label, value }) {
  return (
    <VStack align="start" gap={1} flex={1} minW={0}>
      <Text
        textStyle={{ base: "xs", mid: "md" }}
        color="#9a9a9a"
        fontWeight={700}
      >
        {label}
      </Text>
      <Text fontWeight={600} textStyle={{ base: "sm", mid: "md" }}>
        {value}
      </Text>
    </VStack>
  );
}

function CutoutDivider({ width = "100%", height = "auto", ...props }) {
  return (
    <Box width={width} height={height} {...props}>
      <svg
        viewBox="0 0 650 61"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M649.825 7.05561C636.822 7.05561 626.281 17.5934 626.281 30.5922C626.281 43.591 636.822 54.1288 649.825 54.1288V61H0V54.1288C13.0032 54.1288 23.5444 43.591 23.5444 30.5922C23.5444 17.5934 13.0032 7.05561 0 7.05561V0H649.825V7.05561Z"
            fill="#F4E0DC"
          />
          <path
            d="M24 29.998H626"
            stroke="#A04631"
            strokeWidth="1.5"
            strokeDasharray="6 6"
          />
        </g>
        <defs>
          <clipPath id="clip0">
            <rect width="650" height="61" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </Box>
  );
}
export function ZigzagDivider({
  width = "100%",
  height = "auto",
  fill = "#F4E0DC",
  ...props
}) {
  return (
    <Box width={width} height={height} {...props}>
      <svg
        viewBox="0 0 640 46"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M603.59 45.0508L621.572 22.9264L639.466 44.9415V0H0V44.9415L17.8937 22.9264L34.9534 45.0508H35.8068L58.861 22.9264L76.8431 45.0508H77.657L97.9447 22.9264L116.849 45.0508H117.644L136.087 22.9264L157.758 45.0508H158.631L177.996 22.9264L196.9 45.0508H197.684L215.667 22.9264L238.259 45.0508H239.182L259.93 22.9264L277.912 45.0508H278.677L296.659 22.9264L316.486 45.0508H317.378L339.51 22.9264L359.798 45.0508H360.622L379.065 22.9264L399.352 45.0508H400.177L418.619 22.9264L440.751 45.0508H441.644L461.47 22.9264L479.913 45.0508H480.708L499.612 22.9264L520.822 45.0508H521.685L541.05 22.9264L561.338 45.0508H562.182L581.547 22.9264L602.756 45.0508H603.59Z"
          fill={fill}
        />
      </svg>
    </Box>
  );
}
