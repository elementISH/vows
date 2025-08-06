"use client";
import { Button, Divider, Heading } from "@/components/atoms";
import { AdvancedFilter, Section, Slider } from "@/components/molecules";
import { PageWrapper, ProductCard } from "@/components/organisms";
import { useShopState } from "@/utils/hooks";
import { Box, Flex, HStack, VStack, Wrap, WrapItem } from "@chakra-ui/react";
import { ArrowLeft, ArrowRight, Filter, SlidersHorizontal } from "lucide-react";

export default function ShopPage() {
  const { composedShop } = useShopState();
  console.log(composedShop);

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
        {composedShop?.length > 0 &&
          composedShop?.map((shopSection, i) => (
            <Slider
              key={shopSection?.category_name || i}
              variant="functional"
              endElement={<Box fontWeight="semibold">Browse All →</Box>}
              heading={shopSection.category_name || "Unkown"}
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
              {shopSection?.products?.length > 0 &&
                shopSection?.products?.map((product, i) => (
                  <>
                    <ProductCard
                      id={product?.id || i}
                      key={product?.id || i}
                      image={
                        // product?.images.length > 0
                        //   ? product?.images[0]?.image
                        //   : "/fallback_image.png"
                        "https://tempdevenvb.ticket-tribe.com/public/storage/product-categories/2747820250712004102498135602_122192076254545081_2931734354189092688_n.jpg"
                      }
                      imageProps={{
                        fill: true,
                        // unoptimized: true,
                      }}
                      title={product?.name || "Unkown"}
                      colors={
                        product?.variants?.length <= 0
                          ? ["#FFFFFF"]
                          : product?.variants?.map(
                              (variant) => variant?.color?.hex_code || "#FFFFFF"
                            )
                      }
                      sizes={
                        product?.variants?.length <= 0
                          ? ["Medium"]
                          : product?.variants
                              ?.filter(
                                (variant) =>
                                  variant?.size?.name && variant?.size?.code
                              )
                              ?.sort((a, b) => {
                                const indexA = [
                                  "XS",
                                  "S",
                                  "M",
                                  "L",
                                  "XL",
                                  "2XL",
                                  "3XL",
                                  "4XL",
                                  "5XL",
                                ].indexOf(a.size.code.toUpperCase());
                                const indexB = [
                                  "XS",
                                  "S",
                                  "M",
                                  "L",
                                  "XL",
                                  "2XL",
                                  "3XL",
                                  "4XL",
                                  "5XL",
                                ].indexOf(b.size.code.toUpperCase());
                                // Unknown codes go last
                                return (
                                  (indexA === -1 ? 999 : indexA) -
                                  (indexB === -1 ? 999 : indexB)
                                );
                              })
                              ?.map((variant) => variant.size.name || "Unknown")
                      }
                      price={1999}
                      originalPrice={2499}
                      isWishlisted={product?.is_in_wishlist}
                    />
                  </>
                ))}
            </Slider>
          ))}
      </Section>
    </PageWrapper>
  );
}
