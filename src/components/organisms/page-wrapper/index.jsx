import { Flex } from "@chakra-ui/react";

export default function PageWrapper({ children, ...props }) {
  return (
    <Flex direction={"column"} flex={1} {...props}>
      {children}
    </Flex>
  );
}
