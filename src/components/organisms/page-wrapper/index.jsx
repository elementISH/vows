import { Flex } from "@chakra-ui/react";

/**
 * @typedef {import("@chakra-ui/react").FlexProps} FlexProps
 */

/**
 * @param {FlexProps } props
 */
export default function PageWrapper({ children, ...props }) {
  return (
    <Flex direction={"column"} flex={1} {...props}>
      {children}
    </Flex>
  );
}
