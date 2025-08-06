"use client";
import { Heading } from "@/components/atoms";
import { PageWrapper, SignupForm } from "@/components/organisms";
import { COMPANY_NAME } from "@/config";
import { useUserState } from "@/utils/hooks";
import { Box, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const backgroundGradient = `
 linear-gradient(to right, #FBE9E7 0%, 26.610645651817322%, #F4CBC5 53.221291303634644%, 76.61064565181732%, #FAE7E3 100%);
`;
  const router = useRouter();
  const { isAuthenticated } = useUserState();
  if (isAuthenticated) {
    router.replace("/shop");
  }
  return (
    <>
      <PageWrapper alignItems="center">
        <Box
          position="relative"
          flex={1}
          w="full"
          minH="100vh"
          bgImage={backgroundGradient}
          bgSize="cover"
          bgPosition="center"
          display="flex"
          alignItems={{ base: "start", md: "center" }}
          justifyContent="center"
          p={{ base: 4, md: 8 }}
          px={{ base: 4, sm: 4, md: 8 }}
        >
          <VStack
            gap={{ base: 6, md: 8 }}
            w="full"
            maxW="xl"
            px={{ base: 4, sm: 4, md: 8 }}
          >
            <Heading
              heading={COMPANY_NAME}
              headingStyles={{
                fontWeight: "bold",
                textStyle: "2xl",
                bg: "rose.400/40",
                rounded: "lg",
                p: 2,
                px: 6,
                textAlign: "center",
                w: "full",
              }}
            />
            <Box
              w="full"
              bg="bg-color"
              rounded="2xl"
              p={{ base: 6, md: 8 }}
              px={{ base: 4, sm: 4, md: 8 }}
            >
              <SignupForm />
            </Box>
          </VStack>
        </Box>
      </PageWrapper>
    </>
  );
}
