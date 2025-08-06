"use client";

import { Box, Flex, HStack } from "@chakra-ui/react";
import { Heading } from "@/components/atoms";
import { useSliderLogic } from "./useSliderLogic";
import { SliderButtons } from "./sliderButtons";

export default function Slider({
  variant = "ghost",
  heading = "",
  action = null,
  children = [],
  endElement = null,
  maxChildren = Infinity,
  slidesPerPage = "auto",
  maxWidth = "100%",
  direction = "ltr",
  snap = true,
  autoplay = false,
  showButtons = false,
  gap = 16,
  contentGap = 4,
  autoPLayDelay = 2,
  buttonsBottom = false,
  headingStyles = {},
  headingFollower,
}) {
  const {
    emblaRef,
    displayItems,
    scrollPrev,
    scrollNext,
    prevDisabled,
    nextDisabled,
    showEndElement,
  } = useSliderLogic({
    children,
    maxChildren,
    direction,
    snap,
    autoplay,
    autoPLayDelay,
  });

  return (
    <Flex direction="column" maxW={maxWidth} w="full" gap={contentGap}>
      {variant === "functional" && (
        <Flex justify="space-between" align="center" wrap="wrap">
          <HStack flexWrap="wrap">
            <Heading
              heading={heading}
              headingStyles={{
                textStyle: "3xl",
                fontWeight: "bold",
                textAlign: "center",
                ...headingStyles,
              }}
            />
            {headingFollower}
          </HStack>
          <Flex
            align="center"
            gap={2}
            direction={direction === "rtl" ? "row-reverse" : "row"}
          >
            {action}
            {showButtons && (
              <Flex
                direction={direction === "rtl" ? "row" : "row-reverse"}
                align="center"
                gap={2}
              >
                <SliderButtons
                  scrollPrev={scrollPrev}
                  scrollNext={scrollNext}
                  prevDisabled={prevDisabled}
                  nextDisabled={nextDisabled}
                  direction={direction}
                />
              </Flex>
            )}
          </Flex>
        </Flex>
      )}

      {variant === "ghost" && showButtons && !buttonsBottom && (
        <Flex
          direction={direction === "rtl" ? "row" : "row-reverse"}
          align="center"
          gap={2}
        >
          <SliderButtons
            scrollPrev={scrollPrev}
            scrollNext={scrollNext}
            prevDisabled={prevDisabled}
            nextDisabled={nextDisabled}
            direction={direction}
          />
        </Flex>
      )}

      <Box
        overflow="hidden"
        ref={emblaRef}
        dir={direction}
        cursor="grab"
        _active={{ cursor: "grabbing" }}
      >
        <Flex className="embla__container" style={{ gap: `${gap}px` }} px={1}>
          {displayItems.map((child, i) => (
            <Box
              key={i}
              className="embla__slide"
              flex={
                slidesPerPage === "auto"
                  ? "0 0 auto"
                  : `0 0 calc(100% / ${slidesPerPage})`
              }
              // minW={slidesPerPage === "auto" ? "200px" : "unset"}
            >
              {child}
            </Box>
          ))}
          {showEndElement && (
            <Box
              className="embla__slide"
              flex={
                slidesPerPage === "auto"
                  ? "0 0 auto"
                  : `0 0 calc(100% / ${slidesPerPage})`
              }
              minW={slidesPerPage === "auto" ? "200px" : "unset"}
              display="flex"
              justifyContent="center"
              alignItems="center"
              color="fg.muted"
              textStyle="sm"
              fontWeight="medium"
            >
              {endElement || "You’ve reached the end"}
            </Box>
          )}
        </Flex>
      </Box>

      {variant === "ghost" && showButtons && buttonsBottom && (
        <Flex
          direction={direction === "rtl" ? "row-reverse" : "row"}
          align="center"
          gap={2}
        >
          <SliderButtons
            scrollPrev={scrollPrev}
            scrollNext={scrollNext}
            prevDisabled={prevDisabled}
            nextDisabled={nextDisabled}
            direction={direction}
          />
        </Flex>
      )}
    </Flex>
  );
}
