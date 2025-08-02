import {
  AppleIcon,
  Button,
  GoogleIcon,
  GoogleSocialAuth,
  MetaIcon,
} from "@/components/atoms";
import { HStack, useBreakpointValue } from "@chakra-ui/react";

export default function SocialLogin() {
  return (
    <HStack
      align="center"
      justify="center"
      w="full"
      gap={{ base: 3, sm: 4, md: 6 }}
    >
      <GoogleSocialAuth />
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
