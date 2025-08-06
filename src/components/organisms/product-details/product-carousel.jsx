import { useEffect, useState } from "react";
import { Box, Flex, HStack, ProgressCircle } from "@chakra-ui/react";
import { Play, Pause, Share2, ChevronLeft } from "lucide-react";
import { Button, Image, WishlistButton } from "@/components/atoms";
import { useProductCarousel } from "./logic";
import ThumbnailScroller from "./thumbnailScroller";
import { useRouter } from "next/navigation";

export default function ProductCarousel({ images }) {
  const router = useRouter();
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };
  const {
    emblaRef,
    emblaApi,
    selected,
    isPlaying,
    toggleAutoplay,
    progressValue,
    autoplayRef,
    startProgress,
    setSelected,
    rafId,
  } = useProductCarousel(images, { delay: 5000 });

  const handleThumbnailClick = (idx) => {
    if (!emblaApi) return;

    emblaApi.scrollTo(idx, false);
    emblaApi.reInit();

    autoplayRef.current?.reset();
    startProgress();
    setSelected(idx);
  };
  useEffect(() => {
    if (!emblaApi || !images?.length) return;
    const newMaxIndex = images?.length - 1;
    const correctedIndex = selected > newMaxIndex ? 0 : selected;
    if (correctedIndex !== selected) {
      emblaApi.scrollTo(correctedIndex, true);
      setSelected(correctedIndex);
    }

    autoplayRef.current?.reset();
    emblaApi.reInit();
    cancelAnimationFrame(rafId.current);
    startProgress();
  }, [images]);

  return (
    <Flex
      position="relative"
      direction={"column"}
      gap={0}
      flex={1}
      height={"full"}
      w="full"
      maxW={"100%"}
      h={"full"}
      mx="auto"
    >
      <Box
        position="relative"
        height={{ base: "18rem", sm: "20rem", md: "20rem", lg: "30rem" }}
        maxW={"100%"}
        maxH={"100%"}
        minW={"100%"}
      >
        <Box
          ref={emblaRef}
          className="embla__viewport"
          overflow="hidden"
          position="relative"
          height={"full"}
        >
          <Box
            className="embla__container"
            position="relative"
            height={"full"}
            display="block"
          >
            {images?.map((src, idx) => (
              <Box
                key={idx}
                className="embla__slide"
                position="absolute"
                inset={0}
                opacity={idx === selected ? 1 : 0}
                transition="opacity 0.5s ease-in-out"
                transform="none !important"
                zIndex={idx === selected ? 1 : 0}
                pointerEvents={idx === selected ? "auto" : "none"}
              >
                <Image
                  src={src}
                  alt={`slide-${idx}`}
                  className="embla__slide__img"
                  chakraProps={{ borderRadius: "1rem" }}
                  nextProps={{
                    priority: idx == 0 ? true : false,
                    fill: true,
                    sizes: "50vw",
                    loading: idx === 0 ? "eager" : "lazy",
                  }}
                />
              </Box>
            ))}
          </Box>
        </Box>

        <HStack position="absolute" top={2} left={4}>
          <Box position="relative" display="inline-block">
            <Button
              icon
              aria-label="Toggle Autoplay"
              size="sm"
              variant="ghost"
              onClick={() => router.back()}
              bg="bg-color"
              _hover={{ bg: "whiteAlpha.900" }}
              rounded="full"
            >
              <ChevronLeft
                size={16}
                color="var(--chakra-colors-primary)"
                strokeWidth={4}
              />
            </Button>
          </Box>
          <Button
            icon
            aria-label="Toggle Autoplay"
            size="sm"
            variant="ghost"
            onClick={toggleAutoplay}
            bg="bg-color"
            _hover={{ bg: "whiteAlpha.900" }}
            rounded="full"
          >
            {isPlaying ? (
              <Pause
                size={16}
                fill="var(--chakra-colors-primary)"
                color="var(--chakra-colors-primary)"
              />
            ) : (
              <Play
                size={16}
                fill="var(--chakra-colors-primary)"
                color="var(--chakra-colors-primary)"
              />
            )}
          </Button>
        </HStack>
        <Box position="absolute" bottom={2} left={4}>
          <ProgressCircle.Root
            value={progressValue}
            bg="whiteAlpha.800"
            p="1"
            rounded="full"
          >
            <ProgressCircle.Circle>
              <ProgressCircle.Track stroke="rose.200" />
              <ProgressCircle.Range
                stroke="primary"
                strokeLinecap="round"
                transition="stroke-dashoffset 0.3s ease-out"
                style={{ willChange: "stroke-dashoffset" }}
              />
            </ProgressCircle.Circle>
          </ProgressCircle.Root>
        </Box>
        <HStack position="absolute" bottom={2} right={4}>
          <Box position="relative" display="inline-block">
            <Button
              icon
              variant="outline"
              rounded="full"
              p={2}
              bg="white"
              _hover={{ bg: "rose.50" }}
              onClick={() =>
                navigator.share({
                  title: "Cart",
                  text: "Take a look at my cart now!",
                  url: "https:test.com/",
                })
              }
              zIndex={1}
            >
              <Share2 strokeWidth={1.5} />
            </Button>
          </Box>
          <WishlistButton onClick={handleLike} isFilled={liked} />
        </HStack>
      </Box>
      <ThumbnailScroller
        images={images}
        selected={selected}
        onSelect={handleThumbnailClick}
      />
    </Flex>
  );
}
