"use client";

import { z } from "zod";
import { HStack, VStack, Box } from "@chakra-ui/react";
import { Divider, Input, Link } from "@/components/atoms";
import { Form, SocialLogin } from "@/components/molecules";

// 1. Validation schema using Zod
const loginSchema = z.object({
  email: z.string().email({ message: "Enter a valid email" }),
  password: z.string().min(6, { message: "Minimum 6 characters required" }),
});

// 2. Default values
const defaultValues = {
  email: "",
  password: "",
};

export default function LoginForm() {
  // 3. Form submit handler
  const handleSubmit = async ({ value }) => {
    console.log("Logging in with", value);
    // TODO: Add login logic (e.g., API call)
  };

  return (
    <Box w="full" maxW={{ base: "full", sm: "400px" }} mx="auto">
      <Form
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
        formOptions={{
          validators: {
            onChange: loginSchema,
          },
        }}
        wrapperStyles={{
          gap: 6,
          w: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
        submitText="Sign In"
      >
        {(form) => (
          <>
            {/* Email Field */}
            <form.Field name="email">
              {(field) => (
                <Input
                  label="Email"
                  name="email"
                  placeholder="you@example.com"
                  field={field}
                  rounded="xl"
                />
              )}
            </form.Field>

            {/* Password Field + Forgot Link */}
            <VStack gap={0} alignItems="flex-end">
              <form.Field name="password">
                {(field) => (
                  <>
                    <Input
                      label="Password"
                      name="password"
                      placeholder="••••••••"
                      isPassword
                      field={field}
                      rounded="xl"
                    />
                    <HStack justify="flex-end" mt={1}>
                      <Link
                        href="/forgot-password"
                        textStyle="sm"
                        color="text-black"
                        textDecoration="none"
                        _hover={{ textDecoration: "underline" }}
                      >
                        Forgot password?
                      </Link>
                    </HStack>
                  </>
                )}
              </form.Field>
            </VStack>
          </>
        )}
      </Form>

      <Divider text="OR CONTINUE WITH" my={{ base: 4, md: 6 }} />

      <Box mt={{ base: 4, md: 6 }}>
        <SocialLogin />
      </Box>
    </Box>
  );
}
