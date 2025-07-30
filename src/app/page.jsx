"use client";
import { CategoryCard, Hero, Section, Slider } from "@/components/molecules";
import {
  AdSection,
  CtaSection,
  PageWrapper,
  ProductCard,
} from "@/components/organisms";
import { Box, useBreakpointValue } from "@chakra-ui/react";

export default function Home() {
  const gap = useBreakpointValue({
    base: 14,
    sm: 14,
    md: 16,
  });
  return (
    <PageWrapper px={{ base: 4, sm: 4, md: 8 }}>
      <Hero />
      <Section heading="Shop By">
        <Slider variant="ghost" snap gap={gap}>
          {Array.from({ length: 10 }).map((_, i) => (
            <CategoryCard key={i} />
          ))}
        </Slider>
      </Section>
      <Section
        heading="Top Products"
        subheading="Here's a sneak peek at what we offer"
        subheadingStyles={{ textStyle: "xl", color: "fg.muted" }}
      >
        <Slider
          variant="ghost"
          endElement={<Box fontWeight="semibold">Browse All →</Box>}
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
      </Section>
      <AdSection />
      <CtaSection />
    </PageWrapper>
  );
}
