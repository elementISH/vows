import { useCallback, useEffect, useRef, useState } from "react";
import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { Button, ScrollControls } from "@/components/atoms";
import { Plus, X } from "lucide-react";
import { toast } from "sonner";

export default function VariationSelector({
  variations,
  activeIndex,
  setActiveIndex,
  setShowDeleteDialogIndex,
  handleAddVariation,
}) {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  console.log("Variations:", variations);
  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    const atStart = el.scrollLeft <= 0;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;

    setCanScrollLeft(!atStart);
    setCanScrollRight(!atEnd);
    setShowButtons(el.scrollWidth > el.clientWidth + 1);
  };

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({
      left: dir === "left" ? -120 : 120,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    checkScroll();
    el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [variations]);

  const handleDelete = useCallback(
    (e, i) => {
      e.stopPropagation();
      const item = variations[i];
      if (!item || ((item.color == null || item.size == null) && i == 0)) {
        return toast.info("Nothing to delete");
      }
      setShowDeleteDialogIndex(i);
    },
    [variations]
  );

  return (
    <Flex
      align="center"
      w="full"
      gap={{ base: 1, md: 2 }}
      overflowX="auto"
      flexWrap="nowrap"
      sx={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      className="no-scrollbar"
    >
      <ScrollControls
        type="prev"
        onClick={() => scroll("left")}
        isVisible={showButtons}
        isDisabled={!canScrollLeft}
      />

      <Flex
        ref={scrollRef}
        gap={{ base: 1, sm: 2 }}
        overflowX="auto"
        flex={1}
        py={{ base: 1, md: 1.5 }}
        px={{ base: 0.5, md: 1 }}
        minW="0"
        sx={{
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {variations.map((item, i) => (
          <Button
            key={i}
            variant="outline"
            rounded="full"
            px={{ base: 3, md: 4 }}
            py={1}
            onClick={() => setActiveIndex(i)}
            bg={i === activeIndex ? "rose.50" : "bg-color"}
            flexShrink={0}
            textStyle={{ base: "xs", sm: "sm" }}
          >
            <Flex align="center" gap={1}>
              <Box onClick={(e) => handleDelete(e, i)} cursor="pointer">
                <Icon boxSize={{ base: 3, sm: 4 }} asChild>
                  <X />
                </Icon>
              </Box>

              <Box
                w={{ base: "24px", sm: "28px" }}
                h={{ base: "24px", sm: "28px" }}
                rounded="full"
                bg={item.color || "transparent"}
                border={item.color ? "1px solid" : "1px dashed"}
                borderColor={item.color ? "rose.400" : "text-black"}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                {!item.color ? "?" : item.quantity}
              </Box>

              <Text
                textTransform="capitalize"
                textStyle={{ base: "xs", sm: "sm" }}
              >
                {item.size || "Choose size"}
              </Text>
            </Flex>
          </Button>
        ))}

        {!showButtons && (
          <Button
            icon
            variant="outline"
            rounded="full"
            px={3}
            size="md"
            onClick={handleAddVariation}
            flexShrink={0}
          >
            <Plus size={18} />
          </Button>
        )}
      </Flex>

      {showButtons && (
        <Button
          icon
          variant="outline"
          rounded="full"
          px={3}
          size="md"
          onClick={handleAddVariation}
          flexShrink={0}
        >
          <Plus size={18} />
        </Button>
      )}

      <ScrollControls
        type="next"
        onClick={() => scroll("right")}
        isVisible={showButtons}
        isDisabled={!canScrollRight}
      />
    </Flex>
  );
}
