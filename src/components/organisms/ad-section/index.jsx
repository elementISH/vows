"use client";

import { Box, Flex, HStack, VStack } from "@chakra-ui/react";
import { Heading, Image } from "@/components/atoms";
import { Section } from "@/components/molecules";

export default function AdSection() {
  return (
    <Section
      wrapperStyles={{
        w: "full",
        py: 6,
        pt: { base: 0, md: 6 },
        px: { base: 0 },
      }}
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        w="full"
        gap={{ base: 6, lg: 12 }}
        align="stretch"
      >
        <Flex
          w="full"
          flex={1}
          order={{ base: 2, md: 0 }}
          gap={{ base: 6, md: 0, lg: 2 }}
          align="start"
          direction={{ base: "column-reverse", md: "column" }}
        >
          <Box
            position="relative"
            w="full"
            h={{
              base: "12rem",
              sm: "14rem",
              md: "12rem",
              lg: "16rem",
              xl: "20rem",
            }}
            rounded={{ base: "3xl", md: "4xl" }}
            overflow="hidden"
            bg="primary"
            border="1px solid"
            borderColor="rose.500"
          >
            <Image
              src="/ad_image_first.png"
              alt="ad-image-left"
              nextProps={{
                fill: true,
              }}
              chakraProps={{
                objectFit: "cover",
                objectPosition: "0px -10px",
                w: "full",
                h: "full",
              }}
            />
          </Box>

          <HStack
            gap={4}
            alignItems="start"
            w={"full"}
            ps={{ base: 0, md: 4, lg: 10, xl: 20 }}
          >
            <Box
              w="auto"
              flexShrink={0}
              asChild
              boxSize={{ base: 8, lg: 12 }}
              display={{ base: "none", lg: "block" }}
            >
              <Box asChild strokeWidth={6}>
                <svg
                  width="47"
                  height="68"
                  viewBox="0 0 47 68"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.28172 0.679114C-2.09799 30.3703 47.0114 40.3044 43.9738 16.7882C42.5705 9.75726 31.3846 1.33663 16.5587 12.6512C-8.55049 31.5127 23.6803 56.6441 42.4842 63.8762M26.198 39.9715L42.4842 63.8762M42.4842 63.8762L16.9571 65.0023"
                    stroke="#D59D9A"
                    strokeWidth="inherit"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Box>
            </Box>

            <Heading
              heading="Browse our newest collections"
              highlight="collections"
              headingStyles={{
                textStyle: {
                  base: "2xl",
                  sm: "3xl",
                  md: "3xl",
                  lg: "4xl",
                  xl: "5xl",
                },
                fontWeight: "bold",
                textAlign: { base: "center", md: "start" },
                ps: { base: 0, md: 0, lg: 6, xl: 8 },
                pe: { base: 0, md: 4, lg: 0 },
                pt: { base: 0, md: 6 },
              }}
              wrapperStyles={{ w: "full" }}
            />
          </HStack>
        </Flex>

        <VStack
          w="full"
          flex={1}
          order={{ base: 0, lg: 1 }}
          gap={{ base: 6, md: 8 }}
          align="start"
        >
          <Heading
            heading="Curated collections for all kinds of couples"
            highlight="collections"
            headingStyles={{
              textStyle: {
                base: "2xl",
                sm: "3xl",
                md: "3xl",
                lg: "4xl",
                xl: "5xl",
              },
              fontWeight: "bold",
              textAlign: { base: "center", md: "left" },
            }}
            wrapperStyles={{
              w: "full",
              mb: { base: 0, md: 0 },
              px: { base: 0, md: 4 },
            }}
          />

          <Box
            position="relative"
            w="full"
            h={{
              base: "14rem",
              sm: "18rem",
              md: "16rem",
              lg: "20rem",
              xl: "24rem",
              "2xl": "28rem",
            }}
            rounded={{ base: "3xl", md: "4xl" }}
            overflow="hidden"
            bg="primary"
            border="1px solid"
            borderColor="rose.500"
          >
            <Image
              src="/ad_image.png"
              alt="ad-image-right"
              nextProps={{
                fill: true,
              }}
              chakraProps={{
                objectFit: "cover",
                objectPosition: "top",
                w: "full",
                h: "full",
              }}
            />
          </Box>
        </VStack>
      </Flex>
    </Section>
  );
}
