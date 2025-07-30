import { AppleIcon, Button, GoogleIcon, MetaIcon } from "@/components/atoms";
import { HStack, useBreakpointValue } from "@chakra-ui/react";

export default function SocialLogin() {
  return (
    <HStack
      align="center"
      justify="center"
      w="full"
      gap={{ base: 3, sm: 4, md: 6 }}
    >
      <Button
        icon
        color="rose.50"
        boxSize={"fit"}
        p={3}
        fontWeight="bold"
        rounded="xl"
        border="1px solid"
        borderColor="rose.500"
      >
        <GoogleIcon size="xl" color="rose.50" />
      </Button>

      <Button
        icon
        bg="rose.50"
        p={3}
        fontWeight="600"
        boxSize="fit"
        rounded="xl"
        border="1px solid"
        borderColor="rose.500"
      >
        <AppleIcon />
      </Button>

      <Button
        icon
        bg="rose.50"
        p={3}
        boxSize="fit"
        rounded="xl"
        border="1px solid"
        borderColor="rose.500"
      >
        <MetaIcon />
      </Button>
    </HStack>
  );
}
