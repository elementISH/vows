import { Image as ChakraImage } from "@chakra-ui/react";
import NextImage from "next/image";
export default function Image({ src, alt, chakraProps, nextProps }) {
  return (
    <ChakraImage asChild {...chakraProps}>
      <NextImage
        src={src}
        alt={alt}
        quality={100}
        loading="lazy"
        draggable={"false"}
        {...nextProps}
      />
    </ChakraImage>
  );
}
