import { Card } from "@/components/atoms";
import { Box, useBreakpointValue } from "@chakra-ui/react";

export default function CategoryCard({ wrapperStyles, rootStyles }) {
  const width = useBreakpointValue({
    base: "12rem",
    sm: "16rem",
    md: "18rem",
    lg: "20rem",
  });
  const height = useBreakpointValue({
    base: "18rem",
    sm: "22rem",
    md: "24rem",
    lg: "30rem",
  });

  return (
    <Card
      h={height}
      w={width}
      // minH="20rem"
      // minW="14rem"
      bgImage="/test_category.png"
      title="Accessories"
      titleStyles={{
        textStyle: { base: "lg", sm: "xl", md: "2xl", lg: "3xl" },
        fontWeight: "bold",
      }}
      descriptionStyles={{
        textStyle: { base: "xs", sm: "sm", md: "md", lg: "lg" },
        color: "text-white",
        fontWeight: "semibold",
      }}
      headerStyles={{ px: 0 }}
      description="For those you love"
      p={{ base: 4, md: 6, lg: 8 }}
      px={{ base: 4, md: 4, lg: 6 }}
      color="white"
      wrapperStyles={{
        flex: 1,
        alignContent: "end",
        justifyContent: "end",
        ...wrapperStyles,
      }}
      overlay={
        <Box
          position="absolute"
          bottom={0}
          left={0}
          right={0}
          height="45%"
          zIndex={1}
          bg="linear-gradient(to bottom, transparent 0%, rgba(183, 110, 121, 0.8) 100%)"
          backdropFilter="blur(2px)"
          maskImage="linear-gradient(to top, black 60%, transparent 100%)"
          WebkitMaskImage="linear-gradient(to top, black 60%, transparent 100%)"
        />
      }
      {...rootStyles}
    />
  );
}
