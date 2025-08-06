"use client";
import { Button, Divider, Heading } from "@/components/atoms";
import { Section, Slider } from "@/components/molecules";
import {
  PageWrapper,
  ProductCard,
  ProductDetails,
  ShoppingBasket,
} from "@/components/organisms";
import { Box, Flex, HStack, VStack } from "@chakra-ui/react";
import { ArrowRight } from "lucide-react";
import { use } from "react";

export default function ProductPage({ params }) {
  const { slug } = use(params);
  return (
    <PageWrapper px={{ base: 4, sm: 4, md: 8 }} position={"relative"}>
      <Section wrapperStyles={{ py: { base: 8, md: 12 } }}>
        <ProductDetails />
      </Section>
      <Section heading="Similar Products">
        {[0, 1].map((_, i) => (
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
