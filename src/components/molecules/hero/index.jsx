"use client";

import { BlobWrapper, Button, Heading, Image, Link } from "@/components/atoms";
import { Box, Flex, For, HStack, Text, VStack } from "@chakra-ui/react";

export default function Hero() {
  const starSvgBg = `url("data:image/svg+xml,%3Csvg width='620' height='624' viewBox='0 0 620 624' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M310.003 8.06549L332.557 198.497L426.198 31.1997L374.235 215.776L524.709 97.0818L406.131 247.705L590.527 195.69L423.395 289.426L613.642 312.004L423.395 334.58L590.527 428.312L406.131 376.297L524.709 526.921L374.235 408.226L426.198 592.806L332.557 425.505L310.003 615.941L287.445 425.505L193.803 592.806L245.771 408.226L95.2974 526.921L213.872 376.297L29.4723 428.312L196.607 334.58L6.36035 312.004L196.607 289.426L29.4723 195.69L213.872 247.705L95.2974 97.0818L245.771 215.776L193.803 31.1997L287.445 198.497L310.003 8.06549Z' fill='%23F4E0DC' fill-opacity='0.25'/%3E%3C/svg%3E")`;

  return (
    <Flex
      direction={{ base: "column-reverse", lg: "row" }}
      w="full"
      position="relative"
      overflow="hidden"
      gap={{ base: 0 }}
    >
      <Flex
        flex={1}
        direction="column"
        bgImage={{ base: "none", lg: starSvgBg }}
        bgRepeat="no-repeat"
        bgSize="contain"
        backgroundPosition="center"
        align={{ base: "center", md: "center" }}
        justify="center"
        px={{ base: 4, md: 0 }}
        textAlign={{ base: "center", md: "start" }}
      >
        <VStack gap={{ base: 6, md: 16 }} mt={{ base: 8 }} w="full">
          <Heading
            heading="What's a wedding without Gifts?"
            highlight="Gifts?"
            headingStyles={{
              textStyle: {
                base: "3xl",
                sm: "5xl",
                md: "5xl",
                lg: "6xl",
              },
              fontWeight: "600",
              lettergap: "tight",
              maxWidth: { base: "100%", md: "80%" },
              mx: "auto",
              minW: { md: "full", xl: "60%" },
              textWrap: "balance",
            }}
            waveColor="#D59D9A"
            waveStrokeWidth={8}
            waveHeight={22}
            waveCount={3}
            underlineOffset={12}
            underlineStartOffset={8}
          />

          <VStack gap={{ base: 6, md: 8 }}>
            <Text
              textStyle={{ base: "md", sm: "xl", md: "2xl" }}
              color={"fg.muted"}
              maxW={{ base: "fit" }}
              mx="auto"
              textWrap={"balance"}
            >
              look for all your needs at our shop now!
            </Text>

            <Button
              rounded="full"
              size="xl"
              textStyle={{ base: "xl", md: "2xl" }}
              px={{ base: 4, md: 28 }}
              minW={{ base: "full", md: "fit" }}
              fontWeight="bold"
              asChild
            >
              <Link color="text-white" textDecoration="none" href={"/shop"}>
                Shop now
              </Link>
            </Button>
          </VStack>
        </VStack>
      </Flex>

      <Flex
        flex={1}
        justify="center"
        align="center"
        position="relative"
        px={{ base: 4, md: 0 }}
      >
        <HStack
          gap={{ base: 12, md: 20 }}
          position="absolute"
          zIndex={0}
          alignItems="start"
          h="full"
          w="fit-content"
          display="flex"
          flexDir="row"
          justify="center"
          top={0}
        >
          <For each={[0, 1, 2]}>
            {(i) => (
              <Box
                key={i}
                w={{ base: 8, sm: 12, md: 14 }}
                bg="rose.100"
                h={{ base: "40%", sm: "50%", md: "60%" }}
              />
            )}
          </For>
        </HStack>

        <Box zIndex={1} mt={"3rem"}>
          <BlobWrapper size="xl">
            <Image
              src="/test_image.png"
              alt="Hero image"
              nextProps={{
                fill: true,
                style: { objectFit: "cover", borderRadius: "inherit" },
              }}
            />
          </BlobWrapper>
        </Box>
      </Flex>
    </Flex>
  );
}
