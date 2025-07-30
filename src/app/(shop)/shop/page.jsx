"use client";
import { Button, Divider, Heading } from "@/components/atoms";
import { AdvancedFilter, Section, Slider } from "@/components/molecules";
import { PageWrapper, ProductCard } from "@/components/organisms";
import { Box, Flex, HStack, VStack, Wrap, WrapItem } from "@chakra-ui/react";
import { ArrowLeft, ArrowRight, Filter, SlidersHorizontal } from "lucide-react";

export default function ShopPage() {
  return (
    <PageWrapper px={{ base: 4, sm: 4, md: 8 }}>
      <Section
        heading="Shop Catalog"
        subheading="Elegance handpicked, crafted for your every moment"
      >
        <VStack w="full" gap={4} align="stretch">
          <HStack
            justifyContent="space-between"
            alignItems="center"
            gap={{ base: 2, md: 0 }}
            w="full"
          >
            <Heading
              heading="Quick Filter"
              headingStyles={{
                fontWeight: "bold",
                textStyle: { base: "xl", md: "2xl" },
                textAlign: { base: "center", md: "left" },
                w: "full",
                minW: "fit",
              }}
              wrapperStyles={{ flex: 1, minWidth: "fit-content" }}
            />
            <AdvancedFilter />
          </HStack>

          <Wrap gap={3} justify={{ base: "flex-start" }} w="full">
            {["best selling", "cheapest", "highest price", "back in stock"].map(
              (item, i) => (
                <WrapItem key={i}>
                  <Button
                    size={{ base: "xs", md: "sm" }}
                    rounded="full"
                    variant="outline"
                    px={{ base: 2, md: 4 }}
                    bg="transparent"
                    textStyle={{ base: "xs", md: "sm" }}
                    color="rose.500"
                    active={i === 0}
                    activeColor="rose.100"
                    whiteSpace="nowrap"
                  >
                    {item}
                  </Button>
                </WrapItem>
              )
            )}
          </Wrap>
        </VStack>
        <Divider />
        {[0, 1, 2, 3].map((_, i) => (
          <Slider
            key={i}
            variant="functional"
            endElement={<Box fontWeight="semibold">Browse All →</Box>}
            heading="Accessories"
            headingStyles={{
              textStyle: {
                base: "xl",
                sm: "2xl",
                md: "2xl",
                lg: "4xl",
              },
              fontWeight: "bold",
              textAlign: "center",
              lineHeight: "shorter",
            }}
            slidesPerPage={"auto"}
            action={
              <Flex color="fg.muted" gap={2} alignItems={"center"}>
                Browse All <ArrowRight strokeWidth={1.5} />
              </Flex>
            }
            snap
          >
            {Array.from({ length: 10 }).map((_, i) => (
              <ProductCard
                id={i}
                key={i}
                image="/test_image.png"
                imageProps={{ fill: true }}
                title="Ivory Heels"
                colors={["#fff", "#d5b4b4", "#000"]}
                sizes={[
                  "x-small",
                  "small",
                  "medium",
                  "large",
                  "x-large",
                  "2x-large",
                  "38",
                  "39",
                ]}
                price={1999}
                originalPrice={2499}
                onAddToCart={() => console.log("Add to cart")}
                onLike={() => console.log("Liked")}
              />
            ))}
          </Slider>
        ))}
      </Section>
    </PageWrapper>
  );
}
